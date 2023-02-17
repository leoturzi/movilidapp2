import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovimientosEquipo } from '../../../../firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Loading from '../../../common/Loading';
import { Typography } from '@mui/material';

function Detail() {
    const { id: equipoId } = useParams();

    const [movimientos, setMovimientos] = useState(null);
    const [headers, setHeader] = useState([]);

    useEffect(() => {
        const fetchMovimientos = async () => {
            const data = await getMovimientosEquipo(equipoId);
            if (data) {
                const tableHeaders = data[0];
                const tableData = data.slice(1);
                setHeader(tableHeaders);
                setMovimientos(tableData);
            }
        };
        if (!movimientos) {
            fetchMovimientos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return !movimientos ? (
        <Loading />
    ) : (
        <Container maxWidth='l'>
            <Typography
                variant={'h4'}
                sx={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
                color={''}
            >
                Equipo {equipoId}
            </Typography>
            <Typography
                variant={'h5'}
                sx={{
                    marginBottom: '1rem',
                }}
                color={''}
            >
                Registro
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Object.entries(headers).map(
                                ([key, value], idx) => (
                                    <TableCell key={idx}>{value}</TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movimientos.map((row, idx) => (
                            <TableRow key={idx}>
                                {Object.entries(row).map(
                                    ([key, value], idx) => (
                                        <TableCell key={idx}>{value}</TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Detail;
