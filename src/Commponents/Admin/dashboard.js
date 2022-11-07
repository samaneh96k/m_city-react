import React from 'react'
import AdminLayout from './../../HOC/AdminLayout';

const Dashboard = (props) => {
  return (
      <AdminLayout title="dashboard">
          <div className='user_dashboard'>
            <div>
                This is Your dashboard
            </div>
          </div>
   </AdminLayout>
    
  )
}

export default Dashboard