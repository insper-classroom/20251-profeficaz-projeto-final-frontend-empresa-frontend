import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React from 'react';
import './GraficoBudgetCss.css';

const COLORS = ['#00C9A7', '#2196f3', '#ffc107']; // Exemplo de cores

function GraficoBudget(props) {
  // Initial props
  const initialEmpenhado = props.empenhado;
  const initialLiquidado = props.liquidado;
  const initialPago = props.pago;

  const innerRadius = Number(props.innerRadius) || 95;
  const outerRadius = Number(props.outerRadius) || 160;
  const home = props.home || false;
  const size = props.size || 330;

  // Process props into guaranteed numbers, defaulting to 0
  const emp = Number(initialEmpenhado) || 0;
  const liq = Number(initialLiquidado) || 0;
  const pg = Number(initialPago) || 0;

  // Verificar inconsistências using sanitized numbers
  const isLiquidadoMaiorQueEmpenhado = liq >= emp;
  const isPagoMaiorQueLiquidado = pg >= liq;

  // Processar dados para o gráfico using sanitized numbers
  const faltaPagar = liq - pg;
  const verbaDisponivel = emp - liq;

  let data;
  if (isLiquidadoMaiorQueEmpenhado || isPagoMaiorQueLiquidado) {
    data = [
      { name: 'Inconsistência', value: faltaPagar },
      { name: 'Inconsistência', value: pg },
      { name: 'Inconsistência', value: verbaDisponivel },
    ];
  } else {
    data = [
      { name: 'Pago', value: pg },
      { name: 'Falta Pagar', value: faltaPagar },
      { name: 'Verba Disponível', value: verbaDisponivel },
    ];
  }

  return (
    <div className="grafico-container">
      {/* Alerta de inconsistência */}
      {(isLiquidadoMaiorQueEmpenhado || isPagoMaiorQueLiquidado) && (
        <div className="inconsistencia-alert">
          <strong>Atenção:</strong>
          <ul className="inconsistencia-list">
            {isLiquidadoMaiorQueEmpenhado && (
              <li>O valor liquidado (R$ {liq.toLocaleString('pt-BR')}) excede o empenhado (R$ {emp.toLocaleString('pt-BR')})</li>
            )}
            {isPagoMaiorQueLiquidado && (
              <li>O valor pago (R$ {pg.toLocaleString('pt-BR')}) excede o liquidado (R$ {liq.toLocaleString('pt-BR')})</li>
            )}
          </ul>
          <small>O gráfico pode não representar com precisão estes valores inconsistentes.</small>
        </div>
      )}

      {/* Gráfico e valor central agrupados */}
      <div className="grafico-wrapper-externo" style={{ width: size, height: size }}>
        {/* Círculo de fundo para mascarar as pontas */}
        <div className="grafico-circulo-fundo" style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: '#242424',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none'
        }} />
        <div className="grafico-wrapper" style={{ width: size, height: size, position: 'relative', zIndex: 1 }}>
          <PieChart
            width={size}
            height={size}
            className="grafico-svg-circular"
          >
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
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
          {/* Conteúdo central */}
          {!home && (
            <div className="valor-central">
              <div className="valor-total">
                R$ {emp.toLocaleString('pt-BR')}
              </div>
              <div className="valor-label">
                Verba Total
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GraficoBudget;