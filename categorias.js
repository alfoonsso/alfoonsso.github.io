const OMDB_API_KEY = '41e74dd2';
const API_KEY = '98fd1e135ecfac794b25c1fe1d162ac8';

const categoriasFilas = [
    "Director: Alfred Hitchcock", "Director: Stanley Kubrick", "Director: Víctor Erice", "Director: Takashi Miike", "Director: Gakuryu Ishii", "Director: David Cronenberg",
    "Director: Christopher Nolan", "Director: Denis Villeneuve","Director: Michael Haneke","Director: Richard Linklater","Director: Terry Gilliam", "Director: John Cassavetes",
    "Director: Chantal Akerman", "Director: Kathryn Bigelow","Director: John Carpenter","Director: Michael Mann","Director: Andrey Zvyagintsev","Director: Paul Verhoeven",     
    "Director: Francis Ford Coppola", "Director: Martin Scorsese", "Director: Alejandro González Iñárritu", "Director: Gaspar Noé","Director: Abel Ferrara",
    "Director: Clint Eastwood", "Director: Paolo Sorrentino","Director: Paul Schrader","Director: Walter Salles","Director: Ernst Lubitsch","Director: Chris Marker",
    "Director: F. W. Murnau", "Director: Carl Theodor Dreyer","Director: Sidney Lumet","Director: Robert Eggers","Director: Tim Burton","Director: Christian Petzold",
    "Director: Charlie Chaplin", "Director: Steven Spielberg","Director: Theo Angelopoulos", "Director: Semih Kaplanoğlu", "Director: Cristi Puiu","Director: Miguel Gomes",
    "Director: Bong Joon-ho", "Director: Spike Lee", "Director: Orson Wells","Director: Luis García Berlanga","Director: Carlos Saura", "Director: Alain Resnais","Director: Hiroshi Shimizu",
    "Director: Alice Rohrwacher", "Director: Brian De Palma","Director: Roy Andersson","Director: Patricio Guzmán", "Director: Raúl Ruiz", "Director: Radu Jude", "Director: Piotr Szulkin",
    "Director: David Lynch", "Director: Akira Kurosawa","Director: Jacques Demy", "Director: Thomas Vinterberg", "Director: Éric Rohmer","Director: Alejandro Amenábar","Director: Tsui Hark",
    "Director: Yasujirō Ozu", "Director: Billy Wilder","Director: Sergei Eisenstein","Director: Pablo Larraín","Director: Ben Affleck","Director: Guy Ritchie","Director: Rob Reiner",
    "Director: Ingmar Bergman", "Director: Andrei Tarkovsky","Director: Peter Greenaway","Director: David Lean","Director: Paweł Pawlikowski","Director: Leos Carax","Director: Maya Deren",
    "Director: Quentin Tarantino", "Director: Jean-Luc Godard","Director: Kim Ki-duk","Director: Masaki Kobayashi","Director: Jonas Mekas","Director: Quentin Dupieux","Director: Greta Gerwig",
    "Director: Agnès Varda", "Director: Luis Buñuel","Director: Miloš Forman","Director: Nobuhiko Obayashi","Director: Fruit Chan","Director: Carlos Reygadas","Director: John Woo",
    "Director: Ridley Scott", "Director: Hayao Miyazaki","Director: Trần Anh Hùng","Director: Franco Piavoli","Director: King Hu","Director: Hiroshi Teshigahara",
    "Director: Aki Kaurismäki", "Director: Kiyoshi Kurosawa","Director: Takeshi Kitano","Director: Woody Allen","Director: John Huston","Director: William Wyler","Director: Aleksandr Sokurov",
    "Director: Edward Yang", "Director: Anders Thomas Jensen","Director: Kamila Andini","Director: Satyajit Ray","Director: Zack Snyder","Director: Joachim Trier","Director: Jonathan Glazer",
    "Director: Paul Thomas Anderson", "Director: Terrence Malick",
    "Director: Bi Gan", "Director: Jia Zhangke", "Director: Nuri Bilge Ceylan",
    "Director: Pedro Almodóvar", "Director: Zhang Yimou", "Director: Wim Wenders",
    "Director: Robert Bresson", "Director: Fritz Lang", "Director: Park Chan-wook",
    "Director: Pedro Costa", "Director: Krzysztof Kieślowski",
    "Director: Wong Kar-wai", "Director: François Truffaut", "Director: Lars von Trier", 
    "Director: Mario Bava", "Director: Federico Fellini", "Director: Wes Anderson", 
    "Director: Michelangelo Antonioni", "Director: Darren Aronofsky", "Director: Yorgos Lanthimos",
    "Director: M. Night Shyamalan", "Director: Apichatpong Weerasethakul",
    "Director: James Cameron", "Director: Nicolas Winding Refn", "Director: Joel Coen", 
    "Director: Abbas Kiarostami", "Director: Werner Herzog", "Director: Buster Keaton",
    "Director: Hou Hsiao-hsien", "Director: Tsai Ming-liang", "Director: Béla Tarr",
    "Director: Kenji Mizoguchi", "Director: Guillermo del Toro", 
    "Director: Alfonso Cuarón", "Director: Neill Blomkamp",
    "Director: Gus Van Sant", "Director: Ryūsuke Hamaguchi",
    "Director: Sofia Coppola", "Director: Alex Garland",
    "Director: Claire Denis", "Director: Luca Guadagnino",
    "Director: Sean Baker", "Director: Hirokazu Kore-eda",
    "Director: Shunji Iwai", "Director: Jim Jarmusch",
    "Director: Andrzej Żuławski", "Director: Šarūnas Bartas",
    "Director: Hong Sang-soo", "Director: John Ford"
];

