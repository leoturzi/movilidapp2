import React, { useState, useEffect } from 'react';
import { getEquipos } from '../../firebase';

import { Container, Stack, Typography } from '@mui/material';
import CustomButton from '../CustomButton';

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
            <CustomButton
                key={id}
                to={`/equipos/${id}`}
                text={equipos[id]['longDesc']}
            />
        ));
        return links;
    };
    return (
        <Container>
            {!equipos ? (
                <h4>...Cargando Equipos</h4>
            ) : (
                <>
                    <Typography
                        variant={'h4'}
                        sx={{
                            marginTop: '2rem',
                            textAlign: 'center',
                        }}
                        color={''}
                    >
                        Equipos Movilidad
                    </Typography>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '2rem',
                        }}
                        spacing={2}
                    >
                        {createLinks(equipos)}
                    </Stack>
                </>
            )}
        </Container>
    );
}

export default Equipos;
