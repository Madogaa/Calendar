import React from 'react'
import NavBarSE from './NavBarSE'

function SiteEntry({ component }) {
  return (
    <div className=' w-screen h-screen'>
        <NavBarSE />
        { component }
    </div>
  )
}

export default SiteEntry