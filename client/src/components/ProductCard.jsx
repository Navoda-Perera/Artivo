import { Link } from 'react-router-dom';
import { FiHeart, FiEye, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const imageUrl = product.images?.[0]?.url || '/assets/placeholder.jpg';

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        <Link to={`/products/${product._id}`}>
          <img src={imageUrl} alt={product.name} loading="lazy" />
        </Link>

        {product.isNewArrival && (
          <span className="product-card__badge">New</span>
        )}
        {product.isFeatured && !product.isNewArrival && (
          <span className="product-card__badge" style={{ background: 'var(--gold-dark)' }}>Featured</span>
        )}

        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            title="Quick view"
            onClick={() => window.location.href = `/products/${product._id}`}
          >
            <FiEye size={15} />
          </button>
          <button className="product-card__action-btn" title="Wishlist">
            <FiHeart size={15} />
          </button>
          <button
            className="product-card__action-btn"
            title="Add to cart"
            onClick={() => addToCart(product, product.sizes?.[0])}
          >
            <FiShoppingBag size={15} />
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__vendor">{product.pieceType}</p>
        <Link to={`/products/${product._id}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>
        <p className="product-card__price">Rs. {product.price?.toLocaleString()}</p>
      </div>
    </div>
  );
}
