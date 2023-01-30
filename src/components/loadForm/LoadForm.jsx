import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { cargarMovimiento, getMovimientosEquipo } from '../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

function LoadForm() {
    const { id } = useParams();
    const history = useNavigate();

    const [loading, setLoading] = useState(true);
    const [movimiento, setMovimiento] = useState(null);
    const [formData, setFormData] = useState({
        unit: id,
        workHours: '',
        aircraft: '',
        time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
    });

    useEffect(() => {
        const fetchMovimientosData = async () => {
            try {
                const { data: lastMovimiento } = await getMovimientosEquipo(id);
                setMovimiento(lastMovimiento);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovimientosData();
    }, [formData]);

    console.log(movimiento?.aeronaveMatricula);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        cargarMovimiento(formData);
        clear();
        history(`/equipo/${id}`);
    };

    const clear = () => {
        setFormData({
            unit: id,
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
            <h6>
                Ultimo movimiento:{' '}
                {`${movimiento.aeronaveMatricula} a las ${movimiento.hsEntrega}`}{' '}
            </h6>
            <label htmlFor='workHours'>
                Horas de Trabajo Inicio
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
                    value={formData.aircraft}
                    onChange={handleChange}
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
