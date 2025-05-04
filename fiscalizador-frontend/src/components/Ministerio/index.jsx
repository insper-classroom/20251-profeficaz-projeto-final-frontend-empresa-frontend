import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";

export default function Ministerio(props) {
    const [ministerio, setMinisterio] = useState("")

    const criarMinisterios = (event) => {
        event.preventDefault();

        const data = {
            "ministerio": ministerio
        }

        axios
            .post("http://localhost:8000/api/notes/", data)
            .then((response) => { 
                
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className="ministerio">
            <button type="submit">Ministerio da Saude</button>
        </div>
    );
}