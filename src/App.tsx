import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ReadingProgressBar from './components/ReadingProgressBar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import HadithDetailPage from './pages/HadithDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import SearchPage from './pages/SearchPage';
import BooksPage from './pages/BooksPage';
import NotFoundPage from './pages/NotFoundPage';
import FontSizeProvider from './context/FontSizeProvider';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }, []);

  const toggleBookmark = useCallback((id: number) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  }, []);

  return (
    <FontSizeProvider>
      <div className={`app-root theme-${theme}`} data-bs-theme={theme}>
        <ReadingProgressBar />
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          bookmarkCount={bookmarks.length}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="app-layout">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="main-content">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
              <Route path="/hadith/:id" element={<HadithDetailPage bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
              <Route path="/bookmarks" element={<BookmarksPage bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
              <Route path="/search" element={<SearchPage bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:bookId" element={<HomePage bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </FontSizeProvider>
  );
};

export default App;
