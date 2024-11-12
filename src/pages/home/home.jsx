import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Aktuality from "../../components/aktuality/aktuality";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function Home() {
  function handleClickScroll(id) {
    var element = document.getElementById(id);
    var headerOffset = 120;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });
  const [voteData, setVoteData] = React.useState([]);

  const getData = () => {
    fetch("https://sestra.pardubickykraj.cz/php/getvote.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setVoteData(data);
        } else {
          console.error("Empty response from server");
        }
      })
      .catch((error) => console.error("GG eror:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const [getAllData, setAllData] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allData = () => {
    fetch("https://sestra.pardubickykraj.cz/php/allvote.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setAllData(data.total_votes);
          console.log(data);
        } else {
          console.error("Empty response from server");
        }
      })
      .catch((error) => console.error("GG error:", error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    allData();
  }, []);

  const handleVote = (id) => {
    Swal.fire({
      title:
        "Jste si jistí že chcete hlasovat " +
        voteData
          .map((voteData) => (voteData.id === id ? `pro <b>${voteData.name} ${voteData.surname}</b>` : ""))
          .filter((text) => text !== "")
          .join("") +
        "?",
      text: "Tento krok nelze vrátit zpět!",
      padding: "1rem",
      showDenyButton: true,
      confirmButtonText: "Ano, hlasovat",
      confirmButtonColor: "#28a745",
      denyButtonText: `Ne`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch("https://sestra.pardubickykraj.cz/php/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ id }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              window.location.reload();
              toast.success("Hlas byl úspěšně odeslán");
              // Zde můžete přidat kód pro aktualizaci stavu a opětovné vykreslení komponenty
            } else {
              toast.error("Už jste hlasovali");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            toast.error("Nastala chyba s připojením k serveru");
          });
      } else if (result.isDenied) {
      }
    });
  };

  // FORMULÁŘ //

  const [formData, setFormData] = useState({
    titul: "",
    name: "",
    tel: "",
    email: "",
    adress: "",
    funkce: "",
    workspace: "",
    education: "",
    years: "",
    prednasky: "",
    educationactivity: "",
    publication: "",
    email2: "",
    tel2: "",
    titul2: "",
    name2: "",
    text: "",
    kategorie: "sestra-v-prime-osetrovatelske-peci",
  });
  const [formState, setFormState] = useState("navrhovatel");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (formData.name === "" || formData.tel === "" || formData.email === "" || formData.adress === "") {
      return toast.error("Vyplňte všechny údaje");
    } else {
      setFormState("nominace");
    }
  };

  const handleBack = async (e) => {
    setFormState("navrhovatel");
    handleClickScroll("form-sec");
  };

  const handleSend = async (e) => {
    if (formData.name2 === "" || formData.obor === "" || formData.funkce === "" || formData.workspace === "" || formData.text === "") {
      console.log(formData);
      return toast.error("Vyplňte všechny údaje");
    }
    if ((formData.email2 === "" && formData.tel2 !== "") || (formData.email2 !== "" && formData.tel2 === "") || (formData.email2 !== "" && formData.tel2 !== "")) {
      axios.post("https://sestra.pardubickykraj.cz/php/sendEmail.php", formData).then((res) => {
        console.log(res);
        handleClickScroll("home");
        return toast.success("Formulář byl odeslán");
      });
    }
  };

  console.log(getAllData);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sestřička Roku</title>
        <link rel="canonical" href="https://sestra.pardubickykraj.cz/" />
      </Helmet>
      <div className="home" id="home">
        <div className="container">
          <div className="row">
            <div className="home-content">
              <h2 data-aos="fade-right" data-aos-duration="800">
                anketu vyhlašuje
              </h2>
              <div className="pce-logo" data-aos="fade-right" data-aos-duration="800">
                <img src="/images/pce-logo.svg" alt="" draggable="false" />
                <p>Pardubický kraj</p>
              </div>
              <h1 data-aos="fade-right" data-aos-delay="150" data-aos-duration="800">
                Nominuj
                <br />
                sestřičku
              </h1>
              <h3 data-aos="fade-right" data-aos-delay="200" data-aos-duration="800">
                Akce se koná pod osobní záštitou Ing. Michaely Matouškové, MPA, MHA <br />
                Náměstkyně hejtmana pro oblast zdravotnictví.
              </h3>
              <div className="buttons" data-aos="fade-right" data-aos-delay="250" data-aos-duration="800">
                <a onClick={() => handleClickScroll("rules")} className="primary-btn">
                  Nominace
                </a>
                <a onClick={() => handleClickScroll("rules")} className="secondary-btn">
                  Pravidla nominace
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rule-wraper" id="rules">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Jak nominovat?</h2>
              <h1>Pravidla</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="rules">
              <div className="rule" data-aos="fade-up" data-aos-duration="800">
                <div className="rule-content">
                  <img src="/images/icon1.webp" alt="SestraRoku Icon" draggable="false" />
                  <h1>Kdo může nominovat?</h1>
                  <p>
                    <span>Nominace</span> mohou předkládat občané NEJEN z Pardubického kraje, právnická osoba či kolektiv osob včetně pracovního kolektivu. <br />
                    Soutěž je určena všeobecným sestrám, porodním asistentkám, praktickým sestrám a dalším nelékařským zdravotnickým pracovníkům{" "}
                    <a target="_blank" href="/NLZP_obory1.pdf">
                      NLZP
                    </a>
                    , kterým se jejich profese stala především posláním než pouhým zaměstnáním a profesně působí na území Pardubického kraje.
                  </p>
                </div>
              </div>
              <div className="rule" data-aos="fade-up" data-aos-delay="150" data-aos-duration="800">
                <div className="rule-content">
                  <img src="/images/icon2.webp" alt="SestraRoku Icon" draggable="false" />
                  <h1>Jak poslat návrh?</h1>
                  <p>
                    <span>Navrhovatel</span> nominuje soutěžícího zasláním vyplněné přihlášky & nominace, včetně krátkého písemného odůvodnění. Přihláška musí být úplně a pravdivě vyplněna včetně výběru kategorie, kontaktní spojení na nominujícího/navrhovatele
                  </p>
                </div>
              </div>
              <div className="rule" data-aos="fade-up" data-aos-delay="250" data-aos-duration="800">
                <div className="rule-content">
                  <img src="/images/icon3.webp" alt="SestraRoku Icon" draggable="false" />
                  <h1>Kdy poslat návrh?</h1>
                  <p>
                    <span>Termín</span> pro zaslání nominace <br />
                    je od <span>1. 12. 2024.</span> Nominace je možné zaslat pomocí nominačního formuláře, který naleznete <a onClick={() => handleClickScroll("form-sec")}>níže</a>.{" "}
                  </p>
                </div>
              </div>
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
                <h1>Sestřička v přímé ošetřovatelské péči</h1>
              </HashLink>
              <HashLink to="/sestra-v-socialnich-sluzbach" className="kategorie-item" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                <h1>Sestřička v sociálních službách</h1>
              </HashLink>
              <HashLink to="/cestne-oceneni-za-celozivotni-praci" className="kategorie-item" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                <h1>Čestné ocenění za celoživotní práci</h1>
              </HashLink>
            </div>
          </div>
        </div>
      </div>

      {/* <!--   <div className="vote" id="form-sec">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Nominace</h2>
              <h1>Hlasování</h1>
            </div>
          </div>
          <div className="allvotes" ref={ref}>
            <h1>
              Celkový počet hlasů: <span>{inView && getAllData !== null ? <CountUp end={getAllData} duration={5} /> : getAllData !== null ? getAllData : 0}</span>
            </h1>
          </div>
          <div className="vote-content" data-aos="fade-up">
            {voteData.map((voteData) => (
              <div className="vote-item" key={voteData.id}>
                <div className="item-content">
                  <img src={voteData.img} alt={`${voteData.name} ${voteData.surname}`} draggable="false" />
                  <h3>
                    {voteData.name} {voteData.surname}
                  </h3>
                  <p className="vote">
                    <span>Počet hlasů:</span> {voteData.vote}
                  </p>
                  <p>
                    <span>Pracoviště:</span> {voteData.work}
                  </p>
                </div>
                <a onClick={() => handleVote(voteData.id)} className="primary-btn">
                  Hlasovat
                </a>
              </div>
            ))}
          </div>
        </div>
      </div> -->*/}

      {/* <!--   <div className="form-wraper" id="form-sec">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Formulář</h2>
              <h1>Nominuj sestřičku</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="form-content" data-aos="fade-up" data-aos-duration="800">
              {formState === "navrhovatel" ? (
                <form className="form1">
                  <h2>Navrhovatel</h2>
                  <div className="form-group">
                    <input type="text" id="titul" name="titul" placeholder="Titul (Nepovinné)" value={formData.titul} onChange={handleChange} />
                    <input type="text" id="name" name="name" placeholder="Jméno a příjmení" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="text" id="tel" name="tel" placeholder="Telefonní číslo" value={formData.tel} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="adress" name="adress" placeholder="Adresa" value={formData.adress} onChange={handleChange} />
                  </div>
                  <div className="form-btn1">
                    <a onClick={() => handleClickScroll("rules")}>Pravidla nominace</a>
                    <input type="button" onClick={handleSubmit} value="Dále"></input>
                  </div>
                </form>
              ) : (
                <form className="form2">
                  <h2>Nominace</h2>
                  <div className="form-group">
                    <input type="text" id="titul2" name="titul2" placeholder="Titul" value={formData.titul2} onChange={handleChange} />
                    <input type="text" id="name2" name="name2" placeholder="Jméno a příjmení" value={formData.name2} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="tel2" name="tel2" placeholder="Telefonní číslo (soukromé nebo pracovní)" value={formData.tel2} onChange={handleChange} />
                    <input type="email" id="email2" name="email2" placeholder="Email (Nepovinné)" value={formData.email2} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <div className="form-select">
                      <p>Kategorie:</p>
                      <select name="kategorie" id="kategorie" value={formData.kategorie} onChange={handleChange}>
                        <option defaultValuevalue="sestra-v-prime-osetrovatelske-peci">Sestra v přímé ošetřovatelské péči</option>
                        <option value="sestra-v-socialnich-sluzbach">Sestra v sociálních službách</option>
                        <option value="cestne-oceneni-za-celozivotni-praci">Čestné ocenění za celoživotní práci</option>
                      </select>
                    </div>
                    <div className="form-funkce">
                      <p>
                        Více informací zde:{" "}
                        <a target="_blank" href="/NLZP_obory1.pdf">
                          NLZP
                        </a>
                      </p>
                      <input type="text" id="funkce" name="funkce" placeholder="Funkce" value={formData.funkce} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" id="workspace" name="workspace" placeholder="Pracoviště" value={formData.workspace} onChange={handleChange} />
                    <input type="text" id="education" name="education" placeholder="Vzdělání (Nepovinné)" value={formData.education} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="years" name="years" placeholder="Počet let ve zdravotnictví (Nepovinné)" value={formData.years} onChange={handleChange} />
                    <input type="text" id="prednasky" name="prednasky" placeholder="Přednášky (Nepovinné)" value={formData.prednasky} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="publication" name="publication" placeholder="Publikační činnost (Nepovinné)" value={formData.publication} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="educationactivity" name="educationactivity" placeholder="Vzdělávací činnost (Nepovinné)" value={formData.educationactivity} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <textarea name="text" id="text" cols="30" rows="5" placeholder="Proč zrovna tato sestra je Vaší favoritkou?" value={formData.text} onChange={handleChange}></textarea>
                  </div>
                  <div className="form-btn2">
                    <input type="button" onClick={handleBack} value="Zpět"></input>
                    <input type="button" onClick={handleSend} value="Odeslat" id="submitButton"></input>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>-->*/}
      <Footer />
    </>
  );
}
