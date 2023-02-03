import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import {
    cargarMovimiento,
    getLastMovimientoEquipo,
    updateMovimiento,
} from '../../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

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
        return <h5>Cargando...</h5>;
    }

    return (
        <form id='cargar_movimiento' onSubmit={handleSubmit}>
            {console.log(movimiento)}
            <h2>{`Equipo ${equipoId}`}</h2>
            {movimiento.movimientoId === 1 ? (
                <h3>No hay movimientos disponibles para {equipoId}</h3>
            ) : (
                <h3>
                    Ultimo movimiento:{' '}
                    {movimiento.movimientoCerrado ? 'Retiro ' : 'Colocacion '}
                    {`${movimiento.aeronaveMatricula} a las ${movimiento.createdAt}`}{' '}
                </h3>
            )}
            <label htmlFor='workHours'>
                Horas de Trabajo
                <input
                    type='text'
                    name='workHours'
                    id='workHours'
                    value={formData.workHours}
                    onChange={handleChange}
                />{' '}
            </label>
            <br />
            <label htmlFor='aircraft'>
                Aeronave
                {movimiento.movimientoId === 1 ? (
                    <input
                        type='text'
                        name='aircraft'
                        id='aircraft'
                        value={formData.aircraft}
                        onChange={handleChange}
                    />
                ) : (
                    <input
                        type='text'
                        name='aircraft'
                        id='aircraft'
                        value={
                            !movimiento.movimientoCerrado
                                ? movimiento.aeronaveMatricula
                                : formData.aircraft
                        }
                        onChange={handleChange}
                        disabled={!movimiento.movimientoCerrado}
                    />
                )}
            </label>
            <br />
            <label htmlFor='time'>
                Hora de Entrega
                <input
                    type='time'
                    name='time'
                    id='time'
                    value={formData.time}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button id='submit' type='submit' disabled={loading}>
                Cargar
            </button>
        </form>
    );
}

export default FormCargarMovimiento;
