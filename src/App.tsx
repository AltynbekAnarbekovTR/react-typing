import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { faker } from "@faker-js/faker";
import RestartButton from "./components/RestartButton";
import UserTypings from "./components/UserTypings";
import Results from "./components/Results";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

// const words = faker.random.words(10);

function App() {
  const [count, setCount] = useState(0);
  console.log("App");
  // const [words, setWords] = useState("");
  const {
    state,
    words,
    timePassed,
    typed,
    errors,
    restart,
    totalTyped,
    speed,
  } = useEngine();

  // useEffect(() => {
  //   const fetchWords = async () => {
  //     const response = await fetch(
  //       "https://baconipsum.com/api/?type=meat-and-filler&paras=1"
  //     );
  //     // if (response.ok) {
  //     const words = await response.json();
  //     console.log("bacon words: ", words);
  //     setWords(words[0]);
  //     // } else {
  //     // throw new Error("An error occurred while fetching data from the API.");
  //     // }
  //   };

  //   fetchWords();
  // }, []);

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PXL2SHM"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <div className="hint">
        <a
          className="reportDiv"
          href="/remove-ads/"
          data-user-signed-in=""
          style={{ display: "block" }}
          id="remove_ads_sidebar"
        >
          Remove ads
        </a>
      </div>
      <header className="centerBlue navigation">
        <div className="container">
          <div className="wrap-message-ads flex justify-end"></div>
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#menu"
                aria-expanded="false"
                aria-label="menu"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a
                className="navbar-brand logo "
                href="/"
                aria-label="logo"
                // alt="logo"
              >
                <span className="hidden">Ratatype's logo</span>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="menu">
              <ul className="nav navbar-nav">
                <li className="nav-item" id="tutorMenuItem">
                  <a href="#" data-toggle="modal" data-target="#modalSignup">
                    Typing Tutor
                  </a>
                </li>
                <li className="nav-item ">
                  <a data-course-lang="true" href="/typing-test/">
                    Typing Test
                  </a>
                </li>
                <li className="nav-item ">
                  <a href="/learn/">Learn</a>
                </li>
                <li className="nav-item ">
                  <a data-course-lang="true" href="/courses/ru/">
                    Courses
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="nav-login">
                  <a href="/login/">Log In</a>
                  <span>or</span>
                  <a className="btn btn-sign-up" href="/signup/">
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/* //Body */}
      <section className="main-center">
        <div className="centerBlue">
          <div className="container">
            <div id="container_mobile">
              <div className="mobile-dialog">
                <div className="add-bottom-md fs-24">
                  <span
                    // style=""
                    id="text-desktop"
                  >
                    Please, zoom out on the page (Ctrl with -)
                  </span>
                </div>
                <a href="/learn/" className="btn btn-default">
                  Learn Touch Typing
                </a>
              </div>
            </div>
            {/* <script id="useShiftLayout" type="text/x-jquery-tmpl"> */}
            <div className="dial">
              <div className="round icoW" data-r="true"></div>
              <i className="advice">{/* ${lp.useShift} */}Commented</i>
              <button
                className="submit"
                style={{ marginTop: "23px" }}
                id="layoutButton"
              >
                {/* ${lp.layout_continue} */}Commented
              </button>
            </div>
            {/* </script> */}
            {/* <script id="layoutDialog" type="text/x-jquery-tmpl"> */}
            <div className="dial">
              <div className="round icoW" data-r="true"></div>
              {/* <i className="advice">${lp.layout_text}</i> */}
              <button
                className="submit"
                style={{ marginTop: "23px" }}
                id="layoutButton"
              >
                {/* ${lp.layout_continue} */}Commented
              </button>
            </div>
            {/* </script> */}
            {/* <script id="oldBrowserDialog" type="text/x-jquery-tmpl"> */}
            <div className="dial">
              <h4 style={{ margin: "4px 0 20px" }}>
                {/* ${lp.change_browser.title} */}Commented
              </h4>
              <span style={{ padding: "0 20px" }}>
                {/* ${lp.change_browser.description} */}Commented
              </span>
              <div className="icon-container">
                <span className="browser-icon browser-icon-chrome">Chrome</span>
                <span className="browser-icon browser-icon-firefox">
                  Firefox
                </span>
                <span className="browser-icon browser-icon-safari">Safari</span>
              </div>
              <button className="submit" style={{ marginTop: "23px" }}>
                {/* ${lp.change_browser.button} */}Commented
              </button>
            </div>
            {/* </script> */}
            <div className="certificationAll">
              <div
                className="dial ads"
                style={{
                  position: "absolute",
                  zIndex: 10,
                  left: "86px",
                  top: "65px",
                }}
              >
                <div className="dropdown-gray-text pull-right add-right">
                  <div className="dropdown dropdown-course">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <img
                        src="/static/i/icons/keyboard_toggle.webp"
                        srcSet="/static/i/retina/icons/keyboard_toggle@2x.webp 2x"
                        width="20"
                        height="14"
                        alt="Keyboard toggle"
                      />
                      <span
                        className="dropdown-menu-selected-option"
                        data-key=""
                      >
                        русская раскладка
                      </span>
                      <span className="caret"></span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <a href="/typing-test/test/en/" rel="nofollow">
                          English layout
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/es/" rel="nofollow">
                          Distribución en español
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/fr/" rel="nofollow">
                          Disposition française
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/uk/" rel="nofollow">
                          Українська розкладка
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/en_az/" rel="nofollow">
                          English layout (azerty)
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/en_dv/" rel="nofollow">
                          English layout (dvorak)
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/en_sp/" rel="nofollow">
                          English (spelling mistakes)
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/it/" rel="nofollow">
                          Layout italiano
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/de/" rel="nofollow">
                          Layout deutsche
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/pt_BR/" rel="nofollow">
                          Layout em português (Brasil)
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/pl/" rel="nofollow">
                          Układ polski
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/uk_in/" rel="nofollow">
                          Доброго вечора, ми з України!
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/tr/" rel="nofollow">
                          Türkçe düzen
                        </a>
                      </li>
                      <li>
                        <a href="/typing-test/test/en_new/" rel="nofollow">
                          English for Beginners
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="round icoS" data-r="true"></div>
                <h1 className="advice">Please be prepared. Good luck!</h1>
                <button
                  id="startButton"
                  className="submit gr"
                  style={{ margin: "18px auto 0" }}
                >
                  start typing now
                </button>
                <div>
                  <div
                    id="div-gpt-ad-test_modal_window"
                    style={{
                      marginTop: "40px",
                      marginRight: "auto",
                      marginLeft: "auto",
                      maxWidth: "728px",
                      height: "90px",
                    }}
                    data-google-query-id="CKucufyqm_8CFYfZswodPQUEgQ"
                  >
                    <div
                      id="google_ads_iframe_/111393242/ratatype_adtelligent/typing_test_modal_window_0__container__"
                      style={{
                        border: "none",
                        display: "inline-block",
                        width: "728px",
                        height: "90px",
                      }}
                    >
                      <iframe
                        frameBorder="0"
                        src="https://933cd45bf73e40745abea9d79d189f4d.safeframe.googlesyndication.com/safeframe/1-0-40/html/container.html"
                        id="google_ads_iframe_/111393242/ratatype_adtelligent/typing_test_modal_window_0"
                        title="3rd party ad content"
                        name=""
                        scrolling="no"
                        marginWidth={0}
                        marginHeight={0}
                        width="728"
                        height="90"
                        data-is-safeframe="true"
                        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                        role="region"
                        aria-label="Advertisement"
                        tabIndex={0}
                        data-google-container-id="1"
                        style={{ border: "0", verticalAlign: "bottom" }}
                        data-load-complete="true"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              <div className="certificationBlock">
                <input
                  type="text"
                  className="certificate-input"
                  id="certificateInput"
                  autoComplete="off"
                />
                <div className="whitePart">
                  <div className="mainTxt">
                    <span className="wgreen">С</span>
                    <span className="wblack">т</span>
                    <span className="wblack">о</span>
                    <span className="wblack">у</span>
                    <span className="wblack">н</span>
                    <span className="wblack">х</span>
                    <span className="wblack">е</span>
                    <span className="wblack">н</span>
                    <span className="wblack">д</span>
                    <span className="wblack">ж</span>
                    <span className="wblack"> </span>
                    <span className="wblack">-</span>
                    <span className="wblack"> </span>
                    <span className="wblack">в</span>
                    <span className="wblack">о</span>
                    <span className="wblack">с</span>
                    <span className="wblack">ь</span>
                    <span className="wblack">м</span>
                    <span className="wblack">о</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">ч</span>
                    <span className="wblack">у</span>
                    <span className="wblack">д</span>
                    <span className="wblack">о</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">в</span>
                    <span className="wblack">е</span>
                    <span className="wblack">т</span>
                    <span className="wblack">а</span>
                    <span className="wblack">.</span>
                    <span className="wblack"> </span>
                    <span className="wblack">С</span>
                    <span className="wblack">т</span>
                    <span className="wblack">а</span>
                    <span className="wblack">р</span>
                    <span className="wblack">и</span>
                    <span className="wblack">н</span>
                    <span className="wblack">н</span>
                    <span className="wblack">а</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">к</span>
                    <span className="wblack">е</span>
                    <span className="wblack">л</span>
                    <span className="wblack">ь</span>
                    <span className="wblack">т</span>
                    <span className="wblack">с</span>
                    <span className="wblack">к</span>
                    <span className="wblack">а</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">л</span>
                    <span className="wblack">е</span>
                    <span className="wblack">г</span>
                    <span className="wblack">е</span>
                    <span className="wblack">н</span>
                    <span className="wblack">д</span>
                    <span className="wblack">а</span>
                    <span className="wblack"> </span>
                    <span className="wblack">г</span>
                    <span className="wblack">л</span>
                    <span className="wblack">а</span>
                    <span className="wblack">с</span>
                    <span className="wblack">и</span>
                    <span className="wblack">т</span>
                    <span className="wblack">,</span>
                    <span className="wblack"> </span>
                    <span className="wblack">ч</span>
                    <span className="wblack">т</span>
                    <span className="wblack">о</span>
                    <span className="wblack"> </span>
                    <span className="wblack">С</span>
                    <span className="wblack">т</span>
                    <span className="wblack">о</span>
                    <span className="wblack">у</span>
                    <span className="wblack">н</span>
                    <span className="wblack">х</span>
                    <span className="wblack">е</span>
                    <span className="wblack">н</span>
                    <span className="wblack">д</span>
                    <span className="wblack">ж</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">о</span>
                    <span className="wblack">з</span>
                    <span className="wblack">д</span>
                    <span className="wblack">а</span>
                    <span className="wblack">л</span>
                    <span className="wblack"> </span>
                    <span className="wblack">в</span>
                    <span className="wblack">о</span>
                    <span className="wblack">л</span>
                    <span className="wblack">ш</span>
                    <span className="wblack">е</span>
                    <span className="wblack">б</span>
                    <span className="wblack">н</span>
                    <span className="wblack">и</span>
                    <span className="wblack">к</span>
                    <span className="wblack"> </span>
                    <span className="wblack">М</span>
                    <span className="wblack">е</span>
                    <span className="wblack">р</span>
                    <span className="wblack">л</span>
                    <span className="wblack">и</span>
                    <span className="wblack">н</span>
                    <span className="wblack">.</span>
                    <span className="wblack"> </span>
                    <span className="wblack">С</span>
                    <span className="wblack">о</span>
                    <span className="wblack">о</span>
                    <span className="wblack">р</span>
                    <span className="wblack">у</span>
                    <span className="wblack">ж</span>
                    <span className="wblack">е</span>
                    <span className="wblack">н</span>
                    <span className="wblack">и</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">н</span>
                    <span className="wblack">е</span>
                    <span className="wblack">и</span>
                    <span className="wblack">з</span>
                    <span className="wblack">м</span>
                    <span className="wblack">е</span>
                    <span className="wblack">н</span>
                    <span className="wblack">н</span>
                    <span className="wblack">о</span>
                    <span className="wblack"> </span>
                    <span className="wblack">п</span>
                    <span className="wblack">р</span>
                    <span className="wblack">и</span>
                    <span className="wblack">в</span>
                    <span className="wblack">л</span>
                    <span className="wblack">е</span>
                    <span className="wblack">к</span>
                    <span className="wblack">а</span>
                    <span className="wblack">е</span>
                    <span className="wblack">т</span>
                    <span className="wblack"> </span>
                    <span className="wblack">к</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">е</span>
                    <span className="wblack">б</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">т</span>
                    <span className="wblack">у</span>
                    <span className="wblack">р</span>
                    <span className="wblack">и</span>
                    <span className="wblack">с</span>
                    <span className="wblack">т</span>
                    <span className="wblack">о</span>
                    <span className="wblack">в</span>
                    <span className="wblack">,</span>
                    <span className="wblack"> </span>
                    <span className="wblack">п</span>
                    <span className="wblack">о</span>
                    <span className="wblack">р</span>
                    <span className="wblack">а</span>
                    <span className="wblack">ж</span>
                    <span className="wblack">а</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">в</span>
                    <span className="wblack">о</span>
                    <span className="wblack">и</span>
                    <span className="wblack">м</span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">р</span>
                    <span className="wblack">а</span>
                    <span className="wblack">з</span>
                    <span className="wblack">м</span>
                    <span className="wblack">е</span>
                    <span className="wblack">р</span>
                    <span className="wblack">а</span>
                    <span className="wblack">м</span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">м</span>
                    <span className="wblack">о</span>
                    <span className="wblack">щ</span>
                    <span className="wblack">ь</span>
                    <span className="wblack">ю</span>
                    <span className="wblack">.</span>
                    <span className="wblack"> </span>
                    <span className="wblack">В</span>
                    <span className="wblack"> </span>
                    <span className="wblack">п</span>
                    <span className="wblack">а</span>
                    <span className="wblack">м</span>
                    <span className="wblack">я</span>
                    <span className="wblack">т</span>
                    <span className="wblack">ь</span>
                    <span className="wblack"> </span>
                    <span className="wblack">о</span>
                    <span className="wblack">б</span>
                    <span className="wblack"> </span>
                    <span className="wblack">э</span>
                    <span className="wblack">т</span>
                    <span className="wblack">о</span>
                    <span className="wblack">м</span>
                    <span className="wblack"> </span>
                    <span className="wblack">у</span>
                    <span className="wblack">д</span>
                    <span className="wblack">и</span>
                    <span className="wblack">в</span>
                    <span className="wblack">и</span>
                    <span className="wblack">т</span>
                    <span className="wblack">е</span>
                    <span className="wblack">л</span>
                    <span className="wblack">ь</span>
                    <span className="wblack">н</span>
                    <span className="wblack">о</span>
                    <span className="wblack">м</span>
                    <span className="wblack"> </span>
                    <span className="wblack">м</span>
                    <span className="wblack">е</span>
                    <span className="wblack">с</span>
                    <span className="wblack">т</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">м</span>
                    <span className="wblack">н</span>
                    <span className="wblack">о</span>
                    <span className="wblack">г</span>
                    <span className="wblack">и</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">п</span>
                    <span className="wblack">о</span>
                    <span className="wblack">с</span>
                    <span className="wblack">е</span>
                    <span className="wblack">т</span>
                    <span className="wblack">и</span>
                    <span className="wblack">т</span>
                    <span className="wblack">е</span>
                    <span className="wblack">л</span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">т</span>
                    <span className="wblack">р</span>
                    <span className="wblack">е</span>
                    <span className="wblack">м</span>
                    <span className="wblack">я</span>
                    <span className="wblack">т</span>
                    <span className="wblack">с</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">в</span>
                    <span className="wblack">з</span>
                    <span className="wblack">я</span>
                    <span className="wblack">т</span>
                    <span className="wblack">ь</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">о</span>
                    <span className="wblack">б</span>
                    <span className="wblack">о</span>
                    <span className="wblack">й</span>
                    <span className="wblack"> </span>
                    <span className="wblack">о</span>
                    <span className="wblack">б</span>
                    <span className="wblack">л</span>
                    <span className="wblack">о</span>
                    <span className="wblack">м</span>
                    <span className="wblack">о</span>
                    <span className="wblack">к</span>
                    <span className="wblack"> </span>
                    <span className="wblack">д</span>
                    <span className="wblack">р</span>
                    <span className="wblack">е</span>
                    <span className="wblack">в</span>
                    <span className="wblack">н</span>
                    <span className="wblack">е</span>
                    <span className="wblack">г</span>
                    <span className="wblack">о</span>
                    <span className="wblack"> </span>
                    <span className="wblack">к</span>
                    <span className="wblack">а</span>
                    <span className="wblack">м</span>
                    <span className="wblack">н</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">в</span>
                    <span className="wblack">о</span>
                    <span className="wblack">з</span>
                    <span className="wblack">в</span>
                    <span className="wblack">р</span>
                    <span className="wblack">а</span>
                    <span className="wblack">щ</span>
                    <span className="wblack">а</span>
                    <span className="wblack">ю</span>
                    <span className="wblack">т</span>
                    <span className="wblack">с</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">н</span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack"> </span>
                    <span className="wblack">ч</span>
                    <span className="wblack">е</span>
                    <span className="wblack">м</span>
                    <span className="wblack">,</span>
                    <span className="wblack"> </span>
                    <span className="wblack">к</span>
                    <span className="wblack">а</span>
                    <span className="wblack">м</span>
                    <span className="wblack">н</span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">С</span>
                    <span className="wblack">т</span>
                    <span className="wblack">о</span>
                    <span className="wblack">у</span>
                    <span className="wblack">н</span>
                    <span className="wblack">х</span>
                    <span className="wblack">е</span>
                    <span className="wblack">н</span>
                    <span className="wblack">д</span>
                    <span className="wblack">ж</span>
                    <span className="wblack">а</span>
                    <span className="wblack"> </span>
                    <span className="wblack">у</span>
                    <span className="wblack">д</span>
                    <span className="wblack">и</span>
                    <span className="wblack">в</span>
                    <span className="wblack">и</span>
                    <span className="wblack">т</span>
                    <span className="wblack">е</span>
                    <span className="wblack">л</span>
                    <span className="wblack">ь</span>
                    <span className="wblack">н</span>
                    <span className="wblack">о</span>
                    <span className="wblack"> </span>
                    <span className="wblack">п</span>
                    <span className="wblack">р</span>
                    <span className="wblack">о</span>
                    <span className="wblack">ч</span>
                    <span className="wblack">н</span>
                    <span className="wblack">ы</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">и</span>
                    <span className="wblack"> </span>
                    <span className="wblack">н</span>
                    <span className="wblack">е</span>
                    <span className="wblack"> </span>
                    <span className="wblack">п</span>
                    <span className="wblack">о</span>
                    <span className="wblack">д</span>
                    <span className="wblack">д</span>
                    <span className="wblack">а</span>
                    <span className="wblack">ю</span>
                    <span className="wblack">т</span>
                    <span className="wblack">с</span>
                    <span className="wblack">я</span>
                    <span className="wblack"> </span>
                    <span className="wblack">м</span>
                    <span className="wblack">о</span>
                    <span className="wblack">л</span>
                    <span className="wblack">о</span>
                    <span className="wblack">т</span>
                    <span className="wblack">к</span>
                    <span className="wblack">а</span>
                    <span className="wblack">м</span>
                    <span className="wblack"> </span>
                    <span className="wblack">л</span>
                    <span className="wblack">ю</span>
                    <span className="wblack">б</span>
                    <span className="wblack">и</span>
                    <span className="wblack">т</span>
                    <span className="wblack">е</span>
                    <span className="wblack">л</span>
                    <span className="wblack">е</span>
                    <span className="wblack">й</span>
                    <span className="wblack"> </span>
                    <span className="wblack">с</span>
                    <span className="wblack">т</span>
                    <span className="wblack">а</span>
                    <span className="wblack">р</span>
                    <span className="wblack">и</span>
                    <span className="wblack">н</span>
                    <span className="wblack">ы</span>
                    <span className="wblack">.</span>
                  </div>
                  <div className="mainStat">
                    <div className="speed" data-r="true">
                      speed
                    </div>
                    <div className="blue">
                      <span id="certificateSpeed">0</span> wpm
                    </div>
                    <div className="clear"></div>
                    <div className="accuracy" data-r="true">
                      Accuracy
                    </div>
                    <div className="blue">
                      <span id="certificateAccuracy">100</span>%
                    </div>
                    <div className="clear h-60"></div>
                    <a className="reload" href="/typing-test/test/ru/">
                      restart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="visible-lg typing-test-right"
              id="sideBannerWrapper"
            >
              <div
                id="div-gpt-ad-typing_test_right_banner"
                // style=""
                data-google-query-id="CKrMuv2qm_8CFcwPiAkdcWYJjw"
              >
                <iframe
                  src="//player.adtelligent.com/prebid/iframe.html?adid=95e9fd44805181a&amp;ref=https%3A%2F%2Fwww.ratatype.com"
                  sandbox="allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  id="adunit-div-gpt-ad-typing_test_right_banner"
                  data-hbmp-rid="9ac6937501c54c"
                  data-hbmp-adid="95e9fd44805181a"
                  style={{
                    border: "none",
                    padding: "0px",
                    margin: "0px auto",
                    overflow: "hidden",
                    display: "block",
                    width: "300px",
                    maxWidth: "300px",
                    height: "250px",
                  }}
                ></iframe>
              </div>
            </div>
            <div className="typing-test-footer">
              <div
                id="div-gpt-ad-typing_test_footer"
                // style=""
                data-google-query-id="CKvMuv2qm_8CFcwPiAkdcWYJjw"
              >
                <iframe
                  src="//player.adtelligent.com/prebid/iframe.html?adid=16483d2cb25982de2&amp;ref=https%3A%2F%2Fwww.ratatype.com"
                  sandbox="allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  id="adunit-div-gpt-ad-typing_test_footer"
                  data-hbmp-rid="16284c0f0c283af0e"
                  data-hbmp-adid="16483d2cb25982de2"
                  style={{
                    border: "none",
                    padding: "0px",
                    margin: "0px auto",
                    overflow: "hidden",
                    display: "block",
                    width: "728px",
                    maxWidth: "728px",
                    height: "90px",
                  }}
                ></iframe>
              </div>
            </div>
            <div className="clear" style={{ height: "200px" }}></div>
          </div>
        </div>
      </section>
      {/* <CountdownTimer timeLeft={timePassed} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTypings userInput={typed} words={words} />
      </WordsContainer>

      <Results
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        speed={speed}
      />
      <RestartButton onRestart={restart} /> */}
    </>
  );
}

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="generated-words">{words}</div>;
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="words-container">{children}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2>Time: {timeLeft}</h2>;
};

export default App;
