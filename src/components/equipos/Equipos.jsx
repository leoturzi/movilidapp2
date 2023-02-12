import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEquipos } from '../../firebase';

function Equipos() {
    const [equipos, setEquipos] = useState(null);

    useEffect(() => {
        const fetchEquipos = async () => {
            const equipos = await getEquipos();
            setEquipos(equipos);
        };
        if (!equipos) {
            fetchEquipos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createLinks = (equipos) => {
        if (!equipos) {
            return null;
        }
        const equiposId = Object.keys(equipos);
        const links = equiposId.map((id) => (
            <Link key={id} to={`/equipos/${id}`}>
                {' '}
                {equipos[id]['longDesc']}{' '}
            </Link>
        ));
        return links;
    };
    return !equipos ? <h4>...Cargando Equipos</h4> : createLinks(equipos);
}

export default Equipos;
