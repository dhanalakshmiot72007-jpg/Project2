import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  BsGem, 
  BsChevronDown, 
  BsArrowRight, 
  BsFilter, 
  BsSearch, 
  BsX,
  BsChevronLeft
} from 'react-icons/bs';
import ProductCard from './ProductCard';
import './CategoryPage.css';

export default function CategoryPage({
  categoryConfig,
  products = [],
  wishlistIds = [],
  onToggleWishlist,
  onAddToBag,
  onViewDetails,
  onBookConsultation,
  onBackToHome,
}) {
  const [selectedSubCat, setSelectedSubCat] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const containerRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Subtle GSAP entrance animation for category products
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.jea-cat-hero-fade',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.jea-product-card',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedSubCat, sortBy, categoryConfig.id]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Subcategory filter
    if (selectedSubCat !== 'All') {
      result = result.filter(
        (p) => p.subCategory?.toLowerCase() === selectedSubCat.toLowerCase()
      );
    }

    // 2. Search keyword filter
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.gemstone?.toLowerCase().includes(q) ||
          p.metal?.toLowerCase().includes(q)
      );
    }

    // 3. Price & Rating Sorting
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'highest-rated') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedSubCat, searchKeyword, sortBy]);

  const handleResetFilters = () => {
    setSelectedSubCat('All');
    setSearchKeyword('');
    setSortBy('featured');
  };

  const isFiltered = selectedSubCat !== 'All' || searchKeyword.trim() !== '' || sortBy !== 'featured';

  return (
    <div className="jea-category-page" ref={containerRef} aria-label={`${categoryConfig.heading} Collection`}>
      
      {/* Breadcrumb Navigation */}
      <nav className="jea-cat-breadcrumb-nav" aria-label="Breadcrumb">
        <button 
          type="button" 
          className="jea-cat-back-btn" 
          onClick={onBackToHome}
          aria-label="Back to boutique homepage"
        >
          <BsChevronLeft />
          <span>Home</span>
        </button>
        <span className="jea-cat-breadcrumb-sep">/</span>
        <span className="jea-cat-breadcrumb-current">{categoryConfig.navLabel}</span>
      </nav>

      {/* Hero Header */}
      <header className="jea-category-hero">
        <div className="jea-cat-hero-eyebrow jea-cat-hero-fade">
          <span className="jea-cat-eyebrow-line" aria-hidden="true" />
          <span className="jea-cat-eyebrow-sparkle">✦</span>
          <span>{categoryConfig.eyebrow || 'HAUTE JOAILLERIE ATELIER'}</span>
          <span className="jea-cat-eyebrow-sparkle">✦</span>
          <span className="jea-cat-eyebrow-line" aria-hidden="true" />
        </div>

        <h1 className="jea-category-heading jea-cat-hero-fade">
          {categoryConfig.heading}
        </h1>

        <p className="jea-category-subtitle jea-cat-hero-fade">
          {categoryConfig.subtitle}
        </p>

        <div className="jea-category-divider jea-cat-hero-fade" aria-hidden="true">
          <span className="jea-category-divider-line" />
          <BsGem className="jea-category-divider-gem" />
          <span className="jea-category-divider-line" />
        </div>
      </header>

      {/* Subcategory Pills Bar */}
      <div className="jea-subcategory-pills-bar">
        <div className="jea-subcategory-pills-scroll">
          <button
            type="button"
            className={`jea-subcat-pill ${selectedSubCat === 'All' ? 'is-active' : ''}`}
            onClick={() => setSelectedSubCat('All')}
          >
            All Creations ({products.length})
          </button>

          {categoryConfig.subCategories?.map((subCat) => {
            const count = products.filter(
              (p) => p.subCategory?.toLowerCase() === subCat.toLowerCase()
            ).length;

            return (
              <button
                key={subCat}
                type="button"
                className={`jea-subcat-pill ${selectedSubCat === subCat ? 'is-active' : ''}`}
                onClick={() => setSelectedSubCat(subCat)}
              >
                <span>{subCat}</span>
                {count > 0 && <span className="jea-subcat-count">({count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Control & Sorting Toolbar */}
      <div className="jea-cat-controls-toolbar">
        {/* Search within Category */}
        <div className="jea-cat-search-box">
          <BsSearch className="jea-cat-search-icon" />
          <input
            type="text"
            className="jea-cat-search-input"
            placeholder={`Search within ${categoryConfig.heading}...`}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          {searchKeyword && (
            <button
              type="button"
              className="jea-cat-search-clear"
              onClick={() => setSearchKeyword('')}
              aria-label="Clear search text"
            >
              <BsX />
            </button>
          )}
        </div>

        {/* Right side: Count & Sort Dropdown */}
        <div className="jea-cat-controls-right">
          <span className="jea-cat-results-count">
            Showing <strong>{filteredProducts.length}</strong> of {products.length} Creations
          </span>

          <div className="jea-cat-sort-wrapper">
            <BsFilter className="jea-sort-icon" />
            <span className="jea-sort-label">Sort:</span>
            <select
              className="jea-cat-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products by"
            >
              <option value="featured">Featured Creations</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
            <BsChevronDown className="jea-sort-chevron" />
          </div>
        </div>
      </div>

      {/* Active Filter Pill Tags */}
      {isFiltered && (
        <div className="jea-cat-active-filters">
          <span className="jea-active-filter-label">Active Filters:</span>
          {selectedSubCat !== 'All' && (
            <span className="jea-active-tag">
              Category: {selectedSubCat}
              <button 
                type="button" 
                onClick={() => setSelectedSubCat('All')} 
                aria-label="Remove category filter"
              >
                <BsX />
              </button>
            </span>
          )}
          {searchKeyword.trim() && (
            <span className="jea-active-tag">
              "{searchKeyword}"
              <button 
                type="button" 
                onClick={() => setSearchKeyword('')} 
                aria-label="Remove search filter"
              >
                <BsX />
              </button>
            </span>
          )}
          {sortBy !== 'featured' && (
            <span className="jea-active-tag">
              Sort: {sortBy.replace(/-/g, ' ')}
              <button 
                type="button" 
                onClick={() => setSortBy('featured')} 
                aria-label="Reset sorting"
              >
                <BsX />
              </button>
            </span>
          )}
          <button 
            type="button" 
            className="jea-clear-all-btn" 
            onClick={handleResetFilters}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="jea-cat-empty-state">
          <div className="jea-cat-empty-icon-box">
            <BsGem className="jea-cat-empty-gem" />
          </div>
          <h3 className="jea-cat-empty-title">No Creations Found</h3>
          <p className="jea-cat-empty-text">
            We couldn't find any creations matching your current filter selection. 
            Try exploring other subcategories or clear your search query.
          </p>
          <button
            type="button"
            className="jea-cat-empty-reset-btn"
            onClick={handleResetFilters}
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="row g-4 jea-cat-product-grid">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
              <ProductCard
                product={prod}
                isWishlisted={wishlistIds.includes(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToBag={onAddToBag}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>
      )}

      {/* Atelier Concierge Bespoke Banner */}
      <section className="jea-cat-bespoke-banner">
        <div className="jea-cat-bespoke-content">
          <span className="jea-cat-bespoke-eyebrow">BESPOKE MAISON COMMISSIONS</span>
          <h3 className="jea-cat-bespoke-title">Seeking a Tailored High-Jewellery Creation?</h3>
          <p className="jea-cat-bespoke-desc">
            Our Place Vendôme master jewelers work closely with you to design a one-of-a-kind engagement ring, bespoke bridal parure, or commissioned timepiece.
          </p>
        </div>
        <button
          type="button"
          className="jea-cat-bespoke-btn"
          onClick={() => {
            if (onBookConsultation) onBookConsultation({ category: categoryConfig.navLabel });
          }}
        >
          <span>Book Atelier Consultation</span>
          <BsArrowRight />
        </button>
      </section>

    </div>
  );
}
