import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { showToastError,showToastSucces } from '../Utils/tools';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
const SignIn = props => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("email is requierd"),
      password: Yup.string().required("password is requierd")
    }),
    onSubmit: values => {
      setLoading(true);
  
      submitForm(values);
    }
  });

  const submitForm = values => {
    const auth = getAuth(db.app);
   
    signInWithEmailAndPassword(auth, values.email, values.password)
        .then(userCredential => {
          showToastSucces("Welcome back !!")
      
        navigate("/dashboard");
      })
      .catch(error => {
        setLoading(false);
        //show toast
showToastError("error in sign in")
      });
  };

  return (
    <div className="container">
      <div className="signin_wrapper" style={{ margin: "100px" }}>
        <form onSubmit={formik.handleSubmit}>
          <h2>Please Login</h2>
          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email
            ? <div className="error_label">
                {formik.errors.email}
              </div>
            : null}
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password
            ? <div className="error_label">
                {formik.errors.password}
              </div>
            : null}
          {loading
            ? <CircularProgress color="secondary" className="progress" />
            : <button type="submit">Log in</button>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
