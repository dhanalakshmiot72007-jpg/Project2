import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { 
  IoSearchOutline, 
  IoBagOutline, 
  IoCloseOutline, 
  IoMenuOutline 
} from 'react-icons/io5';
import { 
  BsArrowRight, 
  BsChevronLeft, 
  BsChevronRight, 
  BsShieldCheck, 
  BsGem, 
  BsTruck, 
  BsAward 
} from 'react-icons/bs';
import { FiArrowUpRight, FiHeart, FiTrash2 } from 'react-icons/fi';
import AboutSection from './sections/AboutSection';
import AboutPage from './sections/AboutPage';
import FeaturedCollections from './sections/FeaturedCollections';
import ConsultationModal from './sections/ConsultationModal';
import CategoryPage from './components/CategoryPage';
import ProductDetailModal from './components/ProductDetailModal';
import WishlistDrawer from './components/WishlistDrawer';
import { 
  CATEGORY_CONFIGS, 
  PRODUCTS_DATA, 
  getProductsByCategory, 
  getProductById, 
  formatINR 
} from './data/productsData';
import './App.css';

// Curated Luxury High-Jewellery Campaign Slides
const CAMPAIGN_SLIDES = [
  {
    id: 1,
    tag: 'HAUTE JOAILLERIE 2026',
    headlineLead: 'Timeless Jewellery.',
    headlineAccent: 'Endless Elegance.',
    description:
      'Meticulously sculpted by master artisans using the rarest conflict-free diamonds and pure 18k precious metals. An eternal expression of distinction, grace, and modern heirloom heritage.',
    mainImage:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
    mainCaptionTag: 'PARISIAN HIGH JEWELLERY',
    mainCaptionTitle: 'AURORA DIAMOND COLLIER',
    mainCaptionSpec: '18K WHITE GOLD & 14.8 CARAT BRILLIANT PAVE',
    overlapImage:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
    overlapSubtitle: 'SOLITAIRE ATELIER',
    overlapTitle: 'Celestial Emerald Ring',
    overlapPrice: '₹15,40,000',
    priceNumber: 1540000,
    sealText: '100% ETHICALLY CERTIFIED',
  },
  {
    id: 2,
    tag: 'ROYAL HERITAGE SUITE',
    headlineLead: 'Pure Brilliance.',
    headlineAccent: 'Rare Gemstones.',
    description:
      'Indulge in vibrant certified royal sapphires and cascading emerald cuts designed to capture light from every facet. Crafted for memorable galas and lifetime milestones.',
    mainImage:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
    mainCaptionTag: 'ROYAL SAPPHIRE ARCHIVE',
    mainCaptionTitle: "L'ÉTOILE SAPPHIRE SUITE",
    mainCaptionSpec: 'ROYAL BLUE CEYLON SAPPHIRE & PLATINUM',
    overlapImage:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
    overlapSubtitle: 'EMERALD ARCHITECTURE',
    overlapTitle: 'Verdant Cascade Drops',
    overlapPrice: '₹19,80,000',
    priceNumber: 1980000,
    sealText: 'HANDCRAFTED IN PLACE VENDÔME',
  },
  {
    id: 3,
    tag: 'BRIDAL HEIRLOOMS',
    headlineLead: 'Devotion Eternal.',
    headlineAccent: 'Bespoke Heirlooms.',
    description:
      'Every solitaire tells an unforgettable love story. Our master setters hand-select each stone for exceptional cut, clarity, and incandescent brilliance that spans generations.',
    mainImage:
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85',
    mainCaptionTag: 'BRIDAL HIGH COUTURE',
    mainCaptionTitle: 'SERAPHINA SOLITAIRE PARURE',
    mainCaptionSpec: 'FLAWLESS DE BEERS CERTIFIED BRILLIANTS',
    overlapImage:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=85',
    overlapSubtitle: 'ENGAGEMENT COUTURE',
    overlapTitle: 'Aurelia Oval Halo Band',
    overlapPrice: '₹12,50,000',
    priceNumber: 1250000,
    sealText: 'LIFETIME GIA GUARANTEE',
  },
];

const NAVIGATION_ITEMS = [
  'ABOUT US',
  'DIAMOND JEWELLERY',
  'JEWELLERY',
  'ENGAGEMENT & BRIDAL',
  'WATCHES',
];

