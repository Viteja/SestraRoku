import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Kategorie1 from "./pages/kategorie/kategorie1";
import Kategorie2 from "./pages/kategorie/kategorie2";
import Kategorie3 from "./pages/kategorie/kategorie3";
import AOS from "aos";
import "aos/dist/aos.css";
import $ from "jquery";

function App() {
  // Animace //
  useEffect(() => {
    AOS.init();
  });

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
      $("body, html").scrollTop(0);
    }, [pathname]);
  };

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sestra-v-prime-osetrovatelske-peci" element={<Kategorie1 />} />
          <Route path="/sestra-v-socialnich-sluzbach" element={<Kategorie2 />} />
          <Route path="/cestne-oceneni-za-celozivotni-praci" element={<Kategorie3 />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
