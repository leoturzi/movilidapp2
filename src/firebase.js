import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';
import moment from 'moment-timezone';

const firebaseConfig = {
    apiKey: 'AIzaSyCMvxkc0UMVK4p7Ca7oTI7O4TaC2Sn3QbA',
    authDomain: 'movilidapp-323720.firebaseapp.com',
    databaseURL: 'https://movilidapp-323720-default-rtdb.firebaseio.com',
    projectId: 'movilidapp-323720',
    storageBucket: 'movilidapp-323720.appspot.com',
    messagingSenderId: '541287069105',
    appId: '1:541287069105:web:edd79fa9dc939dfd4e7990',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export default function cargarMovimiento(formData) {
    const movimientos = ref(db, 'Movimientos');
    const nuevoMovimiento = push(movimientos);
    set(nuevoMovimiento, {
        hsTrabajoInicio: formData.workHours,
        aeronaveMatricula: formData.aircraft,
        hsEntrega: formData.time,
        movimientoCerrado: false,
        createdAt: moment
            .tz('America/Argentina/Buenos_Aires')
            .format('YYYY-MM-DD h:mm:ss a'),
    });
}
