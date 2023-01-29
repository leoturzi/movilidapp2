import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';
import moment from 'moment-timezone';

const firebaseConfig = {
    apiKey: 'AIzaSyDeCfv7Bl66VgRZFGohqpfcFwclvnCwhtg',
    authDomain: 'movilidapp-33cef.firebaseapp.com',
    databaseURL: 'https://movilidapp-33cef-default-rtdb.firebaseio.com',
    projectId: 'movilidapp-33cef',
    storageBucket: 'movilidapp-33cef.appspot.com',
    messagingSenderId: '264423351773',
    appId: '1:264423351773:web:519fce32d8fd87a87a8234',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export default function cargarMovimiento(formData) {
    const movimientos = ref(db, 'Movimientos');
    try {
        const nuevoMovimiento = push(movimientos);
        set(nuevoMovimiento, {
            equipo: formData.unit,
            hsTrabajoInicio: formData.workHours,
            aeronaveMatricula: formData.aircraft,
            hsEntrega: formData.time,
            movimientoCerrado: false,
            createdAt: moment
                .tz('America/Argentina/Buenos_Aires')
                .format('YYYY-MM-DD h:mm:ss a'),
        });
    } catch (error) {
        console.log(error.message);
    }
}
