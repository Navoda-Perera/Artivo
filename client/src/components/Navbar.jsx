import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiUser, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  {
    label: 'Shop By',
    children: [
      { label: 'Category', to: '/shop-by-category' },
      { label: 'Colour', to: '/shop-by-colour' },
    ],
  },
  { label: 'Prices & Sizes', to: '/prices-sizes' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/products?search=${searchQ.trim()}`);
      setSearchOpen(false);
      setSearchQ('');
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      {/* Top announcement bar */}
      <div className="navbar__announce">
        <p>✦ Free Delivery on Orders Over Rs. 10,000 &nbsp;|&nbsp; Call: +94 77 xxx xxxx ✦</p>
      </div>

      <nav className="navbar__main container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-art">✦</span>
          <span>Artivo</span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li key={link.label} className="navbar__item navbar__item--drop"
                onMouseEnter={() => setDropOpen(link.label)}
                onMouseLeave={() => setDropOpen(false)}>
                <button className="navbar__link navbar__link--drop">
                  {link.label} <FiChevronDown size={12} />
                </button>
                {dropOpen === link.label && (
                  <ul className="navbar__dropdown">
                    {link.children.map((c) => (
                      <li key={c.to}>
                        <NavLink to={c.to} className="navbar__dropdown-link" onClick={() => setDropOpen(false)}>
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.to} className="navbar__item">
                <NavLink to={link.to} className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}>
                  {link.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            <FiSearch />
          </button>

          {user ? (
            <div className="navbar__user-wrap" onMouseEnter={() => setDropOpen('user')} onMouseLeave={() => setDropOpen(false)}>
              <button className="navbar__icon-btn"><FiUser /></button>
              {dropOpen === 'user' && (
                <ul className="navbar__dropdown navbar__dropdown--right">
                  <li><Link to="/dashboard" className="navbar__dropdown-link">My Orders</Link></li>
                  {isAdmin && <li><Link to="/admin" className="navbar__dropdown-link">Admin Panel</Link></li>}
                  <li><button className="navbar__dropdown-link navbar__dropdown-link--btn" onClick={logout}>Logout</button></li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar__icon-btn"><FiUser /></Link>
          )}

          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
            <FiShoppingBag />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </Link>

          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      {searchOpen && (
        <div className="navbar__search-bar container">
          <form onSubmit={handleSearch} className="navbar__search-form">
            <input
              autoFocus
              className="navbar__search-input"
              placeholder="Search canvas art, categories…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
            <button type="submit" className="btn btn-gold">Search</button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label}>
                <span className="navbar__mobile-label">{link.label}</span>
                {link.children.map((c) => (
                  <NavLink key={c.to} to={c.to} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>{c.label}</NavLink>
                ))}
              </div>
            ) : (
              <NavLink key={link.to} to={link.to} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
            )
          )}
          {user
            ? <button className="navbar__mobile-link" onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
            : <Link to="/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Login / Register</Link>}
        </div>
      )}
    </header>
  );
}
