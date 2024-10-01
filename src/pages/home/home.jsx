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
      axios.post("https://sestra.pardubickykraj.cz//php/sendEmail.php", formData).then((res) => {
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
                <a onClick={() => handleClickScroll("tisk")} className="primary-btn">
                  Výsledky
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
                    <span>Termín nominace</span> na 2. ročník včas zveřejníme.
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
      <div className="tisk" id="tisk">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Aktuality</h2>
              <h1>ocenění Sestřičky roku</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="winners">
              <h5>CELKOVÉ VÝSLEDKY</h5>
              <Splide
                aria-label="My Favorite Images"
                options={{
                  rewind: true,
                  autoplay: true,
                  loop: true,
                  perPage: 3,
                  gap: "0.5rem",
                  pagination: true,
                  perMove: 1,
                  breakpoints: {
                    740: {
                      perPage: 1,
                      gap: "1rem",
                    },
                    768: {
                      perPage: 2,
                      gap: "1rem",
                    },
                    1024: {
                      perPage: 2,
                      gap: "1rem",
                    },
                  },
                }}
              >
                <Aktuality src={"./images/winner.png"} title={"Cena veřejnosti"} jedna={"Tereza Kiňo Sovová"} jednax={"oční klinika Oftex Pardubice"} />
                <Aktuality src={"./images/winner.png"} title={"Sestra v přímé ošetřovatelské péči"} jedna={"1. Simona Žabková"} jednax={"Albertinum Žamberk, oddělení paliativní a hospicové péče"} dva={"2. Martina Voženílková"} dvax={"Porodnice, Chrudimská nemocnice"} tri={"3. Vlasta Antošová"} trix={"Gynekologie, Chrudimská nemocnice"} />
                <Aktuality src={"./images/winner.png"} title={"Sestra v sociálních službách"} jedna={" 1. Markéta Vašková"} jednax={"Mobilní hospic Oblastní charity Pardubice"} dva={" 2. Květa Paulus"} dvax={"Centrum duševního zdraví Chrudim"} tri={"3. Veronika Klimová"} trix={"Alzheimer Home Pardubice"} />
                <Aktuality src={"./images/winner.png"} title={"Čestné ocenění za celoživotní práci"} jedna={"1. Olga Lindnerová"} jednax={"Stomatochirurgie Chrudim, MUDr. Michal Haltuch"} dva={"2. Věra Koppová"} dvax={"Zdravotnická záchranná služba Pardubice, Staré Čívice"} tri={"3. Milada Faltusová"} trix={"Ortopedie, Poliklinika Žamberk"} />
                <Aktuality src={"./images/winner.png"} title={"Cena náměstkyně hejtmana za zdravotnictví"} jedna={"Miroslava Kozelková, in memoriam"} jednax={"Nemocnice následné péče Moravská Třebová"} />
              </Splide>
            </div>
          </div>
        </div>

        <div className="tisk-content">
          <div className="container">
            <div className="row">
              <h1>
                Nové ocenění Pardubického kraje Sestřička roku <span>popularizuje práci zdravotních sester</span>
              </h1>
              <h3>Pardubická Gočárova galerie byla v pátek 13. září svědkem slavnostního vyhlášení prvního ročníku ankety Sestřička Pardubického kraje za rok 2024.</h3>
              <ul>
                <li>
                  <p>
                    Osobní záštitu nad letošním prvním ročníkem převzali ministr zdravotnictví Vlastimil Válek a Michaela Matoušková, náměstkyně hejtmana zodpovědná za zdravotnictví, která na úvod řekla: <span>„Mým cílem bylo nasvítit a popularizovat práci zdravotních sester, které pro nás v Pardubickém kraji pracují, a zároveň motivovat mladé lidi ke studiu zdravotnických oborů, které mají v našem kraji dlouholetou tradici a perspektivu. Pomáhající profese jsou v dnešní době potřeba více, než kdy jindy – uzdravují nejenom naše tělo, ale mnohdy i duši a jsou v přímém kontaktu s pacientem. Jsou prvními, kdo se s námi v ordinaci setká a první dojem je mnohdy důležitý. Pacienta uklidní a odborně mu zajistí další péči. Sestry jsou často psychickou i morální hodnotou a jsou velmi důležité v procesu uzdravování.“</span>
                  </p>
                </li>
                <li>
                  <p>
                    Nominací se sešlo bezmála sto, nejvíce jich přišlo v kategorii Sestra v přímé ošetřovatelské péči. Její vítězkou se stala Simona Žabková, vrchní sestra oddělení paliativní a hospicové péče v Albertinu, odborném léčebném ústavu v Žamberku. Cenu jí předala náměstkyně Michaela Matoušková, která při této příležitosti mimo jiné uvedla: <span>„Komunikace, otevřenost a naslouchání jsou často klíčem k zotavení. Svým pozitivním příkladem můžeme všichni tvořit zdravější svět.“</span> <br />
                    Cenu v kategorii Sestra v sociálních službách předával radní Pavel Šotola.
                    <span> „Porota přidělila vítězství vrchní sestře mobilního hospice Andělů strážných z Oblastní charity Pardubice Markétě Vaškové. To spolu s cenou pro sestru v přímé ošetřovatelské péči dokládá, jak si náš kraj váží této paliativní odbornosti, která se v naší medicíně a sociálních službách rozvíjí a je velmi potřebná,“</span> uvedl Šotola.
                  </p>
                </li>
                <li>
                  <p>
                    Cen za celoživotní práci se ujal Roman Línek. Ukázalo se, že nemoci a kritické situace se nevyhýbají ani těm, kteří celý život pomáhají jiným, a proto ze tří oceněných dorazila jen dlouholetá záchranářka z Pardubic Věra Koppová. <span>„Víme, že lidé, kteří celý život pracují ve zdravotnictví, jsou často ohroženi i psychickým vyhořením. Nesmírně si proto vážím všech, které i po mnoha letech služby stále oceňují jak jejich pacienti, tak i kolegové a nadřízení,“</span> řekl Línek.
                  </p>
                </li>
                <li>
                  <p>Během srpna se v online hlasování o Cenu veřejnosti sešlo neuvěřitelných 13 754 hlasů, z nichž jich 4 663 patřilo Tereze Kiňo, která byla do soutěže nominována pod dívčím jménem Sovová.</p>
                </li>
                <li>
                  <p>
                    Cenu náměstkyně hejtmana za zdravotnictví udělila Michaela Matoušková sestřičce Miroslavě Kozelkové in memoriam. Ocenění převzaly dcery a jeho předávání bylo velmi emotivní, jako ostatně celé slavnostní vyhlášením prvního ročníku. <span>„Jsem ráda, že jsem mohla být zakladatelkou tradice v ocenění Sestřičky Pardubického kraje, kterým náš kraj dává jednoznačně najevo úctu a respekt k tolik potřebné zdravotnické profesi,“</span> uvedla na závěr Matoušková.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="gallery">
          <div className="container">
            <div className="row">
              <div className="gallery-content">
                <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
                  <a href="/images/1_misto-min.webp">
                    <img alt="Ocenění za první místo" src="/images/1_misto-min.webp" />
                  </a>
                  <a href="/images/hudebni_doprovod-min.webp">
                    <img alt="Hudební doprovod" src="/images/hudebni_doprovod-min.webp" />
                  </a>
                  <a href="/images/kveta_paulus-min.webp">
                    <img alt="Květa Paulus" src="/images/kveta_paulus-min.webp" />
                  </a>
                  <a href="/images/marketa_vaskova-min.webp">
                    <img alt="Markéta Vašková" src="/images/marketa_vaskova-min.webp" />
                  </a>
                  <a href="/images/michaela_matouskova-min.webp">
                    <img alt="Micheala Matouškouvá" src="/images/michaela_matouskova-min.webp" />
                  </a>
                  <a href="/images/miroslava_kozelkova-min.webp">
                    <img alt="Mimořádné ocenění in memoriam přebíraly dcery paní Miroslavy Kozelkové" src="/images/miroslava_kozelkova-min.webp" />
                  </a>
                  <a href="/images/olga_lindnerova-min.webp">
                    <img alt="Cenu za Olgu Lindnerovou přebírala rodina" src="/images/olga_lindnerova-min.webp" />
                  </a>
                  <a href="/images/predavani-min.webp">
                    <img alt="Předávání" src="/images/predavani-min.webp" />
                  </a>
                  <a href="/images/spolecna_fotka-min.webp">
                    <img alt="Společné foto všech oceněných" src="/images/spolecna_fotka-min.webp" />
                  </a>
                  <a href="/images/tereza_kino-min.webp">
                    <img alt="Cenu za Terezu Kiňo přebírala kolegině" src="/images/tereza_kino-min.webp" />
                  </a>
                  <a href="/images/vera_koppova-min.webp">
                    <img alt="Věra Koppová" src="/images/vera_koppova-min.webp" />
                  </a>
                  <a href="/images/veronika_klimova-min.webp">
                    <img alt="Veronika Klimová" src="/images/veronika_klimova-min.webp" />
                  </a>
                  <a href="/images/vlasta_antosova-min.webp">
                    <img alt="Vlasta Antosová" src="/images/vlasta_antosova-min.webp" />
                  </a>
                  <a href="/images/simona_zabkova-min.webp">
                    <img src="/images/simona_zabkova-min.webp" alt="Simona Žabková" />
                  </a>
                  <a href="/images/martina_vozenilkova-min.webp">
                    <img src="/images/martina_vozenilkova-min.webp" alt="Martina Voženílková" />
                  </a>
                </LightGallery>
              </div>
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

      {/* <!--<div className="form-wraper" id="form-sec">
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
      </div> -->*/}
      <Footer />
    </>
  );
}
