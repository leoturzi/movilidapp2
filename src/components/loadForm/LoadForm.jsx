import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import {
    cargarMovimiento,
    getMovimientosEquipo,
    updateMovimiento,
} from '../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

function LoadForm() {
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
                    await getMovimientosEquipo(equipoId);

                setMovimiento({ movimientoId, ...lastMovimiento });
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovimientosData();
    }, [formData]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!movimiento.movimientoCerrado) {
            updateMovimiento(formData, movimiento.movimientoId);
            clear();
            history(`/equipo/${equipoId}`);
            return;
        }
        cargarMovimiento(formData);
        clear();
        history(`/equipo/${equipoId}`);
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
            <h2>{`Equipo ${equipoId}`}</h2>
            <h3>
                Ultimo movimiento:{' '}
                {movimiento.movimientoCerrado ? 'Retiro ' : 'Colocacion '}
                {`${movimiento.aeronaveMatricula} a las ${movimiento.createdAt}`}{' '}
            </h3>
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
                    disabled={movimiento.movimientoCerrado}
                />{' '}
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

export default LoadForm;
