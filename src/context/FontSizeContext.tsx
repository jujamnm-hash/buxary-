import { createContext } from 'react';

export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
}

export const FONT_SIZES: Record<FontSize, string> = {
  sm: '0.9',
  md: '1',
  lg: '1.15',
  xl: '1.3',
};

export const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 'md',
  setFontSize: () => {},
});
