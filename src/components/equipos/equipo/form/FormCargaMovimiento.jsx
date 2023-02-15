import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import {
    cargarMovimiento,
    getLastMovimientoEquipo,
    updateMovimiento,
} from '../../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

import Loading from '../../../common/Loading';
import {
    Typography,
    Container,
    Stack,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';

function FormCargarMovimiento() {
    const { id: equipoId } = useParams();
    const history = useNavigate();

    const [loading, setLoading] = useState(true);
    const [movimiento, setMovimiento] = useState(null);
    const [formData, setFormData] = useState({
        unit: equipoId,
        workHours: '',
        aircraft: '',
        time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
    });

    useEffect(() => {
        const fetchMovimientosData = async () => {
            try {
                const { data: lastMovimiento, id: movimientoId } =
                    await getLastMovimientoEquipo(equipoId);
                if (lastMovimiento === 'no hay movimientos') {
                    setMovimiento({ movimientoId, lastMovimiento });
                } else {
                    setMovimiento({ movimientoId, ...lastMovimiento });
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
        if (!movimiento.movimientoCerrado && movimiento.movimientoId !== 1) {
            updateMovimiento(formData, movimiento.movimientoId);
            clear();
            history(`/equipos/${equipoId}`);
            return;
        }
        cargarMovimiento(formData);
        clear();
        history(`/equipos/${equipoId}`);
    };

    const clear = () => {
        setFormData({
            unit: equipoId,
            workHours: '',
            aircraft: '',
            time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
        });
        setMovimiento(null);
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
                {movimiento.movimientoId === 1 ? (
                    <h3>No hay movimientos disponibles para {equipoId}</h3>
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
                            Ultimo movimiento{' '}
                        </Typography>
                        <Typography textAlign={'center'}>
                            {movimiento.movimientoCerrado
                                ? 'Se retiro de '
                                : 'Se coloco en '}
                            {`${movimiento.aeronaveMatricula} el dia ${
                                movimiento.createdAt.split(' ')[0]
                            } a las ${movimiento.hsEntrega}`}
                        </Typography>
                    </Stack>
                )}
                <Stack gap={2}>
                    <TextField
                        size='small'
                        label='Horas de Trabajo'
                        variant='outlined'
                        name='workHours'
                        id='workHours'
                        value={formData.workHours}
                        onChange={handleChange}
                    />

                    {movimiento.movimientoId === 1 ? (
                        <FormControl size='small'>
                            <InputLabel id='aircraft-label'>
                                Aeronave
                            </InputLabel>
                            <Select
                                name='aircraft'
                                labelId='aircraft-label'
                                id='aircraft'
                                value={formData.aircraft}
                                label='Aeronave'
                                onChange={handleChange}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value='TC-52'>TC-52</MenuItem>
                                <MenuItem value='TC-53'>TC-53</MenuItem>
                                <MenuItem value='TC-54'>TC-54</MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <>
                            <FormControl
                                disabled={!movimiento.movimientoCerrado}
                                size='small'
                            >
                                <InputLabel id='aircraft-label'>
                                    Aeronave
                                </InputLabel>
                                <Select
                                    name='aircraft'
                                    labelId='aircraft-label'
                                    id='aircraft'
                                    value={
                                        !movimiento.movimientoCerrado
                                            ? movimiento.aeronaveMatricula
                                            : formData.aircraft
                                    }
                                    label='Aeronave'
                                    onChange={handleChange}
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='TC-52'>TC-52</MenuItem>
                                    <MenuItem value='TC-53'>TC-53</MenuItem>
                                    <MenuItem value='TC-54'>TC-54</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}

                    <TextField
                        size='small'
                        id='time'
                        name='time'
                        type='time'
                        label='Hora'
                        onChange={handleChange}
                        value={formData.time}
                    />

                    <Button type='submit' size='large'>
                        Cargar
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default FormCargarMovimiento;
