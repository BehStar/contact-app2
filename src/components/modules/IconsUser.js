import React from "react";
import { useState, useEffect } from "react";

import styles from "./IconsUser.module.css";

const IconsUser = ({ setInfoUser, iconSelected }) => {
  const images = [
    { id: 1, src: "/images/1.jpg", alt: "man-icon-1" },
    { id: 2, src: "/images/2.jpg", alt: "woman-icon-1" },
    { id: 3, src: "/images/3.jpg", alt: "man-icon-2" },
    { id: 4, src: "/images/4.jpg", alt: "woman-icon-2" },
  ];

  const [selectedIcon, setSelectedIcon] = useState(() => iconSelected);

  useEffect(() => {
    setSelectedIcon(() => iconSelected);
  }, [iconSelected]);

  return (
    <div className={styles.wrapperIcons}>
      <div>
        {images.map((image) => (
          <IconUser
            key={image.id}
            src={image.src}
            alt={image.alt}
            value={image.id}
            setInfoUser={setInfoUser}
            isSelected={selectedIcon === image.id}
            setSelectedIcon={setSelectedIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default IconsUser;

const IconUser = ({
  src,
  alt,
  value,
  setInfoUser,
  isSelected,
  setSelectedIcon,
}) => {
  const changeHandler = () => {
    setInfoUser((prev) => ({ ...prev, icon: value }));
    setSelectedIcon(value);
  };

  return (
    <label
      className={`${styles.iconWrapper} ${
        isSelected ? styles.selectedIcon : ""
      }`}
    >
      <input type="radio" name="icon" value={value} onChange={changeHandler} />
      <img src={src} alt={alt} />
    </label>
  );
};
