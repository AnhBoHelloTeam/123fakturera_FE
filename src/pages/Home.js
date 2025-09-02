import React, { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/home.css';

function Home({ language, setLanguage }) {
  const images = [
    'https://www.123fakturera.se/images/layout-6-p-1080.jpeg',
    'https://www.123fakturera.se/images/layout-7-p-1080.jpeg',
    'https://www.123fakturera.se/images/layout-4-p-1080.jpeg',
    'https://www.123fakturera.se/images/Faktura.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container">
      <header className="header">
        <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" className="logo" />
        <nav className="main-nav">
          <a href="#">Hem</a>
          <a href="#">Beställ</a>
          <a href="#">Våra Kunder</a>
          <a href="#">Om oss</a>
          <a href="#">Kontakta oss</a>
          <a href="#">Andra Program</a>
          <a href="#">Mer</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="left-content">
          <h1>MARKNADSLEDANDE PÅ ENKLA FAKTURAPROGRAM I ÖVER 25 ÅR</h1>
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
        <h2>Använd och Prova Gratis</h2>
        <form>
          <input type="text" placeholder="Företags namn" />
          <input type="text" placeholder="Kontakt person" />
          <input type="text" placeholder="Adress" />
          <input type="text" placeholder="Postnummer" />
          <input type="text" placeholder="Ort" />
          <input type="email" placeholder="Epost adress" />
          <p>Du kan avbryta den prova LättFaktura helt gratis i 14 dagar. Detta är en faktureringslösning så att du kan skicka 1000 fakturor eller mer, helt gratis. LättFaktura är så lätt och enkelt att använda att chansen för att du kommer behova support är minimal, men om du skulle behöva support så är vi här för dig, med kortaste bemannade ströe delen av dygnen. Efter provperioden så faktuteras abonnemanget och kostar 89 kronor exkl moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden innan det första faktureringsdatumet idag.</p>
          <p>Klicka Faktura Nu för att fakturera och för att godkänna villkoren, och din första faktura normalt klar för att skickas inom 5-10 minuter.</p>
          <button type="submit">Faktura Nu</button>
        </form>
      </div>
    </div>
  );
}

export default Home;