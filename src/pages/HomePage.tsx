import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import HadithCard from '../components/HadithCard';
import StatsBar from '../components/StatsBar';
import FilterBar from '../components/FilterBar';
import { HADITHS, BOOKS } from '../data/hadiths';

interface HomePageProps {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ bookmarks, toggleBookmark }) => {
  const { bookId } = useParams<{ bookId?: string }>();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(bookId ? parseInt(bookId) : null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  // Hadith of the day — stable per calendar day
  const hodIndex = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return dayOfYear % HADITHS.length;
  }, []);
  const hadithOfDay = HADITHS[hodIndex];

  const filtered = useMemo(() => {
    if (selectedBookId) {
      return HADITHS.filter(h => h.bookId === selectedBookId);
    }
    return HADITHS;
  }, [selectedBookId]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const currentBook = BOOKS.find(b => b.id === selectedBookId);

  return (
    <div className="page-container">
      {/* Hero Banner */}
      {!selectedBookId && (
        <div className="hero-banner">
          <div className="hero-content">
            <div className="hero-icon">
              <i className="bi bi-book-half"></i>
            </div>
            <h1 className="hero-title">صحیح البوخاری</h1>
            <p className="hero-subtitle">کتێبی حەدیثی ئیمام موحەمەدی بن ئیسماعیلی بوخاری</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">7,275</span>
                <span className="hero-stat-label">حەدیث</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-num">97</span>
                <span className="hero-stat-label">کتێب</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-num">3,450</span>
                <span className="hero-stat-label">باب</span>
              </div>
            </div>
          </div>
          <div className="hero-decoration"></div>
        </div>
      )}

      {/* Hadith of the Day */}
      {!selectedBookId && (
        <div className="hod-section">
          <div className="hod-header">
            <div className="hod-badge">
              <i className="bi bi-star-fill"></i>
              <span>حەدیثی ئەمڕۆ</span>
            </div>
            <Link to={`/hadith/${hadithOfDay.id}`} className="hod-more">
              زیاتر <i className="bi bi-arrow-left"></i>
            </Link>
          </div>
          <div className="hod-body">
            <p className="hod-arabic" dir="rtl">{hadithOfDay.arabicText}</p>
            <p className="hod-kurdish" dir="rtl">{hadithOfDay.kurdishText}</p>
            <div className="hod-narrator">
              <i className="bi bi-person-fill"></i>
              <span>{hadithOfDay.narrator}</span>
            </div>
          </div>
        </div>
      )}

      {currentBook && (
        <div className="book-header">
          <i className={`bi ${currentBook.icon}`}></i>
          <div>
            <h2 className="mb-0">{currentBook.nameKurdish}</h2>
            <small>{currentBook.nameArabic}</small>
          </div>
        </div>
      )}

      <StatsBar total={filtered.length} bookmarkCount={bookmarks.length} />

      <FilterBar
        selectedBookId={selectedBookId}
        onSelectBook={(id: number | null) => { setSelectedBookId(id); setPage(1); }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className={`hadiths-container ${viewMode === 'grid' ? 'hadiths-grid' : 'hadiths-list'}`}>
        {paginated.map(hadith => (
          <HadithCard
            key={hadith.id}
            hadith={hadith}
            isBookmarked={bookmarks.includes(hadith.id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pagination-nav mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(p => p - 1)}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <li key={p} className={`page-item ${page === p ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setPage(p)}>{p}</button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(p => p + 1)}>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default HomePage;
