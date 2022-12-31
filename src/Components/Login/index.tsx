import React, { useEffect, useState } from 'react'
import styles from './Login.module.scss'
// import images
import Logo from '../../Assets/svg/logo.svg'
// import Pablo from '../../Assets/pablo2.svg'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const getIn = React.useRef() as React.MutableRefObject<HTMLAnchorElement>;
    useEffect(() => {
        if (window.sessionStorage.getItem('user') === 'authenticated') {
            navigate('/users')
          }
    })
    const navigate = useNavigate()
    type User = {
        email?: string;
        password?: string
    }
    const [active, setActive] = useState<boolean>(false)
    const [user, setUser] = useState<object>({
        email: '',
        password: ''
    })
    const {email, password}: User = user;
    const onChange = (e: any) => {
        const value = e.target.value
        setUser({...user, [e.target.name]: value})
    }
    const onSubmit = (e: any) => {
        e.preventDefault()
        setUser({
            email: '',
            password: ''
    })
    window.sessionStorage.setItem('user', 'authenticated')
    getIn?.current?.click()
    navigate('/users')
    }
  return (
    <section className={styles.login}>
        <div className={styles.login__logo}>
            <img className={styles.logo} src={Logo} alt="" />
            <div>
              <img className={styles.pablo} width="600" height="338" src="https://res.cloudinary.com/dx9pt4ggx/image/upload/v1672442211/Lendsqr/pablo-sign-in_1_1_ipeaal.png" alt="" />
            </div>
            
        </div>

        <div className={styles.login__details}>
            <div className={styles.login__details__intro}>
            <h4>Welcome!</h4>
            <p>Enter details to login.</p>
            </div>
            <form action="" onSubmit={onSubmit}>
                <input type="email" placeholder='Email' value={email} name="email" onChange={onChange} required/>
                <div className={styles.pass}>
                <input type={active ? 'text' : 'password' } placeholder='Password' value={password} name="password" id="" onChange={onChange} required/>
                <span onClick={() => {setActive(!active)}}>SHOW</span>
                </div>
                <p>Forgot PASSWORD?</p>
                <a ref={getIn } href="/users" style={{display: "none"}}></a>
                <button type='submit'>LOG IN</button>
            </form>
        </div>
    </section>
  )
}

export default Login