import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GraficoBudget from './GraficoBudget';
import SubOrgaoCard from './SubOrgaoCard';
import './OverviewCss.css';
import axios from 'axios';

function calcularPercentuais({ empenhado, liquidado, pago }) {
  const restante = empenhado - (liquidado + pago);
  return [
    { label: 'Liquidado', value: liquidado, cor: '#0088FE', percentual: ((liquidado / empenhado) * 100).toFixed(1) },
    { label: 'Pago', value: pago, cor: '#00C49F', percentual: ((pago / empenhado) * 100).toFixed(1) },
    { label: 'Restante', value: restante, cor: '#FFBB28', percentual: ((restante / empenhado) * 100).toFixed(1) },
  ];
}

export default function Overview() {
  const { SIAFE } = useParams();
  const navigate = useNavigate();
  const [orgaos, setOrgaos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrgaos(SIAFE) {
      try {
        const response = await axios.get(`http://localhost:5000/tabelas_de_dados/${SIAFE}/2024`);
        setOrgaos(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar órgãos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrgaos(SIAFE);
  }, [SIAFE]);

  if (loading) return <p>Carregando...</p>;

  // Primeiro orgão da lista é o superior
  const orgaoPrincipal = orgaos[0];
  const subOrgaos = orgaos.slice(1);
  const dadosGrafico = calcularPercentuais(orgaoPrincipal);

  return (
    <div className="overview-container">
      <button onClick={() => navigate('/')}>Voltar</button>
      <h1 className="overview-title">{orgaoPrincipal.nome}</h1>

      <GraficoBudget
        empenhado={orgaoPrincipal.empenhado}
        liquidado={orgaoPrincipal.liquidado}
        pago={orgaoPrincipal.pago}
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
          <strong>Liquidado</strong>: Valor efetivamente gasto.<br />
          <strong>Pago</strong>: Valor já transferido para os fornecedores.<br />
          O restante é o que ainda está disponível para liquidar.
        </p>
      </div>

      <h2 style={{ marginTop: '40px' }}>Órgãos subordinados</h2>
      <div>
        {subOrgaos.map((orgao, index) => (
          <SubOrgaoCard
            key={index}
            nome={orgao.nome}
            empenhado={orgao.empenhado}
            liquidado={orgao.liquidado}
            pago={orgao.pago}
          />
        ))}
      </div>
    </div>
  );
}


