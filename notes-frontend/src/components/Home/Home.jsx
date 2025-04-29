import React from 'react';
import MinisterioCard from './MinisterioCard';
import './Home.css'; // Import the CSS file
import axios from 'axios';
import { useEffect, useState } from "react";




export default function Home() {

  const [ministerios, setMinisterios] = useState([]);

  useEffect(() => {
    axios 
    .get(`http://127.0.0.1:5000/tabela_de_dados`)
    .then((res) => setMinisterios(res.data));
    console.log(ministerios)
  }
  , ministerios)

  // Exemplo ministerio
  // const ministerios = [o 
  //   {
  //     id: 1,
  //     nome: 'Ministério da Saúde',
  //     SIAFE: '123456'
  //   },
  // ];
  

  return (
    <div className="home-container"> 
      <h1>Ministérios</h1>
      <div className="ministerios-container">
        {ministerios.map((m) => (
          <MinisterioCard key={m.id} ministerio={m} />
        ))}
      </div>
    </div>
  );
}
