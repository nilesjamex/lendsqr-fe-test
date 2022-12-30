import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'
import styles from './Modals.module.scss'
import PropTypes from 'prop-types';

interface Props {
  closeActivate?:any
  // any props that come into the component
}

const Activate = ({ closeActivate }: Props) => {

  onclick=(e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    closeActivate()
  }
  return (
    <section className={styles.modal}>
      <div>
        <motion.div className={styles.modal__info} initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.5 }} exit={{ opacity: 0, y: 200 }}>
            <nav>
                <p onClick={closeActivate}>X</p>
            </nav>
            OOPS!! YOU CAN&nbsp;T ACTIVATE USER RIGHT NOW
        </motion.div>
        </div>
    </section>
  )
}

export default Activate

// function closeActivate() {
//   throw new Error('Function not implemented.');
// }
