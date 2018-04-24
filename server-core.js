'use strict';

<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');

const Message = require('./message');

const app = express();
const messages = [];

app.use(bodyParser.json());

app.route('/messages')
    .post(function (request, response) {
        let message = new Message(request.body.text);
        message.set_from(request.query.from);
        message.set_to(request.query.to);
        messages.push(message);
        response.status(201).send(message);
    })
    .get(function(request, response) {
        let result = messages;
        if (request.query.from !== undefined) {
            result = result.filter(function(elem) {
                return elem.hasOwnProperty('_from') && elem._from === request.query.from;
            })
        }
        if (request.query.to !== undefined) {
            result = result.filter(function(elem) {
                return elem.hasOwnProperty('_to') && elem._to === request.query.to;
            })
        }
        response.status(200).send(result);
    })

app.all('*', function (request, responce) {
    responce.sendStatus(404);
});

module.exports = app;
=======
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // Тут нужно обработать запрос
    res.end();
});

module.exports = server;
>>>>>>> 5f4cf1845c1af5b7029ce5c1e70f7ecde5aca0cf
