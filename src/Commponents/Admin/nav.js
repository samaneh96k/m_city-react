import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem } from '@mui/material';

import {handleLogout} from '../Utils/tools'
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
    const navigate = useNavigate();
    const links = [
        {
            title: "Matches",
            linkTo:"/admin_matches"
        },
        {
            title: "Players",
            linkTo:"/admin_Players"
        },
    ]
    const renderItems = () => (
        links.map(link => 
            (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button className='admin_nav_link'>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )
  return (
      <div>
          {renderItems()}
          <ListItem button className='admin_nav_link' onClick={()=>handleLogout(navigate)}>
              Log Out
          </ListItem>
      </div>
  )
}

export default AdminNav