const SEARCH_SUGGESTIONS = [
  { label: 'Diamond Necklaces', targetRoute: 'diamond-jewellery' },
  { label: 'Emerald-Cut Solitaires', targetRoute: 'engagement-bridal' },
  { label: '18K Rose Gold Bangles', targetRoute: 'jewellery' },
  { label: 'Haute Joaillerie Earrings', targetRoute: 'diamond-jewellery' },
  { label: 'Bespoke Bridal Sets', targetRoute: 'engagement-bridal' },
  { label: 'Tourbillon Timepieces', targetRoute: 'watches' },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Parse hash to determine route and product deep link
  const parseHash = () => {
    if (typeof window === 'undefined') return { route: 'home', productId: null };
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').trim();

    if (hash.startsWith('product-') || hash.startsWith('product/')) {
      const pId = window.location.hash.replace(/^#\/?product[-/]/i, '').trim();
      return { route: null, productId: pId };
    }

    if (hash.includes('about')) return { route: 'about', productId: null };
    if (hash.includes('engagement') || hash.includes('bridal')) return { route: 'engagement-bridal', productId: null };
    if (hash.includes('watch')) return { route: 'watches', productId: null };
    if (hash.includes('jewellery') || hash.includes('jewelry')) {
      if (hash.includes('diamond')) {
        return { route: 'diamond-jewellery', productId: null };
      }
      return { route: 'jewellery', productId: null };
    }
    if (hash.includes('diamond')) return { route: 'diamond-jewellery', productId: null };

    return { route: 'home', productId: null };
  };

  const initialParsed = parseHash();
  const [currentRoute, setCurrentRoute] = useState(initialParsed.route || 'home');

  const [isConsultationOpen, setIsConsultationOpen] = useState(
    () => typeof window !== 'undefined' && window.location.hash.toLowerCase().includes('consultation')
  );

  // Synchronize route with hashchange and popstate events (supports browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const { route, productId } = parseHash();
      if (productId) {
        const prod = getProductById(productId);
        if (prod) {
          setSelectedProduct(prod);
          if (prod.category) setCurrentRoute(prod.category);
        }
      } else {
        setSelectedProduct(null);
        if (route) setCurrentRoute(route);
      }

      if (window.location.hash.toLowerCase().includes('consultation')) {
        setIsConsultationOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    // Initial check on mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Compute active navbar item from current route
  const activeNav = useMemo(() => {
    switch (currentRoute) {
      case 'about':
        return 'ABOUT US';
      case 'diamond-jewellery':
        return 'DIAMOND JEWELLERY';
      case 'jewellery':
        return 'JEWELLERY';
      case 'engagement-bridal':
        return 'ENGAGEMENT & BRIDAL';
      case 'watches':
        return 'WATCHES';
      default:
        return '';
    }
  }, [currentRoute]);

  const navigateTo = (route, targetId) => {
    setCurrentRoute(route);
    setSelectedProduct(null);

    if (route === 'home') {
      if (targetId) {
        window.location.hash = `#${targetId}`;
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.hash = `#${route}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // =========================================================================
  // PERSISTENT CART & WISHLIST VIA LOCALSTORAGE
  // =========================================================================
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('jea_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('jea_wishlist_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jea_cart_items', JSON.stringify(cartItems));
    } catch (err) {
      console.warn('Failed to persist cart:', err);
    }
  }, [cartItems]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jea_wishlist_ids', JSON.stringify(wishlistIds));
    } catch (err) {
      console.warn('Failed to persist wishlist:', err);
    }
  }, [wishlistIds]);

  // Cart operations
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
  }, [cartItems]);

  const handleAddToBag = (product, quantity = 1) => {
    const pId = product.id || `item-${Date.now()}`;
    const pName = product.name || product.title;
    const pSub = product.subCategory || product.subtitle || 'Haute Joaillerie';
    const pPrice = typeof product.price === 'number' 
      ? product.price 
      : product.priceNumber || 185000;
    const pImage = product.image;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === pId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: (next[existingIdx].quantity || 1) + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: pId,
            name: pName,
            subCategory: pSub,
            price: pPrice,
            image: pImage,
            quantity: quantity,
          },
        ];
      }
    });

    setIsBagOpen(true);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = (item.quantity || 1) + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromBag = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product) => {
    if (!product || !product.id) return;
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = useMemo(() => {
    return wishlistIds.map((id) => getProductById(id)).filter(Boolean);
  }, [wishlistIds]);

  // Product detail view handlers (with URL deep linking and browser back compatibility)
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    window.history.pushState(null, '', `#product-${product.id}`);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    if (window.location.hash.toLowerCase().includes('product-')) {
      window.history.pushState(null, '', `#${currentRoute}`);
    }
  };

  // Search Results inside Header Overlay
  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  // Animation Refs
  const containerRef = useRef(null);
  const imageStageRef = useRef(null);
  const textColRef = useRef(null);

  // GSAP Initial Reveal Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.jea-header', {
        y: -30,
        opacity: 0,
        duration: 1.0,
      })
      .from('.jea-nav-link', {
        y: -12,
        opacity: 0,
        stagger: 0.07,
        duration: 0.65,
      }, '-=0.6');

      if (currentRoute === 'home') {
        tl.from(['.jea-eyebrow', '.jea-headline', '.jea-hero-description', '.jea-cta-group', '.jea-slider-indicator-box'], {
          y: 35,
          opacity: 0,
          stagger: 0.12,
          duration: 0.95,
        }, '-=0.45')
        .from('.jea-main-photo-card', {
          scale: 0.93,
          y: 35,
          opacity: 0,
          duration: 1.15,
          ease: 'power2.out',
        }, '-=0.85')
        .from('.jea-overlap-photo-card', {
          scale: 0.85,
          x: 25,
          y: 25,
          opacity: 0,
          duration: 1.0,
          ease: 'back.out(1.4)',
        }, '-=0.75')
        .from('.jea-floating-seal', {
          scale: 0.7,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(1.6)',
        }, '-=0.7')
        .from('.jea-trust-item', {
          y: 18,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75,
        }, '-=0.4');
      }
    }, containerRef);

    return () => ctx.revert();
  }, [currentRoute]);

  // Animate Slide Change Transition
  const handleSlideChange = (newIndex) => {
    if (newIndex === currentSlide) return;

    gsap.to(['.jea-main-photo-card', '.jea-overlap-photo-card'], {
      opacity: 0.25,
      scale: 0.97,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentSlide(newIndex);
        gsap.to(['.jea-main-photo-card', '.jea-overlap-photo-card'], {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
        });
      },
    });

    gsap.fromTo(
      '.jea-headline',
      { y: 15, opacity: 0.4 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % CAMPAIGN_SLIDES.length;
    handleSlideChange(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length;
    handleSlideChange(prev);
  };

  const activeSlide = CAMPAIGN_SLIDES[currentSlide];

  return (
    <div className="jea-page-wrapper">
      {/* Ambient background shimmer */}
      <div className="jea-ambient-glow" />

      {/* Main Centered White Container */}
      <main className="jea-main-container" ref={containerRef}>
        <div className="jea-inner-frame">
          
          {/* ================= HEADER ================= */}
          <header className="jea-header">
            {/* Left: Search Button */}
            <div className="jea-header-left">
              <button
                type="button"
                className="jea-search-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                id="search-btn"
              >
                <IoSearchOutline className="jea-search-icon" />
                <span>Search</span>
              </button>
            </div>

            {/* Center: JEA Logo */}
            <a 
              href="#home" 
              className="jea-logo-container"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              aria-label="JEA Haute Joaillerie Home"
            >
              <span className="jea-brand-logo">JEA</span>
              <span className="jea-brand-subtitle">HAUTE JOAILLERIE</span>
            </a>

            {/* Right: Wishlist, Shopping Bag & Mobile Menu Toggle */}
            <div className="jea-header-right">
              {/* Wishlist Button */}
              <button
                type="button"
                className="jea-bag-btn"
                onClick={() => setIsWishlistOpen(true)}
                aria-label="View curated wishlist"
                id="wishlist-btn"
                title="Curated Wishlist"
              >
                <div className="jea-bag-icon-wrapper">
                  <FiHeart className="jea-bag-icon" />
                  {wishlistIds.length > 0 && (
                    <span className="jea-bag-count-badge">{wishlistIds.length}</span>
                  )}
                </div>
                <span>Wishlist ({wishlistIds.length})</span>
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                className="jea-bag-btn"
                onClick={() => setIsBagOpen(true)}
                aria-label="View shopping bag"
                id="bag-btn"
                title="Shopping Bag"
              >
                <div className="jea-bag-icon-wrapper">
                  <IoBagOutline className="jea-bag-icon" />
                  {cartCount > 0 && (
                    <span className="jea-bag-count-badge">{cartCount}</span>
                  )}
                </div>
                <span>Bag ({cartCount})</span>
              </button>

              <button
                type="button"
                className="jea-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
              </button>
            </div>
          </header>

          {/* ================= SEARCH OVERLAY ================= */}
          {isSearchOpen && (
            <div className="jea-search-overlay" role="dialog" aria-modal="true">
              <div className="jea-search-input-wrapper">
                <IoSearchOutline style={{ fontSize: '1.6rem', color: '#aa820a' }} />
                <input
                  type="text"
                  className="jea-search-input"
                  placeholder="Search diamond solitaires, bridal sets, Swiss timepieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="button"
                  className="jea-search-close-btn"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <IoCloseOutline />
                </button>
              </div>

              {/* Real-time Matching Products Dropdown */}
              {liveSearchResults.length > 0 && (
                <div className="jea-search-results-dropdown">
                  {liveSearchResults.map((item) => (
                    <div
                      key={item.id}
                      className="jea-search-result-item"
                      onClick={() => {
                        setIsSearchOpen(false);
                        handleViewDetails(item);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="jea-search-result-thumb"
                      />
                      <div className="jea-search-result-info">
                        <span className="jea-search-result-subcat">{item.subCategory}</span>
                        <div className="jea-search-result-title">{item.name}</div>
                        <div className="jea-search-result-price">{formatINR(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trending Search Suggestions */}
              <div className="jea-search-tags">
                <span className="jea-tag-label">Explore Collections:</span>
                {SEARCH_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="jea-tag-btn"
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo(sug.targetRoute);
                    }}
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= NAVIGATION ================= */}
          <nav className="jea-navigation" aria-label="Main Navigation">
            <ul className="jea-nav-list">
              {NAVIGATION_ITEMS.map((item) => {
                let targetRoute = 'home';
                if (item === 'ABOUT US') targetRoute = 'about';
                else if (item === 'DIAMOND JEWELLERY') targetRoute = 'diamond-jewellery';
                else if (item === 'JEWELLERY') targetRoute = 'jewellery';
                else if (item === 'ENGAGEMENT & BRIDAL') targetRoute = 'engagement-bridal';
                else if (item === 'WATCHES') targetRoute = 'watches';

                return (
                  <li key={item}>
                    <a
                      href={`#${targetRoute}`}
                      className={`jea-nav-link ${activeNav === item ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(targetRoute);
                      }}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Navigation Drawer */}
          <div className={`jea-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            {NAVIGATION_ITEMS.map((item) => {
              let targetRoute = 'home';
              if (item === 'ABOUT US') targetRoute = 'about';
              else if (item === 'DIAMOND JEWELLERY') targetRoute = 'diamond-jewellery';
              else if (item === 'JEWELLERY') targetRoute = 'jewellery';
              else if (item === 'ENGAGEMENT & BRIDAL') targetRoute = 'engagement-bridal';
              else if (item === 'WATCHES') targetRoute = 'watches';

              return (
                <a
                  key={item}
                  href={`#${targetRoute}`}
                  className={`jea-nav-link ${activeNav === item ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    navigateTo(targetRoute);
                  }}
                >
                  {item}
                </a>
              );
            })}
          </div>

          {/* ================= ROUTED VIEW CONTENT ================= */}
          {currentRoute === 'home' && (
            <>
              {/* ================= HERO SECTION ================= */}
              <section className="jea-hero-section">
                <div className="row align-items-center g-4 g-lg-5">
                  
                  {/* Left Hero Column */}
                  <div className="col-12 col-lg-6 jea-hero-left" ref={textColRef}>
                    <div className="jea-eyebrow">
                      <span className="jea-eyebrow-sparkle">✦</span>
                      <span>THE ART OF FINE JEWELLERY</span>
                    </div>

                    <h1 className="jea-headline">
                      <span className="jea-headline-light">{activeSlide.headlineLead}</span>
                      <span className="jea-headline-italic">{activeSlide.headlineAccent}</span>
                    </h1>

                    <p className="jea-hero-description">
                      {activeSlide.description}
                    </p>

                    <div className="jea-cta-group">
                      <button
                        type="button"
                        className="jea-btn-primary"
                        onClick={() => navigateTo('engagement-bridal')}
                        id="discover-btn"
                      >
                        <span>DISCOVER THE COLLECTION</span>
                        <BsArrowRight className="btn-icon" />
                      </button>

                      <button
                        type="button"
                        className="jea-btn-secondary"
                        onClick={() => {
                          setIsLiked(!isLiked);
                          setIsConsultationOpen(true);
                        }}
                      >
                        <FiHeart style={{ color: isLiked ? '#e11d48' : 'currentColor', fill: isLiked ? '#e11d48' : 'none' }} />
                        <span>PRIVATE VIEWING</span>
                      </button>
                    </div>

                    {/* Slider Indicator & Controls */}
                    <div className="jea-slider-indicator-box">
                      <div className="jea-slide-counter">
                        <span>0{currentSlide + 1}</span>
                        <span className="jea-slide-total">/ 0{CAMPAIGN_SLIDES.length}</span>
                      </div>

                      <div className="jea-progress-track">
                        <div
                          className="jea-progress-fill"
                          style={{
                            width: `${((currentSlide + 1) / CAMPAIGN_SLIDES.length) * 100}%`,
                          }}
                        />
                      </div>

                      <div className="jea-slider-arrows">
                        <button
                          type="button"
                          className="jea-arrow-btn"
                          onClick={prevSlide}
                          aria-label="Previous slide"
                          id="prev-slide-btn"
                        >
                          <BsChevronLeft />
                        </button>
                        <button
                          type="button"
                          className="jea-arrow-btn"
                          onClick={nextSlide}
                          aria-label="Next slide"
                          id="next-slide-btn"
                        >
                          <BsChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Hero Column: Dual Overlapping Photographs */}
                  <div className="col-12 col-lg-6 jea-hero-right" ref={imageStageRef}>
                    <div className="jea-image-stage">
                      
                      {/* Floating Luxury Seal */}
                      <div className="jea-floating-seal">
                        <span className="jea-seal-dot" />
                        <span>{activeSlide.sealText}</span>
                      </div>

                      {/* 1. Large Luxury Campaign Photograph */}
                      <div className="jea-main-photo-card">
                        <img
                          src={activeSlide.mainImage}
                          alt={activeSlide.mainCaptionTitle}
                          className="jea-main-img"
                          loading="eager"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85';
                          }}
                        />
                        <div className="jea-main-img-overlay">
                          <span className="jea-main-caption-tag">{activeSlide.mainCaptionTag}</span>
                          <h2 className="jea-main-caption-title">{activeSlide.mainCaptionTitle}</h2>
                          <span className="jea-main-caption-spec">{activeSlide.mainCaptionSpec}</span>
                        </div>
                      </div>

                      {/* 2. Smaller Overlapping Jewellery Photograph */}
                      <div className="jea-overlap-photo-card">
                        <div className="jea-overlap-img-inner">
                          <img
                            src={activeSlide.overlapImage}
                            alt={activeSlide.overlapTitle}
                            className="jea-overlap-img"
                            loading="eager"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85';
                            }}
                          />
                        </div>
                        <div className="jea-overlap-caption-box">
                          <div className="jea-overlap-subtitle">{activeSlide.overlapSubtitle}</div>
                          <div className="jea-overlap-title">{activeSlide.overlapTitle}</div>
                          <div className="d-flex justify-content-between align-items-center mt-1">
                            <span className="jea-overlap-price">{activeSlide.overlapPrice}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-link p-0 text-dark"
                              style={{ fontSize: '0.7rem', textDecoration: 'none' }}
                              onClick={() => {
                                handleAddToBag({
                                  id: `hero-${activeSlide.id}`,
                                  title: activeSlide.overlapTitle,
                                  subtitle: activeSlide.overlapSubtitle,
                                  priceNumber: activeSlide.priceNumber,
                                  image: activeSlide.overlapImage,
                                });
                              }}
                              aria-label={`Add ${activeSlide.overlapTitle} to bag`}
                            >
                              <FiArrowUpRight style={{ color: '#9f1239', fontSize: '1rem' }} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </section>

              {/* ================= ABOUT SECTION ================= */}
              <AboutSection onDiscoverStory={() => navigateTo('about')} />

              {/* ================= FEATURED COLLECTIONS SECTION ================= */}
              <FeaturedCollections 
                onBookConsultation={() => setIsConsultationOpen(true)}
                onSelectCollection={() => {
                  navigateTo('diamond-jewellery');
                }}
              />
            </>
          )}

          {currentRoute === 'about' && (
            <AboutPage
              onBack={() => navigateTo('home')}
              onBookConsultation={() => setIsConsultationOpen(true)}
              onExploreCollections={() => navigateTo('engagement-bridal')}
            />
          )}

          {currentRoute === 'engagement-bridal' && (
            <CategoryPage
              key="engagement-bridal"
              categoryConfig={CATEGORY_CONFIGS['engagement-bridal']}
              products={getProductsByCategory('engagement-bridal')}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToBag={handleAddToBag}
              onViewDetails={handleViewDetails}
              onBookConsultation={() => setIsConsultationOpen(true)}
              onBackToHome={() => navigateTo('home')}
            />
          )}

          {currentRoute === 'watches' && (
            <CategoryPage
              key="watches"
              categoryConfig={CATEGORY_CONFIGS['watches']}
              products={getProductsByCategory('watches')}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToBag={handleAddToBag}
              onViewDetails={handleViewDetails}
              onBookConsultation={() => setIsConsultationOpen(true)}
              onBackToHome={() => navigateTo('home')}
            />
          )}

          {currentRoute === 'jewellery' && (
            <CategoryPage
              key="jewellery"
              categoryConfig={CATEGORY_CONFIGS['jewellery']}
              products={getProductsByCategory('jewellery')}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToBag={handleAddToBag}
              onViewDetails={handleViewDetails}
              onBookConsultation={() => setIsConsultationOpen(true)}
              onBackToHome={() => navigateTo('home')}
            />
          )}

          {currentRoute === 'diamond-jewellery' && (
            <>
              <CategoryPage
                key="diamond-jewellery"
                categoryConfig={CATEGORY_CONFIGS['diamond-jewellery']}
                products={getProductsByCategory('diamond-jewellery')}
                wishlistIds={wishlistIds}
                onToggleWishlist={handleToggleWishlist}
                onAddToBag={handleAddToBag}
                onViewDetails={handleViewDetails}
                onBookConsultation={() => setIsConsultationOpen(true)}
                onBackToHome={() => navigateTo('home')}
              />
              <FeaturedCollections 
                onBookConsultation={() => setIsConsultationOpen(true)}
                onSelectCollection={() => {
                  window.scrollTo({ top: 350, behavior: 'smooth' });
                }}
              />
            </>
          )}

          {/* ================= LUXURY TRUST & HERITAGE BAR ================= */}
          <footer className="jea-trust-bar">
            <div className="jea-trust-item">
              <BsGem className="jea-trust-icon" />
              <div className="jea-trust-text-col">
                <span className="jea-trust-title">Conflict-Free Diamonds</span>
                <span className="jea-trust-desc">100% Kimberly Process compliant</span>
              </div>
            </div>

            <div className="jea-trust-item">
              <BsAward className="jea-trust-icon" />
              <div className="jea-trust-text-col">
                <span className="jea-trust-title">Master Atelier Craft</span>
                <span className="jea-trust-desc">Hand-finished by Parisian jewelers</span>
              </div>
            </div>

            <div className="jea-trust-item">
              <BsTruck className="jea-trust-icon" />
              <div className="jea-trust-text-col">
                <span className="jea-trust-title">White-Glove Delivery</span>
                <span className="jea-trust-desc">Complimentary & fully insured</span>
              </div>
            </div>

            <div className="jea-trust-item">
              <BsShieldCheck className="jea-trust-icon" />
              <div className="jea-trust-text-col">
                <span className="jea-trust-title">Lifetime Care & GIA</span>
                <span className="jea-trust-desc">Certified authenticity guarantee</span>
              </div>
            </div>
          </footer>

        </div>
      </main>

      {/* ================= SHOPPING BAG DRAWER ================= */}
      {isBagOpen && (
        <div className="jea-bag-backdrop" onClick={() => setIsBagOpen(false)}>
          <aside 
            className="jea-bag-drawer" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Shopping Bag"
          >
            <div className="jea-bag-header">
              <h3 className="jea-bag-title">Your Shopping Bag ({cartCount})</h3>
              <button
                type="button"
                className="jea-search-close-btn"
                onClick={() => setIsBagOpen(false)}
                aria-label="Close bag drawer"
              >
                <IoCloseOutline />
              </button>
            </div>

            <div className="jea-bag-body">
              {cartItems.length === 0 ? (
                <div className="jea-bag-empty">
                  <IoBagOutline className="jea-bag-empty-icon" />
                  <p style={{ fontWeight: 600, color: '#1a1a1c', fontSize: '1.05rem' }}>Your bag is currently empty</p>
                  <p style={{ fontSize: '0.84rem', color: '#7b7886', lineHeight: 1.5 }}>
                    Explore our High Jewellery creations and add your chosen heirloom.
                  </p>
                  <button
                    type="button"
                    className="jea-btn-primary mt-3"
                    onClick={() => {
                      setIsBagOpen(false);
                      navigateTo('engagement-bridal');
                    }}
                  >
                    <span>EXPLORE BRIDAL & HIGH JEWELLERY</span>
                  </button>
                </div>
              ) : (
                <div className="jea-cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="jea-cart-item-card">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="jea-cart-item-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85';
                        }}
                      />
                      <div className="jea-cart-item-details">
                        <span className="jea-cart-item-subcat">{item.subCategory}</span>
                        <div className="jea-cart-item-name">{item.name}</div>
                        <div className="jea-cart-item-price">{formatINR(item.price)}</div>

                        <div className="jea-cart-item-controls">
                          <div className="jea-cart-qty-ctrl">
                            <button
                              type="button"
                              className="jea-cart-qty-btn"
                              onClick={() => handleUpdateCartQty(item.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="jea-cart-qty-count">{item.quantity}</span>
                            <button
                              type="button"
                              className="jea-cart-qty-btn"
                              onClick={() => handleUpdateCartQty(item.id, 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className="jea-cart-remove-btn"
                            onClick={() => handleRemoveFromBag(item.id)}
                            aria-label={`Remove ${item.name} from bag`}
                            title="Remove"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Curated Preview Card in Bag */}
              <div className="jea-bag-featured-preview">
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#aa820a', fontWeight: 700 }}>
                  COMPLIMENTARY CONCIERGE & INSURED DELIVERY
                </span>
                <p style={{ fontSize: '0.78rem', color: '#555', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                  Each creation arrives in a signature velvet box with an embossed GIA certificate of authenticity and complimentary lifetime maintenance.
                </p>
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="jea-bag-footer">
                <div className="jea-cart-summary">
                  <span className="jea-cart-subtotal-label">Subtotal ({cartCount} pieces):</span>
                  <span className="jea-cart-subtotal-val">{formatINR(cartTotal)}</span>
                </div>
                <button
                  type="button"
                  className="jea-btn-primary w-100 justify-content-center"
                  onClick={() => {
                    alert(`Thank you for your acquisition request of ${formatINR(cartTotal)}. Our Place Vendôme private concierge will contact you to coordinate insured delivery and payment verification.`);
                  }}
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <BsArrowRight />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ================= WISHLIST DRAWER ================= */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => {
          setWishlistIds((prev) => prev.filter((i) => i !== id));
        }}
        onMoveToBag={(item) => {
          handleAddToBag(item);
        }}
        onViewProduct={(item) => {
          handleViewDetails(item);
        }}
      />

      {/* ================= PRODUCT DETAIL MODAL ================= */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={handleCloseDetails}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToBag={handleAddToBag}
        onBookConsultation={() => {
          setIsConsultationOpen(true);
        }}
      />

      {/* ================= ATELIER CONSULTATION MODAL ================= */}
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          if (window.location.hash.toLowerCase().includes('consultation')) {
            window.location.hash = currentRoute === 'home' ? '#home' : `#${currentRoute}`;
          }
        }}
      />

    </div>
  );
}
