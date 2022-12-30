import React, { useState } from 'react'
import styles from "./header.module.scss"
// import images
import Logo from "../Assets/svg/logo.svg"
import Search from "../Assets/svg/search.svg" 
import Toast from '../Assets/svg/toast.svg'
import Profile from '../Assets/user.png'
import Down from '../Assets/svg/arr-down.svg'

interface Props {
  open?:any
  // any props that come into the component
}

const Header = ({open}:Props) => {
  const [active, setActive] = useState(false)
  const onClick = () => { 
    open()
    setActive(!active)
  }
  return (
    <nav className={styles.nav}>
        <div className={styles.nav__image}>
        <div className={styles.toggle} onClick={onClick}>
            <div></div>
            <div></div>
          </div>
        <img src={Logo} alt="" />
        </div>
        <div className={styles.nav__main}>
        <div className={styles.nav__input}>
            <input type="text" placeholder='Search for anything' />
            <div className={styles.nav__input__search}>
                <img src={Search} alt="" />
            </div>
        </div>
        <div className={styles.nav__menu}>
            <p>Docs</p>
            <img src={Toast} alt="" />
            <span>
                <img className={styles.profile} src={Profile} alt="" />
                Adedeji
                <img src={Down} alt="" />
            </span>
        </div>
        </div>
    </nav>
  )
}

export default Header