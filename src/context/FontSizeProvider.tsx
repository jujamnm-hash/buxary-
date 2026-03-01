import React, { useState, useCallback, ReactNode } from 'react';
import { FontSizeContext, FontSize, FONT_SIZES } from './FontSizeContext';

const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('fontSize') as FontSize) || 'md';
  });

  const setFontSize = useCallback((s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem('fontSize', s);
    document.documentElement.style.setProperty('--font-scale', FONT_SIZES[s]);
  }, []);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', FONT_SIZES[fontSize]);
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export default FontSizeProvider;
