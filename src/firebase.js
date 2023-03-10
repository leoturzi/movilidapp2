import { initializeApp } from 'firebase/app';
import {
    getDatabase,
    ref,
    set,
    update,
    push,
    get,
    query,
    limitToLast,
    orderByChild,
    equalTo,
} from 'firebase/database';

import moment from 'moment-timezone';
import { mapDataWithHeaders } from './utils-firebase';

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

export function cargarMovimiento(formData) {
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
            user: formData.user,
        });
    } catch (error) {
        console.log(error.message);
    }
}

export function updateMovimiento(formData, movimientoId) {
    const movimiento = ref(db, `Movimientos/${movimientoId}`);
    update(movimiento, {
        updatedAt: moment
            .tz('America/Argentina/Buenos_Aires')
            .format('YYYY-MM-DD h:mm:ss a'),
        movimientoCerrado: true,
        hsRetiro: formData.time,
        hsTrabajoFin: formData.workHours,
    });
}

export async function getMovimientosEquipo(equipoId) {
    const queryMovimientos = query(
        ref(db, 'Movimientos'),
        orderByChild('equipo'),
        equalTo(equipoId)
    );

    try {
        const snapshot = await get(queryMovimientos);

        if (snapshot.exists()) {
            const mappedData = mapDataWithHeaders(snapshot.val());
            return mappedData;
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.log(error);
    }
}
export async function getLastMovimientoEquipo(equipoId) {
    const queryMovimientos = query(
        ref(db, 'Movimientos'),
        limitToLast(1),
        orderByChild('equipo'),
        equalTo(equipoId)
    );

    try {
        const snapshot = await get(queryMovimientos);
        if (snapshot.exists()) {
            const id = Object.keys(snapshot.val())[0];
            const data = snapshot.val()[id];
            return { data, id };
        } else {
            return { data: 'no hay movimientos', id: 1 };
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getEquipos() {
    const queryEquipos = query(ref(db, 'Equipos'));

    try {
        const snapshot = await get(queryEquipos);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.log(error);
    }
}

export async function cargarCombustible(formData) {
    const cargas = ref(db, 'Combustible');
    try {
        const nuevaCarga = push(cargas);
        set(nuevaCarga, {
            equipo: formData.unit,
            liters: formData.liters,
            hsCarga: formData.time,
            createdAt: moment
                .tz('America/Argentina/Buenos_Aires')
                .format('YYYY-MM-DD h:mm:ss a'),
        });
    } catch (error) {
        console.log(error.message);
    }
}

export async function getUltimaCarga(equipoId) {
    const queryCarga = query(
        ref(db, 'Combustible'),
        limitToLast(1),
        orderByChild('equipo'),
        equalTo(equipoId)
    );

    try {
        const snapshot = await get(queryCarga);
        if (snapshot.exists()) {
            const id = Object.keys(snapshot.val())[0];
            const data = snapshot.val()[id];
            return { data, id };
        } else {
            return { data: 'no hay cargas', id: 1 };
        }
    } catch (error) {
        console.log(error);
    }
}

export async function login(user, pwd) {
    const userLowerCase = user.toLowerCase();
    const queryUsuarios = query(
        ref(db, 'Usuarios'),
        orderByChild('username'),
        equalTo(userLowerCase)
    );

    try {
        const snapshot = await get(queryUsuarios);
        if (snapshot.exists()) {
            const id = Object.keys(snapshot.val())[0];
            const data = snapshot.val()[id];
            if (data.password === pwd) {
                delete data.password;
                return { data, id };
            } else {
                return {
                    data: {
                        errorMessage: 'Contrase??a incorrecta',
                        errorCode: 1,
                    },
                };
            }
        } else {
            return {
                data: { errorMessage: 'Usuario no encontrado', errorCode: 2 },
            };
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAeronaves() {
    const queryAeronaves = query(ref(db, 'Aeronaves'));

    try {
        const snapshot = await get(queryAeronaves);
        if (snapshot.exists()) {
            const aeronaves = snapshot.val().slice(1, -1).split(', ');
            return aeronaves;
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.log(error);
    }
}
