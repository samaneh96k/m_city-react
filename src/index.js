import React from 'react';
import ReactDOM from 'react-dom/client';
import './Resources/css/app.css'
import App from './App';
import { db } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(db.app);
const root = ReactDOM.createRoot(document.getElementById('root'));
onAuthStateChanged(auth, (user) => {
  
root.render(

  <App user={user} />
 
);
})

