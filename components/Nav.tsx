import React, { useContext } from 'react'
import Link from 'next/link'
import { DataContext } from '../store/globalState'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Nav = () => {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state

  const isActive = (r: string) => {
    if (r === router.pathname) {
      return "active"
    } else {
      return ""
    }
  }

  const handleLogout = () => {
    Cookie.remove('refreshtoken', {
      path: 'api/auth/accessToken'
    })

    localStorage.removeItem('firstLogin')
    dispatch({
      type: "AUTH",
      payload: {}
    })

    dispatch({
      type: "NOTIFY",
      payload: {
        success: 'Logged out!'
      }
    })

    return router.push('/')
  }

  const adminRouter = () => {

  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={auth.user.avatar} alt={auth.user.avatar}
            style={{
              borderRadius: '50%', width: '30px', height: '30px',
              transform: 'translateY(-3px)', marginRight: '3px'
            }} /> {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <>
            <Link href="/profile">
              <a className="dropdown-item">Profile</a>
            </Link>
            {
              auth.user.role === 'admin' && adminRouter()
            }
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </>
        </div>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">SHOP</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        <ul className="navbar-nav p-1">
          <li className="nav-item position-relative">
            <Link href='/cart'>
              <a className={`nav-link ${isActive('/cart')}`}>
                <ShoppingCartIcon />
                <span className="position-absolute"
                  style={{
                    padding: '3px 6px',
                    background: '#ed143dc2',
                    borderRadius: '50%',
                    top: "0px",
                    right: "35px",
                    color: 'white',
                    width: '18px',
                    height: '18px',
                    paddingTop: "1.5px",
                    paddingLeft: '6px',
                    fontSize: '10px'
                  }}>
                  {cart.length}
                </span> Cart</a>
            </Link>
          </li>

          {
            Object.keys(auth).length === 0 ?
              <li className="nav-item active">
                <Link href="/signin">
                  <a className={`nav-link ${isActive('/signin')}`} href='#'>
                    <AccountCircleIcon /> Sign In
                  </a>
                </Link>
              </li> : loggedRouter()
          }
        </ul>
      </div>
    </nav >
  )
}

export default Nav