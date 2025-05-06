import React from 'react';
import MinisterioCard from './MinisterioCard';
import './Home.css'; 
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';




export default function Home() {

  const [ministerios, setMinisterios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/tabelas_de_dados`)
      .then((res) => {
        console.log("Resposta da API:", res.data);
        setMinisterios(res.data.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar os ministérios:", err);
      });
  }, []);

  // Exemplo ministerio
  // const ministerios = [o 
  //   {
  //     id: 1,
  //     nome: 'Ministério da Saúde',
  //     SIAFI: '123456'
  //   },
  // ];
  

  return (
    <div className="home-container">
      <button className="voltar-button" onClick={() => navigate('/noticias')}>VER NOTÍCIAS</button>
      <h1 class='titulo'>Visão Geral</h1>
      <h3 class='subtitulo'>Ministérios</h3>
      <div className="ministerios-container">
        {ministerios.map((m) => (
          <MinisterioCard key={m.SIAFI} ministerio={m} />
        ))}
      </div>
    </div>
  );
}
