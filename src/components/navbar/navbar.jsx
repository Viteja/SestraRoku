import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);

  const [scroll, setScroll] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 25) {
        setScroll(true);
        console.log("scroll");
      } else {
        setScroll(false);
      }
    });
  });

  function handleClickScroll(id) {
    navigate("/");
    setTimeout(() => {
      var element = document.getElementById(id);
      var headerOffset = 120;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 100);
  }

  return (
    <nav className={scroll ? "navbar" : "navbar navbar-scroll"}>
      <div className="container">
        <div className="navbar">
          <a onClick={() => handleClickScroll("home")}>
            <div className="logo">
              <img src="/images/logo_sestra.webp" alt="SestraRoku Logo" draggable="false" />
              <h1>
                Sestřička<span>Roku</span>
              </h1>
            </div>
          </a>
          <div className="menu">
            <ul className={isOpen ? "show" : "hide"}>
              <li>
                <a onClick={() => handleClickScroll("rules")} className="regular">
                  Pravidla
                </a>
              </li>
              <li>
                <a onClick={() => handleClickScroll("kategorie")} className="regular">
                  Kategorie
                </a>
              </li>
              <li>
                <a onClick={() => handleClickScroll("form-sec")} className="primary-btn">
                  Hlasování
                </a>
              </li>
            </ul>
          </div>
          {!isOpen ? <i className="fa-solid fa-bars nav-changer" onClick={() => setisOpen(true)}></i> : <i className="fa-solid fa-xmark nav-changer" onClick={() => setisOpen(false)}></i>}
        </div>
      </div>
    </nav>
  );
}
