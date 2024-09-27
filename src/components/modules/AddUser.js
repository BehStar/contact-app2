import React from "react";
import { useState, useEffect } from "react";

import { useUsersDipatch, useUsers } from "../contexts/UsersContext";
import { useUser } from "../contexts/UserContext";
import { useCreateAccount } from "../contexts/CreateAccountContext";
import { useEditUser } from "../contexts/EditUserContext.js";
import { useShowAlert } from "../contexts/ShowAlertContext.js";
import { useShowModal } from "../contexts/ShowModalContext.js";

import styles from "./AddUser.module.css";

import InputPart from "./InputPart";
import IconsUser from "./IconsUser";
import Alert from "./Alert.js";
const AddUser = () => {
  const dispatch = useUsersDipatch();
  const users = useUsers();
  const {  setUser } = useUser();
  const { isCreateAccount, setIsCreateAccount } = useCreateAccount();
  const { editUser } = useEditUser();
  const { isShowAlert, setIsShowAlert, messageAlert, setMessageAlert } =
    useShowAlert();

    const { isShowModal } = useShowModal();
  const [infoUser, setInfoUser] = useState({
    id: new Date().getTime(),
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    number: "",
    icon: 1,
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    phone: "",
  });

  // Set info User if editUser is exist
  useEffect(() => {
    if (!isCreateAccount && editUser.id) {
      setInfoUser({
        id: editUser.id,
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        occupation: editUser.occupation,
        phone: editUser.phone,
        icon: editUser.icon,
      });
      resetErrorMessages();
    } else {
      setInfoUser({
        id: new Date().getTime(),
        firstName: "",
        lastName: "",
        email: "",
        occupation: "",
        phone: "",
        icon: 1,
      });
    }
  }, [isCreateAccount, editUser]);

  // Submit Form Handler
  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (isCreateAccount) {
      const validationErrors = validateUserInfo(infoUser);

      if (Object.keys(validationErrors).length > 0) {
        setErrorMessages(validationErrors);
      } else {
        if (users.some((user) => user.email === infoUser.email)) {
          setIsShowAlert(true);
          setMessageAlert("Email is exist");
          return;
        }
        try {
          dispatch({ type: "add-user", payload: infoUser });
          resetInfoUser();
          resetErrorMessages();
          setIsShowAlert(true);
          setMessageAlert("Your registration has been completed successfully");
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
    } else {
      
        const validationErrors = validateUserInfo(infoUser);

        if (Object.keys(validationErrors).length > 0) {
          setErrorMessages(validationErrors);
        } else {
          dispatch({ type: "edit-user", payload: infoUser });
          setUser(infoUser);
          setIsShowAlert(true);
          setMessageAlert(
            "The desired user information has been edited successfully"
          );
          resetInfoUser();
          resetErrorMessages();
          setIsCreateAccount(true);
        }
    }
  };

  // Cancel Handler
  const cancelHandler = () => {
    resetInfoUser();
    resetErrorMessages();
    if (editUser) {
      setIsCreateAccount(true);
    }
  };

  // Validationn Info User
  function validateUserInfo(infoUser) {
    const newErrorMessages = { ...errorMessages };

    const validateField = (
      field,
      label,
      required = false,
      minLength = 3,
      regex = null
    ) => {
      if (required && !infoUser[field]) {
        newErrorMessages[field] = `${label} is required`;
      } else if (
        required &&
        infoUser[field] &&
        infoUser[field].length < minLength
      ) {
        newErrorMessages[
          field
        ] = `${label} must be at least ${minLength} characters`;
      } else if (regex && !regex.test(infoUser[field])) {
        if (
          field === "phone" &&
          typeof infoUser["phone"] === "string" && // بررسی کنید که آیا این یک رشته است
          infoUser["phone"].length > 1
        ) {
          newErrorMessages[field] = `${label} is invalid`;
        } else if (field === "email") {
          newErrorMessages[field] = `${label} is invalid`;
        } else {
          delete newErrorMessages[field];
        }
      } else {
        delete newErrorMessages[field];
      }
    };

    validateField("firstName", "First name", true);
    validateField("lastName", "Last name", true, 3);
    validateField("email", "Email", true, 6, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    validateField("occupation", "Occupation", false, 0);
    validateField("phone", "Phone number", false, 11, /^09[0-39]\d{8}$/);

    return newErrorMessages;
  }

  // reset info User
  const resetInfoUser = () => {
    setInfoUser({
      id: new Date().getTime(),
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      phone: "",
      icon: 1,
    });
  };

  // Reset error messages
  const resetErrorMessages = () => {
    setErrorMessages({
      firstName: "",
      lastName: "",
      email: "",
      occupation: "",
      phone: "",
    });
  };

  return (
    <div className={`${styles.wrapper}`}>
      <Alert
        isShowAlert={isShowAlert}
        setIsShowAlert={setIsShowAlert}
        messageAlert={messageAlert}
        setMessageAlert={setMessageAlert}
      />
      <div className={`${isShowModal ? styles.hiddenWrapper : styles.showWrapper} ${styles.formContainer}`}>
        <form
          className={`${
            isCreateAccount ? styles.toTopForm : styles.toBottomForm
          } ${styles.form}`}
          onSubmit={submitFormHandler}
        >
          <div className={styles.formInnerBox}>
            <h3>{isCreateAccount ? "Create Account" : "Edit Account"}</h3>
            <InputPart
              type="text"
              label="First Name:"
              value={infoUser.firstName}
              setInfoUser={setInfoUser}
              name="firstName"
              error={errorMessages.firstName}
            />
            <InputPart
              type="text"
              label="Last Name:"
              value={infoUser.lastName}
              setInfoUser={setInfoUser}
              name="lastName"
              error={errorMessages.lastName}
            />
            <InputPart
              type="text"
              label="Email:"
              value={infoUser.email}
              setInfoUser={setInfoUser}
              name="email"
              error={errorMessages.email}
            />
            <InputPart
              type="text"
              label="Occupation:"
              value={infoUser.occupation}
              setInfoUser={setInfoUser}
              name="occupation"
              error={errorMessages.occupation}
            />
            <InputPart
              type="text"
              label="Phone Number:"
              value={infoUser.phone}
              setInfoUser={setInfoUser}
              name="phone"
              error={errorMessages.phone}
            />

            <IconsUser
              setInfoUser={setInfoUser}
              iconSelected={editUser.icon || 1}
            />
            <div className={styles.btnsGroup}>
              <button type="submit">
                {isCreateAccount ? "Create Account" : "Edit"}
              </button>
              <button onClick={cancelHandler} type="button">
                Cancel
              </button>
            </div>
          </div>
        </form>

        <ToggleContainer
          isCreateAccount={isCreateAccount}
          setIsCreateAccount={setIsCreateAccount}
        />
      </div>
    </div>
  );
};

export default AddUser;

const ToggleContainer = ({ isCreateAccount, setIsCreateAccount }) => {
  const { editUser} = useEditUser();
  const toggleHandler = () => {
    setIsCreateAccount(!isCreateAccount);
    if (editUser.id && isCreateAccount) {
      setIsCreateAccount(false);
    } else {
      setIsCreateAccount(true);
    }
  };

  return (
    <div
      className={`${isCreateAccount ? styles.toLeft : ""} ${
        styles.toggleContainer
      }`}
    >
      <div
        className={`${
          isCreateAccount
            ? styles.toRightContainerBox
            : styles.toLeftContainerBox
        } ${styles.toggleBox}`}
      >
        <h4>{isCreateAccount ? "Hello, Friend!" : "Welcome Back!"}</h4>
        <p>
          {isCreateAccount ? "Edit" : "Register"} with your personal details
        </p>
        <div>
          {!isCreateAccount && (
            <button onClick={toggleHandler}>Create Account</button>
          )}
        </div>
      </div>
    </div>
  );
};
