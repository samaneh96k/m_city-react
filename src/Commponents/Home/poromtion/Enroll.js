import React,{useState} from 'react'
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showToastError, showToastSucces } from "../../Utils/tools"
import {datapromotions} from '../../../firebase'
import { addDoc, getDocs, query, where } from 'firebase/firestore/lite';
const Enroll = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email:Yup.string().email('Invalid email').required("The email is required")
    })
    
      ,
    onSubmit: (valuse,{resetForm}) => {
      setLoading(true);
      submitForm(valuse)
    }
  })
  const submitForm = async (values) => {
    try {
      console.log(values)
      const isOnTheList =await getDocs( query(datapromotions, where("email", "==", values.email)));
      console.log(isOnTheList)
      if (isOnTheList.docs.length >= 1) {
        showToastError("sorry you are on the list already")
        setLoading(false)
        return false;
      }
       addDoc(datapromotions, { email: values.email })
      formik.resetForm();
      setLoading(false);
  showToastSucces("Cogratulation!!")
    } catch (error) {
      showToastError(error)
    }
    

  }
  return (
    <Fade>
      <div className='enroll_wrapper'>
        
        <form onSubmit={formik.handleSubmit}>
          <div className='enroll_title'>
            Enter your email
          </div>
          <div className='enroll_input'>
            <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
              placeholder="Enter your email" />
            {formik.touched.email && formik.errors.email ?
              <div className='error_label'>{formik.errors.email}</div> : null}
            {
              loading ?
                <CircularProgress color='secondary' className='progress'/>
                :
                <button type='submit'>Enroll</button>
            }
            <div className='enroll_discl'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </div>
          </div>
      </form>
      </div>
    </Fade>
  )
}

export default Enroll