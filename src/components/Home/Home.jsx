import React from 'react';
import MinisterioCard from './MinisterioCard';
import './Home.css';
import GraficoBudget from '../Overview/GraficoBudget';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// API fetching function for ministerios
const fetchMinisteriosData = async () => {
  const { data } = await axios.get('/api/tabelas_de_dados');
  return data.data || []; // Ensure it returns an array
};

// It seems fetchOrgaosData is used for prefetching Overview data later.
// If it's not already globally available or imported from Overview.jsx, define it here or import it.
// For now, assuming it might be imported or defined elsewhere if needed for prefetching logic in MinisterioCard.
// If not, we might need to make Overview.jsx export it or define a similar one here.
const fetchOrgaosData = async (SIAFI, ano) => {
  const { data } = await axios.get(`/api/tabelas_de_dados/${SIAFI}/${ano}`); // Changed to relative path
  return data.data || [];
};

// Updated to fetch actual noticias data
const fetchNoticiasData = async () => {
  const { data } = await axios.get('/api/noticias'); // Corrected endpoint
  return data.data || []; // Ensure it returns an array
};


export default function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: ministerios, isLoading, isError, error } = useQuery({
    queryKey: ['ministerios'],
    queryFn: fetchMinisteriosData,
  });

  const handleNavigateToNoticias = () => {
    navigate('/noticias');
  };

  const prefetchNoticias = () => {
    queryClient.prefetchQuery({
      queryKey: ['noticias'], // Define a unique key for noticias
      queryFn: fetchNoticiasData, // Ensure this function fetches your news data
    });
  };

  if (isLoading) return <p>Carregando ministérios...</p>;
  if (isError) return <p>Erro ao buscar os ministérios: {error.message}</p>;
  

  return (
    <div className="home-container">
      <button 
        className="noticias-button" 
        onClick={handleNavigateToNoticias} 
        onMouseEnter={prefetchNoticias} // Prefetch noticias on hover
      >
        VER NOTÍCIAS
      </button>
      <h1 className='titulo'>Visão Geral</h1>
      <h3 className='subtitulo'>Ministérios</h3>
      <div className="ministerios-container">
      {(ministerios || []).map((m) => (
        <div key={m.SIAFI} className="ministerio-item-row" >
          <MinisterioCard 
            ministerio={m} 
            // Pass prefetch function to MinisterioCard if SIAFI is available on m
            onHoverPrefetch={() => {
              if (m.SIAFI) {
                queryClient.prefetchQuery({
                  queryKey: ['orgaos', m.SIAFI, '2024'], // Default to 2024 or a relevant year
                  queryFn: () => fetchOrgaosData(m.SIAFI, '2024'),
                });
              }
            }}
          />
          <GraficoBudget
            empenhado={Number(m.empenhado)/100}
            liquidado={Number(m.liquidado)/100}
            pago={Number(m.pago)/100}
            innerRadius={30}
            outerRadius={60}
            home={true}
            size={(2*60)+2}
          />
        </div>
      ))}
      </div>
    </div>
  );
}
