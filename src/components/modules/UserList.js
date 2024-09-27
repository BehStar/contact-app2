import React, { useState, useEffect, useRef } from "react";
import styles from "./UserList.module.css";
import { useUsers } from "../contexts/UsersContext.js";
import { useUser } from "../contexts/UserContext.js";
import { useShowFullInfo } from "../contexts/ShowFullInfoContext.js";
import { useShowModal } from "../contexts/ShowModalContext.js";
import { useSearch } from "../contexts/SearchContext.js";
import { useRefSearch } from "../contexts/RefSearchContext";
import { useShowAlert } from "../contexts/ShowAlertContext.js";
import Modal from "./Modal.js";
import { MdOutlineMore } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const UserList = () => {
  const users = useUsers();
  const { setUser } = useUser();
  const { setIsShowFullInfo } = useShowFullInfo();
  const { isShowModal, setIsShowModal, setMessageModal, setStatus } =
    useShowModal();
  const { search } = useSearch();
  const [selectionGroup, setSelectionGroup] = useState([]);
  const [isSelection, setIsSelection] = useState(false);

  const userListRef = useRef(null);
  const { userListRef: refFromContext } = useRefSearch();
  const { setIsShowAlert, setMessageAlert } = useShowAlert();

  useEffect(() => {
    refFromContext.current = userListRef.current;
  }, [userListRef]);

  const calculateTransform = (index) => {
    const totalUsers = users.length;
    const translateZValue = (totalUsers - index) * -20;
    const translateYValue = (totalUsers - index) * 30;

    return `translateZ(${translateZValue}px) translateY(${translateYValue}px)`;
  };

  const calculateBlur = (index) => {
    const totalUsers = users.length;
    const blurValue = Math.max(0, (totalUsers - index - 1) * 0.5);

    return `blur(${blurValue}px)`;
  };

  const showMoreHandler = (user) => {
    setUser(user);
    setIsShowFullInfo(true);
  };

  // clear all Handler
  const ClearAllHandler = () => {
    setIsShowModal(true);
    setMessageModal(`Are you sure you want to remove all users?`);
    setStatus("clear-all");
  };
  const deleteSomeUsers = () => {
    if (selectionGroup.length > 0) {
      setIsShowModal(true);
      setMessageModal(
        `Are you sure you want to delete ${selectionGroup.length} users?`
      );
      setStatus("remove-some-users");
    } else {
      setIsShowAlert(true);
      setMessageAlert("please select some users");
    }
  };
  const cancelRemoveHandler = () => {
    setIsSelection(false);
    setSelectionGroup([]);
  };
  return (
    <div className={styles.list} ref={userListRef}>
      <Modal
        selectionGroup={selectionGroup}
        setSelectionGroup={setSelectionGroup}
        setIsSelection={setIsSelection}
      />
      <ul
        className={`${isShowModal ? styles.hiddenWrapper : styles.showWrapper}`}
      >
        <div className={styles.btns}>
          <button onClick={ClearAllHandler}>Clear All</button>
          {isSelection ? (
            <div className={styles.removeBtns}>
              <button onClick={deleteSomeUsers}>
                <FaRegTrashAlt />
              </button>
              <button onClick={() => cancelRemoveHandler()}>X</button>
            </div>
          ) : (
            <button onClick={() => setIsSelection(true)}>Remove Some</button>
          )}
        </div>
        {users
          .filter(
            (user) =>
              user.email.includes(search) ||
              user.firstName.includes(search) ||
              user.lastName.includes(search)
          )
          .map((user, index) => (
            <li
              key={user.id}
              style={{
                transform: calculateTransform(index),
                filter: calculateBlur(index),
              }}
            >
              <img src={`/images/${user.icon}.jpg`} alt="user image" />
              <div className={styles.content}>
                <h3>{user.firstName} {user?.lastName}</h3>
                <p>{user.email}</p>
              </div>
              <div className={styles.btnsGroup}>
                <button onClick={() => showMoreHandler(user)}>
                  <MdOutlineMore />
                </button>
                {isSelection && (
                  <DeleteUserList
                    user={user}
                    setSelectionGroup={setSelectionGroup}
                    selectionGroup={selectionGroup}
                  />
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;

const DeleteUserList = ({ user, setSelectionGroup, selectionGroup }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setSelectionGroup((prevSelection) => [...prevSelection, user.id]);
    } else {
      setSelectionGroup((prevSelection) =>
        prevSelection.filter((id) => id !== user.id)
      );
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        name="del"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
