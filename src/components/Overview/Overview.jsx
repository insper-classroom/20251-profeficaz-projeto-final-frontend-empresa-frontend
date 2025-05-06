import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GraficoBudget from './GraficoBudget';
import SubOrgaoCard from './SubOrgaoCard';
import './OverviewCss.css';
import axios from 'axios';

function calcularPercentuais({ empenhado, liquidado, pago }) {
  const verba_diponivel = empenhado - liquidado;
  const falta_pagar = liquidado - pago;
  const total_calculado = verba_diponivel + falta_pagar + pago;

  return [
    {
      label: 'Verba Ainda Disponível',
      value: verba_diponivel,
      cor: '#FFBB28',
      percentual: ((verba_diponivel / total_calculado) * 100).toFixed(1),
    },
    {
      label: 'Liquidado Porém Não Pago',
      value: falta_pagar,
      cor: '#0088FE',
      percentual: ((falta_pagar / total_calculado) * 100).toFixed(1),
    },
    {
      label: 'Pago',
      value: pago,
      cor: '#00C49F',
      percentual: ((pago / total_calculado) * 100).toFixed(1),
    },
  ];
}

export default function Overview() {
  const { SIAFI } = useParams();
  const navigate = useNavigate();
  const [orgaos, setOrgaos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ano, setAno] = useState('2024'); // Estado para o ano selecionado

  useEffect(() => {
    async function fetchOrgaos(SIAFI, ano) {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/tabelas_de_dados/${SIAFI}/${ano}`);
        setOrgaos(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar órgãos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrgaos(SIAFI, ano);
  }, [SIAFI, ano]); // Adicione `ano` como dependência para recarregar os dados ao mudar o ano

  if (loading) return <p>Carregando...</p>;

  const orgaoPrincipal = orgaos[0];
  const subOrgaos = orgaos.slice(1);
  const dadosGrafico = orgaoPrincipal ? calcularPercentuais(orgaoPrincipal) : [];

  return (
    <div className="overview-container">
      <button onClick={() => navigate('/')}>Voltar</button>
      <h1 className="overview-title">{orgaoPrincipal?.orgao}</h1>

      {/* Seletor de ano */}
      <div className="year-selector">
        <label htmlFor="ano">Selecione o ano:</label>
        <select
          id="ano"
          value={ano}
          onChange={(e) => {
            setLoading(true); // Mostra o carregamento ao mudar o ano
            setAno(e.target.value);
          }}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <GraficoBudget
        empenhado={orgaoPrincipal?.empenhado/100}
        liquidado={orgaoPrincipal?.liquidado/100}
        pago={orgaoPrincipal?.pago/100}
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
      <div>
        {subOrgaos.map((orgao, index) => (
          <SubOrgaoCard
            key={index}
            nome={orgao.orgao}
            empenhado={orgao.empenhado/100}
            liquidado={orgao.liquidado/100}
            pago={orgao.pago/100}
          />
        ))}
      </div>
    </div>
  );
}
