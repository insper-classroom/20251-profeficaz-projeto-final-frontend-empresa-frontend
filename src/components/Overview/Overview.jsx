import React, { useState } from 'react'; // Removed useEffect
import { useParams, useNavigate } from 'react-router-dom';
import GraficoBudget from './GraficoBudget';
import SubOrgaoCard from './SubOrgaoCard';
import './Overview.css';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query'; // Added useQuery and useQueryClient

// API fetching function - must be defined outside the component or memoized
const fetchOrgaosData = async (SIAFI, ano) => {
  const { data } = await axios.get(`/api/tabelas_de_dados/${SIAFI}/${ano}`); // Changed to relative path
  return data.data || []; // Ensure it returns an array, even if data.data is null/undefined
};

export function calcularPercentuais({ empenhado, liquidado, pago }) {
  const verba_diponivel = empenhado - liquidado;
  const falta_pagar = liquidado - pago;
  const total_calculado = verba_diponivel + falta_pagar + pago;

  // Helper to calculate percentage and handle division by zero
  const calculatePercent = (value, total) => {
    if (total === 0) {
      return '0.0'; // Avoid division by zero, return '0.0'
    }
    const percent = (value / total) * 100;
    return isNaN(percent) ? '0.0' : percent.toFixed(1); // Handle potential NaN from calculation
  };

  return [
    {
      label: 'Verba Ainda Disponível',
      value: verba_diponivel,
      cor: '#FFBB28',
      percentual: calculatePercent(verba_diponivel, total_calculado),
    },
    {
      label: 'Liquidado Porém Não Pago',
      value: falta_pagar,
      cor: '#0088FE',
      percentual: calculatePercent(falta_pagar, total_calculado),
    },
    {
      label: 'Pago',
      value: pago,
      cor: '#00C49F',
      percentual: calculatePercent(pago, total_calculado),
    },
  ];
}

export default function Overview() {
  const { SIAFI } = useParams();
  const navigate = useNavigate();
  const [ano, setAno] = useState('2024');
  const queryClient = useQueryClient(); // For pre-fetching

  // Use useQuery to fetch data
  const { data: orgaos, isLoading, isError, error } = useQuery({
    queryKey: ['orgaos', SIAFI, ano], // Unique key for this query, includes SIAFI and ano
    queryFn: () => fetchOrgaosData(SIAFI, ano),
    // staleTime: 5 * 60 * 1000, // Optional: Data is considered fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Optional: Data is kept in cache for 10 minutes
  });

  // Handle year change and potentially pre-fetch next/prev year
  const handleAnoChange = (newAno) => {
    setAno(newAno);
    // Optional: Pre-fetch data for other years if needed
    // queryClient.prefetchQuery({ queryKey: ['orgaos', SIAFI, String(Number(newAno) + 1)], queryFn: () => fetchOrgaosData(SIAFI, String(Number(newAno) + 1)) });
    // queryClient.prefetchQuery({ queryKey: ['orgaos', SIAFI, String(Number(newAno) - 1)], queryFn: () => fetchOrgaosData(SIAFI, String(Number(newAno) - 1)) });
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados: {error.message}</p>;

  // Check if orgaos array is empty or orgaoPrincipal is not available
  if (!orgaos || orgaos.length === 0) {
    return <p>Dados não encontrados para o órgão principal no ano {ano}.</p>;
  }
  
  const orgaoPrincipal = orgaos[0];
  if (!orgaoPrincipal) {
    return <p>Dados do órgão principal inválidos para o ano {ano}.</p>;
  }

  const subOrgaos = orgaos.slice(1);

  // Ensure financial values are numbers, default to 0 if undefined or NaN, then divide by 100
  const empenhadoValor = (Number(orgaoPrincipal.empenhado) || 0) / 100;
  const liquidadoValor = (Number(orgaoPrincipal.liquidado) || 0) / 100;
  const pagoValor = (Number(orgaoPrincipal.pago) || 0) / 100;

  const dadosGrafico = calcularPercentuais({
    empenhado: empenhadoValor,
    liquidado: liquidadoValor,
    pago: pagoValor,
  });

  return (
<div className="overview-container">
    <button className="voltar" onClick={() => navigate('/')}>Voltar</button>
  <div className="overview-header">
    <h1 className="overview-title">{orgaoPrincipal.orgao || 'Nome do Órgão Indisponível'}</h1>
    <div className="year-selector">
      <label htmlFor="ano">Selecione o ano:</label>
      <select
        id="ano"
        value={ano}
        onChange={(e) => {
          // setLoading(true); // No longer needed, useQuery handles loading state
          handleAnoChange(e.target.value);
        }}
      >
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
  </div>


      <GraficoBudget
        empenhado={empenhadoValor}
        liquidado={liquidadoValor}
        pago={pagoValor}
      />

      <div className="legend-container">
        {dadosGrafico.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.cor }}></div>
            <span className="legend-label">{item.label}:</span>
            <span className="legend-percent">{item.percentual}%</span>
          </div>
        ))}
      </div>

      <div className="explanation-box">
        <h3>O que significam esses valores?</h3>
        <p>
          <strong>Empenhado</strong>: Total reservado para o ministério.<br />
          <strong>Liquidado</strong>: Valor já transferido para os órgãos.<br />
          <strong>Pago</strong>: Valor efetivamente gasto.<br />
          O restante é o que ainda está disponível para liquidar.
        </p>
      </div>

      <h2 style={{ marginTop: '40px' }}>Órgãos subordinados</h2>
      <div className="sub-orgao-container">
        {subOrgaos.map((orgao, index) => (
          <SubOrgaoCard
            key={index}
            nome={orgao.orgao}
            empenhado={orgao.empenhado/100}
            liquidado={orgao.liquidado/100}
            pago={orgao.pago/100}
            size
          />
        ))}
      </div>
    </div>
  );
}