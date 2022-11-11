
import React from 'react'
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
import { getAuth } from 'firebase/auth';
import { db } from './firebase';
import AdminPlayers from './Commponents/Admin/players/index';
import AddEditPlayers from './Commponents/Admin/players/addEditPlayers';
import TheTeam from './Commponents/TheTeam/index';
import AddEditMatches from './Commponents/Admin/Matches/addEditMatches';
import AdminMatches from './Commponents/Admin/Matches/index';
import TheMatches from './Commponents/TheMatches';
import NotFound from './Commponents/NotFound/index';

const App = () => {
  const auth = getAuth(db.app);
         const user =auth.currentUser;
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
      <Route path='/admin_matches/edit_match/:matchid'  element={user?<AddEditMatches/>:<Home />} />
      <Route path='/admin_matches/add_match'  element={user?<AddEditMatches/>:<Home />} />
        <Route path='/admin_matches' element={user ? <AdminMatches /> : <Home />} />
        
        <Route path='/admin_players/edit_player/:playerid'  element={user?<AddEditPlayers/>:<Home />} />
        <Route path='/admin_players/add_player'  element={user?<AddEditPlayers/>:<Home />} />
        <Route path='/admin_players' exact element={user ? <AdminPlayers /> : <Home />} />
        
        <Route path='/dashboard' exact element={user?<Dashboard/>:<Home />} />
        <Route path='/team' exact element={<TheTeam/>} />
        <Route path='/matches' exact element={<TheMatches/>} />
        <Route path='/sign_in' exact element={user?<Dashboard/>:<SignIn />} />
        <Route path='/' exact element={<Home />} />
        <Route path='*'  element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
