import React from 'react'
import './index.scss'
import { Outlet } from 'react-router-dom'

function Layout () {
  return (
    <div className='layout'>
      <div className='layout-view'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Layout
