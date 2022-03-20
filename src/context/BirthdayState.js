import React, { useEffect, useReducer, useState } from "react";
import ImgContext from "./ImgContext";

function birthdayReducer(data, action) {
  switch (action.type) {
    case "delete":
      return data.filter((a) => a.id !== action.payload.id);
    case "addPerson":
      return [
        ...data,
        newData(
          action.payload.name,
          action.payload.preview,
          action.payload.birthday
        ),
      ];

    default:
      return data;
  }
}

function newData(name, img, birthday) {
  return {
    id: Date.now(),
    name: name,
    img: img,
    birthday: birthday,
  };
}

function BirthdayState({ children }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const [preview, setPreview] = useState("");
  const [birthday, setBirthday] = useState("");
  const [flag, setFlag] = useState(false);
  const [data, dispatch] = useReducer(birthdayReducer, [], () => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setPreview(null);
    }
  }, [img]);

  return (
    <ImgContext.Provider
      value={{
        data,
        flag,
        setFlag,
        dispatch,
        name,
        setName,
        img,
        setImg,
        birthday,
        setBirthday,
        preview,
        setPreview,
      }}
    >
      {children}
    </ImgContext.Provider>
  );
}

export default BirthdayState;
