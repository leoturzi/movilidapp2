import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../firebase';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useNavigate();

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
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>
                Usuario
                <input
                    type='text'
                    name='username'
                    onChange={handleChange}
                    value={username}
                />
                {error?.errorCode === 2 && <p>{error.errorMessage}</p>}
            </label>
            <br />
            <label htmlFor='password'>
                Contraseña
                <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={password}
                />
                {error?.errorCode === 1 && <p>{error.errorMessage}</p>}
            </label>
            <br />
            <button type='submit'>Loguearse</button>
        </form>
    );
}

export default Login;
