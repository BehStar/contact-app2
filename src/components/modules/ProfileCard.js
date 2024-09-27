import React from "react";
import { useUser } from "../contexts/UserContext.js";
import { useCreateAccount } from "../contexts/CreateAccountContext.js";
import { useEditUser } from "../contexts/EditUserContext.js";
import { useShowFullInfo } from "../contexts/ShowFullInfoContext.js";
import { useShowAlert } from "../contexts/ShowAlertContext.js";
import { useShowModal } from "../contexts/ShowModalContext.js";
import Modal from "./Modal.js";
import Alert from "./Alert.js";
import styles from "./ProfileCard.module.css";
import { FaHandPointUp } from "react-icons/fa";

const ProfileCard = () => {
  const { isShowFullInfo, setIsShowFullInfo } = useShowFullInfo();
  const { user, setUser } = useUser();
  const { setIsCreateAccount } = useCreateAccount();
  const { setEditUser } = useEditUser();
  const { isShowAlert, setIsShowAlert, setMessageAlert } = useShowAlert();

  const { setIsShowModal ,setMessageModal,setStatus} = useShowModal();

  const editHandler = () => {
    if (user.id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // برای اسکرول روان (اختیاری)
      });
      setTimeout(() => {
        setIsCreateAccount(false);
        setEditUser(user);
      }, 500);
    } else {
      setIsShowAlert(true);
      setMessageAlert("Please select a user");
    }
  };

  // Delete  Handler
  const deleteHandler = () => {
    if (user && user.id) {
      setIsShowModal(true);
      setMessageModal(`Are you sure to want to delete ${user?.email}`);
      setStatus('delete-user');
    } else {
      setIsShowAlert(true);
      setMessageAlert("Please select a user");
    }
  };

  return (
    <div className={styles.wrapper}>
    <Modal
      user={user}
      setUser={setUser}
    />
      {isShowAlert && <Alert />}
      <div
        className={`${isShowFullInfo ? styles.profileSmallImg : ""} ${
          styles.profileImg
        }`}
      >
        <img
          src={
            user && user.icon
              ? `/images/${user.icon}.jpg`
              : "/images/no-one.jpg"
          }
          alt="icon-picture"
        />
      </div>

      <div
        className={`${isShowFullInfo ? styles.showFullScreen : ""} ${
          styles.info
        }`}
      >
        <div
          className={`${
            isShowFullInfo ? styles.moreShowInfo : styles.dontmoreShowInfo
          } ${styles.details}`}
        >
          <p>{user?.email}</p>
          <p>{user?.occupation}</p>
          <p>{user?.phone}</p>
          <div className={styles.btnsGroup}>
            <button onClick={editHandler}>Edit</button>
            <button onClick={() => deleteHandler(user?.id)}>Delete</button>
          </div>
        </div>
        <div className={styles.infoRow}>
          <p>
            {user?.firstName} {user?.lastName}
          </p>
          <button onClick={() => setIsShowFullInfo(!isShowFullInfo)}>
            <FaHandPointUp
              className={` ${isShowFullInfo ? styles.handDown : ""} ${
                styles.icon
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
