import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {  CityLogo} from '../Utils/tools';

import { handleLogout } from '../Utils/tools';

const Header = ({ user }) => {
   
   
  return (
      <AppBar
          position='fixed'
          style={{
              backgroundColor: "#98c5e9",
              boxShadow: "none",
              padding: '10px 0',
              borderBottom:'2px solid #00285e'
      }}>
          <Toolbar style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>
                  <div className='header_logo'>
                      <CityLogo
                          link={true}
                          linkTo={'/'} width="70px" height="70px"/>
                  </div>
              </div>
              <Link to="/team">
                  <Button color='inherit'>The Team</Button>
              </Link>
              <Link to="/matches">
                  <Button color='inherit'>Matches</Button>
              </Link>
              {user ?
                  <>
                  <Link to="/dashboard">
                  <Button color='inherit'>Dashboard</Button>
                  </Link>
                 
                      <Button color='inherit' onClick={() => {
                          handleLogout()
                  }}>Log Out</Button>
                  
                      </>
                  : <Link to="/sign_in">
                  <Button color='inherit'>Sign In</Button>
                  </Link>
                 
                     
                  }
             
          </Toolbar>
    </AppBar>
  )
}

export default Header