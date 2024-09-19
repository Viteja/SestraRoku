import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "./aktuality.css";

const Aktuality = (promps) => {
  return (
    <>
      <SplideSlide>
        <div className="card">
          <div className="card-content">
            <img src={promps.src} alt="Aktuality" />
            <h1>{promps.title}</h1>
          </div>
          <div className="card-bottom">
            <div className="card-item">
              <h5>{promps.jedna}</h5>
              <p>{promps.jednax}</p>
            </div>
            <div className="card-item">
              <h5>{promps.dva}</h5>
              <p>{promps.dvax}</p>
            </div>
            <div className="card-item">
              <h5>{promps.tri}</h5>
              <p>{promps.trix}</p>
            </div>
          </div>
        </div>
      </SplideSlide>
    </>
  );
};

export default Aktuality;
