const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Client = require('node-rest-client').Client;
const http = require('http');
var cors = require('cors');

const client = new Client();
const urlClient = 'https://swapi.co/api/people/?format=json';

/* 
var whitelist = ['http://localhost:3000', 'http://localhost:3001'];
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };
   */

app.set('view engine', 'jade');
app.use("public", express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Root */
app.get("/", function (req, res) {
    res.render('index');
});

/* Personajes */
app.get("/personaje", function (req, res) {
    client.get(urlClient, function (data, response) {
        console.log("Exito /* Personajes */");
        res.render('all', { rjson: data });
    });
});

/* /personaje/:name */
app.use(cors());
app.get("/personaje/:name"/* , cors(corsOptions) */, function (req, res, next) {
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
            console.log('Condicion cumplida ... cPerson.name === pName');
            personUrl = cPerson.url;
            console.log(personUrl);
        }
    });
    
    client.get(personUrl, function (data, response) {
        res.setHeader('Content-Type', 'application/json');
        // console.log(response);
        // console.log(data);
        let jData = JSON.stringify({result: data});
        //res.render('all', { rjson: data });
        console.log(res);
        res.send(jData);
    });
});
/* Residentes */
app.get("/residentes", function (req, res) {
    client.get(urlClient, function (data, response) {
        res.setHeader('Content-Type', 'application/json');
        var json = JSON.stringify({
            results: data['results'],
        });
        res.send(json);
    });
});

app.listen(3000);
