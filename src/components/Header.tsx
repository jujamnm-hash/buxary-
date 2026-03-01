import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Theme } from '../types';
import FontSizeControl from './FontSizeControl';
import RandomHadithButton from './RandomHadithButton';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  bookmarkCount: number;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, bookmarkCount, onMenuToggle }) => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <header className="app-header sticky-top">
      <nav className="navbar navbar-expand-lg px-3">
        <div className="container-fluid gap-2">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 me-auto">
            <div className="brand-icon">
              <i className="bi bi-book-fill"></i>
            </div>
            <div className="brand-text">
              <span className="brand-title">صحیح البوخاری</span>
              <small className="brand-sub d-block">حەدیثەکانی ئیمام بوخاری</small>
            </div>
          </Link>

          {/* Search bar (desktop) */}
          <form onSubmit={handleSearch} className="search-form d-none d-lg-flex flex-grow-1 mx-4">
            <div className="input-group">
              <span className="input-group-text search-icon">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control search-input"
                placeholder="گەڕان لە حەدیثەکاندا..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                dir="rtl"
              />
              <button type="submit" className="btn btn-search px-3">
                گەڕان
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <RandomHadithButton />
            <FontSizeControl />
            <Link to="/bookmarks" className="btn btn-icon position-relative" title="پاراستنەکان">
              <i className="bi bi-bookmark-heart-fill"></i>
              {bookmarkCount > 0 && (
                <span className="badge-count">{bookmarkCount}</span>
              )}
            </Link>
            <button
              className="btn btn-icon"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'ڕووناکی' : 'تاریکی'}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
            </button>
            <button className="btn btn-icon d-lg-none" onClick={onMenuToggle}>
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="search-form d-lg-none w-100 px-0 pt-2">
          <div className="input-group">
            <span className="input-group-text search-icon">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control search-input"
              placeholder="گەڕان لە حەدیثەکاندا..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              dir="rtl"
            />
          </div>
        </form>
      </nav>
    </header>
  );
};

export default Header;
