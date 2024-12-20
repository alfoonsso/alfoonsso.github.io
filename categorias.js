const OMDB_API_KEY = '41e74dd2';
const API_KEY = '98fd1e135ecfac794b25c1fe1d162ac8';

const categoriasNivel = {
    base : categoriasFilas,
    facil : directoresNivelFacil,
    medio : directoresNivelMedio,
    dificil : directoresNivelDificil,
    geografia : modoGeografia,
    altolapiz : modoAltoLapiz,
    actores : actoresContemporaneos
}

function generarCategorias (nivel = "base"){
    const filas = [];
    const columnas = [];

    const categorias = categoriasNivel[nivel] || categoriasNivel.base;

    if(nivel === "altolapiz"){
        while(filas.length < 3){
            const categoria = modoAltoLapiz[Math.floor(Math.random() * modoAltoLapiz.length)];
            if (!filas.includes(categoria)) filas.push(categoria);
        }

        while (columnas.length < 9) {
            const categoriaColumna = categoriasColumnas[Math.floor(Math.random() * categoriasColumnas.length)];
            if (!columnas.includes(categoriaColumna)) columnas.push(categoriaColumna);
        }
        //columnas.push(...categoriasColumnas);
        
    } else {
        // Generar filas aleatorias para el nivel seleccionado
        while (filas.length < 3) {
            const categoria = categorias[Math.floor(Math.random() * categorias.length)];
            if (!filas.includes(categoria)) filas.push(categoria);
        }

        // Generar columnas (podrías hacer lo mismo o usar categorías adicionales)
        while (columnas.length < 3) {
            const categoriaColumna = categoriasColumnas[Math.floor(Math.random() * categoriasColumnas.length)];
            if (!columnas.includes(categoriaColumna)) columnas.push(categoriaColumna);
        }
}



console.log('Filas generadas:', filas);
console.log('Columnas generadas:', columnas);

return { filas, columnas };
}
    

function crearTablero(filas, columnas) {
    const tablero = document.querySelector('#tablero');
    if (!tablero) {
        console.error('No se encontró el elemento con id "tablero".');
        return;
    }

    // Limpia el tablero antes de construir uno nuevo
    tablero.innerHTML = '';

    // Crear fila de cabecera
    const filaCabecera = document.createElement('div');
    filaCabecera.className = 'row header';
    filaCabecera.setAttribute('role', 'row');

    // Celda vacía en la esquina superior izquierda
    const celdaVacia = document.createElement('div');
    celdaVacia.className = 'cell empty';
    filaCabecera.appendChild(celdaVacia);

    // Agregar categorías de columnas
    columnas.forEach(categoria => {
        const headerCell = document.createElement('div');
        headerCell.className = 'cell header-cell';
        headerCell.setAttribute('role', 'columnheader');
        headerCell.textContent = categoria;
        filaCabecera.appendChild(headerCell);
    });

    tablero.appendChild(filaCabecera);

    // Crear las filas del cuerpo
    filas.forEach(filaCategoria => {
        const filaCuerpo = document.createElement('div');
        filaCuerpo.className = 'row';
        filaCuerpo.setAttribute('role', 'row');

        // Celda de cabecera lateral
        const celdaCabeceraLateral = document.createElement('div');
        celdaCabeceraLateral.className = 'cell header-cell';
        celdaCabeceraLateral.setAttribute('role', 'rowheader');
        celdaCabeceraLateral.textContent = filaCategoria;
        filaCuerpo.appendChild(celdaCabeceraLateral);

        // Agregar celdas de datos
        columnas.forEach(columna => {
            const celda = document.createElement('div');
            celda.className = 'cell';
            celda.setAttribute('role', 'gridcell');
            celda.addEventListener('click', () => manejarCeldaClick(celda, filaCategoria, columna));
            filaCuerpo.appendChild(celda);
        });

        tablero.appendChild(filaCuerpo);
    });
}
