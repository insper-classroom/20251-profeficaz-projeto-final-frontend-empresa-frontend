import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React from 'react';
import './GraficoBudgetCss.css';

function GraficoBudget(props) {
  const empenhado = props.empenhado;
  const liquidado = props.liquidado;
  const pago = props.pago;

  // Verificar inconsistências
  const isLiquidadoMaiorQueEmpenhado = liquidado >= empenhado;
  const isPagoMaiorQueLiquidado = pago >= liquidado;
  const isOverBudget = pago >= empenhado;

  // Processar dados para o gráfico
  const processarDados = () => {
    const emp = Number(empenhado) || 0;
    const liq = Number(liquidado) || 0;
    const pg = Number(pago) || 0;
    
    const faltaPagar = liq - pg;
    const verbaDisponivel = emp - liq;
    const totalCalculado = faltaPagar + verbaDisponivel + pg;
    const normalizador = emp / totalCalculado;

    if (isLiquidadoMaiorQueEmpenhado || isPagoMaiorQueLiquidado) {
      return [
        { name: 'Inconsistência', value: faltaPagar },
        { name: 'Inconsistência', value: pg },
        { name: 'Inconsistência', value: verbaDisponivel },
      ];
    }

    return [
      { name: 'Liquidado Porém Não Pago', value: faltaPagar * normalizador },
      { name: 'Pago', value: pg * normalizador },
      { name: 'Verba Disponível', value: verbaDisponivel * normalizador },
    ];
  };

  const data = processarDados();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
<div className="grafico-container">
  {/* Alerta de inconsistência */}
  {(isLiquidadoMaiorQueEmpenhado || isPagoMaiorQueLiquidado) && (
    <div className="inconsistencia-alert">
      <strong>Atenção:</strong>
      <ul className="inconsistencia-list">
        {isLiquidadoMaiorQueEmpenhado && (
          <li>O valor liquidado (R$ {liquidado.toLocaleString('pt-BR')}) excede o empenhado (R$ {empenhado.toLocaleString('pt-BR')})</li>
        )}
        {isPagoMaiorQueLiquidado && (
          <li>O valor pago (R$ {pago.toLocaleString('pt-BR')}) excede o liquidado (R$ {liquidado.toLocaleString('pt-BR')})</li>
        )}
      </ul>
      <small>O gráfico pode não representar com precisão estes valores inconsistentes.</small>
    </div>
  )}

  {/* Gráfico e valor central agrupados */}
  <div className="grafico-wrapper">
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={100}
        outerRadius={140}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
    </PieChart>

    <div className="valor-central">
      <div className="valor-total">
        R$ {empenhado.toLocaleString('pt-BR')}
      </div>
      <div className="valor-label">
        Verba Total
      </div>
    </div>
  </div>
</div>
  );
}

export default GraficoBudget;
