import React from 'react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../data/hadiths';

const BooksPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-hero-mini">
        <div className="d-flex align-items-center gap-3">
          <div className="page-hero-icon">
            <i className="bi bi-collection-fill"></i>
          </div>
          <div>
            <h2 className="page-title mb-0">کتێبەکانی صحیح البوخاری</h2>
            <p className="page-desc mb-0">هەموو کتێبەکانی ئیمام بوخاری</p>
          </div>
        </div>
      </div>

      <div className="books-grid">
        {BOOKS.map((book, i) => (
          <Link key={book.id} to={`/books/${book.id}`} className="book-card">
            <div className="book-card-icon">
              <i className={`bi ${book.icon}`}></i>
            </div>
            <div className="book-card-body">
              <div className="book-number">کتێبی {i + 1}</div>
              <h3 className="book-card-title">{book.nameKurdish}</h3>
              <p className="book-card-arabic" dir="rtl">{book.nameArabic}</p>
              <div className="book-card-count">
                <i className="bi bi-collection-fill me-1"></i>
                {book.hadithCount} حەدیث
              </div>
            </div>
            <div className="book-card-arrow">
              <i className="bi bi-arrow-left-circle-fill"></i>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Section */}
      <div className="about-bukhari mt-5">
        <h3 className="mb-3">
          <i className="bi bi-info-circle-fill me-2 text-primary"></i>
          دەربارەی ئیمام بوخاری
        </h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="info-card">
              <div className="info-card-icon"><i className="bi bi-person-badge-fill"></i></div>
              <div>
                <h5>ناوی تەواو</h5>
                <p dir="rtl">أبو عبدالله محمد بن إسماعيل بن إبراهيم بن بردزبه البخاري</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-card">
              <div className="info-card-icon"><i className="bi bi-calendar-fill"></i></div>
              <div>
                <h5>بەرواری لەدایکبوون</h5>
                <p>194 هـ (810 زایینی) لە بوخارا</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-card">
              <div className="info-card-icon"><i className="bi bi-book-fill"></i></div>
              <div>
                <h5>دەربارەی کتێبەکە</h5>
                <p>صحیح البوخاری یەکێکە لە باشترین کتێبە حەدیثییەکان لە ئیسلاماندا. ئیمام بوخاری 600,000 حەدیثی پشکنیوە و 7,275ی هەڵبژاردووەتەوە.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-card">
              <div className="info-card-icon"><i className="bi bi-star-fill"></i></div>
              <div>
                <h5>جێگۆڕکێ</h5>
                <p>256 هـ (870 زایینی) لە سەمەرقەند</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
