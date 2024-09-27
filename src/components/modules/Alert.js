import React, {  useEffect } from 'react';
import styles from './Alert.module.css';

const Alert = ({ isShowAlert, setIsShowAlert, messageAlert, setMessageAlert }) => {

  useEffect(() => {
    let timeoutId; 
    if (isShowAlert) {
      timeoutId = setTimeout(() => {
        setIsShowAlert(false);
        setMessageAlert('');
      }, 5000);
    }
    return () => {
      if (timeoutId) { 
        clearTimeout(timeoutId); 
      }
    };
  }, [isShowAlert]); 

  return (
    <div className={`${styles.wrapper} ${isShowAlert ? styles.show : styles.hide}`}>
      <p>{messageAlert}</p> 
    </div>
  );
};

export default Alert;