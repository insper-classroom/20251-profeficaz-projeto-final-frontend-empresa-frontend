import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './MinisterioCardCss.css';

// Added onHoverPrefetch prop
export default function MinisterioCard({ ministerio, onHoverPrefetch }) {
  if (!ministerio) {
    return <p>Dados do ministério indisponíveis.</p>;
  }

  return (
    <Link
      to={`/overview/${ministerio.SIAFI}`}
      className="ministerio-card-link"
      onMouseEnter={onHoverPrefetch} // Call prefetch function on hover
    >
      <div className="card-container">
        <h3 className="ministerio-nome">{ministerio.nome || ministerio.nome_orgao_resumido || ministerio.orgao || 'Nome Indisponível'}</h3>
        <p className="ministerio-siafi">SIAFI: {ministerio.SIAFI}</p>
      </div>
    </Link>
  );
}
