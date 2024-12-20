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
    "Japón", "China", "Brasil", "Argentina", "Chile", "México", "Canadá", "Mediterráneo","Asia Oriental","Sudeste Asiático","Asia Meridional","Asia Occidental",
    "Francia", "Italia", "España", "Dinamarca", "Suecia", "Noruega", "Islandia", "Norteamérica","América del Sur", "Escandinavia",
    "Alemania", "Holanda", "Polonia", "Rusia", "Turquía", "Grecia", 
    "Rumania", "Hong Kong", "Corea del Sur", "Taiwán", "Tailandia", "Vietnam", 
    "India", "Filipinas", "Indonesia", "Irán","Centroeuropa","Europa del este",
]

const categoriaRegiones = [
    "Centroeuropa","Europa del este","Mediterráneo","Asia Oriental","Sudeste Asiático","Asia Meridional","Asia Occidental","Norteamérica","América del Sur", "Escandinavia"
]

const categoriaPaises = [
    "Japón", "China", "Brasil", "Argentina", "Chile", "México", "Canadá", 
    "Francia", "Italia", "España", "Dinamarca", "Suecia", "Noruega", "Islandia", 
    "Alemania", "Bélgica", "Holanda", "Polonia", "Rusia", "Turquía", "Grecia", 
    "Rumania", "Hong Kong", "Corea del Sur", "Taiwán", "Tailandia", "Vietnam", 
    "India", "Filipinas", "Indonesia", "Irán"
];

const regiones = {
    "Centroeuropa": [
        "DE", "HU", "SK", "BE", "CZ", "GB", "NL", "LU", "AT", "PL", "FR", "CS" // CS : Checoslovaquia
    ],
    "Europa del este": [
        "RU", "SU", "RO", "UA", "BA", "BY", "LV", "LT", "EE", "MD", "GE", "HR", "SI", "RS", "ME", "MK", "XK" // SU : URSS
    ],
    "Escandinavia": [
        "SE", "NO", "FL", "IS", "DK"
    ],
    "Mediterráneo": [
        "ES", "PT", "IT", "TR", "CY", "MT", "GR"
    ],
    "Asia Oriental": [
        "CN", "JP", "KR", "MN", "TW", "HK"
    ],
    "Sudeste Asiático": [
        "TH", "VN", "PH", "ID", "MY", "SG", "MM", "KH", "LA", "BN", "TL"
    ],
    "Asia Meridional": [
        "IN", "PK", "BD", "LK", "AF"
    ],
    "Asia Occidental": [
        "IR", "IL", "PS", "SA", "YE", "OM", "QA", "AE", "BH", "KW", "JO", "AM", "AZ", "SY", "LB", "IQ"
    ],
    "Norteamérica": [
        "US", "CA", "MX"
    ],
    "América del Sur": [
        "BR", "AR", "CL", "CO", "PE", "EC", "BO", "PY", "UY"
    ],
    "África": [
        "DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CD", "CG", "DJ", "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "ZM", "ZW"
    ]
};

const paises = {
    "Japón": ["JP"],"China": ["CN"],"Brasil": ["BR"],"Argentina": ["AR"],"Chile": ["CL"],"México": ["MX"],"Canadá": ["CA"],"Francia": ["FR"],"Italia": ["IT"],"España": ["ES"],"Dinamarca": ["DK"],"Suecia": ["SE"],"Noruega": ["NO"],"Islandia": ["IS"],"Alemania": ["DE"],"República Checa": ["CZ", "CS"],"Holanda": ["NL"],"Polonia": ["PL"],"Rusia": ["RU", "SU"],"Turquía": ["TR"],"Grecia": ["GR"],"Rumanía": ["RO"],"Hong Kong": ["HK"],"Corea del Sur": ["KR"],"Taiwán": ["TW"],"Tailandia": ["TH"],"Vietnam": ["VN"],"India": ["IN"],"Filipinas": ["PH"],"Indonesia": ["ID"],"Irán": ["IR"]
};

