import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./index.css";

export async function loader({ params }) {
    try {
        const dados = await axios
            .get("link para informacoes")       
            .then((response) => response.data);
        return { dados };
    } catch (error) {
        return { dados: [] };                  
    }
}

export default function Ministerio() {
    const { dados } = useLoaderData();      
    const navigate = useNavigate();

    return (
        <div className="ministerio">
            {dados.map((item) => (
                <button
                    key={item.id}             
                    onClick={() => navigate(`/ministerio/${item.id}`)} 
                >
                    {item.nome}              
                </button>
            ))}
        </div>
    );
}