import { useState } from "react";
import "./App.css";
import twitterLogo from "./icons/002-twitter.png";
import githubLogo from "./icons/003-github.png";
import linkedinLogo from "./icons/001-linkedin.png";
import { validateInput } from "./helper/helperfunctions";

function getDate(birthday) {
  const date = birthday.split("-");
  return date
}

function checkDatePalindrome(date) {
  const dateInAllFormat = getDateInAllFormat(date);
  for (let i = 0; i < dateInAllFormat.length; i++) {
    if (checkPalindrome(dateInAllFormat[i])) {
      return true;
    }
  }
  return false;
}

function getDateInAllFormat(date) {
  /**
   * ddmmyy
   * yymmdd
   * mmddyy
   * 
   */
  const day = date[2]
  const month = date[1]
  const year = date[0]
  return [
    `${day}${month}${year}`,
    `${year}${month}${day}`,
    `${month}${day}${year}`,
    `${day}${month}${year%100}`,
    `${year%100}${month}${day}`,
    `${month}${day}${year%100}`,
  ]
}

function checkPalindrome(str) {
  let i = 0,
    j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) return false;
    else {
      i++;
      j--;
    }
  }
  return true;
}

function getNearestPalindromeDate(date) {
  let difference = 1;
  let nextDate = getNextPrevDate(date, "next");
  let prevDate = getNextPrevDate(date, "prev");
  while (1) {
    if (checkDatePalindrome(nextDate)) {
      return [nextDate, difference];
    }
    if (checkDatePalindrome(prevDate)) {
      return [prevDate, difference];
    }
    nextDate = getNextPrevDate(nextDate, "next");
    prevDate = getNextPrevDate(prevDate, "prev");
    difference++;
  }
}

function getNextPrevDate(initialDate, stepper) {
  let date = {
    day: Number(initialDate[2]),
    month: Number(initialDate[1]),
    year: Number(initialDate[0]),
  };
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(date.year)) daysInMonth[2]++;

  if (stepper === "next") {
    if (date.day === daysInMonth[date.month]) {
      date.day = 1;
      if (date.month === 12) {
        date.month = 1;
        if (date.year === 99) date.year = 0;
        else date.year++;
      } else date.month++;
    } else date.day++;
  } else {
    if (date.day === 1) {
      if (date.month === 1) {
        date.month = 12;
        if (date.year === 0) {
          date.year = 99;
        } else date.year--;
      } else date.month--;
    } else date.day--;
  }
  date = {
    month: date.month < 10 ? `0${date.month}` : `${date.month}`,
    day: date.day < 10 ? `0${date.day}` : `${date.day}`,
    year: date.year < 10 ? `0${date.year}` : `${date.year}`,
  }
  return [date.year, date.month, date.day];
}

function isLeapYear(year) {
  if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
    return true;
  }
  return false;
}

function App() {
  const [birthday, setBirthday] = useState("");
  const [result, setResult] = useState("");

  function onBirthdayChangeHandler(e) {
    setBirthday(e.target.value);
  }

  function resetHandler(e) {
    setBirthday("");
    setResult("");
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if(!validateInput(birthday)) {
      setResult("Invalid Input");
      return;
    }
    const date = getDate(birthday);
    if (checkDatePalindrome(date)) {
      setResult("Yay its palindrome");
    } else {
      const [nearestPalindromeDate, difference] =
        getNearestPalindromeDate(date);
      setResult(
        `Its not palindrome. The nearest palindrome date is ${nearestPalindromeDate[2]}-${nearestPalindromeDate[1]}-${nearestPalindromeDate[0]}, you missed by ${difference} days`
      );
    }
    console.log(date);
  }

  return (
    <>
      <main>
        <h1>Palindrome Birthday!</h1>
        <form onSubmit={onSubmitHandler} onReset={resetHandler}>
          <div className="birthday">
            <label htmlFor="date">Birthday</label>
            <input
              value={birthday}
              onChange={onBirthdayChangeHandler}
              type="date"
              name="date"
              id="date"
            />
          </div>
          <div className="buttons">
            <button type="submit">Show</button>
            <button type="reset">Reset</button>
          </div>
        </form>
        {result && <h2>{result}</h2>}
      </main>
      <footer>
        <h6>
          created by <a href="https://wasimraja.me/portfolio">Wasim Raja</a>
        </h6>
        <ol>
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/wasim-raja-31857014b/"
              rel="noreferrer"
            >
              <img src={linkedinLogo} alt="linkedin logo" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://twitter.com/wasim7raja10"
              rel="noreferrer"
            >
              <img src={twitterLogo} alt="twitter logo" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/wasim7raja10"
              rel="noreferrer"
            >
              <img src={githubLogo} alt="github logo" />
            </a>
          </li>
        </ol>
      </footer>
    </>
  );
}

export default App;
