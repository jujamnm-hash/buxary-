import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hadith } from '../types';
import { BOOKS, CHAPTERS } from '../data/hadiths';

interface HadithCardProps {
  hadith: Hadith;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

const HadithCard: React.FC<HadithCardProps> = ({ hadith, isBookmarked, onToggleBookmark }) => {
  const [copied, setCopied] = useState(false);
  const [showChain, setShowChain] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const book = BOOKS.find(b => b.id === hadith.bookId);
  const chapter = CHAPTERS.find(c => c.id === hadith.chapterId);

  const handleCopy = () => {
    const text = `${hadith.arabicText}\n\nکوردی: ${hadith.kurdishText}\n\nڕاوی: ${hadith.narrator}\nژمارە: ${hadith.number} - صحیح البوخاری`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `حەدیث #${hadith.number} - صحیح البوخاری`,
        text: `${hadith.arabicText}\n\n${hadith.kurdishText}`,
        url: window.location.href,
      });
    } else {
      handleCopy();
    }
  };

  const handleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(hadith.arabicText);
    utter.lang = 'ar-SA';
    utter.rate = 0.85;
    utter.onend = () => {
      setIsPlaying(false);
    };
    utter.onerror = () => {
      setIsPlaying(false);
    };
    window.speechSynthesis.speak(utter);
    setIsPlaying(true);
  };

  const gradeBadgeClass = hadith.grade === 'صحيح' ? 'badge-grade-sahih' : hadith.grade === 'حسن' ? 'badge-grade-hasan' : 'badge-grade-daif';

  return (
    <div className="hadith-card">
      {/* Card Header */}
      <div className="hadith-card-header">
        <div className="d-flex align-items-center gap-2">
          <div className="hadith-number">
            <span>{hadith.number}</span>
          </div>
          <div>
            <div className="hadith-book-name">{book?.nameKurdish}</div>
            {chapter && <small className="hadith-chapter-name">{chapter.nameKurdish}</small>}
          </div>
        </div>
        <div className="d-flex align-items-center gap-1">
          <span className={`grade-badge ${gradeBadgeClass}`}>{hadith.gradeKurdish}</span>
          <button
            className={`btn btn-icon-sm ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onToggleBookmark(hadith.id)}
            title={isBookmarked ? 'لابردن لە پاراستنەکان' : 'پاراستن'}
          >
            <i className={`bi ${isBookmarked ? 'bi-bookmark-heart-fill' : 'bi-bookmark-heart'}`}></i>
          </button>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="hadith-arabic">
        <div className="arabic-label">
          <i className="bi bi-globe2"></i>
          <span>ئەرەبی</span>
        </div>
        <p className="arabic-text" dir="rtl">{hadith.arabicText}</p>
      </div>

      {/* Kurdish Translation */}
      <div className="hadith-kurdish">
        <div className="kurdish-label">
          <i className="bi bi-translate"></i>
          <span>کوردی</span>
        </div>
        <p className="kurdish-text" dir="rtl">{hadith.kurdishText}</p>
      </div>

      {/* Narrator */}
      <div className="hadith-narrator">
        <i className="bi bi-person-fill"></i>
        <span>ڕاوی: <strong>{hadith.narrator}</strong></span>
      </div>

      {/* Chain (collapsible) */}
      <div className="hadith-chain-toggle" onClick={() => setShowChain(!showChain)}>
        <i className={`bi ${showChain ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
        <span>سەندەی حەدیث</span>
      </div>
      {showChain && (
        <div className="hadith-chain" dir="rtl">
          <p>{hadith.chain}</p>
        </div>
      )}

      {/* Footer Actions */}
      <div className="hadith-card-footer">
        <button className="btn btn-action" onClick={handleAudio}>
          <i className={`bi ${isPlaying ? 'bi-stop-fill' : 'bi-volume-up-fill'}`}></i>
          <span>{isPlaying ? 'وەستان' : 'گوێ بگرە'}</span>
        </button>
        <button className="btn btn-action" onClick={handleCopy}>
          <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard-fill'}`}></i>
          <span>{copied ? 'کۆپی کرا!' : 'کۆپی کردن'}</span>
        </button>
        <button className="btn btn-action" onClick={handleShare}>
          <i className="bi bi-share-fill"></i>
          <span>بەشکردن</span>
        </button>
        <Link to={`/hadith/${hadith.id}`} className="btn btn-action btn-detail">
          <i className="bi bi-arrow-left-circle-fill"></i>
          <span>زیاتر</span>
        </Link>
      </div>
    </div>
  );
};

export default HadithCard;
