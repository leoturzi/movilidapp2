import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovimientosEquipo } from '../../../../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return !movimientos ? (
        <h3>...Cargando Movimientos</h3>
    ) : (
        <Table>
            <TableHead>
                <TableRow>
                    {headerKeys.map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(movimientos).map((movimientoId) => (
                    <TableRow key={movimientoId}>
                        {headerKeys.map((headerKey) => (
                            <TableCell sx={{ minWidth: 200 }} key={headerKey}>
                                {movimientos[movimientoId][headerKey]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Detail;
