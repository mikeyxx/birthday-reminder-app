import React, { useContext } from "react";
import ImgContext from "../context/ImgContext";

function BirthdayInput() {
  const {
    preview,
    setPreview,
    name,
    setName,
    setImg,
    birthday,
    setBirthday,
    dispatch,
  } = useContext(ImgContext);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({
      type: "addPerson",
      payload: { name: name, preview: preview, birthday: birthday },
    });

    setName("");
    setPreview(null);
    // setImg({});
    setBirthday("");
  }

  return (
    <>
      <form className="formData" onSubmit={handleSubmit}>
        <div className="btn"></div>
        <div className="inpfile">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="inpfile">
          <label>Upload a photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImg(file);
              } else {
                setImg(null);
              }
            }}
          />
        </div>
        <div className="inpfile">
          <label>Select date</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.currentTarget.value)}
          />
        </div>
        <button className="submitBtn" type="submit">
          Add
        </button>
      </form>
    </>
  );
}

export default BirthdayInput;
