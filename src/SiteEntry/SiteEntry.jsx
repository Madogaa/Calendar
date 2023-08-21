import React from 'react'
import NavBarSE from './NavBarSE'

function SiteEntry({ component }) {
  return (
    <div className='w-screen h-screen'>
        <NavBarSE />
        <div className="flex">
          { component }
        </div>
    </div>
  )
}

export default SiteEntry