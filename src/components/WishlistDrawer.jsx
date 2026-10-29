import { 
  IoCloseOutline 
} from 'react-icons/io5';
import { 
  FiHeart, 
  FiShoppingBag, 
  FiTrash2 
} from 'react-icons/fi';
import { formatINR } from '../data/productsData';
import './WishlistDrawer.css';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts = [],
  onRemoveFromWishlist,
  onMoveToBag,
  onViewProduct,
}) {
  if (!isOpen) return null;

  return (
    <div className="jea-wishlist-backdrop" onClick={onClose}>
      <aside 
        className="jea-wishlist-drawer" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Your Curated Wishlist"
      >
        <div className="jea-wishlist-header">
          <div className="d-flex align-items-center gap-2">
            <FiHeart style={{ color: '#9f1239', fontSize: '1.25rem' }} />
            <h3 className="jea-wishlist-title">Curated Wishlist ({wishlistProducts.length})</h3>
          </div>
          <button
            type="button"
            className="jea-wishlist-close-btn"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="jea-wishlist-body">
          {wishlistProducts.length === 0 ? (
            <div className="jea-wishlist-empty">
              <FiHeart className="jea-wishlist-empty-icon" />
              <p className="jea-wishlist-empty-title">Your wishlist is currently empty</p>
              <p className="jea-wishlist-empty-desc">
                Save your cherished High Jewellery creations here for private viewings and future acquisitions.
              </p>
            </div>
          ) : (
            <div className="jea-wishlist-items-list">
              {wishlistProducts.map((item) => (
                <div key={item.id} className="jea-wishlist-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="jea-wishlist-thumb"
                    onClick={() => {
                      onClose();
                      if (onViewProduct) onViewProduct(item);
                    }}
                    onError={(e) => {
                      if (item.fallbackImage && e.currentTarget.src !== item.fallbackImage) {
                        e.currentTarget.src = item.fallbackImage;
                      }
                    }}
                  />

                  <div className="jea-wishlist-info">
                    <span className="jea-wishlist-subcat">{item.subCategory}</span>
                    <h4 
                      className="jea-wishlist-item-name"
                      onClick={() => {
                        onClose();
                        if (onViewProduct) onViewProduct(item);
                      }}
                    >
                      {item.name}
                    </h4>
                    <span className="jea-wishlist-item-price">{formatINR(item.price)}</span>

                    <div className="jea-wishlist-card-actions">
                      <button
                        type="button"
                        className="jea-wishlist-move-btn"
                        onClick={() => onMoveToBag && onMoveToBag(item)}
                      >
                        <FiShoppingBag className="me-1" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        type="button"
                        className="jea-wishlist-remove-btn"
                        onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(item.id)}
                        aria-label={`Remove ${item.name} from wishlist`}
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
        </div>

        {wishlistProducts.length > 0 && (
          <div className="jea-wishlist-footer">
            <button
              type="button"
              className="jea-btn-primary w-100 justify-content-center"
              onClick={() => {
                wishlistProducts.forEach((prod) => onMoveToBag && onMoveToBag(prod));
              }}
            >
              <span>ADD ALL TO SHOPPING BAG</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

