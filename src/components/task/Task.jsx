import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Task() {
    const { id } = useParams();
    return (
        <>
            <h2>Equipo {id}</h2>
            <nav>
                <Link to={`/equipos/${id}/cargarMovimiento`}>
                    Cargar Movimiento
                </Link>
                <Link to={`/equipos/${id}/cargarCombustible`}>
                    Cargar Combustible
                </Link>
                <Link to={`/equipos/${id}/Movimientos`}>Movimientos</Link>
            </nav>
        </>
    );
}

export default Task;
