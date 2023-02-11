import moment from 'moment';

function calculateWorkingHrs(hr1, hr2) {
    const mins = (hr2 - hr1) * 60;
    const hrs = Math.floor(mins / 60);
    const minsLeft = mins % 60;
    return `${hrs}h, ${minsLeft}m`;
}

export function mapDataWithHeaders(rawData) {
    const headers = {
        aeronaveMatricula: 'Aeronave',
        equipo: 'Equipo',
        createdAt: 'Fecha Colocacion',
        updatedAt: 'Fecha Retiro',
        hsEntrega: 'Hora Colocacion',
        hsRetiro: 'hs Retiro',
        hsTrabajoInicio: 'hs Trabajo Inicio',
        hsTrabajoFin: 'hs Trabajo Fin',
        hsTrabajo: 'hs Trabajo',
    };

    const movIds = Object.keys(rawData);

    const data = movIds.reduce((acc, movId) => {
        const movData = {
            aeronaveMatricula: rawData[movId].aeronaveMatricula,
            equipo: rawData[movId].equipo,
            createdAt: moment(
                rawData[movId].createdAt,
                'YYYY-MM-DD h:mm:ss a'
            ).format('DD/MM/YYYY'),
            updatedAt: moment(
                rawData[movId].updatedAt,
                'YYYY-MM-DD h:mm:ss a'
            ).format('DD/MM/YYYY'),
            hsEntrega: rawData[movId].hsEntrega,
            hsRetiro: rawData[movId].hsRetiro,
            hsTrabajoInicio: rawData[movId].hsTrabajoInicio,
            hsTrabajoFin: rawData[movId].hsTrabajoFin,
            hsTrabajo: calculateWorkingHrs(
                rawData[movId].hsTrabajoInicio,
                rawData[movId].hsTrabajoFin
            ),
        };
        return [...acc, movData];
    }, []);

    return [headers, ...data];
}
