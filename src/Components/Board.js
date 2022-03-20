import React, { useContext } from "react";
import ImgContext from "../context/ImgContext";
import * as FaIcons from "react-icons/fa";
const Board = () => {
  const { data, dispatch } = useContext(ImgContext);

  function TodayBirthdays() {
    return (
      <>
        <ul>
          {now.map((person, index) => {
            const { img, name, birthday, id } = person;

            return (
              <li key={index}>
                <div className="grid">
                  <img src={img} alt={name} />
                  <div className="title">
                    <h3 className="name">{name}</h3>
                    <p className="age">{personAge(birthday)} years</p>
                  </div>
                  <FaIcons.FaTimes
                    className="icons"
                    onClick={() =>
                      dispatch({ type: "delete", payload: { id: id } })
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  let now = Today(data);

  let val = upcoming(data);

  const UpcomingBirthdayColor = true;

  function UpcomingBirthdays() {
    return (
      <>
        <ul>
          {val.map((person, index) => {
            const { img, name, birthday, id } = person;

            const future = UpcomingBirthdayColor
              ? { backgroundColor: "#ffe66d" }
              : {};

            return (
              <li key={index}>
                <div className="grid" style={future}>
                  <img src={img} alt={name} />
                  <div className="title">
                    <h3 className="name">{name}</h3>
                    <p className="age">{personAge(birthday)} years</p>
                  </div>
                  <FaIcons.FaTimes
                    className="icons"
                    onClick={() =>
                      dispatch({ type: "delete", payload: { id: id } })
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  const num = Today(data).length;
  const numOfBirthday = num === 1 ? "birthday today" : "birthdays today";
  return (
    <main className="wrap">
      <div className="board">
        <h2 className="tag">
          {num} {numOfBirthday}
        </h2>
        <TodayBirthdays />
        <h2 className="tag">upcoming</h2>
        <UpcomingBirthdays />
      </div>
    </main>
  );
};

export default Board;

function Today(person) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();

  let filter = person.filter((data) => {
    const personDay = new Date(data.birthday).getDate();
    const personMonth = new Date(data.birthday).getMonth();

    return currentDay === personDay && currentMonth === personMonth;
  });

  return filter;
}

// Upcoming birthdays

function upcoming(person) {
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  let filter = person.filter((data) => {
    const month = new Date(data.birthday).getMonth();
    const day = new Date(data.birthday).getDate();

    if (day === currentDay) {
      return;
    } else {
      return month <= currentMonth || month >= currentMonth;
    }
  });

  return filter;
}

function personAge(value) {
  let currentYear = new Date().getFullYear();
  let birthYear = new Date(value).getFullYear();
  let age = currentYear - birthYear;
  return age;
}
