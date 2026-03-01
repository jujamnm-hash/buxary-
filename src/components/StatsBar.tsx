import React from 'react';

interface StatsBarProps {
  total: number;
  bookmarkCount: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ total, bookmarkCount }) => {
  return (
    <div className="stats-bar">
      <div className="stats-item">
        <i className="bi bi-collection-fill text-primary"></i>
        <span><strong>{total}</strong> حەدیث</span>
      </div>
      <div className="stats-item">
        <i className="bi bi-bookmark-heart-fill text-danger"></i>
        <span><strong>{bookmarkCount}</strong> پاراستراو</span>
      </div>
    </div>
  );
};

export default StatsBar;
