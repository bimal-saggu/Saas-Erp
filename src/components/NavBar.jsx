import React from 'react'
import '../index.css'
import notification from '../assets/notification.svg'
import avatar from '../assets/avatar.png'

const NavBar = () => {
  return (
        <div className='nav'>
            <div className='user_Sec'>
                <img src={notification} alt="Notification" />
                <img src={avatar} alt="Avatar" />
            </div>
        </div>
  )
}

export default NavBar