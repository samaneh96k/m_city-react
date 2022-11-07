
import React from 'react'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Footer from './Commponents/Header-footer/footer';
import Home from './Commponents/Home';
import Header from './Commponents/Header-footer/header';
import SignIn from './Commponents/SignIn/index';
import Dashboard from './Commponents/Admin/dashboard';
import AuthGuard from './HOC/Auth';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';
import AdminPlayers from './Commponents/Admin/players/index';

const App = () => {
  const auth = getAuth(db.app);
         const user =auth.currentUser;
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path='/admin_players' exact element={user?<AdminPlayers/>:<Home />} />
        <Route path='/dashboard' exact element={user?<Dashboard/>:<Home />} />
        <Route path='/sign_in' exact element={user?<Dashboard/>:<SignIn />} />
        <Route path='/' exact element={<Home />} />
      </Routes>
      <ToastContainer />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
