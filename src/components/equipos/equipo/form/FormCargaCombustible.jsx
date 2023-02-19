import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { cargarCombustible, getUltimaCarga } from '../../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../common/Loading';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

function FormCargaCombustible() {
    const { id: equipoId } = useParams();
    const history = useNavigate();

    const [loading, setLoading] = useState(true);
    const [carga, setCarga] = useState(null);

    const [formData, setFormData] = useState({
        unit: equipoId,
        liters: '',
        time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
    });

    useEffect(() => {
        const fetchMovimientosData = async () => {
            try {
                const { data: ultimaCarga, id: cargaId } = await getUltimaCarga(
                    equipoId
                );
                if (ultimaCarga === 'no hay movimientos') {
                    setCarga({ cargaId, ultimaCarga });
                } else {
                    setCarga({ cargaId, ...ultimaCarga });
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovimientosData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        cargarCombustible(formData);
        clear();
        history(`/equipos/${equipoId}`);
    };

    const clear = () => {
        setFormData({
            unit: equipoId,
            liters: '',
            time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
        });
        setCarga(null);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <form id='cargar_movimiento' onSubmit={handleSubmit}>
                <Typography
                    variant={'h4'}
                    sx={{
                        marginTop: '2rem',
                        textAlign: 'center',
                    }}
                    color={''}
                >
                    Equipo {equipoId}
                </Typography>
                {carga.cargaId === 1 ? (
                    <h3>
                        No se han efectuado cargas para el equipo {equipoId}
                    </h3>
                ) : (
                    <Stack
                        mt={2}
                        mb={2}
                        bgcolor={'#FFCC00'}
                        p={1}
                        borderRadius={1}
                        boxShadow={2}
                    >
                        <Typography variant='h6' textAlign={'center'}>
                            Ultima Carga
                        </Typography>
                        <Typography textAlign={'center'}>
                            {`Se han cargado ${carga.liters} litros el dia ${carga.createdAt}`}
                        </Typography>
                    </Stack>
                )}
                <Stack gap={2}>
                    <TextField
                        size='small'
                        label='Litros'
                        variant='outlined'
                        name='liters'
                        id='liters'
                        value={formData.liters}
                        onChange={handleChange}
                    />

                    <TextField
                        size='small'
                        id='time'
                        name='time'
                        type='time'
                        label='Hora'
                        onChange={handleChange}
                        value={formData.time}
                    />
                    <Button id='submit' type='submit' size='large'>
                        Cargar
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default FormCargaCombustible;
