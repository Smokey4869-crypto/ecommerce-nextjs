import React from 'react'
import Nav from './Nav'
import Meta from './Meta'
import Notification from './Notification'
import Modal from './Modal'

const Layout = ({ children }) => {
  return (
    <div className='container'>
      <Meta />
      <Nav />
      <Notification />
      <div>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout