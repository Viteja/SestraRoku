import React, { useEffect, useState } from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  let navigate = useNavigate();
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
    <footer>
      <div className="container">
        <div className="row">
          <div className="pcelink">
            <h1>Provozovatelem těchto webových stránek je Pardubický kraj.</h1>
            <a className="primary-btn" href="https://www.pardubickykraj.cz/" target="_blank">
              Vstoupit na web
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="footer">
            <div className="footer-content">
              <div className="footer-main">
                <a onClick={() => handleClickScroll("home")}>
                  <div className="logo">
                    <img src="/images/logo_sestra.webp" alt="SestraRoku Logo" draggable="false" />
                    <h1>
                      Sestřička<span>Roku</span>
                    </h1>
                  </div>
                </a>

                <h2>
                  <span>Akce se koná pod osobní záštitou: </span> <br />
                  <a href="/zastita.pdf" target="_blank" className="zastita">
                    Ministra zdravotnictví České republiky prof. MUDr. Vlastimila Válka, CSc., MBA, EBIR
                  </a>
                  <br />
                  Náměstkyně hejtmana pro oblast zdravotnictví Ing. Michaely Matouškové, MPA, MHA
                </h2>
              </div>
              <div className="footer-minor">
                <div className="items">
                  <h1>Užitečné</h1>
                  <a onClick={() => handleClickScroll("rules")}>Pravidla</a>
                  <a onClick={() => handleClickScroll("kategorie")}>Kategorie</a>
                  <a onClick={() => handleClickScroll("tisk")}>Výsledky</a>
                </div>
                <div className="items">
                  <h1>Kontaktujte nás</h1>
                  <h2>sestraroku@pardubickykraj.cz</h2>
                  <h2>(+420) 466 026 259</h2>
                  <a href="https://www.facebook.com/profile.php?id=61557906042752&locale=cs_CZ" target="_blank">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="bottom">
            <div className="container">
              <div className="bottom-content">
                <div className="copyright">
                  <p>© 2024 SestraRoku</p>
                </div>
                <div className="author">
                  <div className="author-item">
                    <p>Vytvořil:</p>
                    <a href="/">DesignJJ</a>
                  </div>
                  <div className="author-item">
                    <p>Designoval:</p>
                    <a href="https://redesigner.cz/" target="_blank" aria-label="Redesigner">
                      <img src="/images/redesigner.svg" alt="Redesigner " />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
