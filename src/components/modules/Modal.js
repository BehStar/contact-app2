import React from "react";

import { useUsersDipatch } from "../contexts/UsersContext";
import { useUser } from "../contexts/UserContext";
import { useShowAlert } from "../contexts/ShowAlertContext";
import { useShowModal } from "../contexts/ShowModalContext";
import styles from "./Modal.module.css";

const Modal = ({ selectionGroup, setSelectionGroup }) => {
  const { isShowModal, setIsShowModal, messageModal, status, setIsSelection } =
    useShowModal();
  const dispatch = useUsersDipatch();
  const { setIsShowAlert, setMessageAlert } = useShowAlert();
  const { user, setUser } = useUser();

  const deleteUser = (id) => {
    dispatch({ type: "remove-user", payload: { id } });
    setUser({});
    setIsShowModal(false);
    setIsShowAlert(true);
    setMessageAlert(`${user?.email} was deleted`);
  };
  const clearAllHandler = () => {
    dispatch({ type: "clear-users" });
    setIsShowModal(false);
    setIsShowAlert(true);
    setMessageAlert(`All Users was deleted`);
  };
  const removeSomeUsers = () => {
    dispatch({
      type: "remove-multiple-users",
      payload: { ids: selectionGroup },
    });
    setSelectionGroup([]);
    setIsShowModal(false);
    setIsShowAlert(true);
    setMessageAlert(`Some Users was deleted`);
    setIsSelection(false);
  };
  return (
    <div
      className={`${isShowModal ? styles.show : styles.hide} ${styles.wrapper}`}
    >
      <div
        className={`${isShowModal ? styles.showBox : styles.hiddenBox} ${
          styles.box
        }`}
      >
        <div
          className={`${isShowModal ? styles.showData : styles.hiddenData} ${
            styles.data
          }`}
        >
          <button
            onClick={() => setIsShowModal(false)}
            className={styles.close}
          >
            X
          </button>
          <h4>Remove User</h4>
          <p>{messageModal}?</p>
          <div className={`${styles.btnsGroup}`}>
            {status === "delete-user" && (
              <button onClick={() => deleteUser(user?.id)}>Delete User</button>
            )}
            {status === "clear-all" && (
              <button onClick={clearAllHandler}>Clear All Users</button>
            )}
            {status === "remove-some-users" && (
              <button onClick={() => removeSomeUsers()}>Remove Users</button>
            )}
            <button onClick={() => setIsShowModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
