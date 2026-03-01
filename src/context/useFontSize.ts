import { useContext } from 'react';
import { FontSizeContext } from './FontSizeContext';

export const useFontSize = () => useContext(FontSizeContext);
