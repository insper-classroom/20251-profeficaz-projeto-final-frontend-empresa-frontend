import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './SubOrgaoCardCss.css';

const cores = ['#0088FE', '#00C49F', '#FFBB28'];

function SubOrgaoCard({ nome, empenhado, liquidado, pago }) {
  const restante = empenhado - (liquidado + pago);
  const data = [
    { name: 'Liquidado', value: liquidado },
    { name: 'Pago', value: pago },
    { name: 'Restante', value: restante },
  ];

  return (
    <div className="sub-orgao-card">
      <div className="info">
        <h4>{nome}</h4>
        <p>Verba: {empenhado.toLocaleString()} | Liquidado: {liquidado.toLocaleString()} | Pago: {pago.toLocaleString()}</p>
      </div>
      <div className="mini-chart">
        <PieChart width={80} height={80}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={40}
            dataKey="value"
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
