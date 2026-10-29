import { useEffect } from 'react';
import { 
  BsArrowRight, 
  BsClockHistory, 
  BsStars, 
  BsCalendarHeart, 
  BsGem, 
  BsShieldCheck, 
  BsAward,
  BsChevronLeft
} from 'react-icons/bs';
import './AboutPage.css';
import aboutJewelleryImg from '../assets/about-jewellery.jpg';

export default function AboutPage({ onBack, onBookConsultation, onExploreCollections }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <article className="jea-about-page" aria-label="About JEA Haute Joaillerie">
      
      {/* Back to Boutique Navigation Breadcrumb */}
      <nav className="jea-about-page-nav" aria-label="Breadcrumb">
        <button 
          type="button" 
          className="jea-about-back-btn" 
          onClick={onBack}
          aria-label="Back to boutique homepage"
        >
          <BsChevronLeft />
          <span>Back to Boutique</span>
        </button>
        <span className="jea-about-nav-separator">/</span>
        <span className="jea-about-nav-current">Our Story & Atelier Heritage</span>
      </nav>

      {/* Hero Header for About Page */}
      <header className="jea-about-page-hero">
        <div className="jea-about-page-eyebrow">
          <span className="jea-about-page-sparkle">✦</span>
          <span>HAUTE JOAILLERIE HERITAGE</span>
          <span className="jea-about-page-sparkle">✦</span>
        </div>

        <h1 className="jea-about-page-title">
          The Story of JEA
        </h1>

        <p className="jea-about-page-subtitle">
          Sculpted with devotion, born from Place Vendôme traditions, and dedicated to timeless elegance.
        </p>

        <div className="jea-about-page-divider" aria-hidden="true">
          <span className="jea-about-divider-line" />
          <BsGem className="jea-about-divider-gem" />
          <span className="jea-about-divider-line" />
        </div>
      </header>

      {/* Main Editorial Story Section */}
      <section className="jea-about-story-section">
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* Left Column: Handcrafted Heirloom Image */}
          <div className="col-12 col-lg-6">
            <div className="jea-about-hero-image-stage">
              <div className="jea-about-page-gold-frame" aria-hidden="true" />
              <div className="jea-about-hero-image-card">
                <img
                  src={aboutJewelleryImg}
                  alt="JEA Mastercrafted 18k Champagne Gold and Diamond Necklace"
                  className="jea-about-hero-img"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
                <div className="jea-about-hero-img-overlay">
                  <span className="jea-about-overlay-tag">PLACE VENDÔME ATELIER</span>
                  <span className="jea-about-overlay-title">Aurelia Collier 18K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="col-12 col-lg-6">
            <div className="jea-about-story-content">
              <span className="jea-about-mini-tag">OUR ORIGIN & PHILOSOPHY</span>
              <h2 className="jea-about-story-heading">
                More Than Jewellery, A Reflection of You.
              </h2>
              <p className="jea-about-story-text">
                At JEA Jewellery, we believe that fine jewellery is not merely an accessory, 
                but an intimate heirloom carrying personal memories across generations. 
                Every curve is intentionally shaped by hand, capturing light with unmatched brilliance.
              </p>
              <p className="jea-about-story-text">
                Inspired by classical architecture and modern femininity, our maison selects 
                only rare, ethically certified diamonds. Each creation represents an eternal 
                expression of individuality, personal triumph, and enduring devotion.
              </p>
              
              <div className="jea-about-cta-row">
                <button
                  type="button"
                  className="jea-btn-primary"
                  onClick={onBookConsultation}
                >
                  <span>Book Private Consultation</span>
                  <BsArrowRight />
                </button>

                <button
                  type="button"
                  className="jea-btn-secondary"
                  onClick={onExploreCollections}
                >
                  <span>Explore Collections</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Jewellery Craftsmanship Pillars */}
      <section className="jea-craft-section" aria-labelledby="craftsmanship-heading">
        <div className="jea-craft-header text-center">
          <span className="jea-about-mini-tag">THE ART OF PERFECTION</span>
          <h2 id="craftsmanship-heading" className="jea-craft-heading">
            Uncompromising Craftsmanship
          </h2>
          <p className="jea-craft-subtitle">
            From rough gemstone selection to final mirror polish, our master setters honor the highest European traditions.
          </p>
        </div>

        <div className="row g-4 mt-2">
          
          <div className="col-12 col-md-4">
            <div className="jea-craft-card">
              <div className="jea-craft-icon-box">
                <BsGem />
              </div>
              <h3 className="jea-craft-card-title">1. Conflict-Free Selection</h3>
              <p className="jea-craft-card-desc">
                Every solitaire is 100% compliant with the Kimberley Process. We select only stones in the top 1% of color (D-F) and clarity (FL-VVS) grades.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="jea-craft-card">
              <div className="jea-craft-icon-box">
                <BsAward />
              </div>
              <h3 className="jea-craft-card-title">2. Parisian Master Setting</h3>
              <p className="jea-craft-card-desc">
                Over 120 hours of microscopic bench-work are dedicated to every high-jewellery parure. Micro-prongs and bezel seats are sculpted by hand.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="jea-craft-card">
              <div className="jea-craft-icon-box">
                <BsShieldCheck />
              </div>
              <h3 className="jea-craft-card-title">3. Lifetime Care & GIA</h3>
              <p className="jea-craft-card-desc">
                Every piece arrives with an international GIA laboratory dossier, an insurance appraisal, and complimentary lifetime maintenance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Brand Values */}
      <section className="jea-values-section" aria-labelledby="values-heading">
        <div className="jea-about-values-badge-top">
          <span>✦</span>
          <span>OUR CORE ATELIER PILLARS</span>
          <span>✦</span>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="jea-about-value-item">
              <div className="jea-about-value-icon-box">
                <BsClockHistory />
              </div>
              <h3 className="jea-about-value-title">TIMELESS DESIGN</h3>
              <p className="jea-about-value-desc">
                Styles designed to stay beautiful beyond trends, transcending eras with quiet elegance.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="jea-about-value-item">
              <div className="jea-about-value-icon-box">
                <BsStars />
              </div>
              <h3 className="jea-about-value-title">ATTENTION TO DETAIL</h3>
              <p className="jea-about-value-desc">
                Every facet, curve, and hidden under-gallery is finished to perfection for tactile luxury.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="jea-about-value-item">
              <div className="jea-about-value-icon-box">
                <BsCalendarHeart />
              </div>
              <h3 className="jea-about-value-title">MADE FOR YOUR MOMENTS</h3>
              <p className="jea-about-value-desc">
                Jewellery crafted to celebrate daily radiance as well as once-in-a-lifetime milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Callout Banner */}
      <section className="jea-about-bottom-banner">
        <div className="jea-bottom-banner-content text-center">
          <span className="jea-about-mini-tag">YOUR BESPOKE JOURNEY</span>
          <h2 className="jea-bottom-banner-heading">Create a Custom Heirloom</h2>
          <p className="jea-bottom-banner-desc">
            Collaborate directly with our master gemologists to commission a one-of-a-kind diamond piece.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
            <button
              type="button"
              className="jea-btn-primary"
              onClick={onBookConsultation}
            >
              <span>Book Atelier Consultation</span>
              <BsArrowRight />
            </button>
            <button
              type="button"
              className="jea-btn-secondary"
              onClick={onBack}
            >
              <span>Return to Boutique</span>
            </button>
          </div>
        </div>
      </section>

    </article>
  );
}
