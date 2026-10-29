import { FiHeart, FiEye, FiShoppingBag } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import { formatINR } from '../data/productsData';
import './ProductCard.css';

export default function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToBag,
  onViewDetails,
}) {
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToBag) onAddToBag(product);
  };

  const handleDetailClick = (e) => {
    e.preventDefault();
    if (onViewDetails) onViewDetails(product);
  };

  return (
    <article className="jea-product-card" id={`product-${product.id}`}>
      {/* Product Image Stage */}
      <div 
        className="jea-product-image-box" 
        onClick={handleDetailClick}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDetailClick(e);
          }
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="jea-product-img"
          loading="lazy"
          onError={(e) => {
            if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
              e.currentTarget.src = product.fallbackImage;
            }
          }}
        />

        <div className="jea-product-image-vignette" aria-hidden="true" />

        {/* Top Badges & Wishlist */}
        <div className="jea-product-topbar">
          {product.tag ? (
            <span className="jea-product-badge">{product.tag}</span>
          ) : <span />}

          <button
            type="button"
            className={`jea-product-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
          >
            <FiHeart className="jea-heart-icon" />
          </button>
        </div>

        {/* Hover Quick View Trigger */}
        <div className="jea-product-quick-view-bar">
          <span>Quick View</span>
          <FiEye />
        </div>
      </div>

      {/* Product Details Info */}
      <div className="jea-product-info">
        <div className="jea-product-meta-row">
          <span className="jea-product-subcategory">{product.subCategory}</span>
          {product.rating && (
            <div className="jea-product-rating" title={`${product.rating} / 5 stars`}>
              <BsStarFill className="jea-star-icon" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <h3 
          className="jea-product-title" 
          onClick={handleDetailClick}
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="jea-product-price-row">
          <span className="jea-product-price">{formatINR(product.price)}</span>
          <span className="jea-product-taxes">MRP (incl. of taxes)</span>
        </div>

        {/* Action Buttons */}
        <div className="jea-product-actions">
          <button
            type="button"
            className="jea-product-btn-details"
            onClick={handleDetailClick}
            aria-label={`View full details of ${product.name}`}
          >
            <span>Details</span>
          </button>

          <button
            type="button"
            className="jea-product-btn-add"
            onClick={handleAddClick}
            aria-label={`Add ${product.name} to shopping bag`}
          >
            <FiShoppingBag className="jea-bag-btn-icon" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </article>
  );
}

