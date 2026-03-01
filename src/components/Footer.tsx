import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-icon">
            <i className="bi bi-book-fill"></i>
          </div>
          <div>
            <div className="footer-brand-title">صحیح البوخاری</div>
            <div className="footer-brand-sub">بە زمانی کوردی سۆرانی</div>
          </div>
        </div>

        <div className="footer-links">
          <Link to="/" className="footer-link"><i className="bi bi-house-fill"></i> سەرەتا</Link>
          <Link to="/books" className="footer-link"><i className="bi bi-collection-fill"></i> کتێبەکان</Link>
          <Link to="/search" className="footer-link"><i className="bi bi-search"></i> گەڕان</Link>
          <Link to="/bookmarks" className="footer-link"><i className="bi bi-bookmark-heart-fill"></i> پاراستنەکان</Link>
        </div>

        <div className="footer-copy">
          <span>© {year} صحیح البوخاری — هەموو مافەکان پارێزراون</span>
          <div className="footer-hadith-count">
            <i className="bi bi-check-circle-fill text-success me-1"></i>
            <span>7,275 حەدیثی تێ پشکنراو</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
