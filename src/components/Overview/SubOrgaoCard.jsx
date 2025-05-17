import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './SubOrgaoCardCss.css';

const cores = ['#0088FE', '#00C49F', '#FFBB28'];

function SubOrgaoCard({ nome, empenhado, liquidado, pago }) {
  const restante = empenhado - liquidado; // Empenhado mas não liquidado
  const falta_liquidar = liquidado - pago; // Liquidado mas não pago

  // Calcula as porcentagens em relação ao valor empenhado
  const percentualPago = empenhado > 0 ? (pago / empenhado) * 100 : 0;
  const percentualLiquidadoNaoPago = empenhado > 0 ? (falta_liquidar / empenhado) * 100 : 0;
  const percentualALiquidar = empenhado > 0 ? (restante / empenhado) * 100 : 0;

  const data = [
    { name: 'Liquidado', value: falta_liquidar }, // Corresponde a 'Falta Pagar' no GraficoBudget
    { name: 'Pago', value: pago },
    { name: 'A Liquidar', value: restante }, // Corresponde a 'Verba Disponível' no GraficoBudget
  ];

  return (
    <div className="sub-orgao-card">
      <div className="info">
        <h4>{nome}</h4>
        <p>
          Pago: {percentualPago.toFixed(1)}% | Liquidado: {percentualLiquidadoNaoPago.toFixed(1)}% | A Liquidar: {percentualALiquidar.toFixed(1)}%
        </p>
      </div>
      <div className="mini-chart">
        <PieChart width={80} height={80}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={40}
            size={(2*40)+2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}

export default SubOrgaoCard;
