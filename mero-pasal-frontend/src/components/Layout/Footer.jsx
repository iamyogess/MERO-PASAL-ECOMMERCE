import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer bg-light'>
      <h1 className='text-center txt'>All Rights Reserved &copy; MERO PASAL</h1>
      <p className='text-center'>
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>
        |
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer