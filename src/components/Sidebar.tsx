import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BOOKS } from '../data/hadiths';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: 'bi-house-fill', label: 'سەرەتا' },
    { to: '/books', icon: 'bi-collection-fill', label: 'کتێبەکان' },
    { to: '/bookmarks', icon: 'bi-bookmark-heart-fill', label: 'پاراستنەکان' },
    { to: '/search', icon: 'bi-search', label: 'گەڕان' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay d-lg-none" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center d-lg-none">
          <span className="fw-bold">وێبسایتی بوخاری</span>
          <button className="btn btn-icon" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <p className="sidebar-section-label">ڕێنوێن</p>
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-nav-item ${location.pathname === item.to ? 'active' : ''}`}
              onClick={onClose}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Books List */}
        <div className="sidebar-books mt-3">
          <p className="sidebar-section-label">کتێبەکان</p>
          <div className="books-scroll">
            {BOOKS.map(book => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className={`sidebar-book-item ${location.pathname === `/books/${book.id}` ? 'active' : ''}`}
                onClick={onClose}
              >
                <i className={`bi ${book.icon} book-icon`}></i>
                <div className="book-info">
                  <span className="book-name">{book.nameKurdish}</span>
                  <small className="book-count">{book.hadithCount} حەدیث</small>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="sidebar-stats mt-auto p-3">
          <div className="stat-card">
            <i className="bi bi-book-half text-primary"></i>
            <div>
              <div className="stat-number">7.275</div>
              <small>کۆی حەدیثەکان</small>
            </div>
          </div>
          <div className="stat-card mt-2">
            <i className="bi bi-list-ul text-warning"></i>
            <div>
              <div className="stat-number">97</div>
              <small>کتێب</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
