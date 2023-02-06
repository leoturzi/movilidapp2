import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { cargarCombustible, getUltimaCarga } from '../../../../firebase';
import { useParams, useNavigate } from 'react-router-dom';

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
        return <h5>Cargando...</h5>;
    }

    return (
        <form id='cargar_movimiento' onSubmit={handleSubmit}>
            <h2>{`Equipo ${equipoId}`}</h2>
            {carga.cargaId === 1 ? (
                <h3>No se han efectuado cargas para el equipo {equipoId}</h3>
            ) : (
                <h3>
                    Ultima carga:{' '}
                    {`Se han cargado ${carga.liters} litros el dia ${carga.createdAt}`}
                </h3>
            )}
            <label htmlFor='liters'>
                Litros
                <input
                    type='text'
                    name='liters'
                    id='liters'
                    value={formData.liters}
                    onChange={handleChange}
                />{' '}
            </label>
            <br />
            <label htmlFor='time'>
                Hora de carga
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

export default FormCargaCombustible;
