import React from 'react'
import { Link } from 'react-router-dom'
import styles from './404.module.scss'

const Error = () => {
  return (
    <div className={styles.blob__container}>
      <div className={styles.blob__content}>
      <div className={styles.blob}></div>
      <p>Page is unavailable. please go back to <Link to='/users'>Users</Link></p>
      </div>
      
    </div>
  )
}

export default Error