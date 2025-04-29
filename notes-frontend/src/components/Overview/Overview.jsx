import React from 'react';
import GraficoBudget from './GraficoBudget';
import './OverviewCss.css'; 
import SubOrgaoCard from './SubOrgaoCard';

const dadosMinisterio = {
  nome: 'Ministério da Saúde',
  empenhado: 1000000,
  liquidado: 600000,
  pago: 200000,
};

function calcularPercentuais({ empenhado, liquidado, pago }) {
  const restante = empenhado - (liquidado + pago);
  return [
    { label: 'Liquidado', value: liquidado, cor: '#0088FE', percentual: ((liquidado / empenhado) * 100).toFixed(1) },
    { label: 'Pago', value: pago, cor: '#00C49F', percentual: ((pago / empenhado) * 100).toFixed(1) },
    { label: 'Restante', value: restante, cor: '#FFBB28', percentual: ((restante / empenhado) * 100).toFixed(1) },
  ];
}

export default function Overview() {
  const { nome, empenhado, liquidado, pago } = dadosMinisterio;
  const dadosGrafico = calcularPercentuais({ empenhado, liquidado, pago });


  const subOrgaos = [
    { nome: 'Orgao A', empenhado: 400000, liquidado: 250000, pago: 100000 },
    { nome: 'Orgao B', empenhado: 300000, liquidado: 200000, pago: 50000 },
    { nome: 'Orgao C', empenhado: 300000, liquidado: 150000, pago: 50000 },
  ];
  

  return (
    <div className="overview-container">
      <h1 className="overview-title">{nome}</h1>

      <GraficoBudget empenhado={empenhado} liquidado={liquidado} pago={pago} />

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
          <strong>empenhado</strong> é o total de dinheiro disponível para o ministério.<br />
          <strong>Liquidado</strong> é o que já foi confirmado como gasto.<br />
          <strong>Pago</strong> é o valor que já saiu do caixa e chegou nas mãos dos prestadores ou fornecedores.<br />
          O restante representa o valor que ainda não foi utilizado.
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


