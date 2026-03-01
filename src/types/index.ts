export interface Hadith {
  id: number;
  number: number;
  bookId: number;
  chapterId: number;
  arabicText: string;
  kurdishText: string;
  narrator: string;
  narrator_arabic: string;
  chain: string;
  grade: 'صحيح' | 'حسن' | 'ضعيف';
  gradeKurdish: 'ساغ' | 'باش' | 'لاواز';
}

export interface Book {
  id: number;
  nameArabic: string;
  nameKurdish: string;
  hadithCount: number;
  icon: string;
}

export interface Chapter {
  id: number;
  bookId: number;
  nameArabic: string;
  nameKurdish: string;
  hadithCount: number;
}

export type Theme = 'light' | 'dark';
export type ViewMode = 'grid' | 'list';

export interface AppState {
  theme: Theme;
  bookmarks: number[];
  searchQuery: string;
  selectedBook: number | null;
  selectedChapter: number | null;
}
