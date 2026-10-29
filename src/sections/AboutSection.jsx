import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BsArrowRight, 
  BsClockHistory, 
  BsStars, 
  BsCalendarHeart 
} from 'react-icons/bs';
import './AboutSection.css';
import aboutJewelleryImg from '../assets/about-jewellery.jpg';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ onDiscoverStory }) {
  const sectionRef = useRef(null);
  const imageStageRef = useRef(null);
  const contentColRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    // Respect user's accessibility preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Reveal jewellery image with smooth upward glide and subtle scale
      gsap.fromTo(
        imageStageRef.current,
        { y: 35, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageStageRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Stagger in the brand story elements smoothly
      gsap.fromTo(
        '.jea-about-reveal',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentColRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Stagger animate the 3 Brand Values when they enter viewport
      gsap.fromTo(
        '.jea-about-value-item',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    // Refresh ScrollTrigger after DOM has settled
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleDiscoverStory = (e) => {
    e.preventDefault();
    if (onDiscoverStory) {
      onDiscoverStory();
    } else {
      window.location.hash = '#about';
    }
  };

  return (
    <section 
      className="jea-about-section" 
      id="about-us" 
      ref={sectionRef}
      aria-label="About JEA Jewellery"
    >
      <div className="jea-about-container">
        
        {/* Main 2-Column Editorial Grid: Image Left, Brand Story Right */}
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* LEFT SIDE — JEWELLERY PHOTOGRAPH */}
          <div className="col-12 col-lg-6 jea-about-image-col">
            <div className="jea-about-image-stage" ref={imageStageRef}>
              
              {/* Decorative Champagne-Gold Offset Frame */}
              <div className="jea-about-gold-frame" aria-hidden="true" />

              {/* Floating Champagne-Gold Artisan Seal */}
              <div className="jea-about-floating-seal">
                <span className="jea-about-seal-sparkle">✦</span>
                <span>ATELIER HIGH JEWELLERY</span>
              </div>

              {/* Editorial Image Card */}
              <div className="jea-about-image-card">
                <img
                  src={aboutJewelleryImg}
                  alt="JEA Mastercrafted 18k Champagne Gold and Diamond Necklace"
                  className="jea-about-img"
                  loading="lazy"
                  onError={(e) => {
                    // Resilient luxury editorial fallback
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
                <div className="jea-about-img-vignette" />

                <div className="jea-about-img-caption">
                  <div>
                    <div className="jea-about-caption-sub">HEIRLOOM ARCHIVE</div>
                    <div className="jea-about-caption-label">Aurelia Collier</div>
                  </div>
                  <div className="jea-about-caption-sub">18K SOLID GOLD</div>
                </div>
              </div>

              {/* Decorative Champagne-Gold Corner Accent Badge */}
              <div className="jea-about-corner-badge" aria-hidden="true">
                <span className="jea-about-badge-year">JEA</span>
                <span className="jea-about-badge-text">EST. 2026</span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE — BRAND STORY */}
          <div className="col-12 col-lg-6 jea-about-content-col" ref={contentColRef}>
            
            {/* Small Label */}
            <div className="jea-about-eyebrow jea-about-reveal">
              <span className="jea-about-eyebrow-line" />
              <span className="jea-about-eyebrow-sparkle">✦</span>
              <span>OUR STORY</span>
            </div>

            {/* Main Heading */}
            <h2 className="jea-about-heading jea-about-reveal">
              <span className="jea-about-heading-lead">More Than Jewellery,</span>
              <span className="jea-about-heading-accent">A Reflection of You.</span>
            </h2>

            {/* Description Paragraph 1 */}
            <p className="jea-about-description-lead jea-about-reveal">
              At JEA Jewellery, we believe every piece tells a story.
              Inspired by timeless beauty and modern elegance, our collections
              celebrate individuality, meaningful moments, and the beauty
              of self-expression.
            </p>

            {/* Description Paragraph 2 */}
            <p className="jea-about-description-secondary jea-about-reveal">
              From everyday elegance to unforgettable occasions, discover
              designs that make every moment feel special.
            </p>

            {/* CTA Button Group */}
            <div className="jea-about-btn-group jea-about-reveal">
              <a
                href="#about"
                className="jea-about-btn-primary"
                id="discover-our-story-btn"
                onClick={handleDiscoverStory}
              >
                <span>Discover Our Story</span>
                <BsArrowRight className="btn-arrow-icon" />
              </a>

              <a
                href="#about"
                className="jea-about-btn-link"
                onClick={handleDiscoverStory}
              >
                <span>ATELIER ARCHIVE</span>
                <span style={{ fontSize: '0.85rem' }}>↗</span>
              </a>
            </div>

          </div>

        </div>

        {/* ================= BRAND VALUES ================= */}
        <div className="jea-about-values-wrapper" id="brand-values" ref={valuesRef}>
          <div className="jea-about-values-badge-top">
            <span>✦</span>
            <span>OUR ATELIER PILLARS</span>
            <span>✦</span>
          </div>

          <div className="row g-4">
            
            {/* Value 1: TIMELESS DESIGN */}
            <div className="col-12 col-md-4">
              <div className="jea-about-value-item">
                <div className="jea-about-value-icon-box">
                  <BsClockHistory />
                </div>
                <h3 className="jea-about-value-title">TIMELESS DESIGN</h3>
                <p className="jea-about-value-desc">
                  Styles designed to stay beautiful beyond trends.
                </p>
              </div>
            </div>

            {/* Value 2: ATTENTION TO DETAIL */}
            <div className="col-12 col-md-4">
              <div className="jea-about-value-item">
                <div className="jea-about-value-icon-box">
                  <BsStars />
                </div>
                <h3 className="jea-about-value-title">ATTENTION TO DETAIL</h3>
                <p className="jea-about-value-desc">
                  Every detail matters in creating an elegant look.
                </p>
              </div>
            </div>

            {/* Value 3: MADE FOR YOUR MOMENTS */}
            <div className="col-12 col-md-4">
              <div className="jea-about-value-item">
                <div className="jea-about-value-icon-box">
                  <BsCalendarHeart />
                </div>
                <h3 className="jea-about-value-title">MADE FOR YOUR MOMENTS</h3>
                <p className="jea-about-value-desc">
                  Jewellery to celebrate your everyday and special occasions.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
