// components/MinisterioDetalhado.jsx
import { useParams } from "react-router-dom";

export default function MinisterioDetalhado() {
  const { siafe, ano } = useParams();

  return (
    <div>
      <h2>Detalhes do Ministério</h2>
      <p>SIAFE: {siafe}</p>
      <p>Ano: {ano}</p>
      {/* Aqui você pode fazer um fetch com esses dados, se quiser */}
    </div>
  );
}
