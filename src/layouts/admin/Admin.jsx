import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'

function Admin({children}) {
  return (
    <div c>
        <Sidebar></Sidebar>
        <div className='section container'>
        <div className='container grid'>
            {children}
        </div>
        </div>
    </div>
  )
}

export default Admin