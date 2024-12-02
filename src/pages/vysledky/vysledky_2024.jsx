import React, { useState } from "react";
import "./vysledky.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Aktuality from "../../components/aktuality/aktuality";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
export default function Vysledky_2024() {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <>
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sestra Pardubického kraje | Výsledky roku 2024</title>
        <link rel="canonical" href="https://sestra.pardubickykraj.cz//sestra-v-prime-osetrovatelske-peci" />
      </Helmet>
      <div className="tisk" id="tisk">
        <div className="container">
          <div className="row">
            <div className="vysledky-title">
              <h1>
                - ocenění <span>Sestřičky roku</span> za rok 2024 -
              </h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="winners" data-aos="fade-up" data-aos-delay="150">
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
                <Aktuality src={"./images/Nurse Cap.png"} title={"Cena veřejnosti"} jedna={"Tereza Kiňo Sovová"} jednax={"oční klinika Oftex Pardubice"} />
                <Aktuality src={"./images/Stethoscope.png"} title={"Sestra v přímé ošetřovatelské péči"} jedna={"1. Simona Žabková"} jednax={"Albertinum Žamberk, oddělení paliativní a hospicové péče"} dva={"2. Martina Voženílková"} dvax={"Porodnice, Chrudimská nemocnice"} tri={"3. Vlasta Antošová"} trix={"Gynekologie, Chrudimská nemocnice"} />
                <Aktuality src={"./images/Nurse.png"} title={"Sestra v sociálních službách"} jedna={" 1. Markéta Vašková"} jednax={"Mobilní hospic Oblastní charity Pardubice"} dva={" 2. Květa Paulus"} dvax={"Centrum duševního zdraví Chrudim"} tri={"3. Veronika Klimová"} trix={"Alzheimer Home Pardubice"} />
                <Aktuality src={"./images/Heart Rate.png"} title={"Čestné ocenění za celoživotní práci"} jedna={"1. Olga Lindnerová"} jednax={"Stomatochirurgie Chrudim, MUDr. Michal Haltuch"} dva={"2. Věra Koppová"} dvax={"Zdravotnická záchranná služba Pardubice, Staré Čívice"} tri={"3. Milada Faltusová"} trix={"Ortopedie, Poliklinika Žamberk"} />
                <Aktuality src={"./images/Lace.png"} title={"Cena náměstkyně hejtmana za zdravotnictví"} jedna={"Miroslava Kozelková, in memoriam"} jednax={"Nemocnice následné péče Moravská Třebová"} />
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
      <Footer />
    </>
  );
}
