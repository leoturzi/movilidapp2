import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../firebase';

import { Typography, Container, TextField, Button, Stack } from '@mui/material';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            history('/equipos');
        }
    }, [history]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await login(username, password);
        if (data.errorCode) {
            setError(data);
            return;
        }

        localStorage.setItem('user', JSON.stringify(data.username));
        history('/equipos');
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack
                    spacing={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '1rem',
                        border: '1px solid #ccc',
                        boxShadow: '0 0 8px #ccc',
                        margin: '4rem 1rem 0 1rem',
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant='h6'>Logueate</Typography>
                    <TextField
                        size='small'
                        error={error?.errorCode === 2 ? true : false}
                        name='username'
                        type='text'
                        id='Usuario'
                        label='Usuario'
                        onChange={handleChange}
                        value={username}
                        helperText={
                            error?.errorCode === 2 ? error.errorMessage : ''
                        }
                    />
                    <TextField
                        size='small'
                        error={error?.errorCode === 1 ? true : false}
                        name='password'
                        id='Password'
                        label='Password'
                        type='password'
                        onChange={handleChange}
                        value={password}
                        helperText={
                            error?.errorCode === 1 ? error.errorMessage : ''
                        }
                    />
                    <Button type='submit' size='large'>
                        Loguearse
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}

export default Login;
