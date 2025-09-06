import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/home.css';
import '../assets/commonStyles.css';

function Home() {
  const images = [
    'https://www.123fakturera.se/images/layout-6-p-1080.jpeg',
    'https://www.123fakturera.se/images/layout-7-p-1080.jpeg',
    'https://www.123fakturera.se/images/layout-4-p-1080.jpeg',
    'https://www.123fakturera.se/images/Faktura.png',
  ];

  const testimonials = [
    {
      stars: 5,
      quote: "Ett mycket bra fakturaprogram! Vårt företag har använt ert fakturaprogram sen starten i 2005 och är mycket nöjda. Programmet är enkelt att använda och täcker alla våra önskemål i förhållande till bokföring och översikt. God uppföljning via supporttjänsten vid frågor. Rekommenderas starkt!",
      author: "Knut Arntzen",
      company: "Bookjacket",
    },
    {
      stars: 5,
      quote: "Efter att ha sett igenom LättFaktura ser jag att detta system är lika genialt som det är enkelt. Och det är så enkelt som det överhuvudtaget kan bli :) Jag är mycket nöjd, och med tiden kommer jag att beställa fler program från LättFaktura allt eftersom behovet ökar.",
      author: "Tor Bärland",
    },
    {
      stars: 5,
      quote: "Wow snabb service Tack jag är redan nöjd. Ha de så bra",
      author: "Eva Ljung",
      company: "Allt-i-Allo Administration",
    },
    {
      stars: 5,
      quote: "Tack för en jättesnabb service. Nu kör jag fakturorna igen! Än en gång tack!",
      author: "Barbro Erntzen",
      company: "Affärsnytt Norr",
    },
    {
      stars: 5,
      quote: "Hej! Tack för Ditt mail! Det finns inget annat företag som jag handlat hos som bryr sig om sina kunder som Ni.",
      author: "Tony Olofsson",
      company: "TimeReg Nordic",
    },
  ];

  const customerStats = [
    { count: 650, label: "Advokater" },
    { count: 140, label: "Revisorer" },
    { count: 515, label: "Bokförare" },
    { count: 2410, label: "Byggföretag" },
    { count: 1220, label: "Konsulter" },
    { count: 660, label: "Fastighetsbolag" },
    { count: 1460, label: "Transportföretag" },
    { count: 60, label: "Kommuner" },
    { count: 520, label: "Restauranger" },
    { count: 435, label: "Elektriker" },
    { count: 210, label: "Dataföretag" },
    { count: 120, label: "Skolor" },
    { count: 290, label: "Hotell" },
    { count: 205, label: "Ingenjörer" },
    { count: 250, label: "Föreningar" },
    { count: 80, label: "Läkare" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const headerLinks = [
    { text: 'Hem', href: '/' },
    { text: 'Beställ', href: '/Order' },
    { text: 'Våra Kunder', href: '/Our-Customers' },
    { text: 'Om oss', href: '/About-us' },
    { text: 'Kontakta oss', href: '/Contact-Us' },
    { text: 'Andra Program', href: '/Other-Programs' },
    { text: 'Mer', href: '/More' },
  ];

  useEffect(() => {
    const invoiceInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(invoiceInterval);
  }, [images.length]);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <>
      <div className="background-fixed" />
      <div className="container">
        <header className="home-header">
          <div className="home-header-left">
            <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" className="logo" />
          </div>
          <div className="home-header-right">
            <nav className="main-nav">
              <ul>
                {headerLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <HamburgerMenu language="sv" links={headerLinks} />
          </div>
        </header>
        <main className="main-content">
          <div className="left-content">
            <h1>Marknadsledande på enkla fakturaprogram i över 25 år</h1>
            <p>Gör som över 43.000 andra företag. Upptäck Sveriges Enklaste Fakturaprogram.</p>
          </div>
          <div className="right-content">
            <div className="invoice-carousel">
              <div
                className="carousel-inner"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((img, index) => (
                  <div key={index} className="carousel-item">
                    <img src={img} alt={`Invoice Preview ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <div className="signup-form">
          <form>
            <h2>Använd och Prova Gratis</h2>
            <input type="text" placeholder="Företags namn" required />
            <input type="text" placeholder="Kontakt person" required />
            <input type="text" placeholder="Adress" required />
            <input type="text" placeholder="Postnummer" required />
            <input type="text" placeholder="Ort" required />
            <input type="email" placeholder="Epost adress" required />
            <input type="tel" placeholder="Mobil" required />
            <p>Du kan använda och prova LättFaktura helt gratis i 14 dagar. </p>
            <p>Detta är en äkta fullversion, så att du kan skicka 1000 fakturor eller mer, helt gratis.</p>
            <p>
              LättFaktura är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge besked inom 14 dagar från i dag.
            </p>
            <p>Klicka Fakturera Nu för att fakturera och för att godkänna villkoren, och din första faktura är normalt klar för att skickas inom 5-10 minuter.</p>
            <button type="submit">Faktura Nu</button>
          </form>
        </div>
        <section className="background-section wf-section">
          <div className="wrapper w-container">
            <img
              src="https://www.123fakturera.se/images/stars.svg"
              alt="Stars"
              className="stars-center"
            />
            <h2 className="section-header white-text">
              <span className="heading-accent">Våra Kunder</span> om LättFaktura
            </h2>
            <div className="testimonial-carousel w-slider">
              <div
                className="testimonial-carousel-inner w-slider-mask"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-item w-slide">
                    <div className="review-text">{testimonial.quote}</div>
                    <div className="review-author">
                      <strong>{testimonial.author}</strong>
                      {testimonial.company && (
                        <a href="#" className="white-bold-link">
                          {testimonial.company}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="arrow left-arrow w-slider-arrow-left" onClick={handlePrevTestimonial}>
                <div className="w-icon-slider-left"></div>
              </button>
              <button className="arrow right-arrow w-slider-arrow-right" onClick={handleNextTestimonial}>
                <div className="w-icon-slider-right"></div>
              </button>
              <div className="slide-nav w-slider-nav w-round"></div>
            </div>
          </div>
        </section>
        <section className="white-section wf-section">
          <div className="wrapper w-container">
            <div className="full-width-heading">
              <h2 className="section-header1">
                <span className="heading-accent1">Våra Kunder</span> finns i hela Sverige, och inom så att säga alla yrken
              </h2>
            </div>
            <p className="section-description centered-text">
              Våra program används i dag på allt från Sveriges största företag till tusentals 1 och 2 mans företag, samt mängder av föreningar och organisationer.<br /><br />
              Bland våra större kunder kan nämnas t. ex.: ABB, ISS, Adidas, Electrolux, Volvo, MAN, Miele och många, många fler. Ja nästan varje storföretag har en eller flera underavdelningar som använder program från oss, vid sidan om sitt huvudprogram.<br /><br />
              Bland våra över 43.000 små och mellanstora företagskunder finns alla sorters företag representerade. Antingen det är TV kändisar eller en lokalavdelning från Röda korset.
            </p>
            <h2 className="section-header">Bland våra kunder är över</h2>
            <div className="feature-cards-v2">
              {customerStats.map((stat, index) => (
                <div key={index} className="feature-card-v2" data-ix="fade-up-1">
                  <h5>
                    <span className="heading-accent2">{stat.count}</span> {stat.label}
                  </h5>
                </div>
              ))}
            </div>
            <div className="disclaimer">
              <a href="/disclaimer.html">Ägarförhållanden och Disclaimer</a>
            </div>
            <div className="social-media">
              <a href="https://www.facebook.com/FakturaProgram" target="_blank" rel="noopener noreferrer">
                <img src="https://www.123fakturera.se/images/facebook_1facebook.png" alt="Facebook" />
              </a>
              <a href="http://www.instagram.com/FakturaProgram" target="_blank" rel="noopener noreferrer">
                <img src="https://www.123fakturera.se/images/instagram_1instagram.png" alt="Instagram" />
              </a>
              <a href="http://www.linkedin.com/company/fakturaprogram" target="_blank" rel="noopener noreferrer">
                <img src="https://www.123fakturera.se/images/linkedin_1linkedin.png" alt="LinkedIn" />
              </a>
              <a href="http://www.pinterest.com/FakturaProgram" target="_blank" rel="noopener noreferrer">
                <img src="https://www.123fakturera.se/images/pintrest_1pintrest.png" alt="Pinterest" />
              </a>
            </div>
          </div>
        </section>
        <footer className="footer-section-v3 wf-section">
          <div className="wrapper w-container">
            <div className="footer-v3">
              <div className="footer-v3-nav">
                <a href="/" className="footer-v3-nav-link">Ladda Ner</a>
                <a href="/Order" className="footer-v3-nav-link">Beställ</a>
                <a href="/Contact-Us" className="footer-v3-nav-link">Kontakta Oss</a>
              </div>
              <div className="footer-v3-copyright">
                © Lättfaktura, CRO no. 638537, 2023. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;