import { motion } from 'framer-motion'
import React from 'react'
import styles from './Modals.module.scss'

interface Props {
  closeBlacklist?:any
  // any props that come into the component
}
const Blacklist = ({closeBlacklist}: Props) => {
  return (
    <section className={styles.modal}>
        <motion.div className={styles.modal__info} initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 200 }}>
            <nav>
                <p onClick={closeBlacklist}>X</p>
            </nav>
            OOPS!! YOU CANT BLACKLIST USER RIGHT NOW
        </motion.div>
    </section>
  )
}

export default Blacklist