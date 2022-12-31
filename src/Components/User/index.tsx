// import { useParams } from '@reach/router'
import React, { useEffect, useState } from 'react'
import styles from './User.module.scss'
import Back from '../../Assets/svg/back.svg'
import { Link, useNavigate } from 'react-router-dom'
import Activate from '../Modals/Activate'
import { AnimatePresence } from 'framer-motion'
import Blacklist from '../Modals/Blacklist'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const User = () => {
    const {Id} = useParams()
    const [data, setData] = useState<any>([])
    const [profile, setProfile] = useState<any>({})
    const [socials, setSocials] = useState<any>({})
    const [guarantor, setGuarantor] = useState<any>({})
    const [education, setEducation] = useState<any>({})

    const getData =  () => {
        axios.get(`https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${Id}`)
        .then((response) => {
           const user = response.data
          setData(user)
          setProfile(user.profile)         
          setSocials(user.socials)
          setGuarantor(user.guarantor)
          setEducation(user.education)
        })
   }
   const navigate = useNavigate()
   useEffect(() => {
    if (window.sessionStorage.getItem('user') !== 'authenticated') {
        navigate('/')
      }
       getData()
     }, [])
    const [active, setActive] = useState<number>(0)
    const [activate, setActivate] = useState<boolean>(false)
    const [blacklist, setBlacklist] = useState<boolean>(false)
    const closeActivate = () => {
        setActivate(false)
    }
    const closeBlacklist = () => {
        setBlacklist(false)
    }
    const options: {
        title: string
    }[] = [
        {
            title: 'General Details'
        },
        {
            title: 'Documents'
        },
        {
            title: 'Bank Details'
        },
        {
            title: 'Loans'
        },
        {
            title: 'Savings'
        },
        {
            title: 'App and System'
        }
    ]
    // text preloader
    const MyLoader = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
        <ContentLoader
        speed={2}
        width={170}
        height={14}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
          <rect x="0" y="72" rx="3" ry="3" width="3800" height="60" /> 
    {/* <rect x="0" y="88" rx="3" ry="3" width="1780" height="60" />  */}
        </ContentLoader>
      );

  return (
    <section className={styles.user}>
        <AnimatePresence>
        {activate && <Activate closeActivate={closeActivate} />}
        </AnimatePresence>
        <AnimatePresence>
        {blacklist && <Blacklist closeBlacklist={closeBlacklist} />}
        </AnimatePresence>
        <Link to={'/dashboard'}>
        <span className={styles.back}>
            <img src={Back} alt="" />
            Back to Users
        </span>
        </Link>
        <div className={styles.user__details}>
            <h3>User Details</h3>
            <div className={styles.btn}>
                <button className={styles.blacklist} onClick={() => {setBlacklist(true)}}>Blacklist User</button>
                <button className={styles.activate} onClick={() => {setActivate(true)}}>Activate User</button>
            </div>
        </div>
        <div className={styles.user__profile}>
            <div className={styles.user__profile__details}>
                <img width='100px' height='100px' src={profile.avatar} alt="avatar" />
                <div className={styles.info}>
                    {profile.firstName ? <div>
                        <h5>{profile.firstName} {profile.lastName}</h5>
                        <span>{data.accountNumber}</span>
                    </div> :  <MyLoader /> }
                    {profile.firstName ? <div>
                    <h5>User’s Tier</h5>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.98572 1.28751C7.85197 1.29314 7.73572 1.38126 7.69447 1.50876L6.18759 6.17996L1.28071 6.16996C1.14196 6.16996 1.01821 6.25934 0.975716 6.39121C0.932591 6.52371 0.980091 6.66809 1.09259 6.74996L5.06891 9.62676L3.54203 14.293C3.49891 14.4249 3.54578 14.5699 3.65828 14.6511C3.77016 14.733 3.92265 14.733 4.03454 14.6511L7.9995 11.758L11.9657 14.6511C12.0776 14.733 12.2301 14.733 12.342 14.6511C12.4545 14.5699 12.5014 14.4249 12.4582 14.293L10.9314 9.62676L14.9077 6.74996C15.0202 6.66809 15.0677 6.52371 15.0246 6.39121C14.9814 6.25933 14.8583 6.16996 14.7196 6.17059L9.81269 6.18059L8.30393 1.50939V1.50876C8.25956 1.37188 8.12957 1.28188 7.98581 1.28751L7.98572 1.28751Z" fill="#E9B200"/>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_5530_1562)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.98439 0.959992C7.85189 0.966867 7.73688 1.05437 7.69563 1.18062L6.08939 5.99998H0.945073V6.0006C0.806948 6.0006 0.684449 6.08935 0.641953 6.2206C0.598828 6.35185 0.645078 6.49561 0.755703 6.5781L4.93442 9.63379L3.32818 14.6213V14.6207C3.28506 14.7532 3.33256 14.8976 3.44506 14.9788C3.55756 15.0607 3.70943 15.0601 3.82131 14.9782L8.00003 11.9225L12.1788 14.9782C12.2906 15.0601 12.4425 15.0607 12.555 14.9788C12.6675 14.8976 12.715 14.7532 12.6719 14.6207L11.0656 9.63316L15.2444 6.57748V6.5781C15.355 6.49561 15.4012 6.35185 15.3581 6.2206C15.3156 6.08935 15.1931 6.0006 15.055 6.0006H9.91068L8.30444 1.18124V1.18062C8.26006 1.04374 8.1288 0.953112 7.98444 0.959992H7.98439ZM8.00001 2.29374L9.37564 6.41998V6.4206C9.41814 6.55185 9.54127 6.64122 9.68001 6.6406H14.0738L10.4987 9.255V9.25563C10.3875 9.33688 10.3406 9.48062 10.3831 9.61251L11.7587 13.8807L8.1893 11.2712H8.18867C8.07617 11.1887 7.92368 11.1887 7.81117 11.2712L4.24173 13.8807L5.61736 9.61251H5.61673C5.65923 9.48063 5.61236 9.33687 5.50111 9.25563L1.92607 6.64123H6.31983V6.6406C6.45858 6.64123 6.5817 6.55185 6.6242 6.4206L7.99983 2.29436L8.00001 2.29374Z" fill="#E9B200"/> </g>
                            <defs> <clipPath id="clip0_5530_1562"> <rect width="16" height="16" fill="white"/> </clipPath> </defs>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_5530_1562)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.98439 0.959992C7.85189 0.966867 7.73688 1.05437 7.69563 1.18062L6.08939 5.99998H0.945073V6.0006C0.806948 6.0006 0.684449 6.08935 0.641953 6.2206C0.598828 6.35185 0.645078 6.49561 0.755703 6.5781L4.93442 9.63379L3.32818 14.6213V14.6207C3.28506 14.7532 3.33256 14.8976 3.44506 14.9788C3.55756 15.0607 3.70943 15.0601 3.82131 14.9782L8.00003 11.9225L12.1788 14.9782C12.2906 15.0601 12.4425 15.0607 12.555 14.9788C12.6675 14.8976 12.715 14.7532 12.6719 14.6207L11.0656 9.63316L15.2444 6.57748V6.5781C15.355 6.49561 15.4012 6.35185 15.3581 6.2206C15.3156 6.08935 15.1931 6.0006 15.055 6.0006H9.91068L8.30444 1.18124V1.18062C8.26006 1.04374 8.1288 0.953112 7.98444 0.959992H7.98439ZM8.00001 2.29374L9.37564 6.41998V6.4206C9.41814 6.55185 9.54127 6.64122 9.68001 6.6406H14.0738L10.4987 9.255V9.25563C10.3875 9.33688 10.3406 9.48062 10.3831 9.61251L11.7587 13.8807L8.1893 11.2712H8.18867C8.07617 11.1887 7.92368 11.1887 7.81117 11.2712L4.24173 13.8807L5.61736 9.61251H5.61673C5.65923 9.48063 5.61236 9.33687 5.50111 9.25563L1.92607 6.64123H6.31983V6.6406C6.45858 6.64123 6.5817 6.55185 6.6242 6.4206L7.99983 2.29436L8.00001 2.29374Z" fill="#E9B200"/> </g>
                            <defs> <clipPath id="clip0_5530_1562"> <rect width="16" height="16" fill="white"/> </clipPath> </defs>
                        </svg>
                        </span>
                    </div> : <MyLoader /> }
                    <div>
                    {profile.firstName ?<h5>₦ {data.accountBalance}</h5>  : <MyLoader />}
                    {profile.firstName ? <span>{profile.bvn}/Providus Bank</span> : <MyLoader />}
                    </div>
                </div>
            </div>
            <div className={styles.user__profile__options}>
                {options.map((item, index) => (
                    <span key={index} className={active === index ? styles.active : ''} onClick={() => {setActive(index)}}>{item.title}</span>
                ))}
            </div>
        </div>
        <div className={styles.user__info}>
            <div className={styles.user__info__items}>
                <h4>Personal Information</h4>
                <div className={styles.item}>
                    <div>
                    <h3>full Name</h3>
                    {profile.firstName ? <p>{profile.firstName} {profile.lastName}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Phone Number</h3>
                    {profile.firstName ? <p>{profile.phoneNumber}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Email Address</h3>
                    {data.email ? <p>{data.email}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Bvn</h3>
                    {profile.firstName ? <p>{profile.bvn}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Gender</h3>
                    {profile.firstName ? <p>{profile.gender}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Marital status</h3>
                    {profile.firstName ? <p>Single</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Children</h3>
                    {profile.firstName ? <p>None</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Type of residence</h3>
                    {profile.firstName ? <p>Parent’s Apartment</p> : <MyLoader />}
                </div>
                </div>
            </div>
            <div className={`${styles.user__info__items} ${styles.user__info__items__education}`}>
                <h4>Education and Employment</h4>
                <div className={styles.item}>
                    <div>
                    <h3>level of education</h3>
                    {education.level ? <p>{education.level}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>employment status</h3>
                    {education.level ? <p>{education.employmentStatus}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>sector of employment</h3>
                    {education.level ? <p>{education.sector}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Duration of employment</h3>
                    {education.level ? <p>{education.duration}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>office email</h3>
                    {education.level ? <p>{education.officeEmail}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Monthly income</h3>
                    {education.level ? <p>₦{education.monthlyIncome}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>loan repayment</h3>
                    {education.level ? <p>₦{education.loanRepayment}</p> : <MyLoader />}
                </div>
                </div>
            </div>
            <div className={styles.user__info__items}>
                <h4>Socials</h4>
                <div className={styles.item}>
                    <div>
                    <h3>Twitter</h3>
                    {socials.twitter ? <p>{socials.twitter}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Facebook</h3>
                    {socials.twitter ? <p>{socials.facebook}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Instagram</h3>
                    {socials.twitter ? <p>{socials.instagram}</p> : <MyLoader />}
                </div>
                </div>
            </div>
            <div className={styles.user__info__items}>
                <h4>Guarantor</h4>
                <div className={styles.item}>
                    <div>
                    <h3>Full Name</h3>
                    {guarantor.firstName ? <p>{guarantor.firstName} {guarantor.lastName}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Phone Number</h3>
                    {guarantor.firstName ? <p>{guarantor.phoneNumber}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Email Address</h3>
                    {guarantor.firstName ? <p>debby@gmail.com</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Relationship</h3>
                    {guarantor.firstName ? <p>Sister</p> : <MyLoader />}
                </div>
                </div>
            </div>
            <div className={styles.user__info__items}>
                <h4>&nbsp;</h4>
                <div className={styles.item}>
                    <div>
                    <h3>Full Name</h3>
                    {guarantor.firstName ? <p>{guarantor.firstName} {guarantor.lastName}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Phone Number</h3>
                    {guarantor.firstName ? <p>{guarantor.phoneNumber}</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Email Address</h3>
                    {guarantor.firstName ? <p>debby@gmail.com</p> : <MyLoader />}
                </div>
                <div>
                    <h3>Relationship</h3>
                    {guarantor.firstName ? <p>Sister</p> : <MyLoader />}
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default User