import React from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './NoticiasDetalhes.css'


const fetchNoticiaDetalhes = async (titulo) => {
    const { data } = await axios.get(`/api/noticias/${titulo}`);
    return data;
};

const NoticiasDetalhes = () => {
  const navigate = useNavigate();
  const { titulo } = useParams();

  // Fetch noticia details using React Query
  const { data: noticia, isLoading, isError } = useQuery({
    queryKey: ['noticia', titulo],
    queryFn: () => fetchNoticiaDetalhes(titulo),
    enabled: !!titulo, // Only fetch when titulo is available
  });

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar notícias.</p>;

  return (
    <div className="noticias-detalhes-container">
      <button className="noticias-detalhes-voltar-button" onClick={() => navigate('/noticias')}>
        VOLTAR
      </button>
      {noticia ? (
        <>
          <h2 className="noticias-detalhes-titulo">{noticia.titulo}</h2>
          <div className="noticias-detalhes-caixa-noticia">
            <p className="noticias-detalhes-detalhamento">{noticia.detalhamento}</p>
            <p className="noticias-detalhes-licitacoes">{noticia.licitacoes}</p>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default NoticiasDetalhes