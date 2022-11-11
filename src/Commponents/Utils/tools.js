import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../Resources/images/logos/manchester_city_logo.png';
import { getAuth, signOut } from 'firebase/auth';
import {FormHelperText} from '@mui/material'
export const CityLogo = (props) => {
    const template =
        <div className='img_cover'
        style={{ width: props.width ,height:props.height,background:`url(${logo})`}}>
        
        </div>
    if (props.link) {
        return (
            <Link className='link_logo' to={props.linkTo}>{ template}</Link>
        )
    } else {
        return template;
    }
};
export const showToastError = (msg) => {
    toast.error(msg, {
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
    })
}
export const showToastSucces = (msg) => {
    toast.success(msg, {
        position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
    })
}


export const handleLogout = (navigate) => {
  
    const auth = getAuth();
    signOut(auth).then(() => {
          showToastSucces("Good Bye!!")
          navigate('/');
     }).catch((error) => {
          showToastError(error)
    });
}
export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck ? props.bck : '#fff',
            fontSize: props.size ? props.size : '15px',
            color: props.color ? props.color : '#000',
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
           ...props.add
    }}>
          {props.children}
    </div>
    if (props.link) {
        return (
            <Link className='link_logo' to={props.link}>
                {template}
            </Link>
        )
    } else {
        return template
    }
}
export const textErrorHelper = (formik,values) =>( {
    error:formik.errors[values]&&formik.touched[values]
,    helperText:formik.errors[values]&&formik.touched[values]?formik.errors[values]:null
})
export const selectErrorHelper = (formik,values) => {
    if (formik.errors[values]&&formik.touched[values]) {
        return (
            <FormHelperText>{ formik.errors[values]}</FormHelperText>
         )
    } 
    return false;
}
export const selectIsError = (formik,values) => {
    return formik.errors[values] && formik.touched[values];  
  }