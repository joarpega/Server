var accepts = require('accepts')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Client = require('node-rest-client').Client;
const http = require('http');
const fs = require('fs');
var cors = require('cors');

const client = new Client();
const urlClient = 'https://swapi.co/api/people/?format=json';

app.set('view engine', 'jade');
app.use("public", express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Root */
app.get("/", function (req, res) {
    res.render('index');
});

/* Personajes */
app.get("/api/personajes", function (req, res) {
    client.get(urlClient, function (data, response) {
        console.log("Exito /* Personajes */");
        console.log(data);
        res.render('all', { rjson: data });
    });
});




app.use(cors());

/* /personaje/:name */
app.get("/api/personaje/:name"/* , cors(corsOptions) */, function (req, res, next) {
    let accept = accepts(req);
    // console.log('--------------- accept ---------------------\n\n');
    // console.log(accept);

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
            console.log('cPerson.name === pName');
            personUrl = cPerson.url;
            console.log(personUrl);
        }
    });

    // client.get(personUrl, function (data, response) {
    //     // fs.readFile('./views/single_person.html', 'utf8', function (err, dataHtml) {
    //     //     if (err) {
    //     //         console.log('err ------------------');
    //     //         console.log(err);
    //     //         throw err;
    //     //     }
    //     //     console.log('html ---------------------------');
    //     //     console.log(dataHtml);
    //     //     let jData = JSON.stringify({ result: data, html: dataHtml });
    //     //     console.log(jData);
    //     //     res.send(jData);
    //     // });
    //     // let jData = JSON.stringify({ result: data });
    //     // console.log(jData);
    //     // res.send(jData);
    //     console.log("--------------- Exito /*   /personaje/:name   */");
    //     console.log(data);
    //     res.render('single_person', { rjson: data }, function (err, html) {
    //         let jData = JSON.stringify({ result: data });
    //         console.log(jData);
    //         res.send(jData);
    //     });
    // });

    switch (accept.type(['json', 'html'])) {
        case 'json':
            client.get(personUrl, function (data, response) {
                let jData = JSON.stringify({ result: data });
                // console.log(jData);
                res.setHeader('Content-Type', 'application/json');
                res.send(jData);
            });
            // res.send('{"hello":"world!"}');
            console.log('case:  json');
            break
        case 'html':
            client.get(personUrl, function (data, response) {
                res.setHeader('Content-Type', 'text/html');
                res.render('single_person', { rjson: data });
            });
            // res.send('<b>hello, world!</b>');
            console.log('case:  html');
            break
        default:
            // the fallback is text/plain, so no need to specify it above
            res.setHeader('Content-Type', 'text/plain');
            res.send('hello, world!');
            console.log('case:  default');
            break
    }

    // console.log('--------------- RRRREEEEEQQQQ ---------------------\n\n');
    // console.log(req);
});


/* Residentes */
app.get("/api/residentes", function (req, res) {
    client.get(urlClient, function (data, response) {
        res.setHeader('Content-Type', 'application/json');
        var json = JSON.stringify({
            results: data['results'],
        });
        res.send(json);
    });
});

app.listen(3000);
console.log('Servidor iniciado.');
