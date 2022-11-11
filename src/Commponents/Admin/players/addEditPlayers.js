import React, { useEffect, useState } from "react";
import AdminLayout from "./../../../HOC/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { dataplayers, storage } from "../../../firebase";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button
} from "@mui/material";
import {
  showToastError,
  showToastSucces,
  selectIsError,
  textErrorHelper,
  selectErrorHelper
} from "../../Utils/tools";
import { useParams } from "react-router-dom";
import {
  addDoc,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore/lite";
import FileUploader from "../../Utils/fileUploader";
import { getDownloadURL, ref } from "firebase/storage";

const defaultValue = {
  name: "",
  lastname: "",
  number: "",
  position: "",
  image: ""
};

const AddEditPlayers = () => {
  const navigate = useNavigate();
  let { playerid } = useParams();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const [formType, setFormType] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is Required"),
      lastname: Yup.string().required("This input is Required"),
      number: Yup.number()
        .required("This input is Required")
        .min(0, "The Minimum is zero")
        .max(100, "The Maximum is 100"),
      position: Yup.string().required("This input is Required"),
      image: Yup.string().required("This input is Required")
    }),
    onSubmit: values => {
      submitForm(values);
    }
  });
  const submitForm = values => {
    let dataSubmit = values;
    setLoading(true);
    if (formType === "add") {
      addDoc(dataplayers, dataSubmit)
        .then(() => {
          showToastSucces("Player added");
          formik.resetForm();
          navigate("/admin_players");
        })
        .catch(error => {
          showToastError(error);
        });
    } else {
      updateDoc(doc(dataplayers, playerid), dataSubmit)
        .then(() => {
          showToastSucces("player updated");
        })
        .catch(error => {
          showToastError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const updateImageName = (filename) => {
    formik.setFieldValue("image", filename);
  };
  useEffect(
     () => {
      if (playerid) {
         getDocs(
          (
            dataplayers,
            query(dataplayers, where(documentId("id"), "==", playerid))
          )
        ).then(snapshot => {
          snapshot.docs.forEach((doc) => {
            if (doc.data()) {
              getDownloadURL(
                ref(storage, `player/${doc.data().image}`)
              ).then(downloadURL => {
                updateImageName(doc.data().image);
                setImgUrl(downloadURL);
              });
              setFormType("edit");
              setValues(doc.data());
            } else {
              showToastError("sorry ,nothing was found");
            }
          });
        });
      } else {
        setFormType("add");
        setValues(defaultValue);
      }
    },
    [playerid]
  );


  return (
    <AdminLayout title={formType === "add" ? "Add Player" : "Edit Player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <FileUploader
            defaultImage={imgUrl}
            defaultImageName={formik.values.image}
            filename={filename => updateImageName(filename)}
          />

          <form onSubmit={formik.handleSubmit}>
            <hr />
            <h4>Player info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Add FirstName"
                  {...formik.getFieldProps("name")}
                  {...textErrorHelper(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Add LastName"
                  {...formik.getFieldProps("lastname")}
                  {...textErrorHelper(formik, "lastname")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  type="number"
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Add number"
                  {...formik.getFieldProps("number")}
                  {...textErrorHelper(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "position")}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  displayEmpty
                  placeholder="Add position"
                  {...formik.getFieldProps("position")}
                  {...textErrorHelper(formik, "position")}
                >
                  <MenuItem value="" disabled>
                    Select a Position
                  </MenuItem>
                  <MenuItem value="keeper">keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
                </Select>
                {selectErrorHelper(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add Player" : "Edit Player"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
