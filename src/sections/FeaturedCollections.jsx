import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BsArrowRight, BsGem } from 'react-icons/bs';
import { FiArrowUpRight, FiHeart } from 'react-icons/fi';
import './FeaturedCollections.css';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Curated Luxury Diamond Jewellery Collections
const COLLECTIONS_DATA = [
  {
    id: 'diamond-rings',
    name: 'Diamond Rings',
    tag: 'SOLITAIRE & BANDS',
    creationCount: '34 CREATIONS',
    description: 'Artisanal solitaires, radiant halos, and bespoke wedding bands handcrafted with certified conflict-free diamonds.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85',
    link: '#diamond-rings',
    priceStarting: 'From $4,200',
  },
  {
    id: 'diamond-necklaces',
    name: 'Diamond Necklaces',
    tag: 'COLLIERS & PENDANTS',
    creationCount: '28 CREATIONS',
    description: 'Captivating high-jewellery colliers and illuminated pendants sculpted to grace every neckline with incandescent fire.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
    link: '#diamond-necklaces',
    priceStarting: 'From $6,800',
  },
  {
    id: 'diamond-earrings',
    name: 'Diamond Earrings',
    tag: 'DROPS & CHANDELIERS',
    creationCount: '26 CREATIONS',
    description: 'Cascading diamond drops, architectural chandeliers, and timeless studs masterfully cut to capture light from every angle.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=85',
    link: '#diamond-earrings',
    priceStarting: 'From $3,500',
  },
  {
    id: 'diamond-bracelets',
    name: 'Diamond Bracelets',
    tag: 'TENNIS & CUFFS',
    creationCount: '22 CREATIONS',
    description: 'Fluid eternity tennis bracelets and sculpted 18k gold cuffs engineered with seamless clasps for effortless luxury.',
    image: 'https://images.unsplash.com/photo-1611591475878-fa6c88820c78?auto=format&fit=crop&w=900&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=85',
    link: '#diamond-bracelets',
    priceStarting: 'From $5,100',
  },
];

export default function FeaturedCollections({ 
  collections = COLLECTIONS_DATA,
  onSelectCollection,
  onBookConsultation
}) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsGridRef = useRef(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCardClick = (e, collection) => {
    if (onSelectCollection) {
      e.preventDefault();
      onSelectCollection(collection);
    }
  };

  useEffect(() => {
    // Respect reduced-motion accessibility preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Fade in and slide up Section Header
      gsap.fromTo(
        headerRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Stagger reveal collection cards smoothly
      gsap.fromTo(
        '.jea-collection-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleConsultationClick = (e) => {
    e.preventDefault();
    if (onBookConsultation) {
      onBookConsultation();
    } else {
      window.location.hash = '#consultation';
    }
  };

  return (
    <section 
      className="jea-collections-section" 
      id="featured-collections" 
      ref={sectionRef}
      aria-label="Featured Jewellery Collections"
    >
      <div className="jea-collections-container">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="jea-collections-header" ref={headerRef}>
          {/* Eyebrow badge */}
          <div className="jea-collections-eyebrow">
            <span className="jea-collections-eyebrow-line" aria-hidden="true" />
            <span className="jea-collections-eyebrow-sparkle">✦</span>
            <span>HAUTE JOAILLERIE SUITE</span>
            <span className="jea-collections-eyebrow-sparkle">✦</span>
            <span className="jea-collections-eyebrow-line" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2 className="jea-collections-heading">
            Discover Our Collections
          </h2>

          {/* Subtitle */}
          <p className="jea-collections-subtitle">
            Exceptional creations, designed to become timeless treasures.
          </p>

          {/* Luxury decorative separator */}
          <div className="jea-collections-divider" aria-hidden="true">
            <span className="jea-collections-divider-line" />
            <BsGem className="jea-collections-divider-gem" />
            <span className="jea-collections-divider-line" />
          </div>
        </div>

        {/* ================= 4-COLUMN CARDS GRID ================= */}
        <div className="row g-4 jea-collections-grid" ref={cardsGridRef}>
          {collections.map((item, index) => {
            const isFav = favorites[item.id];

            return (
              <div 
                key={item.id} 
                className="col-12 col-sm-6 col-lg-3 d-flex"
              >
                <a
                  href={item.link}
                  className="jea-collection-card"
                  id={`collection-card-${item.id}`}
                  onClick={(e) => handleCardClick(e, item)}
                  aria-label={`Explore ${item.name}`}
                  data-index={index}
                >
                  {/* Card Visual / Image Wrapper */}
                  <div className="jea-collection-image-wrapper">
                    <img
                      src={item.image}
                      alt={`JEA Haute Joaillerie ${item.name}`}
                      className="jea-collection-img"
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                          e.currentTarget.src = item.fallbackImage;
                        }
                      }}
                    />

                    {/* Gradient Overlay for rich contrast */}
                    <div className="jea-collection-vignette" aria-hidden="true" />

                    {/* Top Tag & Wishlist Button */}
                    <div className="jea-collection-card-topbar">
                      <span className="jea-collection-pill-tag">
                        {item.tag}
                      </span>
                      <button
                        type="button"
                        className={`jea-collection-fav-btn ${isFav ? 'is-active' : ''}`}
                        onClick={(e) => toggleFavorite(e, item.id)}
                        aria-label={`Save ${item.name} to wishlist`}
                      >
                        <FiHeart className="jea-collection-heart-icon" />
                      </button>
                    </div>

                    {/* Bottom Floating Creation Count */}
                    <div className="jea-collection-img-bottom">
                      <span className="jea-collection-count-badge">
                        {item.creationCount}
                      </span>
                      <span className="jea-collection-price-badge">
                        {item.priceStarting}
                      </span>
                    </div>
                  </div>

                  {/* Card Details / Content Body */}
                  <div className="jea-collection-body">
                    <div className="jea-collection-category-number">
                      0{index + 1}
                    </div>

                    <h3 className="jea-collection-title">
                      {item.name}
                    </h3>

                    <p className="jea-collection-description">
                      {item.description}
                    </p>

                    {/* Explore Link with Subtle Arrow Icon */}
                    <div className="jea-collection-footer">
                      <span className="jea-collection-explore-link">
                        <span className="jea-explore-text">Explore Collection</span>
                        <BsArrowRight className="jea-explore-arrow" aria-hidden="true" />
                      </span>
                      <span className="jea-explore-corner-icon" aria-hidden="true">
                        <FiArrowUpRight />
                      </span>
                    </div>
                  </div>

                  {/* Elegant bottom gold accent line */}
                  <div className="jea-collection-card-accent-border" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>

        {/* ================= ATELIER CONCIERGE BANNER ================= */}
        <div className="jea-collections-bespoke-footer">
          <div className="jea-bespoke-inner">
            <div className="jea-bespoke-text">
              <span className="jea-bespoke-label">BESPOKE COMMISSIONS</span>
              <h4 className="jea-bespoke-heading">Seeking a Unique Masterpiece?</h4>
              <p className="jea-bespoke-sub">
                Our Place Vendôme artisans craft private bespoke commissions tailored to your exact desires.
              </p>
            </div>
            <button 
              type="button"
              className="jea-bespoke-btn"
              id="book-atelier-consultation-btn"
              onClick={handleConsultationClick}
              aria-label="Book atelier private consultation"
            >
              <span>Book Atelier Consultation</span>
              <BsArrowRight className="jea-bespoke-arrow" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
