import React from 'react';
import HadithCard from '../components/HadithCard';
import { HADITHS } from '../data/hadiths';
import { Link } from 'react-router-dom';

interface BookmarksPageProps {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
}

const BookmarksPage: React.FC<BookmarksPageProps> = ({ bookmarks, toggleBookmark }) => {
  const bookmarkedHadiths = HADITHS.filter(h => bookmarks.includes(h.id));

  return (
    <div className="page-container">
      <div className="page-hero-mini">
        <div className="d-flex align-items-center gap-3">
          <div className="page-hero-icon">
            <i className="bi bi-bookmark-heart-fill"></i>
          </div>
          <div>
            <h2 className="page-title mb-0">حەدیثە پاراستراوەکان</h2>
            <p className="page-desc mb-0">{bookmarkedHadiths.length} حەدیث پاراستراوە</p>
          </div>
        </div>
      </div>

      {bookmarkedHadiths.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="bi bi-bookmark-plus"></i>
          </div>
          <h4>هیچ حەدیثێک پاراستراو نیە</h4>
          <p>کلیک لەسەر ئایکۆنی بوکمارک بکە تا حەدیثەکان پاراست بکەی</p>
          <Link to="/" className="btn btn-primary mt-3">
            <i className="bi bi-collection-fill me-2"></i>
            بینینی حەدیثەکان
          </Link>
        </div>
      ) : (
        <div className="hadiths-list">
          {bookmarkedHadiths.map(hadith => (
            <HadithCard
              key={hadith.id}
              hadith={hadith}
              isBookmarked={true}
              onToggleBookmark={toggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
