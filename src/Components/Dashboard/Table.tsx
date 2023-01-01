import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import Sort from './Filter'
import Filter from '../../Assets/svg/filter.svg'
import More from '../../Assets/svg/more.svg'
import Eyes from '../../Assets/svg/eyes.svg'
import Blacklist from '../../Assets/svg/blacklist.svg'
import Activate from '../../Assets/svg/activate.svg'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'


const Table = () => {
    const [data, setData] = useState<any>([])
    const [active, setActive] = useState<string>('')
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [postPerPage, setPostPerPage] = useState<number>(10)
    const [showNumber, setShowNumber] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const navigate = useNavigate()
    const page: {
        item: string
      }[] = [
        {
          item: '10'
        },
        {
          item: '25'
        },
        {
          item: '50'
        },
        {
          item: '75'
        },
        {
          item: '100'
        }
      ]

    const getData =  () => {
      setLoading(false)
         axios.get("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
         .then((response) => {
            const user = response.data
           setData(user)
           setLoading(true)
         })
    }
    useEffect(() => {
        getData()
      }, [])
    //   get current user
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
    // pagination
    const pageNumbers : number[] = [];
    const totalPosts = data.length;

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++ ) {
        pageNumbers.push(i);
    }
  return (
    <>
    <section className={styles.dash__table}>
        <table>
            <thead>
                <tr className={styles.dash__table__header} onClick={() => {setShowFilter(!showFilter)}}>
                    <td>
                        <div>
                    organization
                    <img src={Filter} alt="" /></div>
                    </td>
                    <td>
                    <div>
                    Username
                    <img src={Filter} alt="" /></div>
                    </td>
                    <td>
                    <div>
                    Email
                    <img src={Filter} alt="" /></div>
                    </td>
                    <td>
                    <div>
                    Phone number
                    <img src={Filter} alt="" /></div>
                    </td>
                    <td>
                    <div>
                    Date joined
                    <img src={Filter} alt="" /></div>
                    </td>
                    <td>
                    <div>
                    Status
                    <img src={Filter} alt="" />
                    </div>
                    </td>
                    <td></td>
                </tr>
                <AnimatePresence>
                {showFilter && <Sort />}
                </AnimatePresence>
            </thead>
            {loading ? currentPosts.map((item: any, index: React.Key | null | undefined) => (
               <tbody className={styles.dash__table__body} key={index}>
                <tr className={styles.dash__table__body__main}>
                    <td>{item.orgName}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.createdAt.slice(0, 10)}</td>
                    <td>
                        <span>Inactive</span>
                    </td>
                    <td onClick={() => {
                        if(item.id !== active) {
                            setActive(item.id)
                        } else {
                            setActive("")
                        }
                    }}>
                        <img src={More} alt="" />
                    </td>
                </tr>
                <AnimatePresence>
                {active === item.id &&
                <motion.div className={styles.dash__table__body__sub} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 120}} transition={{ duration: 0.5 }} exit={{ opacity: 0, height: 0 }}>
                  
                    <span onClick={() => {navigate(`/users/${item.id}`)}}>
                        <img src={Eyes} alt="" />
                        View Details
                    </span>
                    
                    <span>
                    <img src={Blacklist} alt="" />
                    Blacklist User
                    </span>
                    <span>
                    <img src={Activate} alt="" />
                    Activate User
                    </span>
                </motion.div>
               }
                </AnimatePresence>
            </tbody>
            )): 
            <tbody>
              <tr><td>
                <div className={styles.dots__container}>
                <div className={styles.dots}></div>
                </div>
                </td></tr>
            </tbody>
            }
        </table>
    </section>
    <div className={styles.dash__pagination}>
        <div className={styles.list}>
        Showing
        <span>
          <div className={styles.top} onClick={() => {setShowNumber(!showNumber)}}>
            {postPerPage}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0571 0.993783C10.8982 0.152691 12.1594 1.45644 11.3182 2.25487L6.56747 7.00563C6.23115 7.38407 5.6427 7.38407 5.30638 7.00563L0.639894 2.38129C-0.159085 1.5402 1.10255 0.279055 1.9431 1.1202L5.93688 5.11398L10.0571 0.993783Z" fill="#213F7D"/>
            </svg>
          </div>
          <AnimatePresence>
          {showNumber && <motion.div className={styles.bottom} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 130}} transition={{ duration: 0.5 }} exit={{ opacity: 0, height: 0 }}>
            {page.map((data, index) => (
              <p key={index} onClick={() => {setShowNumber(!showNumber); setPostPerPage(parseInt(data.item))}}>{data.item}</p>
            ))}
          </motion.div>}
          </AnimatePresence>
        </span>
        out of 100
        </div>
        <div className={styles.paginate}>
          <button onClick={() => {
          if(currentPage <= 10 && currentPage > 1) {
            setCurrentPage(currentPage - 1)
          }
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <g opacity="0.6">
            <path d="M10.0061 11.0573C10.8472 11.8984 9.54344 13.1595 8.745 12.3184L3.99424 7.56759C3.61581 7.23127 3.61581 6.64282 3.99424 6.3065L8.61858 1.64002C9.45967 0.841037 10.7208 2.10267 9.87967 2.94322L5.8859 6.937L10.0061 11.0573Z" fill="#213F7D"/></g>
          </svg>
          </button>
          <div className={styles.paginate__lists}>
            {pageNumbers.map((item) => (
            <p key={item} onClick={() => {
                setCurrentPage(item)
            }} className={item === currentPage ? styles.active : ''}>{item}</p>
        ))}
        </div>
        <button onClick={() => {
          if(currentPage >= 1 && currentPage <+ 10) {
            setCurrentPage(currentPage + 1)
          }
        }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.99391 2.94274C3.15281 2.10165 4.45656 0.840502 5.255 1.68165L10.0058 6.43241C10.3842 6.76873 10.3842 7.35718 10.0058 7.6935L5.38142 12.36C4.54033 13.159 3.27918 11.8973 4.12033 11.0568L8.1141 7.063L3.99391 2.94274Z" fill="#213F7D"/>
        </svg>

        </button>
        </div>
      </div>
    </>
  )
}

export default Table