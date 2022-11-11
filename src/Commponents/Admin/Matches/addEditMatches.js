import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import AdminLayout from "./../../../HOC/AdminLayout";
import * as Yup from "yup";
import {
  showToastSucces,
  showToastError,
  textErrorHelper,
  selectErrorHelper,
  selectIsError
} from "./../../Utils/tools";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button
} from "@mui/material";
import { dataMatches, datateams } from "../../../firebase";
import { addDoc, doc, documentId, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { useNavigate, useParams } from "react-router-dom";
const defaultValue = {
  date: "",
  local: "",
  resultLocal: "",
  away: "",
  resultAway: "",
  referee: "",
  stadium: "",
  result: "",
  final: ""
};
const AddEditMatches = () => {
    const navigate = useNavigate();
  let { matchid } = useParams();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [teams, setTeams] = useState(null);
  const [values, setValues] = useState(defaultValue);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      date: Yup.string().required("This input is required"),
      local: Yup.string().required("This input is required"),
      away: Yup.string().required("This input is required"),
      resultLocal: Yup.number()
        .required("This input is required")
        .min(0, "the minimum is 0")
        .max(99, "the maximum is 99"),
      resultAway: Yup.number()
        .required("This input is required")
        .min(0, "the minimum is 0")
        .max(99, "the maximum is 99"),
      referee: Yup.string().required("This input is required"),
      stadium: Yup.string().required("This input is required"),
      result: Yup.mixed()
        .required("This input is required")
        .oneOf(["W", "D", "L", "n/a"]),
      final: Yup.mixed().required("This input is required").oneOf(["yes", "no"])
    }),
    onSubmit: values => {
     
      submitForm(values);
    }
  });
  const submitForm = values => {
    let dataSubmit = values;

    teams.forEach(team => {
        if (team.shortName === dataSubmit.local) {
            dataSubmit['localThmb']=team.thmb
        }
        if (team.shortName === dataSubmit.away) {
            dataSubmit['awayThmb']=team.thmb
        }
    });

   
    setLoading(true);
    if (formType === "add") {
      addDoc(dataMatches, dataSubmit)
        .then(() => {
          showToastSucces("Match added");
          formik.resetForm();
          navigate("/admin_matches");
        })
        .catch(error => {
          showToastError(error);
        });
    } else {
      updateDoc(doc(dataMatches, matchid), dataSubmit)
        .then(() => {
          showToastSucces("match updated");
        })
        .catch(error => {
          showToastError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const showTeams = () =>
    teams
      ? teams.map(item =>
          <MenuItem key={item.id} value={item.shortName}>
            {item.shortName}
          </MenuItem>
        )
      : null;
  useEffect(
    () => {
      if (!teams) {
        getDocs(datateams)
          .then(snapshot => {
            const teams = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setTeams(teams);
          })
          .catch(error => {
            showToastError(error);
          });
      }
    },
    [teams]
  );

  useEffect(
     () => {
      if (matchid) {
         getDocs(
          (
            dataMatches,
            query(dataMatches, where(documentId("id"), "==", matchid))
          )
        ).then(snapshot => {
          snapshot.docs.forEach((doc) => {
            if (doc.data()) {
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
    [matchid]
  );


  return (
    <AdminLayout title={formType === "add" ? "Add Match" : "Edit Match"}>
      <div className="editmatch_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <h4>Select date</h4>
              <FormControl>
                <TextField
                  id="date"
                  name="date"
                  type="date"
                  {...formik.getFieldProps("date")}
                  {...textErrorHelper(formik, "date")}
                />
              </FormControl>
            </div>
            <hr />
            <div>
              <h4>Result local</h4>
              <FormControl error={selectIsError(formik, "local")}>
                <Select
                  id="local"
                  name="local"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("local")}
                >
                  <MenuItem value="" disabled>
                    Select A team
                  </MenuItem>
                  {showTeams()}
                </Select>
                {selectErrorHelper(formik, "local")}
              </FormControl>
              <FormControl style={{ marginLeft: "10px" }}>
                <TextField
                  id="resultLocal"
                  variant="outlined"
                  name="resultLocal"
                  type="number"
                  {...formik.getFieldProps("resultLocal")}
                  {...textErrorHelper(formik, "resultLocal")}
                />
              </FormControl>
            </div>

            <div>
              <h4>Result away</h4>
              <FormControl error={selectIsError(formik, "local")}>
                <Select
                  id="away"
                  name="away"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("away")}
                >
                  <MenuItem value="" disabled>
                    Select A team
                  </MenuItem>
                  {showTeams()}
                </Select>
                {selectErrorHelper(formik, "away")}
              </FormControl>
              <FormControl style={{ marginLeft: "10px" }}>
                <TextField
                  id="resultAway"
                  variant="outlined"
                  name="resultAway"
                  type="number"
                  {...formik.getFieldProps("resultAway")}
                  {...textErrorHelper(formik, "resultAway")}
                />
              </FormControl>
            </div>
            <hr />
            <div className="mb-5">
              <h4>match info</h4>
              <FormControl>
                <TextField
                  id="referee"
                  name="referee"
                  placeholder="Add the referee name"
                  {...formik.getFieldProps("referee")}
                  {...textErrorHelper(formik, "referee")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="stadium"
                  name="stadium"
                  placeholder="Add the stadium name"
                  {...formik.getFieldProps("stadium")}
                  {...textErrorHelper(formik, "stadium")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "result")}>
                <Select
                  id="result"
                  name="result"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("result")}
                >
                  <MenuItem value="" disabled>
                    {" "}Select A result
                  </MenuItem>
                  <MenuItem value="W"> Win</MenuItem>
                  <MenuItem value="D">Draw </MenuItem>
                  <MenuItem value="L"> Lose</MenuItem>
                  <MenuItem value="n/a">Non Availble </MenuItem>
                </Select>
                {selectErrorHelper(formik, "result")}
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectIsError(formik, "final")}>
                <Select
                  id="final"
                  name="final"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("final")}
                >
                  <MenuItem value="" disabled>
                    {" "}was the game played
                  </MenuItem>
                  <MenuItem value="yes"> Yes</MenuItem>
                  <MenuItem value="no">No </MenuItem>
                </Select>
                {selectErrorHelper(formik, "result")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add Match" : "Edit Match"}{" "}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditMatches;
