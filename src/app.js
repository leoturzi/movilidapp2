import React from 'react';
import FormCargaMovimiento from './components/equipos/equipo/form/FormCargaMovimiento';
import FormCargaCombustible from './components/equipos/equipo/form/FormCargaCombustible';
import Detail from './components/equipos/equipo/detail/Detail';
import Task from './components/task/Task';
import Equipos from './components/equipos/Equipos';
import NavBar from './components/layout/navBar/NavBar';
import Login from './components/login/Login';
import PrivateWrapper from './components/PrivateWrapper';

import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
    return (
        <>
            <HashRouter>
                <NavBar />
                <Routes>
                    <Route
                        path='/equipos/:id/cargarMovimiento'
                        element={<PrivateWrapper />}
                    >
                        <Route
                            path='/equipos/:id/cargarMovimiento'
                            element={<FormCargaMovimiento />}
                        />
                    </Route>
                    <Route
                        path='/equipos/:id/cargarCombustible'
                        element={<PrivateWrapper />}
                    >
                        <Route
                            exact
                            path='/equipos/:id/cargarCombustible'
                            element={<FormCargaCombustible />}
                        />
                    </Route>
                    <Route
                        path='/equipos/:id/movimientos'
                        element={<PrivateWrapper />}
                    >
                        <Route
                            exact
                            path='/equipos/:id/movimientos'
                            element={<Detail />}
                        />
                    </Route>
                    <Route path='/equipos/:id' element={<PrivateWrapper />}>
                        <Route exact path='/equipos/:id' element={<Task />} />
                    </Route>
                    <Route path='/equipos' element={<PrivateWrapper />}>
                        <Route exact path='/equipos' element={<Equipos />} />
                    </Route>
                    <Route exact path='/login' element={<Login />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
