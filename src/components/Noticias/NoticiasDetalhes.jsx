import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './Noticias.css'


const NoticiasDetalhes = () => {
  const navigate = useNavigate();
  const { titulo } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
      const fetchNoticias = async () => {
          try {
              const response = await axios.get(`http://127.0.0.1:5000/noticias/${titulo}`);
              setNoticia(response.data);
          } catch (error) {
              console.error("Erro ao buscar notícias:", error);
              alert("Erro ao carregar notícias.");
          }
      };
      
      if (titulo) {
    
        fetchNoticias();
      }

  }, [titulo]);


  return (
    <div className="noticias-container">
    <button className="voltar-button" onClick={() => navigate('/noticias')}>Voltar</button>
    {noticia ? (
      <>
        <h2 className="titulo">{noticia.titulo}</h2>
        <p>{noticia.detalhamento}</p>
        <p>{noticia.licitacoes}</p>
      </>
    ) : (
      <p>Carregando...</p>
    )}
  </div>
  );
} 


export default NoticiasDetalhes