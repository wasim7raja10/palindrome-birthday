import { useState } from "react";
import "./App.css";
import twitterLogo from "./icons/002-twitter.png"
import githubLogo from "./icons/003-github.png"
import linkedinLogo from "./icons/001-linkedin.png"

function App() {
  const [birthday, setBirthday] = useState("");
  const [isPalindrome, setIsPalindrome ] = useState("");

  function onBirthdayChangeHandler(e) {
    setBirthday(e.target.value);
  }
  
  function resetHandler(e) {
    setBirthday("");
    setIsPalindrome("");
  }

  function onSubmitHandler() {
    // const date = birthday.split('-')
    // const palindromeDates = []
    // for(let i = 1; i <= 12; i++) {

    // }
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
        {isPalindrome && <h2>{isPalindrome }</h2>}
      </main>
      <footer>
        <h6>created by <a href="https://wasimraja.me/portfolio">Wasim Raja</a></h6>
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



/**
 * 221122
 * 
 * abc
 * acb
 * cba
 * bac
 * 
 */