import React, { useState } from "react"
import styles from "./Dashboard.module.scss"
import { AnimatePresence, motion } from "framer-motion"
import Arrow from "../../Assets/svg/down.svg"
const Filter = () => {
  const [org, setOrg] = useState<boolean>(false);
  const [orgText, setOrgText] = useState<string>();
  const [stat, setStat] = useState<boolean>(false);
  const [statText, setStatText] = useState<string>();
  const options: {
    title: string;
  }[] = [
    {
      title: "James",
    },
    {
      title: "Niles",
    },
  ];
  type Filter = {
    email?: string;
    username?: string;
    date?: string;
    phone?: number;
  };
  const [filter, setFilter] = useState<object>({
    email: "",
    username: "",
    date: "",
    phone: "",
  });
  const { email, username, date, phone }: Filter = filter;
  const onChange = (e: any) => {
    const value = e.target.value;
    setFilter({ ...filter, [e.target.name]: value });
  };
  return (
    <motion.section
      className={styles.dash__filter}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 550 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, height: 0 }}
    >
      <form action="">
        <label htmlFor="organization">Organization</label>
        <div className={styles.input}>
          <div
            className={styles.top}
            onClick={() => {
              setOrg(!org);
            }}
          >
            <input
              type="text"
              placeholder="Select"
              value={orgText}
              name="organization"
              readOnly
            />
            <img src={Arrow} alt="" />
          </div>
          <AnimatePresence>
            {org && (
              <motion.div
                className={styles.bottom}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 50 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, height: 0 }}
              >
                {options.map((item: any, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setOrgText(item.title);
                      setOrg(!org);
                    }}
                  >
                    {item.title}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="User"
          value={username}
          name="username"
          onChange={onChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          id=""
          onChange={onChange}
        />

        <label htmlFor="date">Date</label>
        <input
          type="text"
          placeholder="Date"
          name="date"
          value={date}
          id=""
          className={styles.date}
          onChange={onChange}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          value={phone}
          placeholder="Phone Number"
          name="phone"
          id=""
          onChange={onChange}
        />

        <label htmlFor="status">Status</label>
        <div className={styles.input}>
          <div
            className={styles.top}
            onClick={() => {
              setStat(!stat);
            }}
          >
            <input
              type="text"
              placeholder="Select"
              value={statText}
              name="status"
              readOnly
            />
            <img src={Arrow} alt="" />
          </div>
          <AnimatePresence>
            {stat && (
              <motion.div
                className={styles.bottom}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 50 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, height: 0 }}
              >
                {options.map((item: any, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setStatText(item.title);
                      setStat(!stat);
                    }}
                  >
                    {item.title}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
      <div className={styles.btn}>
        <button>Reset</button>
        <button className={styles.filter}>Filter</button>
      </div>
    </motion.section>
  );
};

export default Filter;
