import React from 'react';
import './MinisterioCardCss.css';
import { useNavigate } from 'react-router-dom';

function MinisterioCard({ ministerio }) {
  const navigate = useNavigate();

  const { nome, SIAFI, } = ministerio;

  return (
    <button className="ministerio-card" onClick={() => navigate(`/overview/${SIAFI}`)}>
      <h3 className='nomeministerio'>{nome}</h3>
      <p className='codsiafi'>COD. SIAFI: {SIAFI}</p>
    </button>
  );
}

export default MinisterioCard;
