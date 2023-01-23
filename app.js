import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import {
    getDatabase,
    ref,
    set,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js';

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

// listeners

const form = document.querySelector('#cargar_movimiento');
const hsTrabajoInicio = document.querySelector('#hora_trabajo_inicio');
const aeronaveMatricula = document.querySelector('#aeronave_matricula');
const hsEntrega = document.querySelector('#hora_entrega');
const btn = document.querySelector('#submit');

form.addEventListener('submit', (e) => {
    console.log('pase');
    e.preventDefault();
    cargarMovimiento(hsTrabajoInicio, aeronaveMatricula, hsEntrega);
    console.log('pase');
});

function cargarMovimiento(hsTrabajoInicio, aeronaveMatricula, hsEntrega) {
    set(ref(db, 'movimientos/' + 1), {
        hsTrabajoInicio: hsTrabajoInicio.value,
        aeronaveMatricula: aeronaveMatricula.value,
        hsEntrega: hsEntrega.value,
    });
}
