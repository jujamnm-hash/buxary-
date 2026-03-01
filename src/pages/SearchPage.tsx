import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import HadithCard from '../components/HadithCard';
import { HADITHS, BOOKS } from '../data/hadiths';
import { Hadith } from '../types';

interface SearchPageProps {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ bookmarks, toggleBookmark }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Hadith[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  const doSearch = (q: string, bookId: number | null) => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();
    const found = HADITHS.filter(h => {
      const matchesText =
        h.arabicText.includes(q) ||
        h.kurdishText.includes(q) ||
        h.kurdishText.toLowerCase().includes(lower) ||
        h.narrator.includes(q) ||
        h.narrator.toLowerCase().includes(lower) ||
        h.number.toString() === q;
      const matchesBook = bookId ? h.bookId === bookId : true;
      return matchesText && matchesBook;
    });
    setResults(found);
    setSearched(true);
  };

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
    if (q) doSearch(q, selectedBook);
  }, [searchParams, selectedBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setSearchParams({ q: query.trim() });
  };

  const topNarrators = useMemo(() => {
    const counts: Record<string, number> = {};
    HADITHS.forEach(h => { counts[h.narrator] = (counts[h.narrator] || 0) + 1; });
    return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,5).map(e => e[0]);
  }, []);

  return (
    <div className="page-container">
      <div className="search-page-header">
        <h2 className="page-title">
          <i className="bi bi-search me-2"></i>گەڕان لە حەدیثەکاندا
        </h2>
        <p className="page-desc">دەتوانی بە کوردی، ئەرەبی، ناوی ڕاوی یان ژمارەی حەدیث گەڕان بکەی</p>
      </div>

      <form onSubmit={handleSubmit} className="search-big-form">
        <div className="input-group input-group-lg">
          <span className="input-group-text"><i className="bi bi-search"></i></span>
          <input
            type="search"
            className="form-control"
            placeholder="وشەی گەڕان بنووسە..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            dir="rtl"
            autoFocus
          />
          <button type="submit" className="btn btn-primary px-4">گەڕان</button>
        </div>
      </form>

      {/* Book Filter */}
      <div className="search-book-filter mb-3">
        <span className="filter-label"><i className="bi bi-funnel-fill"></i> فلتەری کتێب:</span>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <button className={`btn filter-btn ${!selectedBook ? 'active' : ''}`} onClick={() => setSelectedBook(null)}>هەمووی</button>
          {BOOKS.slice(0, 6).map(b => (
            <button key={b.id} className={`btn filter-btn ${selectedBook === b.id ? 'active' : ''}`} onClick={() => setSelectedBook(b.id)}>
              {b.nameKurdish.replace('کتێبی ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Suggestions */}
      {!searched && (
        <div className="search-suggestions">
          <p className="suggestions-label"><i className="bi bi-lightning-fill text-warning me-1"></i>پێشنیارەکان:</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {['نیەت', 'ئیمان', 'نوێژ', 'زەکات', 'ڕووژوو', 'حەج', 'زانست', 'حەلاڵ'].map(s => (
              <button key={s} className="btn suggestion-chip" onClick={() => { setQuery(s); setSearchParams({ q: s }); }}>
                <i className="bi bi-tag-fill me-1"></i>{s}
              </button>
            ))}
          </div>
          <p className="suggestions-label mt-3"><i className="bi bi-person-fill text-primary me-1"></i>ڕاوی باشترینەکان:</p>
          <div className="d-flex flex-wrap gap-2">
            {topNarrators.map(n => (
              <button key={n} className="btn suggestion-chip narrator-chip" onClick={() => { setQuery(n); setSearchParams({ q: n }); }}>
                <i className="bi bi-person-circle me-1"></i>
                {n.replace(' (خودای لێ ڕازی بێت)', '')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div className="search-results min-height-200">
          <div className="results-header d-flex justify-content-between align-items-center">
            <span>
              <strong>{results.length}</strong> ئەنجام بۆ: "<em>{searchParams.get('q')}</em>"
              {selectedBook && <span className="ms-2 badge bg-primary" style={{fontSize:'0.75rem'}}>{BOOKS.find(b=>b.id===selectedBook)?.nameKurdish}</span>}
            </span>
            {results.length > 0 && (
              <span className="text-muted" style={{fontSize:'0.8rem'}}>
                <i className="bi bi-check-circle-fill text-success me-1"></i>
                هەموو ساغن
              </span>
            )}
          </div>
          {results.length === 0 ? (
            <div className="no-results">
              <i className="bi bi-emoji-neutral display-3"></i>
              <h4>هیچ ئەنجامێک نەدۆزرایەوە</h4>
              <p>وشەی تری بگەڕێ یان فلتەرەکەی بگۆڕە</p>
            </div>
          ) : (
            <div className="hadiths-list">
              {results.map(hadith => (
                <HadithCard
                  key={hadith.id}
                  hadith={hadith}
                  isBookmarked={bookmarks.includes(hadith.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
