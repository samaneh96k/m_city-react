import React from 'react'
import { useNavigate} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
const AuthGuard = ( Component ) => {
    console.log(Component)
     const navigate = useNavigate();
    class AuthHoc extends React.Component{

       authCheck = () => {
         const auth = getAuth(db.app);
         const user =auth.currentUser;
           console.log(user)
            if (user) {
                return (<Component {...this.props} />)
            } else {
                console.log("reeeeeeee")
              navigate("/");
               
            }
        }
        render() {
            return this.authCheck();
}
    }
    return AuthHoc;
   
  
}

export default AuthGuard