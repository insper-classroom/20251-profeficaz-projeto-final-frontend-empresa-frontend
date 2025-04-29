import React from 'react';
import GraficoBudget from './components/Overview/GraficoBudget'; // ajuste o caminho se necessário

function App() {
  // Valores feitos à mão
  const empenhado = 1000000;     // 1 milhão
  const liquidado = 600000;  // 600 mil
  const pago = 200000;       // 200 mil

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Ministério da Educação - empenhado</h1>
      <GraficoBudget empenhado={empenhado} liquidado={liquidado} pago={pago} />
    </div>
  );
}

export default App;
