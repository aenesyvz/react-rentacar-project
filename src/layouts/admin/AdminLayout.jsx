import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import { useSelector } from 'react-redux';

function AdminLayout({ children }) {
  const { authItem } = useSelector((state) => state.auth);

  return (
    <>
    {
    <div className='admin-content'>
      <div className='admin-sidebar'>
        <Sidebar user={authItem[0].user.email}></Sidebar>
      </div>
      <div className='section'>
        <div className='container grid'>
          {children}
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default AdminLayout