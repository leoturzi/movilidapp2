import React, { useState } from 'react';
import moment from 'moment-timezone';
import cargarMovimiento from '../../firebase';
import { useParams } from 'react-router-dom';

function LoadForm({ match }) {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        unit: id,
        workHours: '',
        aircraft: '',
        time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
    });

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
        // make API call or perform some action with the form data
    };

    const clear = () => {
        setFormData({
            unit: id,
            workHours: '',
            aircraft: '',
            time: moment.tz('America/Argentina/Buenos_Aires').format('hh:mm'),
        });
    };

    return (
        <form id='cargar_movimiento' onSubmit={handleSubmit}>
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
            <button id='submit' type='submit'>
                Cargar
            </button>
        </form>
    );
}

export default LoadForm;