const categoriasColumnas = [
    "One Word Title (ignore 'The')", "Título con 3 o más palabras",
    "Empieza por vocal (ignore 'The')", "Título empieza con A-H (ignore 'The')",
    "Título empieza con I-P (ignore 'The')", "Título empieza con Q-Z (ignore 'A', 'An')",
    "Título contiene J,K,W,Z,X,Q", "Título con 2 palabras", "Título con doble letra ('rr', 'll'...)"
]

const directoresNivelFacil = [ // 48 directores
    "Director: Alfred Hitchcock","Director: Akira Kurosawa", "Director: Ingmar Bergman","Director: Billy Wilder", "Director: Jean-Luc Godard","Director: Stanley Kubrick",
    "Director: Francis Ford Coppola", "Director: Martin Scorsese", "Director: Clint Eastwood", "Director: Brian De Palma","Director: Michael Mann","Director: David Lynch","Director: James Cameron",
    "Director: Tim Burton","Director: Ridley Scott", "Director: Hayao Miyazaki", "Director: Aki Kaurismäki","Director: Terrence Malick", "Director: Pedro Almodóvar","Director: Christopher Nolan", 
    "Director: Paolo Sorrentino","Director: Bong Joon-ho","Director: Spike Lee","Director: Quentin Tarantino","Director: Guillermo del Toro","Director: Alfonso Cuarón","Director: Steven Spielberg",
    "Director: Sofia Coppola","Director: Luca Guadagnino","Director: Paul Thomas Anderson","Director: Wong Kar-wai","Director: Lars von Trier","Director: Wes Anderson","Director: Denis Villeneuve",
    "Director: Darren Aronofsky", "Director: Yorgos Lanthimos","Director: M. Night Shyamalan","Director: Joel Coen","Director: Andrei Tarkovsky","Director: Éric Rohmer","Director: Alejandro Amenábar",
    "Director: Ben Affleck","Director: Guy Ritchie","Director: Greta Gerwig","Director: Woody Allen","Director: Zack Snyder","Director: Joachim Trier","Director: Jonathan Glazer",
]

const directoresNivelMedio = [ // 48 directores
    "Director: Charlie Chaplin","Director: Yasujirō Ozu","Director: Ernst Lubitsch","Director: Agnès Varda", "Director: Luis Buñuel","Director: Orson Wells","Director: Robert Bresson",
    "Director: Fritz Lang", "Director: François Truffaut","Director: Federico Fellini", "Director: Michelangelo Antonioni", "Director: Buster Keaton","Director: Carlos Saura","Director: Leos Carax",
    "Director: Sidney Lumet","Director: Edward Yang","Director: Wim Wenders","Director: Béla Tarr","Director: Jim Jarmusch","Director: Kathryn Bigelow","Director: Abel Ferrara","Director: Rob Reiner",
    "Director: Alice Rohrwacher","Director: Neill Blomkamp","Director: Gus Van Sant", "Director: Ryūsuke Hamaguchi","Director: Michael Haneke","Director: Alex Garland","Director: Alejandro González Iñárritu",
    "Director: Sean Baker", "Director: Hirokazu Kore-eda","Director: Kiyoshi Kurosawa","Director: Nicolas Winding Refn","Director: John Huston","Director: Pablo Larraín","Director: Danny Boyle",
    "Director: Hong Sang-soo","Director: John Cassavetes","Director: Krzysztof Kieślowski","Director: Werner Herzog","Director: Jacques Demy", "Director: Thomas Vinterberg",
    "Director: Paul Verhoeven","Director: Park Chan-wook","Director: David Lean","Director: John Ford","Director: Rodrigo Sorogoyen","Director: Álex de la Iglesia",
]

