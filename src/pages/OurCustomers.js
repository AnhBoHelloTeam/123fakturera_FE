import { useState, useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/styles.css';

function OurCustomers({ language, setLanguage, headerLinks }) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      text: "Ett mycket bra fakturaprogram! Vårt företag har använt ert fakturaprogram sen starten i 2005 och är mycket nöjda. Programmet är enkelt att använda och täcker alla våra önskemål i förhållande till egna behov och krav i förhållande till bokföring och översikt. God uppföljning via supporttjänsten vid frågor. Rekommenderas starkt!",
      author: "Knut Arntzen",
      company: "Bookjacket",
    },
    {
      text: "Efter att ha sett igenom LättFaktura ser jag att detta system är lika genialt som det är enkelt. Och det är så enkelt som det överhuvudtaget kan bli :) Jag är mycket nöjd, och med tiden kommer jag att beställa fler program från LättFaktura allt eftersom behovet ökar.",
      author: "Tor Bärland",
      company: "",
    },
    {
      text: "Det finns inget annat företag som jag handlat hos som bryr sig om sina kunder som Ni.",
      author: "Tony Olofsson",
      company: "TimeReg Nordic",
    },
    {
      text: "Wow snabb service Tack jag är redan nöjd. Ha de så bra",
      author: "Eva Ljung",
      company: "Allt-i-Allo Administration",
    },
    {
      text: "Tack för en jättesnabb service. Nu kör jag fakturorna igen! Än en gång tack!",
      author: "Barbro Ericson",
      company: "Affärsnytt Norr",
    },
    {
      text: "Efter att ha använt massor av pengar på konkurrentens program och deras folk så förstod jag följande. De är inte i närheten av LättFakturas egenskaper och användarvänlighet. Du hittar inget snabbare och mer användarvänligt program än detta när du har satt dig in i det.",
      author: "Roy",
      company: "",
    },
    {
      text: "Väldigt bra program, enkelt och lättanvändbar. Tusen tack för hjälpen…",
      author: "S. Maskinservice",
      company: "",
    },
    {
      text: "Nu har vi använt den vanliga versionen av programmet en stund och vi tycker den är enkel och bra att använda.",
      author: "Toyota H. Bil",
      company: "",
    },
    {
      text: "Tusen tack för super snabb service, också på en lördag kväll! Detta fixade mina problem på en gång. Bästa service någon gång.",
      author: "Jan Olav Sandvik",
      company: "",
    },
    {
      text: "Jag brukar rekommendera detta bra och billiga program till mina kunder.",
      author: "Björn W.",
      company: "IT-Konsult",
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

  const textLabels = {
    sv: {
      title: 'Våra Kunder',
      subtitle: 'Våra Kunder finns i hela Sverige, och inom så att säga alla yrken',
      description: 'Våra program används i dag på allt från Sveriges största företag till tusentals 1 och 2 mans företag, samt mängder av föreningar och organisationer.',
      bigClients: 'Bland våra större kunder kan nämnas t. ex.: ABB, ISS, Adidas, Electrolux, Volvo, MAN, Miele och många, många fler. Ja nästan varje storföretag har en eller flera underavdelningar som använder program från oss, vid sidan om sitt huvudprogram.',
      smallClients: 'Bland våra över 43.000 små och mellanstora företagskunder finns alla sorters företag representerade. Antingen det är TV kändisar eller en lokalavdelning från Röda korset.',
      testimonialsTitle: 'Våra Kunder om LättFaktura',
      statsTitle: 'Bland våra kunder är över',
      over: 'över',
    },
    en: {
      title: 'Our Customers',
      subtitle: 'Our customers are located throughout Sweden, and in virtually all professions',
      description: 'Our programs are used today by everything from Sweden\'s largest companies to thousands of 1 and 2 person companies, as well as numerous associations and organizations.',
      bigClients: 'Among our larger customers can be mentioned e.g.: ABB, ISS, Adidas, Electrolux, Volvo, MAN, Miele and many, many more. Yes, almost every large company has one or more sub-departments that use programs from us, alongside their main program.',
      smallClients: 'Among our over 43,000 small and medium-sized business customers, all types of companies are represented. Whether it\'s TV celebrities or a local branch of the Red Cross.',
      testimonialsTitle: 'Our Customers about LättFaktura',
      statsTitle: 'Among our customers are over',
      over: 'over',
    },
  };

  const t = textLabels[language] || textLabels.en;

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
    <div className="app-container">
      <HamburgerMenu language={language} />
      
      <div className="main-content">
        <div className="content">
          <div className="page-header">
            <h1>{t.title}</h1>
          </div>

          <div className="customers-content">
            <section className="customers-intro">
              <h2>{t.subtitle}</h2>
              <p>{t.description}</p>
              <p>{t.bigClients}</p>
              <p>{t.smallClients}</p>
            </section>

            <section className="customer-stats">
              <h2>{t.statsTitle}</h2>
              <div className="stats-grid">
                {customerStats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.count}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="testimonials-section">
              <h2>{t.testimonialsTitle}</h2>
              <div className="testimonials-container">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p className="testimonial-text">
                      "{testimonials[currentTestimonialIndex].text}"
                    </p>
                    <div className="testimonial-author">
                      <strong>{testimonials[currentTestimonialIndex].author}</strong>
                      {testimonials[currentTestimonialIndex].company && (
                        <span className="testimonial-company">
                          {testimonials[currentTestimonialIndex].company}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="testimonial-controls">
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={handlePrevTestimonial}
                    >
                      ←
                    </button>
                    <span className="testimonial-counter">
                      {currentTestimonialIndex + 1} / {testimonials.length}
                    </span>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={handleNextTestimonial}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="customer-logos">
              <h2>Våra stora kunder</h2>
              <div className="logos-grid">
                <div className="logo-item">ABB</div>
                <div className="logo-item">ISS</div>
                <div className="logo-item">Adidas</div>
                <div className="logo-item">Electrolux</div>
                <div className="logo-item">Volvo</div>
                <div className="logo-item">MAN</div>
                <div className="logo-item">Miele</div>
                <div className="logo-item">Röda Korset</div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .customers-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .customers-intro {
          margin-bottom: 40px;
          text-align: center;
        }

        .customers-intro h2 {
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .customers-intro p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 15px;
          color: #555;
        }

        .customer-stats {
          margin-bottom: 40px;
        }

        .customer-stats h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .stat-number {
          font-size: 2.5em;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .testimonials-section {
          margin-bottom: 40px;
        }

        .testimonials-section h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .testimonials-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
        }

        .testimonial-content {
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-size: 18px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 20px;
          font-style: italic;
        }

        .testimonial-author {
          text-align: right;
        }

        .testimonial-author strong {
          color: #2c3e50;
          font-size: 16px;
        }

        .testimonial-company {
          display: block;
          color: #666;
          font-size: 14px;
          margin-top: 5px;
        }

        .testimonial-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .testimonial-counter {
          font-weight: 500;
          color: #666;
        }

        .customer-logos {
          text-align: center;
        }

        .customer-logos h2 {
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .logos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .logo-item {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          font-weight: bold;
          color: #2c3e50;
          border: 1px solid #e9ecef;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .logos-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          }
          
          .testimonial-card {
            padding: 20px;
          }
          
          .testimonial-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default OurCustomers;
