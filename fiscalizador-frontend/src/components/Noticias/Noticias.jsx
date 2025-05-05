import React, { useState, useEffect } from "react";
import axios from "axios";

const Noticias = () => {
    const [formData, setFormData] = useState({
        titulo: "",
        sinopse: "",
        detalhamento: "",
        licitacoes: "",
    });

    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await axios.get("http://localhost:5000/noticias");
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
        <div>
            <h2>Notícias</h2>
            <div>
                {noticias.length > 0 ? (
                    noticias.map((noticia) => (
                        <div key={noticia.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <h3>{noticia.titulo}</h3>
                            <p><strong>Sinopse:</strong> {noticia.sinopse}</p>
                            <p><strong>Detalhamento:</strong> {noticia.detalhamento}</p>
                            <p><strong>Licitações:</strong> {noticia.licitacoes}</p>
                        </div>
                    ))
                ) : (
                    <p>Não há notícias cadastradas.</p>
                )}
            </div>
        </div>
    );
};

export default Noticias;