const directoresNivelDificil = [ // 48 directores
    "Director: Hiroshi Shimizu","Director: Luis García Berlanga","Director: Mario Bava","Director: Kenji Mizoguchi","Director: Chantal Akerman","Director: Alain Resnais","Director: Chris Marker",
    "Director: Theo Angelopoulos","Director: Gakuryu Ishii","Director: Zhang Yimou","Director: Abbas Kiarostami","Director: Hou Hsiao-hsien", "Director: Tsai Ming-liang","Director: Pedro Costa",
    "Director: Claire Denis","Director: Andrzej Żuławski", "Director: Šarūnas Bartas","Director: Semih Kaplanoğlu", "Director: Cristi Puiu","Director: Takashi Miike","Director: Shunji Iwai",
    "Director: Walter Salles","Director: Andrei Zvyagintsev","Director: Lav Diaz","Director: Bi Gan","Director: Jia Zhangke", "Director: Nuri Bilge Ceylan","Director: Apichatpong Weerasethakul",
    "Director: Roy Andersson","Director: Patricio Guzmán","Director: Raúl Ruiz", "Director: Radu Jude", "Director: Piotr Szulkin","Director: Sergei Eisenstein","Director: Peter Greenaway",
    "Director: Paweł Pawlikowski","Director: Maya Deren","Director: Kim Ki-duk","Director: Masaki Kobayashi","Director: Jonas Mekas","Director: Quentin Dupieux","Director: King Hu",
    "Director: Miloš Forman","Director: Nobuhiko Obayashi","Director: Fruit Chan","Director: Carlos Reygadas","Director: John Woo","Director: Trần Anh Hùng","Director: Franco Piavoli",
    "Director: Hiroshi Teshigahara","Director: Takeshi Kitano","Director: William Wyler","Director: Aleksandr Sokurov","Director: Kamila Andini","Director: Satyajit Ray","Director: Anders Thomas Jensen",
]

const modoAltoLapiz = [
    "Director: Alfred Hitchcock","Director: Akira Kurosawa", "Director: Ingmar Bergman", "Director: Jia Zhangke","Director: Stanley Kubrick","Director: Takashi Miike","Director: Billy Wilder",
    "Director: Jean-Luc Godard","Director: Francis Ford Coppola", "Director: Martin Scorsese", "Director: Clint Eastwood", "Director: Brian De Palma","Director: David Lynch",,"Director: Michael Mann",
    "Director: Ridley Scott", "Director: Hayao Miyazaki", "Director: Aki Kaurismäki","Director: Terrence Malick", "Director: Pedro Almodóvar","Director: Steven Spielberg","Director: Lars von Trier",
    "Director: Sofia Coppola","Director: Luca Guadagnino","Director: Paul Thomas Anderson","Director: Wong Kar-wai","Director: Wes Anderson","Director: Denis Villeneuve","Director: Joel Coen",
    "Director: Yorgos Lanthimos","Director: M. Night Shyamalan","Director: Éric Rohmer","Director: Guy Ritchie","Director: Woody Allen","Director: Zack Snyder","Director: Kenji Mizoguchi",
    "Director: Charlie Chaplin","Director: Yasujirō Ozu","Director: Ernst Lubitsch","Director: Agnès Varda","Director: Luis Buñuel","Director: Orson Wells","Director: Robert Bresson",
]

const modoGeografia = [
    "Japón", "China", "Brasil", "Argentina", "Chile", "México", "Canadá", "Mediterráneo","Asia Oriental","Sudeste Asiático","Asia Meridional y Occidental",
    "Francia", "Italia", "España", "Dinamarca", "Suecia", "Noruega", "Islandia", "Norteamérica","América del Sur", "Escandinavia",
    "Alemania", "Holanda", "Polonia", "Rusia", "Turquía", "Grecia", 
    "Rumania", "Hong Kong", "Corea del Sur", "Taiwán", "Tailandia", "Vietnam", 
    "India", "Filipinas", "Indonesia", "Irán","Centroeuropa","Europa del este",
]

const categoriaRegiones = [
    "Centroeuropa","Europa del este","Mediterráneo","Asia Oriental","Sudeste Asiático","Asia Meridional y Occidental","Norteamérica","América del Sur", "Escandinavia"
]

const categoriaPaises = [
    "Japón", "China", "Brasil", "Argentina", "Chile", "México", "Canadá", 
    "Francia", "Italia", "España", "Dinamarca", "Suecia", "Noruega", "Islandia", 
    "Alemania", "Bélgica", "Holanda", "Polonia", "Rusia", "Turquía", "Grecia", 
    "Rumania", "Hong Kong", "Corea del Sur", "Taiwán", "Tailandia", "Vietnam", 
    "India", "Filipinas", "Indonesia", "Irán"
];

const categoriasNivel = {
        base : categoriasFilas,
        facil : directoresNivelFacil,
        medio : directoresNivelMedio,
        dificil : directoresNivelDificil,
        geografia : modoGeografia,
        altolapiz : modoAltoLapiz
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
