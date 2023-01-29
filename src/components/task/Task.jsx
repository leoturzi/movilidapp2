import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Task() {
    const { id } = useParams();
    return (
        <>
            <h2>Equipo {id}</h2>
            <nav>
                <Link to={`/equipo/${id}/cargarMovimiento`}>
                    Cargar Movimiento
                </Link>
                <Link to={`/equipo/${id}/cargarCombustible`}>
                    Cargar Combustible
                </Link>
                <Link to={`/equipo/${id}/Movimientos`}>Movimientos</Link>
            </nav>
        </>
    );
}

export default Task;
