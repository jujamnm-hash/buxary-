import { useEffect, useState } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.querySelector('.main-content');
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el as HTMLElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    const mainContent = document.querySelector('.main-content');
    mainContent?.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
  );
};

export default ReadingProgressBar;
