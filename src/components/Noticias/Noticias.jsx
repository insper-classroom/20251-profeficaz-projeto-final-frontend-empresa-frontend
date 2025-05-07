import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Noticias.css'

const Noticias = () => {
    const [formData, setFormData] = useState({
        titulo: "",
        sinopse: "",
        detalhamento: "",
        licitacoes: "",
    });

    const navigate = useNavigate();
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/noticias");
                setNoticias(response.data.data);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
                alert("Erro ao carregar notícias.");
            }
        };

        fetchNoticias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/noticias", formData);
            alert("Notícia enviada com sucesso!");
            setFormData({
                titulo: "",
                sinopse: "",
                detalhamento: "",
                licitacoes: "",
            });
            setNoticias((prevNoticias) => [...prevNoticias, response.data.data]);
        } catch (error) {
            console.error("Erro ao enviar notícia:", error);
            alert("Erro ao enviar notícia.");
        }
    };

    return (
        <div className="noticias-container">
            <button className="voltar-button" onClick={() => navigate('/')}>Voltar</button>
            <h2 className='titulo'>Notícias</h2>
            <div>
                {noticias.length > 0 ? (
                    noticias.map((noticia) => (
                        <button 
                        key={noticia.titulo} 
                        onClick={() => navigate(`/noticias/${noticia.titulo}`)} 
                        className="noticia-card"
                        >
                            <h3>{noticia.titulo}</h3>
                            <p className='paragrafo'>{noticia.sinopse}</p>
                        </button>
                    ))
                ) : (<p>Não há notícias cadastradas.</p>)}
            </div>
        </div>
    );
};

export default Noticias;