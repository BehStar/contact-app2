import React from "react";

import styles from "./Header.module.css";

import { IoSearch } from "react-icons/io5";
import { useSearch } from "../contexts/SearchContext";
import { useRefSearch } from "../contexts/RefSearchContext";

const Header = () => {
  const {search, setSearch} = useSearch();
  const { userListRef } = useRefSearch(); 

  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (userListRef.current) { 
      userListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          id="box"
          placeholder="Search User..."
          value={search}
          onChange={(e) => searchHandler(e)}
          className={styles.searchBox}
        />
        <IoSearch className={styles.searchIcon} />
      </div>
      <h2>Contact App</h2>
    </div>
  );
};

export default Header;
