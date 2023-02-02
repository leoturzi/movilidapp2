import React from 'react';
import FormCargaMovimiento from './components/equipos/equipo/form/FormCargaMovimiento';
import Detail from './components/equipos/equipo/detail/Detail';
import Task from './components/task/Task';
import Equipos from './components/equipos/Equipos';

import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route
                        exact
                        path='/equipos/:id/cargarMovimiento'
                        element={<FormCargaMovimiento />}
                    />
                    <Route
                        exact
                        path='/equipos/:id/cargarCombustible'
                        element={<FormCargaMovimiento />}
                    />
                    <Route
                        exact
                        path='/equipos/:id/movimientos'
                        element={<Detail />}
                    />
                    <Route exact path='/equipos/:id' element={<Task />} />
                    <Route exact path='/equipos' element={<Equipos />} />
                </Routes>
            </HashRouter>
        </>
    );
}

export default App;
