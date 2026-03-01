import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HADITHS } from '../data/hadiths';

const RandomHadithButton: React.FC = () => {
  const navigate = useNavigate();

  const goRandom = () => {
    const random = HADITHS[Math.floor(Math.random() * HADITHS.length)];
    navigate(`/hadith/${random.id}`);
  };

  return (
    <button className="btn btn-random" onClick={goRandom} title="حەدیثێکی هەڕەمەکی ببینە">
      <i className="bi bi-shuffle"></i>
      <span>حەدیثی هەڕەمەکی</span>
    </button>
  );
};

export default RandomHadithButton;
