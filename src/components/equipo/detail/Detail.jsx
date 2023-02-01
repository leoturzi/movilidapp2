import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovimientosEquipo } from '../../../firebase';

function Detail() {
    const { id: equipoId } = useParams();

    const [movimientos, setMovimientos] = useState(null);
    const [headerKeys, setHeaderKeys] = useState([]);

    useEffect(() => {
        const fetchMovimientos = async () => {
            const data = await getMovimientosEquipo(equipoId);
            if (data) {
                setMovimientos(data);
                setHeaderKeys(() => {
                    const movimientoId = Object.keys(data)[0];
                    return Object.keys(data[movimientoId]);
                });
            }
        };
        if (!movimientos) {
            fetchMovimientos();
        }
    }, []);

    return !movimientos ? (
        <h3>...Cargando Movimientos</h3>
    ) : (
        <table>
            <thead>
                <tr>
                    {headerKeys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(movimientos).map((movimientoId) => (
                    <tr key={movimientoId}>
                        {headerKeys.map((headerKey) => (
                            <td key={headerKey}>
                                {movimientos[movimientoId][headerKey]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Detail;
