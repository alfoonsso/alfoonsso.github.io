    const BASE_URL = 'https://api.themoviedb.org/3';
    let intentosRestantes = 9;  // Establecemos el número inicial de intentos
    let puntuacion = 0;
    let puntuacionMaxima = 0;
    let seRindio = false;

    // Selección de elementos
    const helpIcon = document.getElementById('help-icon');
    const modal = document.getElementById('help-modal');
    const closeModal = document.getElementById('close-modal');

    // Mostrar modal cuando se hace clic en el icono de ayuda
    helpIcon.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Ocultar modal cuando se hace clic en el botón "Let's Go!"
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Función para actualizar el contador en la interfaz
    function actualizarContador() {
        const contadorElemento = document.getElementById('contador');
        contadorElemento.textContent = `Intentos restantes: ${intentosRestantes}`;
    }

    // Llamamos a la función para inicializar el contador
    actualizarContador();

    async function manejarCeldaClick(celda, filaCategoria, columnaCategoria) {

        if (intentosRestantes <= 0) {
            alert('¡No puedes hacer clic en las celdas porque ya no quedan intentos!');
            finalizarJuego(); 
        }

        const peliculaTitulo = prompt(`Introduce una película que cumpla con "${filaCategoria}" y "${columnaCategoria}":`);
        if (peliculaTitulo === null || peliculaTitulo.trim() === "") {
            console.log("Búsqueda cancelada. No se restan intentos.");
            return;  // Si el usuario cancela o no introduce nada, no se resta intento
        }

        try {
            const pelicula = await buscarPelicula(peliculaTitulo);

            if (pelicula.length === 0) {
                alert('Película no encontrada. Intenta con otro título.');
                return; // No continuar si no hay resultados
            }   

            let peliculaSelected = pelicula[0];

            if(pelicula.length > 1) peliculaSelected = seleccionarPelicula(pelicula);

            if(!peliculaSelected){
                alert("No seleccionaste ninguna película.");
                intentosRestantes--;
                actualizarContador();
                return;
            }

            // Declarar las variables para validaciones
            const validaFila = await validarCategoria(peliculaSelected, filaCategoria);
            const validaColumna = validarTitulo(peliculaSelected, columnaCategoria); 

            console.log(`Resultado de validaFila: ${validaFila}`);
            console.log(`Resultado de validaColumna: ${validaColumna}`);

            if (validaFila && validaColumna) {
                ocultarBotonReiniciar();

                if (celda.querySelector('img')) {
                    alert('Esta celda ya está ocupada.');
                    return;  // No continuar si ya hay un póster
                }

                celda.classList.add('valida');  

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w500${peliculaSelected.poster_path}`;
                poster.alt = pelicula.title;
                celda.appendChild(poster); 

                const puntos = calcularPuntuacion(peliculaSelected);
                guardarPuntuacionMaxima(puntos);

                intentosRestantes--;
                actualizarContador();
            } else {
                if (!validaFila) {
                    console.log(`La película no cumple con la categoría de fila: "${filaCategoria}"`);
                    ocultarBotonReiniciar();
                }
                if (!validaColumna) {
                    console.log(`La película no cumple con la categoría de columna: "${columnaCategoria}"`);
                    ocultarBotonReiniciar();
                }
                intentosRestantes--;
                actualizarContador();
                alert('La película no cumple con las categorías.');
            }
        } catch (error) {
            console.error("Error en manejarCeldaClick:", error);
        }

        if(intentosRestantes === 0){
            finalizarJuego();
        }
        
        mostrarPuntuacionMaxima();
    }

    async function buscarPelicula(query) {
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&sort_by=popularity.desc&page=1&include_adult=false`;
        let todasPeliculas = [];

        try {
            for(let page = 1; page <= 3; page++){
                const respuesta = await fetch(`${url}&page=${page}`);
                if (!respuesta.ok) throw new Error('Error en la solicitud');

                const datos = await respuesta.json();
                todasPeliculas = todasPeliculas.concat(datos.results);

                // Si no hay más páginas, salir del bucle
                if (page >= datos.total_pages) break;
            }

            // Ordenar por popularidad y priorizar coincidencias exactas
            todasPeliculas = todasPeliculas
                .map(pelicula => ({
                    ...pelicula,
                    exactMatch: pelicula.title.toLowerCase() === query.toLowerCase()
                }))
                .sort((a, b) => {
                    if (a.exactMatch && !b.exactMatch) return -1;
                    if (!a.exactMatch && b.exactMatch) return 1;
                    return b.popularity - a.popularity; // Orden por popularidad si no hay coincidencia exacta
                }); 

                // Limitar los resultados a 20 (para evitar demasiados resultados)
                const resultadoFinal = todasPeliculas.slice(0, 30);

                // Retornar los resultados limitados y ordenados
                return resultadoFinal;
        } catch (error) {
            console.error('Error al buscar películas:', error);
            return [];
        }
    }


    function seleccionarPelicula(peliculas) {
        // Crear un prompt para mostrar las opciones
        const opciones = peliculas
            .map((pelicula, index) => `${index + 1}. ${pelicula.title} (${pelicula.release_date?.slice(0, 4) || "Año desconocido"})`)
            .join("\n");

        const seleccion = prompt(`Hay varias películas con el título indicado. Selecciona una:\n${opciones}`);

        // Validar la selección
        const indice = parseInt(seleccion) - 1;
        if (isNaN(indice) || indice < 0 || indice >= peliculas.length) {
            alert("Selección no válida.");
            return null;
        }

        return peliculas[indice];
    }

    

    // Director
    async function validarCategoria(pelicula, categoria) {
        const url = `https://api.themoviedb.org/3/movie/${pelicula.id}?api_key=${API_KEY}&append_to_response=credits`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        const origin_country = datos.origin_country;
        console.log(pelicula);
        console.log(origin_country);

        if (Array.isArray(origin_country)) {
            // Si la categoría es una región, validamos por continente
            for (let region in regiones) {
                if (categoria === region) {
                    // Comprobamos si la película pertenece a un país de esa región
                    for (let pais of regiones[region]) {
                        if (origin_country.includes(pais)) {
                            return true;  // La película pertenece a la región
                        }
                    }
                    return false;  // Si no pertenece a un país de la región
                }
            }
            // Comprobamos si la película pertenece al país específico
            if (paises[categoria]) {
                // Compara si alguno de los países en la categoría está en origin_country
                for (let paisCodigo of paises[categoria]) {
                    if (origin_country.includes(paisCodigo)) {
                        return true;  // La película pertenece al país
                    }
                }
            }
        }
        else {
            console.error("Error: pelicula.origin_country no es un array válido", pelicula);
            return false;  // Si origin_country no es un array válido, retornamos false
        }

        // Si la categoría es un director
        if (categoria.startsWith("Director:")) {
            const directorEsperado = categoria.replace("Director: ", "").trim();
            const directores = datos.credits?.crew?.filter(persona => persona.job === 'Director') || [];
            console.log("Directores encontrados:", directores);
            return directores.some(director => director.name.toLowerCase() === directorEsperado.toLowerCase());
        }
        if (categoria.startsWith("Actor: ")) {
            const actorEsperado = categoria.replace("Actor: ", "").trim();
            const actores = datos.credits?.cast || [];
            return actores.some(actor => actor.name.toLowerCase() === actorEsperado.toLowerCase());
        } else if(categoria.startsWith("Actriz: ")) {
            const actrizEsperada = categoria.replace("Actriz: ", "").trim();
            const actrices = datos.credits?.cast || [];
            return actrices.some(actriz => actriz.name.toLowerCase() === actrizEsperada.toLowerCase());
        }

        return false;  // Si no coincide con ninguna categoría, devuelve false
    }


    function validarTitulo(pelicula, categoria) {
        const titulo = pelicula.title;
        let tituloProcesadoSinThe = titulo
            .replace(/^[\d]+[:\.\-\s]*/i, "") // Elimina números iniciales y caracteres especiales
            .replace(/^(the)\s+/i, ""); // Elimina "The" al inicio
        let tituloProcesadoSinAAn = titulo
            .replace(/^[\d]+[:\.\-\s]*/i, "") // Elimina números iniciales y caracteres especiales
            .replace(/^(a | an)\s+/i, ""); // Elimina "A" o "An" al inicio
        const tituloSinThe = titulo.replace(/^(the)\s/i, ""); // Elimina "The" al inicio

        console.log(`Validando título "${pelicula.title}" para la categoría "${categoria}"`);

        // En vez de dividir por coma, ahora sólo se procesa la categoría específica
        switch (categoria.trim()) {
            case "One Word Title (ignore 'The')":
                if (tituloSinThe.split(" ").length !== 1) return false;
                break;
            case "Título con 3 o más palabras":
                if (titulo.split(" ").length < 3) return false;
                break;
            case "Empieza por vocal (ignore 'The')":
                if (!/^[aeiouáéíóúü]/i.test(tituloProcesadoSinThe)) return false;
                break;
            case "Título empieza con A-H (ignore 'The')":
                if (!/^[a-h]/i.test(tituloProcesadoSinThe)) return false;
                break;
            case "Título empieza con I-P (ignore 'The')":
                if (!/^[i-p]/i.test(tituloProcesadoSinThe)) return false;
                break;
            case "Título empieza con Q-Z (ignore 'A', 'An')":
                if (!/^[q-z]/i.test(tituloProcesadoSinAAn)) return false;
                break;
            case "Título contiene J,K,W,Z,X,Q":
                if (!/[jkwzxq]/i.test(titulo)) return false;
                break;
            case "Título con 2 palabras":
                if (titulo.split(" ").length !== 2) return false;
                break;
            case "Título con doble letra ('rr', 'll'...)":
                if (!/(.)\1/i.test(titulo)) return false;
                break;
            default:
                console.warn(`Categoría desconocida: ${categoria}`);
                return false;
        }

        return true;
    }

    // Función para obtener el póster de la película
    async function obtenerPoster(nombrePelicula) {
        const apiKey = '98fd1e135ecfac794b25c1fe1d162ac8'; // Reemplaza con tu propia API key de TMDB
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(nombrePelicula)}&api_key=${apiKey}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        if (datos.results && datos.results.length > 0) {
            const pelicula = datos.results[0];
            const posterPath = pelicula.poster_path;
            
            if (posterPath !== null) {
                const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`; // URL completa del póster
                return posterUrl;
            } else {
                return null; // Si no hay póster disponible
            }
        } else {
            return null; // No se encontró la película
        }
    }

    // Función para manejar el acierto
    async function marcarAcierto(celda, nombrePelicula) {
        const posterUrl = await obtenerPoster(nombrePelicula);
        
        if (posterUrl !== null) {
            // Crear una imagen con el póster de la película
            const img = document.createElement('img');
            img.src = posterUrl;
            img.alt = nombrePelicula; // Texto alternativo de la imagen
            celda.innerHTML = ''; // Limpiar cualquier contenido anterior
            celda.classList.add('valida'); // Aplicar el estilo de acierto
            celda.appendChild(img); // Insertar la imagen en la celda
        }
    }

    function calcularPuntuacion(pelicula) {
        // Obtener la popularidad de la película (un valor numérico, normalmente entre 0 y 100)
        const popularidad = pelicula.popularity;

        // Asignar más puntos a las películas menos populares
        // Puedes ajustar el factor para modificar la cantidad de puntos según tus necesidades
        let puntosPorPelicula = Math.max(100 - popularidad, 0); // Asegúrate de que el mínimo sea 0 puntos

        // Mostrar puntos en la consola para depuración
        console.log(`Popularidad de la película: ${popularidad.toFixed(2)}`);
        console.log(`Puntos asignados por esta película: ${puntosPorPelicula.toFixed(2)}`);

        // Incrementar la puntuación total
        puntuacion += puntosPorPelicula;

        // Actualizar el texto de la puntuación en el HTML
        document.getElementById("puntuacion").textContent = `Puntuación: ${puntuacion.toFixed(2)}`;

        return puntuacion;
    }

    // Función para obtener la puntuación máxima almacenada
    const obtenerPuntuacionMaxima = () => {
        const puntuacionMaxima = localStorage.getItem('puntuacionMaxima');
        return puntuacionMaxima ? parseInt(puntuacionMaxima) : 0; // Devuelve la puntuación máxima o 0 si no existe
    };

    document.addEventListener('DOMContentLoaded', () => {
        inicializarJuego("inicio"); // Configura el tablero
    });

    // Función para guardar la nueva puntuación máxima
    const guardarPuntuacionMaxima = (nuevaPuntuacion) => {
        const puntuacionMaxima = obtenerPuntuacionMaxima();  // Obtiene la puntuación máxima actual
        console.log("Puntuación máxima actual:", puntuacionMaxima);
        
        // Solo guarda la nueva puntuación si es más alta que la actual
        if (nuevaPuntuacion > puntuacionMaxima) {
            localStorage.setItem('puntuacionMaxima', nuevaPuntuacion);  // Guarda la nueva puntuación máxima
            console.log(`Nueva puntuación máxima guardada: ${nuevaPuntuacion}`);
        }
        mostrarPuntuacionMaxima();  // Actualiza el DOM con la puntuación máxima
    };

    // Mostrar la puntuación máxima en la página
    const mostrarPuntuacionMaxima = () => {
        const puntuacionMaxima = obtenerPuntuacionMaxima();  // Llama a obtenerPuntuacionMaxima
        const elemento = document.getElementById('puntuacionMaxima');
        if (elemento) {
            console.log(`Mostrando puntuación máxima: ${puntuacionMaxima}`);
            elemento.innerText = `Récord: ${puntuacionMaxima}`;
        } else {
            console.warn("El elemento puntuacionMaxima no existe en el DOM.");
        }
    };

    document.getElementById("rendirseBtn").addEventListener("click", function() {
        // Actualizar estado de rendición
        seRindio = true;

        // Ocultar el botón de rendirse
        this.style.display = 'none';

        finalizarJuego();
    });

    // Función para inicializar el juego con el nivel actual
    function inicializarJuego(nivel) { // Base como valor por defecto
        let filas = [];
        let columnas = [];
        let texto = "";
        let cita = obtenerCitaAleatoria();



        if (nivel === "inicio") {
            texto = `<br><b>¡Bienvenido a tu aventura cinematográfica!</b><br><br>
            Selecciona un modo de juego y demuestra tu amor por el cine. Desde clásicos atemporales hasta el cine más vanguardista, cada nivel pondrá a prueba tus conocimientos:<br><br>
            <b><u>Fácil</u></b>: Los grandes titanes del cine te esperan. Hitchcock, Kubrick y Nolan serán tus compañeros en este nivel accesible pero emocionante.<br><br>
            <b><u>Medio</u></b>: Explora más a fondo la variedad de directores. Descubre el surrealismo y lo contemplativo. ¿Podrás enfrentarte a estos maestros?<br><br>
            <b><u>Difícil</u></b>: El desafío definitivo. Sumérgete en las obras de culto de aquellos directores fuera de lo comercial. Un nivel solo para verdaderos cinéfilos.<br><br>
            <b><u>Modo Total</u></b>: Todos los directores, todas las corrientes. Cada celda es un reto. ¿Estás preparado para este desafío completo?<br><br>
            <b><u>Modo Mapa</u></b>: Viaja por el mundo a través del cine. Desde Japón hasta Latinoamérica, pasando por Europa. Une lugares y películas en este modo único.<br><br>
            <b><u>Modo Alto el Lápiz</u></b>: Juega con todas las categorías... ¡A la vez! Vamos más allá, filmografías completas en este modo de juego. <b><u>En proceso</u></b><br><br>
            `;
    
            // Actualizar texto de la pantalla de inicio
            document.getElementById("texto-nivel").innerHTML = texto;
            document.getElementById("quote").innerHTML = `<em>"${cita}"</em>`;
    
            // Mostrar solo la pantalla de inicio
            document.getElementById("pantallaInicio").style.display = "block";
            document.getElementById("pantallaJuego").style.display = "none";
    
            return; // Salir de la función
        }

        // Primero, quitar la clase 'activo' de todos los botones
        const botones = document.querySelectorAll('.navigation button');
        botones.forEach(boton => boton.classList.remove('activo'));

        // Ahora, agregar la clase 'activo' al botón seleccionado
        const botonSeleccionado = document.getElementById(nivel);
        console.log(botonSeleccionado);
        botonSeleccionado.classList.add('activo');

        if (nivel === "facil") {
            ({ filas, columnas } = generarCategorias("facil"));
            intentosRestantes = 9;
            actualizarContador();
        } else if (nivel === "medio") {
            ({ filas, columnas } = generarCategorias("medio"));
            intentosRestantes = 9;
            actualizarContador();
        } else if (nivel === "dificil") {
            ({ filas, columnas } = generarCategorias("dificil"));
            intentosRestantes = 9;
            actualizarContador();
        } else if (nivel === "geografia") {
            ({ filas, columnas } = generarCategorias("geografia"));
            intentosRestantes = 9;
            actualizarContador();
        } else if(nivel === "altolapiz") {
            ({ filas, columnas } = generarCategorias("altolapiz"));
            intentosRestantes = 27;
            actualizarContador();
        } else if (nivel === "actores") {
            ({ filas, columnas } = generarCategorias("actores"));
            intentosRestantes = 9;
            actualizarContador();
        } else if (nivel === "base") {
            ({ filas, columnas } = generarCategorias("base")); // Nivel predeterminado
            intentosRestantes = 9;
            actualizarContador();
        } 

        document.getElementById("quote").innerHTML = `<em>"${cita}"</em>`;

        // Mostrar la pantalla del juego y ocultar la pantalla de inicio
        document.getElementById("pantallaInicio").style.display = "none";
        document.getElementById("pantallaJuego").style.display = "block";

        // Crear el tablero con las categorías seleccionadas
        crearTablero(filas, columnas);

        puntuacion = 0;
        document.getElementById("puntuacion").textContent = `Puntuación: ${puntuacion}`;
        // Mostrar la puntuación máxima (si es necesario)
        mostrarPuntuacionMaxima();
        nivelActual = nivel; // Para luego en caso de reiniciar, quedar constancia de cuál es el nivel actual 
    }

    function obtenerCitaAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * quotes.length);
        return quotes[indiceAleatorio];
    }

    document.getElementById("reiniciar-juego").addEventListener("click", function () {
        try {
            // Reiniciar las variables del estado del juego
            seRindio = false;
            intentosRestantes = 9;
            actualizarContador(); // Asegúrate de que esta función actualiza el contador visual de intentos
            puntuacion = 0;

            // Mostrar el tablero de nuevo
            const tablero = document.getElementById('tablero');
            tablero.style.display = 'grid';  // Asumiendo que 'grid' es la clase para mostrar el tablero

            // Eliminar el mensaje final de "Juego Terminado"
            const mensajeFinal = document.getElementById('mensaje-final');
            if (mensajeFinal) {
                mensajeFinal.remove();
            }

            // Reiniciar cualquier otro elemento de interfaz que esté bloqueando la jugabilidad
            const botonRendirse = document.getElementById("rendirseBtn");
            botonRendirse.style.display = 'inline-block'; // Asegúrate de que el botón de rendirse esté visible

        } catch (error) {
            console.error("Error al reiniciar el juego:", error);
        }
    });
    

    async function finalizarJuego() {
        const mensajeFin = document.getElementById("mensajeFin");
        const mensajeFinTexto = document.getElementById("mensajeFinTexto");
        const puntuacionFinal = document.getElementById("puntuacionFinal");

        const celdas = document.querySelectorAll("#tablero .row:not(.header) .cell:not(.header-cell)");
        let todasLlenas = true; // Suponemos que todas las celdas están llenas inicialmente
    
        for (const celda of celdas) {
            const tieneClaseValida = celda.classList.contains("valida");
            const tieneImg = celda.querySelector("img") !== null;
    
            console.log(`Celda válida: ${tieneClaseValida}, contiene imagen: ${tieneImg}`);
    
            if (!tieneClaseValida && !tieneImg) {
                todasLlenas = false; // Si encontramos una celda que no cumple, marcamos como falso
                break; // Salimos del bucle porque no es necesario seguir comprobando
            }
        }
    
        if (todasLlenas) {
            mensajeFinTexto.textContent = "¡¡Felicidades, has ganado!! 🥳🥳";
            puntuacionFinal.textContent = `Tu puntuación es ${puntuacion.toFixed(2)}.`;
            mensajeFin.style.display = "block";
            mostrarBotonReiniciar();
        } else {
            mensajeFinTexto.textContent = "¡Lo siento! Te has quedado sin intentos. 😥";
            puntuacionFinal.textContent = `Tu puntuación es ${puntuacion.toFixed(2)}.`;
            mensajeFin.style.display = "block";
            mostrarBotonReiniciar();
        }
    
        // Si no se cumple el criterio de victoria, sigue con el flujo de mensajes de fin de juego
        if (seRindio) {
            mensajeFinTexto.textContent = "¡Juego terminado! Decidiste rendirte. 🥶";
            puntuacionFinal.textContent = `Tu puntuación es ${puntuacion.toFixed(2)}.`;
            mensajeFin.style.display = "block";
            mostrarBotonReiniciar();
            return;
        } 
    }  

    function mostrarBotonReiniciar() {
        const botonReiniciar = document.getElementById('reiniciar-juego');
        botonReiniciar.style.display = 'block'; // Mostrar el botón
    }
    
    function ocultarBotonReiniciar() {
        const botonReiniciar = document.getElementById('reiniciar-juego');
        botonReiniciar.style.display = 'none'; // Ocultar el botón
    }

    function reiniciarJuego() {
        // Restablecer las variables de juego
        intentosRestantes = 9;
        puntuacion = 0;
        seRindio = false;
        actualizarContador(); // Actualizar el contador de intentos

        document.getElementById("puntuacion").textContent = `Puntuación: ${puntuacion.toFixed(2)}`;

        // Ocultar el mensaje de fin de juego y restablecer su contenido
        const mensajeFin = document.getElementById("mensajeFin");
        mensajeFin.style.display = "none"; // Ocultar el contenedor del mensaje
        document.getElementById("mensajeFinTexto").textContent = ""; // Borrar el texto del mensaje
        document.getElementById("puntuacionFinal").textContent = ""; // Borrar la puntuación final

        // Limpiar el tablero (eliminar contenido de celdas y estilos aplicados)
        const celdas = document.querySelectorAll('.cell');
        celdas.forEach(celda => {
            celda.innerHTML = ''; // Quitar contenido de las celdas
            celda.classList.remove('valida'); // Quitar estilos de celdas válidas
        });
    }

    // Función para limpiar las clases activas
function resetActiveButtons() {
    const buttons = document.querySelectorAll('.navigation button');
    buttons.forEach(button => button.classList.remove('activo'));
}

// Llama a esta función cuando cargues la página de inicio
document.getElementById('inicio').addEventListener('click', resetActiveButtons);

document.querySelectorAll('.navigation button').forEach(button => {
    button.addEventListener('click', () => {
        // Eliminar clase active de todos los botones
        document.querySelectorAll('.navigation button').forEach(btn => btn.classList.remove('activo'));

        // Agregar clase active al botón clicado
        button.classList.add('activo');
    });
});


document.getElementById('reiniciar-juego').addEventListener('click', () => {
    reiniciarJuego(); // Limpia el tablero y las categorías
    inicializarJuego(nivelActual); // Reinicia el juego según el nivel actual
});


    



