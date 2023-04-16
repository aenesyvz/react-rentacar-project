import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'

function AdminLayout({ children }) {
  return (
    <div className='admin-content'>
      <div className='admin-sidebar'>
        <Sidebar></Sidebar>
      </div>
      <div className='section'>
        <div className='container grid'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout