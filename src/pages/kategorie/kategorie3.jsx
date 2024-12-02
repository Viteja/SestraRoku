import React, { useState } from "react";
import "./kategorie.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { HashLink } from "react-router-hash-link";
import { Helmet } from "react-helmet";

export default function Kategorie3() {
  return (
    <>
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sestra Pardubického kraje | Čestné ocenění za celoživotní práci</title>
        <link rel="canonical" href="https://sestra.pardubickykraj.cz//cestne-oceneni-za-celozivotni-praci" />
      </Helmet>
      <div className="kategorie-page">
        <div className="kat-content">
          <div className="title">
            <h2>Kategorie</h2>
            <h1>Čestné ocenění za celoživotní práci</h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="kat-text">
              <div className="kat-title">
                <img src="/images/icon1.webp" alt="SestraRoku Icon" draggable="false" />
                <h1>Koho lze nominovat?</h1>
              </div>
              <p>Držitele této ceny vybírá odborná porota. Cíl je ocenit její/jeho celoživotní práci, jež představuje významný kvalitní přínos v oboru a rozvoji zdravotnictví.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="kategorie-wraper" id="kategorie">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Druhy kategorií</h2>
              <h1>Kategorie</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="kategorie-content">
              <HashLink to="/sestra-v-prime-osetrovatelske-peci" className="kategorie-item" data-aos="fade-up" data-aos-duration="800">
                <h1>Sestra v přímé ošetřovatelské péči</h1>
              </HashLink>
              <HashLink to="/sestra-v-socialnich-sluzbach" className="kategorie-item" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                <h1>Sestra v sociálních službách</h1>
              </HashLink>
              <HashLink to="/cestne-oceneni-za-celozivotni-praci" className="kategorie-item" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                <h1>Čestné ocenění za celoživotní práci</h1>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
