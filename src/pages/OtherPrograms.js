import { useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import '../assets/styles.css';

function OtherPrograms({ language, setLanguage, headerLinks }) {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 'lattfaktura',
      name: 'LättFaktura',
      description: 'Sveriges enklaste fakturaprogram',
      features: [
        'Enkel och intuitiv användargränssnitt',
        'Automatisk fakturanummering',
        'Kundregister med fullständig information',
        'Prislista med produkter och tjänster',
        'Momsberäkning enligt svenska regler',
        'PDF-generering av fakturor',
        'E-postutskick av fakturor',
        'Fakturalog för spårning',
        'Obetalda fakturor hantering',
        'Massfakturering för effektivitet',
        'Erbjudanden och offerter',
        'Lagerhantering',
        'Medlemsfakturering',
        'Import och export funktioner',
        '24/7 support'
      ],
      price: '99 kr/månad',
      trial: '14 dagar gratis',
      image: 'https://www.123fakturera.se/images/layout-6-p-1080.jpeg'
    },
    {
      id: 'lattbokforing',
      name: 'LättBokföring',
      description: 'Enkel bokföring för småföretag',
      features: [
        'Automatisk bokföring från fakturor',
        'Kontoplan enligt svenska standarder',
        'Momsdeklarationer',
        'Årsrapporter',
        'Bankkontroll och avstämning',
        'Leverantörsregister',
        'Kostnadsredovisning',
        'Resultat- och balansräkning',
        'Skatterapporter',
        'Revisorintegration'
      ],
      price: '149 kr/månad',
      trial: '30 dagar gratis',
      image: 'https://www.123fakturera.se/images/layout-6-p-1080.jpeg'
    },
    {
      id: 'lattlager',
      name: 'LättLager',
      description: 'Lagerhantering för alla företag',
      features: [
        'Produktregister med streckkoder',
        'Lagerstatus i realtid',
        'Automatiska lagerbeställningar',
        'Leverantörshantering',
        'Inleverans och utleverans',
        'Lagerrapporter',
        'Kostnadsberäkning',
        'Multi-lagerställen',
        'Mobilt lagerhantering',
        'Integration med LättFaktura'
      ],
      price: '199 kr/månad',
      trial: '14 dagar gratis',
      image: 'https://www.123fakturera.se/images/layout-6-p-1080.jpeg'
    },
    {
      id: 'lattprojekt',
      name: 'LättProjekt',
      description: 'Projekthantering och tidrapportering',
      features: [
        'Projektplanering och uppföljning',
        'Tidrapportering per projekt',
        'Resurshantering',
        'Projektbudgetar',
        'Fakturering per projekt',
        'Projektrapporter',
        'Teamhantering',
        'Deadline-uppföljning',
        'Kostnadsanalys',
        'Integration med andra program'
      ],
      price: '179 kr/månad',
      trial: '21 dagar gratis',
      image: 'https://www.123fakturera.se/images/layout-6-p-1080.jpeg'
    },
    {
      id: 'lattkund',
      name: 'LättKund',
      description: 'CRM för kundrelationer',
      features: [
        'Kundregister med fullständig historik',
        'Kontaktuppföljning',
        'Säljcykelhantering',
        'E-postkampanjer',
        'Kundanalys och rapporter',
        'Uppgifter och påminnelser',
        'Kundsegmentering',
        'Säljstatistik',
        'Integration med LättFaktura',
        'Mobil CRM-app'
      ],
      price: '129 kr/månad',
      trial: '14 dagar gratis',
      image: 'https://www.123fakturera.se/images/layout-6-p-1080.jpeg'
    },
    {
      id: 'lattlone',
      name: 'LättLöne',
      description: 'Lönehantering för småföretag',
      features: [
        'Anställdregister',
        'Löneberäkningar',
        'Skatteavdrag',
        'Sociala avgifter',
        'Semesterlöner',
        'Lönespecifikationer',
        'Arbetsgivardeklarationer',
        'Pensioner och försäkringar',
        'Tidrapportering',
        'Integration med bokföring'
      ],
      price: '169 kr/månad',
      trial: '30 dagar gratis',
      image: 'https://www.123fakturera.se/images/layout-6-p-1080.jpeg'
    }
  ];

  const textLabels = {
    sv: {
      title: 'Andra Program',
      subtitle: 'Komplett paket för ditt företag',
      description: 'Utöver LättFaktura erbjuder vi en hel rad av professionella program för att hjälpa ditt företag att växa och utvecklas.',
      features: 'Funktioner',
      price: 'Pris',
      trial: 'Provperiod',
      tryNow: 'Prova Nu',
      orderNow: 'Beställ Nu',
      learnMore: 'Läs Mer',
      allPrograms: 'Alla Program',
      popularPrograms: 'Populära Program',
      newPrograms: 'Nya Program',
      businessSolutions: 'Företagslösningar',
      support: 'Support',
      integration: 'Integration',
      mobile: 'Mobil App',
      cloud: 'Molnbaserat',
      security: 'Säkerhet',
      backup: 'Backup',
      updates: 'Automatiska uppdateringar',
    },
    en: {
      title: 'Other Programs',
      subtitle: 'Complete package for your business',
      description: 'In addition to LättFaktura, we offer a whole range of professional programs to help your business grow and develop.',
      features: 'Features',
      price: 'Price',
      trial: 'Trial',
      tryNow: 'Try Now',
      orderNow: 'Order Now',
      learnMore: 'Learn More',
      allPrograms: 'All Programs',
      popularPrograms: 'Popular Programs',
      newPrograms: 'New Programs',
      businessSolutions: 'Business Solutions',
      support: 'Support',
      integration: 'Integration',
      mobile: 'Mobile App',
      cloud: 'Cloud-based',
      security: 'Security',
      backup: 'Backup',
      updates: 'Automatic Updates',
    },
  };

  const t = textLabels[language] || textLabels.en;

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
  };

  const handleCloseModal = () => {
    setSelectedProgram(null);
  };

  return (
    <div className="app-container">
      <HamburgerMenu language={language} />
      
      <div className="main-content">
        <div className="content">
          <div className="page-header">
            <h1>{t.title}</h1>
          </div>

          <div className="programs-content">
            <section className="programs-intro">
              <h2>{t.subtitle}</h2>
              <p>{t.description}</p>
            </section>

            <div className="programs-grid">
              {programs.map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-image">
                    <img src={program.image} alt={program.name} />
                  </div>
                  <div className="program-content">
                    <h3>{program.name}</h3>
                    <p className="program-description">{program.description}</p>
                    <div className="program-features">
                      <h4>{t.features}</h4>
                      <ul>
                        {program.features.slice(0, 5).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                        {program.features.length > 5 && (
                          <li>...och {program.features.length - 5} fler</li>
                        )}
                      </ul>
                    </div>
                    <div className="program-pricing">
                      <div className="price">{program.price}</div>
                      <div className="trial">{program.trial}</div>
                    </div>
                    <div className="program-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleProgramSelect(program)}
                      >
                        {t.learnMore}
                      </button>
                      <button className="btn btn-secondary">
                        {t.tryNow}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <section className="program-benefits">
              <h2>Varför välja våra program?</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">☁️</div>
                  <h3>{t.cloud}</h3>
                  <p>Alla program körs i molnet för säkerhet och tillgänglighet</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔒</div>
                  <h3>{t.security}</h3>
                  <p>Banknivå säkerhet med krypterad data</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📱</div>
                  <h3>{t.mobile}</h3>
                  <p>Mobila appar för alla våra program</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔗</div>
                  <h3>{t.integration}</h3>
                  <p>Perfekt integration mellan alla program</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💾</div>
                  <h3>{t.backup}</h3>
                  <p>Automatisk backup av all data</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔄</div>
                  <h3>{t.updates}</h3>
                  <p>Automatiska uppdateringar med nya funktioner</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="modal-overlay">
          <div className="modal program-modal">
            <div className="modal-header">
              <h2>{selectedProgram.name}</h2>
              <button 
                className="btn btn-sm btn-secondary"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="program-detail-image">
                <img src={selectedProgram.image} alt={selectedProgram.name} />
              </div>
              <p className="program-detail-description">{selectedProgram.description}</p>
              
              <div className="program-detail-features">
                <h3>{t.features}</h3>
                <ul>
                  {selectedProgram.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="program-detail-pricing">
                <div className="pricing-card">
                  <h3>Standard Plan</h3>
                  <div className="price-large">{selectedProgram.price}</div>
                  <div className="trial-info">{selectedProgram.trial}</div>
                  <button className="btn btn-primary btn-large">
                    {t.orderNow}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .programs-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .programs-intro {
          text-align: center;
          margin-bottom: 40px;
        }

        .programs-intro h2 {
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .programs-intro p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          max-width: 800px;
          margin: 0 auto;
        }

        .programs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .program-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e9ecef;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .program-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .program-image {
          height: 200px;
          overflow: hidden;
        }

        .program-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .program-content {
          padding: 25px;
        }

        .program-content h3 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 24px;
        }

        .program-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .program-features h4 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 18px;
        }

        .program-features ul {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .program-features li {
          padding: 5px 0;
          color: #555;
          position: relative;
          padding-left: 20px;
        }

        .program-features li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #28a745;
          font-weight: bold;
        }

        .program-pricing {
          margin-bottom: 20px;
          text-align: center;
        }

        .price {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 5px;
        }

        .trial {
          color: #28a745;
          font-weight: 500;
        }

        .program-actions {
          display: flex;
          gap: 10px;
        }

        .program-actions .btn {
          flex: 1;
        }

        .program-benefits {
          margin-top: 50px;
        }

        .program-benefits h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .benefit-item {
          text-align: center;
          padding: 20px;
        }

        .benefit-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .benefit-item h3 {
          color: #2c3e50;
          margin-bottom: 10px;
        }

        .benefit-item p {
          color: #666;
          line-height: 1.5;
        }

        .program-modal {
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .program-detail-image {
          text-align: center;
          margin-bottom: 20px;
        }

        .program-detail-image img {
          max-width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .program-detail-description {
          font-size: 18px;
          color: #555;
          margin-bottom: 30px;
          text-align: center;
        }

        .program-detail-features {
          margin-bottom: 30px;
        }

        .program-detail-features h3 {
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .program-detail-features ul {
          columns: 2;
          column-gap: 30px;
        }

        .program-detail-features li {
          padding: 5px 0;
          color: #555;
          break-inside: avoid;
        }

        .program-detail-pricing {
          text-align: center;
        }

        .pricing-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          border: 2px solid #007bff;
        }

        .pricing-card h3 {
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .price-large {
          font-size: 36px;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 10px;
        }

        .trial-info {
          color: #28a745;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .btn-large {
          padding: 15px 30px;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .programs-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          
          .program-detail-features ul {
            columns: 1;
          }
          
          .program-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default OtherPrograms;
