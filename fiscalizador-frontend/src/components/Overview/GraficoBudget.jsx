import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React from 'react';

function GraficoBudget(props) {
  const empenhado = props.empenhado;
  const liquidado = props.liquidado;
  const pago = props.pago;
  
  let pagoMaiorQueLiquidado = false
  let liquidadoMaiorQueEmpenhado = false
  // Verificar inconsistências
  if (liquidado > empenhado) {
    liquidadoMaiorQueEmpenhado = true

  }
  if (pago > liquidado){
    pagoMaiorQueLiquidado = true
  }
  
  const processarDados = (empenhado, liquidado, pago, liquidadoMaiorQueEmpenhado, pagoMaiorQueLiquidado) => {
    // Garantir que os valores sejam números
    const emp = Number(empenhado) || 0;
    const liq = Number(liquidado) || 0;
    const pg = Number(pago) || 0;
    
    const falta_pagar = liq - pg;
    const verba_disponivel = emp - liq;
    const total_calculado = falta_pagar + verba_disponivel + pg

    const normalizador = emp / total_calculado
    


    if (liquidadoMaiorQueEmpenhado) {
      return [
        { name: 'ALGO ERRADO', value: falta_pagar },
        { name: 'ALGO ERRADO', value: pg },
        { name: 'ALGO ERRADO', value: verba_disponivel },
      ]
    } else if (pagoMaiorQueLiquidado ) {
      return [
        { name: 'ALGO ERRADO', value: falta_pagar },
        { name: 'ALGO ERRADO', value: pg },
        { name: 'ALGO ERRADO', value: verba_disponivel },
      ]
    } else {
      return [
        { name: 'Liquidado Porém Não Pago', value: falta_pagar * normalizador },
        { name: 'Pago', value: pg * normalizador },
        { name: 'Verba Disponível', value: verba_disponivel * normalizador },
      ];
    }
  };
  
  const data =  processarDados(empenhado, liquidado, pago, liquidadoMaiorQueEmpenhado, pagoMaiorQueLiquidado) 
  const total = empenhado;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>
      {/* Alertas de inconsistência */}
      {(liquidadoMaiorQueEmpenhado || pagoMaiorQueLiquidado) && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          color: '#856404', 
          padding: '10px', 
          borderRadius: '5px',
          marginBottom: '15px',
          border: '1px solid #ffeeba'
        }}>
          <strong>Atenção:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            {liquidadoMaiorQueEmpenhado && (
              <li>O valor liquidado (R$ {liquidado.toLocaleString('pt-BR')}) excede o empenhado (R$ {empenhado.toLocaleString('pt-BR')})</li>
            )}
            {pagoMaiorQueLiquidado && (
              <li>O valor pago (R$ {pago.toLocaleString('pt-BR')}) excede o liquidado (R$ {liquidado.toLocaleString('pt-BR')})</li>
            )}
          </ul>
          <small>O gráfico pode não representar com precisão estes valores inconsistentes.</small>
        </div>
      )}

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

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          R$ {total.toLocaleString('pt-BR')}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Verba Total
        </div>
      </div>
    </div>
  );
}

export default GraficoBudget;
