import clsx from 'clsx'
import { Link } from 'react-router'
import styles from '../../../styles/root.module.css'
import React from 'react'

export default function Logout() {
  React.useEffect(() => {
    localStorage.removeItem('user')
  }, [])

  return (
    <div className="login-container">
      <div className="logout-box">
        <h4 className={clsx(styles.HeadingH4)}>Your're now logged out.</h4>
        <Link to={'/login'} type="button" className={clsx(styles.Button)}>
          To login-page
        </Link>
      </div>
    </div>
  )
}
