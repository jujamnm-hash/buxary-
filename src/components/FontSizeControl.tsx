import React from 'react';
import { useFontSize } from '../context/useFontSize';

const SIZES = [
  { key: 'sm', label: 'A', class: 'fs-size-sm' },
  { key: 'md', label: 'A', class: 'fs-size-md' },
  { key: 'lg', label: 'A', class: 'fs-size-lg' },
  { key: 'xl', label: 'A', class: 'fs-size-xl' },
] as const;

const FontSizeControl: React.FC = () => {
  const { fontSize, setFontSize } = useFontSize();
  return (
    <div className="font-size-control">
      <span className="fs-label"><i className="bi bi-type"></i></span>
      {SIZES.map(s => (
        <button
          key={s.key}
          className={`btn fs-btn ${s.class} ${fontSize === s.key ? 'active' : ''}`}
          onClick={() => setFontSize(s.key)}
          title={`قەبارەی فۆنت: ${s.key}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default FontSizeControl;
