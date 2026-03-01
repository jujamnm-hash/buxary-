import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HADITHS, BOOKS, CHAPTERS } from '../data/hadiths';

interface HadithDetailPageProps {
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
}

const HadithDetailPage: React.FC<HadithDetailPageProps> = ({ bookmarks, toggleBookmark }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const hadith = HADITHS.find(h => h.id === parseInt(id || '0'));

  if (!hadith) return (
    <div className="page-container text-center py-5">
      <i className="bi bi-emoji-frown display-1 text-muted"></i>
      <h3 className="mt-3">حەدیثەکە نەدۆزرایەوە</h3>
      <Link to="/" className="btn btn-primary mt-3">گەڕانەوە بۆ سەرەتا</Link>
    </div>
  );

  const book = BOOKS.find(b => b.id === hadith.bookId);
  const chapter = CHAPTERS.find(c => c.id === hadith.chapterId);
  const isBookmarked = bookmarks.includes(hadith.id);
  const currentIndex = HADITHS.findIndex(h => h.id === hadith.id);
  const prev = HADITHS[currentIndex - 1];
  const next = HADITHS[currentIndex + 1];

  const handleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(hadith.arabicText);
    utter.lang = 'ar-SA';
    utter.rate = 0.8;
    utter.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utter);
    setIsPlaying(true);
  };

  const handleCopy = () => {
    const text = `${hadith.arabicText}\n\nکوردی: ${hadith.kurdishText}\n\nڕاوی: ${hadith.narrator}\nژمارە: ${hadith.number} - صحیح البوخاری`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">سەرەتا</Link></li>
          <li className="breadcrumb-item"><Link to="/books">کتێبەکان</Link></li>
          {book && <li className="breadcrumb-item"><Link to={`/books/${book.id}`}>{book.nameKurdish}</Link></li>}
          <li className="breadcrumb-item active">حەدیث #{hadith.number}</li>
        </ol>
      </nav>

      <div className="detail-card">
        {/* Header */}
        <div className="detail-header">
          <div className="detail-number-badge">
            <span>#{hadith.number}</span>
          </div>
          <div className="detail-meta">
            <h1 className="detail-book">{book?.nameKurdish}</h1>
            {chapter && <p className="detail-chapter">{chapter.nameKurdish}</p>}
          </div>
          <button
            className={`btn btn-bookmark-detail ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => toggleBookmark(hadith.id)}
          >
            <i className={`bi ${isBookmarked ? 'bi-bookmark-heart-fill' : 'bi-bookmark-heart'}`}></i>
            {isBookmarked ? 'لابرا' : 'پاراستن'}
          </button>
        </div>

        {/* Grade */}
        <div className={`detail-grade grade-${hadith.grade}`}>
          <i className="bi bi-patch-check-fill"></i>
          <span>{hadith.gradeKurdish} — {hadith.grade}</span>
        </div>

        {/* Arabic */}
        <div className="detail-section arabic-section">
          <div className="section-label">
            <i className="bi bi-globe2"></i>
            <span>مەتنی ئەرەبی</span>
          </div>
          <blockquote className="arabic-blockquote" dir="rtl">
            {hadith.arabicText}
          </blockquote>
        </div>

        {/* Kurdish */}
        <div className="detail-section kurdish-section">
          <div className="section-label">
            <i className="bi bi-translate"></i>
            <span>وەرگێڕانی کوردی</span>
          </div>
          <blockquote className="kurdish-blockquote" dir="rtl">
            {hadith.kurdishText}
          </blockquote>
        </div>

        {/* Narrator */}
        <div className="detail-section">
          <div className="section-label">
            <i className="bi bi-person-circle"></i>
            <span>ڕاوی</span>
          </div>
          <div className="narrator-detail">
            <div className="narrator-avatar">
              <i className="bi bi-person-fill"></i>
            </div>
            <div>
              <div className="narrator-name">{hadith.narrator}</div>
              <div className="narrator-arabic" dir="rtl">{hadith.narrator_arabic}</div>
            </div>
          </div>
        </div>

        {/* Chain */}
        <div className="detail-section">
          <div className="section-label">
            <i className="bi bi-link-45deg"></i>
            <span>سەندەی حەدیث (إسناد)</span>
          </div>
          <p className="chain-text" dir="rtl">{hadith.chain}</p>
        </div>

        {/* Actions */}
        <div className="detail-actions">
          <button className="btn btn-action-lg" onClick={handleAudio}>
            <i className={`bi ${isPlaying ? 'bi-stop-fill' : 'bi-volume-up-fill'}`}></i>
            {isPlaying ? 'وەستان' : 'گوێ بگرە بە ئەرەبی'}
          </button>
          <button className="btn btn-action-lg" onClick={handleCopy}>
            <i className={`bi ${copied ? 'bi-check2-circle' : 'bi-clipboard-fill'}`}></i>
            {copied ? 'کۆپی کرا!' : 'کۆپی کردن'}
          </button>
          <button className="btn btn-action-lg" onClick={() => navigator.share?.({ title: `حەدیث #${hadith.number}`, text: hadith.arabicText })}>
            <i className="bi bi-share-fill"></i>
            بەشکردن
          </button>
        </div>

        {/* Navigation between hadiths */}
        <div className="detail-navigation">
          {prev ? (
            <button className="btn btn-nav" onClick={() => navigate(`/hadith/${prev.id}`)}>
              <i className="bi bi-chevron-right"></i>
              <span>حەدیثی پێشوو</span>
            </button>
          ) : <div></div>}
          {next ? (
            <button className="btn btn-nav" onClick={() => navigate(`/hadith/${next.id}`)}>
              <span>حەدیثی داهاتوو</span>
              <i className="bi bi-chevron-left"></i>
            </button>
          ) : <div></div>}
        </div>
      </div>
    </div>
  );
};

export default HadithDetailPage;
