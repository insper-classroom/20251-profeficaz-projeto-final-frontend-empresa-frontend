// components/MinisterioDetalhado.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MinisterioDetalhado() {
  const { siafe, ano } = useParams();
  const [dados, setDados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/tabelas_de_dados/${siafe}/${ano}`);
        setDados(response.data?.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    }
    fetchData();
  }, [siafe, ano]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Detalhes do Ministério</h2>
      <p>SIAFE: {siafe}</p>
      <p>Ano: {ano}</p>
      <p>Dados: {JSON.stringify(dados[0])}</p>
    </div>
  );
}
