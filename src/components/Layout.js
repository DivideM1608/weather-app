import { Outlet, Link } from "react-router-dom";
import React from 'react'

export default function Layout() {
  return (
    <div>
    {/* Đây là một comment trong JSX 
      <div className='page'>
      <div className="setting">
        <div className='setting-container-rows'>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className='setting-item'>Weather</div>
          </Link>
          <Link to='/city' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className='setting-item'>Cities</div>
          </Link>
        </div>
      </div>*/}
      <Outlet />
    </div>
  )
}
