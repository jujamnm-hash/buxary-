import React from 'react';
import { BOOKS } from '../data/hadiths';

interface FilterBarProps {
  selectedBookId: number | null;
  onSelectBook: (id: number | null) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedBookId,
  onSelectBook,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <span className="filter-label">
          <i className="bi bi-funnel-fill"></i> فلتەر:
        </span>
        <button
          className={`btn filter-btn ${!selectedBookId ? 'active' : ''}`}
          onClick={() => onSelectBook(null)}
        >
          هەمووی
        </button>
        {BOOKS.slice(0, 8).map(book => (
          <button
            key={book.id}
            className={`btn filter-btn ${selectedBookId === book.id ? 'active' : ''}`}
            onClick={() => onSelectBook(book.id)}
          >
            <i className={`bi ${book.icon} me-1`}></i>
            {book.nameKurdish.replace('کتێبی ', '')}
          </button>
        ))}
      </div>
      <div className="view-toggle">
        <button
          className={`btn btn-icon-sm ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => onViewModeChange('list')}
          title="لیستی"
        >
          <i className="bi bi-list-ul"></i>
        </button>
        <button
          className={`btn btn-icon-sm ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onViewModeChange('grid')}
          title="خانەیی"
        >
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
