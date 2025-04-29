import { PieChart, Pie, Cell, Tooltip } from 'recharts';



function BudgetChart(props) {
  const processarDados = (empenhado, liquidado, pago) => {
    const restante = empenhado - (liquidado + pago);
    
    return [
      { name: 'Liquidado', value: liquidado },
      { name: 'Pago', value: pago },
      { name: 'Restante', value: restante },
    ];
  };

  const empenhado = props.empenhado;
  const liquidado = props.liquidado;
  const pago = props.pago;  

  const data = processarDados(empenhado, liquidado, pago);
  const total = empenhado;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ position: 'relative', width: 300, height: 300, margin: '0 auto' }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
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

export default BudgetChart;
