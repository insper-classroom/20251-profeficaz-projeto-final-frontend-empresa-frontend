import React from 'react';
import './MinisterioCardCss.css';
import { useNavigate } from 'react-router-dom';

function MinisterioCard({ ministerio }) {
  const navigate = useNavigate();

  const { nome, SIAFI, } = ministerio;

  return (
    <div className="ministerio-card">
      <h3>{nome}</h3>
      <p>{SIAFI}</p>
      <button onClick={() => navigate(`/overview/${SIAFI}`)}>Ver detalhes</button>
    </div>
  );
}

export default MinisterioCard;
