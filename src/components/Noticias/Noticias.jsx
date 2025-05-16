import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Noticias.css';
import { useQuery } from '@tanstack/react-query';

// API fetching function for noticias
const fetchNoticias = async () => {
    const { data } = await axios.get("/api/noticias");
    return data.data || []; // Ensure it returns an array
};

const Noticias = () => {
    const navigate = useNavigate();

    // Fetch noticias using useQuery
    const { data: noticias, isLoading, isError, error } = useQuery({
        queryKey: ['noticias'],
        queryFn: fetchNoticias,
    });

    if (isLoading) return <p>Carregando notícias...</p>;
    if (isError) return <p>Erro ao carregar notícias: {error.message}</p>;

    return (
        <div className="noticias-container">
            <div>
                <button className="voltar-button" onClick={() => navigate('/')}>VOLTAR</button>
            </div>
            <h1 className='titulo'>Notícias</h1>
            <div className="noticias-list">
                {(noticias || []).length > 0 ? (
                    (noticias || []).map((noticia) => (
                        <button 
                            key={noticia.titulo} 
                            onClick={() => navigate(`/noticias/${noticia.titulo}`)} 
                            className="noticia-card"
                        >
                            <h3>{noticia.titulo}</h3>
                            <p className='paragrafo'>{noticia.sinopse}</p>
                        </button>
                    ))
                ) : (
                    <p>Não há notícias cadastradas.</p>
                )}
        </div>
        </div>
    );
};

export default Noticias;