import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./index.css";

export async function loader() {
    try {
        const response = await axios.get("http://localhost:5000/tabelas_de_dados");
        const dados = response.data?.data || []; // Corrigido aqui
        console.log(dados);
        return { dados };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { dados: [] };
    }
}


export default function Ministerio() {
    const { dados } = useLoaderData();      
    const navigate = useNavigate();

    return (
        <div className="ministerio">
            {Array.isArray(dados) && dados.length > 0 ? dados.map((item) => (
                <button
                    key={item?.id || Math.random()}
                    onClick={() => {
                    console.log("Navegando para:", `/tabelas_de_dados/${item.SIAFE}/2024`);
                    navigate(`/tabelas_de_dados/${item.SIAFE}/2024`);
                    }}
                    >
                    {item?.nome || "Unnamed Item"}
                    </button>
            )) : <p>No data available</p>}
        </div>
    );
}