/*
const actoresContemporaneos = [
    "Matthew McConaughey","Jon Bernthal","Tom Hardy","Thimotee Chalamet","Zendaya","Josh O'Connor","Robert De Niro","Amy Adams","Michael Fassbender","Carey Mulligan","Natalie Portman",
    "Leonardo Di Caprio","Brad Pitt","Angelina Jolie","Adrien Brody","Colman Domingo","Greta Gerwig","Song Kang-ho","Paul Mescal","Anya Taylor-Joy","Nicholas Hoult","Margot Robbie",
    "Rebecca Ferguson","Emma Stone","Ryan Gosling","Mads Mikkelsen","Jake Gyllenhaal","Kirsten Dunst","Rachel Senott","Ayo Edebiri","Olivia Cooke","Naomi Watts","Rachel Weisz","Christian Bale",
    "Russell Crowe","Jessica Chastain","Dave Bautista","Cillian Murphy","Koji Yakusho","Daniel Kaluuya","John David Washington","Denzel Washington","Dev Patel","Robert Pattinson",
    "Kirsten Stewart","Willem Dafoe","Zoe Saldaña","SKARSGARD FAMILY","Ben Affleck","Casey Affleck","Matt Damon","Benicio del Toro","Emily Blunt","Adam Sandler","Jack Black","Ricardo Darín",
    "Tilda Swinton","Barry Keoghan","Jacob Elordi","Daniel Craig","Jennifer Lawrence","Ethan Hawke","Steven Yeun","Renate Reinsve","Jodie Comer","Austin Butler","Nicholas Cage","Sydney Sweeney",
    "Julianne Moore","Cate Blanchett","Kate Winslet","Adam Driver","Vanessa Kirby","Joaquin Phoenix","Elizabeth Debicky","Shia LaBeouf","Tom Hanks","Keira Knightley","Mark Ruffalo",
    "Jamie Foxx","Oscar Isaac","Jason Statham","Hugh Grant","Clint Eastwood","Toni Colette","Léa Seydoux","Frances McDormand","Charlize Theron","Rachel McAdams","Tim Roth","Colin Farrell",
    "Ralph Fiennes","Olivia Colman","Riz Ahmed","Ben Stiller","Steve Carell","Jonah Hill","Jared Leto","Antonio de la Torre","Rooney Mara","Viggo Mortensen","Mark Wahlberg","Bruce Willis",
    "Samuel L. Jackson","Anthony Hopkins","Harrison Ford","Anne Hathaway","Rami Malek","Jesse Eisenberg","Sandra Bullock",
]
*/
const actoresContemporaneos = [ // 2000-2024
    "Actor: Matthew McConaughey", "Actor: Jon Bernthal", "Actor: Tom Hardy", "Actor: Thimotee Chalamet", "Actriz: Zendaya", "Actor: Josh O'Connor", "Actor: Robert De Niro", "Actriz: Amy Adams", "Actor: Michael Fassbender", "Actriz: Carey Mulligan", "Actriz: Natalie Portman",
    "Actor: Leonardo Di Caprio", "Actor: Brad Pitt", "Actriz: Angelina Jolie", "Actor: Adrien Brody", "Actor: Colman Domingo", "Actriz: Greta Gerwig", "Actor: Song Kang-ho", "Actor: Paul Mescal", "Actriz: Anya Taylor-Joy", "Actor: Nicholas Hoult", "Actriz: Margot Robbie",
    "Actriz: Rebecca Ferguson", "Actriz: Emma Stone", "Actor: Ryan Gosling", "Actor: Mads Mikkelsen", "Actor: Jake Gyllenhaal", "Actriz: Kirsten Dunst", "Actriz: Rachel Senott", "Actriz: Ayo Edebiri", "Actriz: Olivia Cooke", "Actriz: Naomi Watts", "Actriz: Rachel Weisz", "Actor: Christian Bale",
    "Actor: Russell Crowe", "Actriz: Jessica Chastain", "Actor: Dave Bautista", "Actor: Cillian Murphy", "Actor: Koji Yakusho", "Actor: Daniel Kaluuya", "Actor: John David Washington", "Actor: Denzel Washington", "Actor: Dev Patel", "Actor: Robert Pattinson",
    "Actriz: Kirsten Stewart", "Actor: Willem Dafoe", "Actriz: Zoe Saldaña", "Actor: SKARSGARD FAMILY", "Actor: Ben Affleck", "Actor: Casey Affleck", "Actor: Matt Damon", "Actor: Benicio del Toro", "Actriz: Emily Blunt", "Actor: Adam Sandler", "Actor: Jack Black", "Actor: Ricardo Darín",
    "Actriz: Tilda Swinton", "Actor: Barry Keoghan", "Actor: Jacob Elordi", "Actor: Daniel Craig", "Actriz: Jennifer Lawrence", "Actor: Ethan Hawke", "Actor: Steven Yeun", "Actriz: Renate Reinsve", "Actriz: Jodie Comer", "Actor: Austin Butler", "Actor: Nicholas Cage", "Actriz: Sydney Sweeney",
    "Actriz: Julianne Moore", "Actriz: Cate Blanchett", "Actriz: Kate Winslet", "Actor: Adam Driver", "Actriz: Vanessa Kirby", "Actor: Joaquin Phoenix", "Actriz: Elizabeth Debicky", "Actor: Shia LaBeouf", "Actor: Tom Hanks", "Actriz: Keira Knightley", "Actor: Mark Ruffalo",
    "Actor: Jamie Foxx", "Actor: Oscar Isaac", "Actor: Jason Statham", "Actor: Hugh Grant", "Actor: Clint Eastwood", "Actriz: Toni Colette", "Actriz: Léa Seydoux", "Actriz: Frances McDormand", "Actor: Charlize Theron", "Actriz: Rachel McAdams", "Actor: Tim Roth", "Actor: Colin Farrell",
    "Actor: Ralph Fiennes", "Actriz: Olivia Colman", "Actor: Riz Ahmed", "Actor: Ben Stiller", "Actor: Steve Carell", "Actor: Jonah Hill", "Actor: Jared Leto", "Actor: Antonio de la Torre", "Actriz: Rooney Mara", "Actor: Viggo Mortensen", "Actor: Mark Wahlberg", "Actor: Bruce Willis",
    "Actor: Samuel L. Jackson", "Actor: Anthony Hopkins", "Actor: Harrison Ford", "Actriz: Anne Hathaway", "Actor: Rami Malek", "Actor: Jesse Eisenberg", "Actriz: Sandra Bullock","Actor: Javier Bardem",
    "Actriz: Penélope Cruz","Actriz: Florence Pugh","Actor: Antonio Banderas","Actor: Bill Skarsgård","Actor: Alexander Skarsgård","Actor: Stellan Skarsgård",
]

const actoresModernos = [ // ?-2000
    "Actriz: Winona Ryder","Actor: Johnny Depp","Actor: Robert De Niro"
]
