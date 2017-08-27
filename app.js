const accepts = require('accepts')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Client = require('node-rest-client').Client;
const http = require('http');
// const Promise = require('promise/lib/es6-extensions');
const cors = require('cors');


const client = new Client();
const urlClient = 'https://swapi.co/api/people/?format=json';
const urlPlanets = 'https://swapi.co/api/planets';
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     optionsSuccessStatus: 200,
//   }

app.set('view engine', 'jade');
app.use("public", express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Root */
app.get("/", function (req, res) {
    res.render('index');
});

/* 50 Personajes con ordenamiento opcional por Nombre o Peso*/
app.get("/api/personajes?:ordenar(nombre|peso)?"/* , cors(corsOptions) */, function (req, res) {

    req.accepts('application/json');
    const parms = req.param('ordenar');
    console.log('Parametro "ordenar": ' + parms);

    let url = ``;
    let dataArray = [];
    let dataResolve = [];
    let p = [];
    let jjData;

    function getDataPersons(idPage) {
        return new Promise(function (resolve, reject) {
            client.get(`https://swapi.co/api/people/?page=${idPage}&format=json`, function (data, response) {
                console.log(`# - Inicio  :  idPage=${idPage}  -`);
                data.results.forEach(function (el) {
                    dataArray.push(el);
                });
                resolve(data.results);
            });
        });
    }

    for (let i = 0; i < 5; i++) {
        p.push(getDataPersons(i + 1).then(content => {
            const leng = dataArray.length;
            if (leng === 50) {
                console.log('Se enviara la informacion: ');
                if (parms === 'nombre') {
                    dataArray.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                }
                if (parms === 'peso') {
                    dataArray.sort(function (a, b) {
                        if (a.mass > b.mass) {
                            return 1;
                        }
                        if (a.mass < b.mass) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });
                }

                const jData = JSON.stringify({ result: dataArray });
                res.setHeader('Content-Type', 'application/json');
                res.send(jData);
            }
        }));
    }

    Promise.all(p);
});



/* Solo consulta los datos de un personaje y solo funciona con 4 {luke, leia, han, rey}/personaje/:name */
app.get("/api/personaje/:name"/* , cors(corsOptions) */, function (req, res, next) {

    let pName = req.params.name;
    const cPersons = [
        {
            name: 'luke',
            url: 'https://swapi.co/api/people/1/',
            img: ''
        },
        {
            name: 'han',
            url: 'https://swapi.co/api/people/14/',
            img: ''
        },
        {
            name: 'leia',
            url: 'https://swapi.co/api/people/5/',
            img: ''
        },
        {
            name: 'rey',
            url: 'https://swapi.co/api/people/85/',
            img: ''
        }
    ];
    let personUrl = urlClient;
    cPersons.forEach(function (cPerson) {
        if (cPerson.name === pName) {
            // console.log('cPerson.name === pName');
            personUrl = cPerson.url;
            // console.log(personUrl);
        }
    });

    client.get(personUrl, function (data, response) {
        let jData = JSON.stringify({ result: data });
        console.log(jData);
        res.send(jData);
    });
});


/* Residentes: Regresar un JSON */
app.get("/api/residentes", function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    let dataPlanets = [];
    let dataResidents = [];

    function getDataPlanets(urlPlanets) {
        return new Promise(function (resolve, reject) {
            client.get(urlPlanets, function (data, response) {
                console.log(`# - Inicio  :  getDataPlanets  -`);
                data.results.forEach(function (el) {
                    dataPlanets.push(el);
                });
                const resolv = data.results;
                resolve(resolv);
            });
        });
    }
    function getDataResidents(urlResident, namePlanet) {
        return new Promise(function (resolve, reject) {
            client.get(urlResident, function (data, response) {
                console.log(`# - Inicio  :  getDataResidents  -`);
                let resi = [];
                data.results.forEach(function (el) {
                    dataResidents.push({namePlanet: namePlanet, residents: el});
                    resi.push({namePlanet: namePlanet, residents: el});
                });
                resolve(resi);
            });
        });
    }

    getDataPlanets(urlPlanets).then(resolv => {
        console.log('resolv --> ');
        let jData = JSON.stringify({ length: resolv.length, result: resolv });
        res.send(resolv);
    });
});

app.listen(3000);
console.log('Servidor escuchando en el Puerto(3000).');
