var accepts = require('accepts')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Client = require('node-rest-client').Client;
const http = require('http');
const fs = require('fs');
var Promise = require('promise/lib/es6-extensions');
var cors = require('cors');


const client = new Client();
const urlClient = 'https://swapi.co/api/people/?format=json';
const urlPlanets = 'https://swapi.co/api/planets';

app.set('view engine', 'jade');
app.use("public", express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Root */
app.get("/", function (req, res) {
    res.render('index');
});

/* 50 Personajes */
app.get("/api/personajes?:ordenar(nombre|peso)?", function (req, res) {

    const parms = req.param('ordenar');
    console.log(parms);

    let url = ``;
    let dataArray = [];
    var p = new Array;
    let jjData;


    for (let i = 1; i <= 8; i++) {
        client.get(`https://swapi.co/api/people/?page=${i}&format=json`, function (data, response) {
            data.results.forEach(function (el) {
                dataArray.push(el);
            });
            if (i === 8) {
                console.log('Se imprimira');
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

                let jjData = JSON.stringify({ result: dataArray });
                res.setHeader('Content-Type', 'application/json');
                res.send(jjData);
            } else {
                console.log(i);
            }
        });
    }
});

app.use(cors());

/* /personaje/:name */
app.get("/api/personaje/:name"/* , cors(corsOptions) */, function (req, res, next) {
    let accept = accepts(req);
    console.log('--------------- accept ---------------------\n\n');
    console.log(accept);
    console.log(req);

    let pName = req.params.name;
    const cPersons = [
        {
            name: 'luke',
            url: 'https://swapi.co/api/people/1/'
        },
        {
            name: 'han',
            url: 'https://swapi.co/api/people/14/'
        },
        {
            name: 'leia',
            url: 'https://swapi.co/api/people/5/'
        },
        {
            name: 'rey',
            url: 'https://swapi.co/api/people/85/'
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
        console.log("--------------- Exito /*   /personaje/:name   */");
        console.log(data);
        // res.render('single_person', { rjson: data }, function (err, html) {
        //     let jData = JSON.stringify({ result: data });
        //     console.log(jData);
        //     res.send(jData);
        // });
    });
});


/* Residentes */
app.get("/api/residentes", function (req, res) {
    client.get(urlPlanets, function (data, response) {
        res.setHeader('Content-Type', 'application/json');
        var json = JSON.stringify({
            results: data['results'],
        });
        
        res.send(json);
    });
});

app.listen(3000);
console.log('Servidor iniciado.');
