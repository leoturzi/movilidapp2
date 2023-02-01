import React from 'react';
import FormCargaMovimiento from './components/equipo/form/FormCargaMovimiento';
import Detail from './components/equipo/detail/Detail';
import Task from './components/task/Task';

import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route
                    exact
                    path='/equipo/:id/cargarMovimiento'
                    element={<FormCargaMovimiento type='movimiento' />}
                />
                <Route
                    exact
                    path='/equipo/:id/cargarCombustible'
                    element={<FormCargaMovimiento type='combustible' />}
                />
                <Route
                    exact
                    path='/equipo/:id/movimientos'
                    element={<Detail />}
                />
                <Route exact path='/equipo/:id' element={<Task />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
