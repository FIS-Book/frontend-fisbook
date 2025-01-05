// Agregar Button Component
import React from 'react';
import { useNavigate } from "react-router-dom";

const AgregarButton = ({ onClick, userId }) => {
    const navigate = useNavigate();
    return(
        <button className="btn btn-primary" onClick={() => navigate("/readings-list/add-genre", { state: { userId } })}>
            Agregar
        </button>
    )
};

export default AgregarButton;