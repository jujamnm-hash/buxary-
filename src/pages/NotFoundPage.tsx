import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="page-container notfound-page">
    <div className="notfound-content">
      <div className="notfound-icon">
        <i className="bi bi-question-circle-fill"></i>
      </div>
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">پەڕەکە نەدۆزرایەوە</h2>
      <p className="notfound-desc">ئەو پەڕەیەی کە بەدوایدا دەگەڕێی بوونی نیە یان گواستراوەتەوە.</p>
      <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
        <Link to="/" className="btn btn-primary-custom">
          <i className="bi bi-house-fill me-2"></i>
          گەڕانەوە بۆ سەرەتا
        </Link>
        <Link to="/search" className="btn btn-secondary-custom">
          <i className="bi bi-search me-2"></i>
          گەڕان
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
