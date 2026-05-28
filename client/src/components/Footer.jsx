import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="container footer__newsletter-inner">
          <div className="footer__newsletter-content">
            <h3 className="footer__newsletter-title">Join the Artivo Society</h3>
            <p className="footer__newsletter-desc">Subscribe to receive exclusive offers, new arrival alerts, and styling inspiration.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit" aria-label="Subscribe"><FiArrowRight /></button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer__main">
        <div className="footer__col footer__col--brand">
          <Link to="/" className="footer__logo">✦ Artivo</Link>
          <p className="footer__desc">
            Curating premium printed canvas art that bridges timeless heritage with contemporary design. Elevate your space with our expertly crafted collections.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Collections</h4>
          <ul className="footer__list">
            <li><Link to="/products?category=Sri Lankan Heritage">Sri Lankan Heritage</Link></li>
            <li><Link to="/products?category=Modern">Modern Abstract</Link></li>
            <li><Link to="/products?category=Portraits & Figures">Portraits & Figures</Link></li>
            <li><Link to="/products">All Artworks</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Assistance</h4>
          <ul className="footer__list">
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/prices-sizes">Pricing & Sizes</Link></li>
            <li><Link to="/dashboard">Track Order</Link></li>
            <li><Link to="/contact">Custom Requests</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Get in Touch</h4>
          <ul className="footer__list footer__list--contact">
            <li>Colombo, Sri Lanka</li>
            <li><a href="mailto:hello@artivospace.com">hello@artivospace.com</a></li>
            <li><a href="tel:+94762829197">+94 76 282 9197</a></li>
            <li className="footer__hours">Mon - Fri: 9:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom container">
        <div className="footer__bottom-left">
          <p>© {new Date().getFullYear()} Artivo. All rights reserved.</p>
        </div>
        <div className="footer__bottom-right">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Shipping Policy</Link>
        </div>
      </div>
    </footer>
  );
}
