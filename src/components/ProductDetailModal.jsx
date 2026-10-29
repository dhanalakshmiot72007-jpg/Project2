import { useEffect, useState } from 'react';
import { 
  IoCloseOutline 
} from 'react-icons/io5';
import { 
  FiHeart, 
  FiShoppingBag, 
  FiShare2, 
  FiCheck 
} from 'react-icons/fi';
import { 
  BsGem, 
  BsShieldCheck, 
  BsTruck, 
  BsStarFill, 
  BsCalendarHeart 
} from 'react-icons/bs';
import { formatINR } from '../data/productsData';
import './ProductDetailModal.css';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isWishlisted = false,
  onToggleWishlist,
  onAddToBag,
  onBookConsultation,
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('52 (US 6)');
  const [isCopied, setIsCopied] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setAddedSuccess(false);
    onClose();
  };

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    if (onAddToBag) {
      onAddToBag(product, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2400);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} — JEA Haute Joaillerie`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isRing = product.subCategory?.toLowerCase().includes('ring') || product.name?.toLowerCase().includes('ring');
  const isWatch = product.category === 'watches';

  return (
    <div 
      className="jea-modal-backdrop" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div 
        className="jea-detail-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          className="jea-detail-close-btn"
          onClick={handleClose}
          aria-label="Close product view"
        >
          <IoCloseOutline />
        </button>

        <div className="row g-4 g-lg-5 align-items-center">
          
          {/* Left Column: Premium Photography */}
          <div className="col-12 col-lg-6">
            <div className="jea-detail-image-stage">
              <div className="jea-detail-gold-border" aria-hidden="true" />
              <img
                src={product.image}
                alt={product.name}
                className="jea-detail-img"
                onError={(e) => {
                  if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                    e.currentTarget.src = product.fallbackImage;
                  }
                }}
              />
              {product.tag && (
                <div className="jea-detail-floating-badge">
                  <span>✦ {product.tag}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Narrative & Acquisition */}
          <div className="col-12 col-lg-6">
            <div className="jea-detail-content">
              
              {/* Category Breadcrumb */}
              <div className="jea-detail-breadcrumb">
                <span>HAUTE JOAILLERIE</span>
                <span className="jea-sep">/</span>
                <span className="jea-sub-cat">{product.subCategory}</span>
              </div>

              {/* Title */}
              <h2 id="product-modal-title" className="jea-detail-title">
                {product.name}
              </h2>

              {/* Price & Taxes */}
              <div className="jea-detail-price-box">
                <span className="jea-detail-price">{formatINR(product.price)}</span>
                <span className="jea-detail-taxes">Inclusive of all duties & luxury packaging</span>
              </div>

              {/* Star Rating */}
              {product.rating && (
                <div className="jea-detail-rating-row">
                  <div className="jea-detail-stars">
                    {[...Array(5)].map((_, i) => (
                      <BsStarFill key={i} className="jea-detail-star" />
                    ))}
                  </div>
                  <span className="jea-detail-rating-val">{product.rating}</span>
                  <span className="jea-detail-review-count">({product.reviewsCount || 24} Atelier Reviews)</span>
                </div>
              )}

              {/* Description */}
              <p className="jea-detail-description">
                {product.description}
              </p>

              {/* Optional Ring or Wrist Sizing */}
              {isRing && (
                <div className="jea-detail-size-box">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="jea-size-label">Select European Ring Size:</span>
                    <button 
                      type="button" 
                      className="jea-size-guide-btn" 
                      onClick={() => alert('Standard Parisian Atelier sizing: 50 (US 5.25), 52 (US 6), 54 (US 6.75), 56 (US 7.5). Bespoke complimentary resizing included.')}
                    >
                      Sizing Guide
                    </button>
                  </div>
                  <div className="jea-size-options">
                    {['50 (US 5.25)', '52 (US 6)', '54 (US 6.75)', '56 (US 7.5)'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`jea-size-pill ${selectedSize === size ? 'is-selected' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isWatch && (
                <div className="jea-detail-size-box">
                  <span className="jea-size-label">Strap & Case Fit:</span>
                  <p className="jea-watch-fit-sub">
                    Master horlogerie timepiece with complimentary custom-fitted alligator strap and micro-adjustment deployant clasp.
                  </p>
                </div>
              )}

              {/* Master Atelier Specifications */}
              <div className="jea-detail-specs-box">
                <span className="jea-specs-heading">Atelier Specifications</span>
                <div className="jea-specs-grid">
                  {product.specs ? (
                    Object.entries(product.specs).map(([label, val]) => (
                      <div key={label} className="jea-spec-item">
                        <span className="jea-spec-key">{label}</span>
                        <span className="jea-spec-val">{val}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="jea-spec-item">
                        <span className="jea-spec-key">Metal</span>
                        <span className="jea-spec-val">{product.metal || '18K White Gold'}</span>
                      </div>
                      <div className="jea-spec-item">
                        <span className="jea-spec-key">Stones</span>
                        <span className="jea-spec-val">{product.gemstone || 'Certified Diamonds'}</span>
                      </div>
                      <div className="jea-spec-item">
                        <span className="jea-spec-key">Carat</span>
                        <span className="jea-spec-val">{product.caratWeight || 'High Jewellery'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons: Quantity, Add to Bag, Wishlist */}
              <div className="jea-detail-actions-group">
                <div className="jea-qty-picker">
                  <button 
                    type="button" 
                    className="jea-qty-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="jea-qty-val">{quantity}</span>
                  <button 
                    type="button" 
                    className="jea-qty-btn"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="jea-detail-add-btn"
                  onClick={handleAdd}
                >
                  {addedSuccess ? (
                    <>
                      <FiCheck className="me-2" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="me-2" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className={`jea-detail-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
                  onClick={() => onToggleWishlist && onToggleWishlist(product)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                >
                  <FiHeart />
                </button>

                <button
                  type="button"
                  className="jea-detail-share-btn"
                  onClick={handleShare}
                  aria-label="Share this creation"
                  title="Share Creation"
                >
                  <FiShare2 />
                </button>
              </div>

              {isCopied && (
                <div className="jea-detail-toast">
                  Link copied to clipboard!
                </div>
              )}

              {/* Bespoke Viewing Appointment Button */}
              <button
                type="button"
                className="jea-detail-consult-btn"
                onClick={() => {
                  onClose();
                  if (onBookConsultation) onBookConsultation(product);
                }}
              >
                <BsCalendarHeart className="me-2" />
                <span>Book Atelier Private Viewing</span>
              </button>

              {/* Assurance Trust Guarantee */}
              <div className="jea-detail-trust-row">
                <div className="jea-detail-trust-item">
                  <BsGem className="jea-trust-mini-icon" />
                  <span>100% GIA Certified</span>
                </div>
                <div className="jea-detail-trust-item">
                  <BsShieldCheck className="jea-trust-mini-icon" />
                  <span>Lifetime Maison Care</span>
                </div>
                <div className="jea-detail-trust-item">
                  <BsTruck className="jea-trust-mini-icon" />
                  <span>Insured Armored Delivery</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
