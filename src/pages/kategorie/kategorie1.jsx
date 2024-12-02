import React, { useState } from "react";
import "./kategorie.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { HashLink } from "react-router-hash-link";
import { Helmet } from "react-helmet";
export default function Kategorie1() {
  return (
    <>
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sestra Pardubického kraje | Sestra v přímé ošetřovatelské péči</title>
        <link rel="canonical" href="https://sestra.pardubickykraj.cz//sestra-v-prime-osetrovatelske-peci" />
      </Helmet>
      <div className="kategorie-page">
        <div className="kat-content" id="kategorie1">
          <div className="title">
            <h2>Kategorie</h2>
            <h1>Sestra v přímé ošetřovatelské péči</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="kat-text">
              <div className="kat-title">
                <img src="/images/icon1.webp" alt="SestraRoku Icon" draggable="false" />
                <h1>Koho lze nominovat?</h1>
              </div>
              <p>
                Do této kategorie je možné nominovat{" "}
                <a target="_blank" href="/NLZP_obory1.pdf">
                  NLZP
                </a>
                , vykonávající ošetřovatelskou praxi ve všech typech zdravotnických zařízení + nemocniční a ambulantní sféry a všech formách domácí péče.
              </p>
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
