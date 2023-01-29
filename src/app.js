import React from 'react';
import LoadForm from './components/loadForm/LoadForm';
import Task from './components/task/Task';

import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route
                    exact
                    path='/equipo/:id/cargarMovimiento'
                    element={<LoadForm type='movimiento' />}
                />
                <Route
                    exact
                    path='/equipo/:id/cargarCombustible'
                    element={<LoadForm type='combustible' />}
                />
                <Route
                    exact
                    path='/equipo/:id/movimientos'
                    element={<LoadForm type='consulta' />}
                />
                <Route exact path='/equipo/:id' element={<Task />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
