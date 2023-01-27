function App() {
    return (
        <form id='cargar_movimiento'>
            <label for='hora_trabajo_inicio'>
                Horas de Trabajo Inicio
                <input
                    type='text'
                    name='hora_trabajo_inicio'
                    id='hora_trabajo_inicio'
                    value='12314'
                />{' '}
            </label>
            <br />
            <label for='aeronave_matricula'>
                Aeronave
                <input
                    type='text'
                    name='aeronave_matricula'
                    id='aeronave_matricula'
                    value='tc61'
                />{' '}
            </label>
            <br />
            <label for='hora_entrega'>
                Hora de Entrega
                <input
                    type='time'
                    name='hora_entrega'
                    id='hora_entrega'
                    value='12:00'
                />
            </label>
            <br />
            <label for='now'>
                Ahora <input type='checkbox' name='now' id='now' />{' '}
            </label>
            <br />
            <button id='submit' type='submit'>
                Cargar
            </button>
        </form>
    );
}

export default App;
