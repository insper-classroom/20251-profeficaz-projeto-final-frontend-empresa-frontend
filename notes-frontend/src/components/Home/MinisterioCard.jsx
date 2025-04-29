import React from 'react';
import './MinisterioCardCss.css';
import { useNavigate } from 'react-router-dom';

function MinisterioCard({ ministerio }) {
  const navigate = useNavigate();

  const { nome, SIAFE, id } = ministerio;

  return (
    <div className="ministerio-card">
      <h3>{nome}</h3>
      <p>{SIAFE}</p>
      <button onClick={() => navigate(`/overview/${id}`)}>Ver detalhes</button>
    </div>
  );
}

export default MinisterioCard;
