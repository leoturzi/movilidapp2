import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Stack } from '@mui/material';
import CustomButton from '../CustomButton';

function Task() {
    const { id } = useParams();
    return (
        <>
            <Container>
                <Typography
                    variant={'h4'}
                    sx={{
                        marginTop: '2rem',
                        textAlign: 'center',
                    }}
                    color={''}
                >
                    Equipo {id}
                </Typography>
                <nav>
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '2rem',
                        }}
                        spacing={2}
                    >
                        <CustomButton
                            to={`/equipos/${id}/cargarMovimiento`}
                            text='Movimiento'
                        />
                        <CustomButton
                            to={`/equipos/${id}/cargarCombustible`}
                            text='Combustible'
                        />
                        <CustomButton
                            to={`/equipos/${id}/Movimientos`}
                            text='Movimientos'
                        />
                    </Stack>
                </nav>
            </Container>
        </>
    );
}

export default Task;
