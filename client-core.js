'use strict';

const requestPromiseNative = require('request-promise-native');
module.exports.execute = execute;
module.exports.isStar = true;

const chalk = require('chalk');

const red = chalk.hex('#00F');
const green = chalk.hex('#0F0');

const settings = {
    baseUrl: 'http://localhost:8080/messages',
    uri: '/',
    json: true
};

const functions = {
    'list': list,
    'send': send
};

function toString(elem) {
    let result = '';
    if (elem.hasOwnProperty('_from')) {
        result += `${red('FROM')}: ${elem._from} \n`;
    }
    if (elem.hasOwnProperty('_to')) {
        result += `${red('TO')}: ${elem._to} \n`;
    }
    result += `${green('TEXT')}: ${elem._text} \n\n`;

    return result;
}


function send(args) {
    args = parse(args);
    return requestPromiseNative
        .defaults(settings)
        .post({
            body: { text: args.text},
            qs: { to: args.to, from: args.from }
        })
        .then(toString);
}

function list(args) {
    return requestPromiseNative
    .defaults(settings)
    .get({
        body: { text: args.text},
        qs: { to: args.to, from: args.from }
    })
    .then(body => body
        .map(json => toString(json))
        .join('\n\n'));
}



function parse(params) {
    let result = {};
    params.reduce((previousValue, currentValue, index, array) => {
      previousValue.includes("--") ? (previousValue.includes("=") ? result[previousValue.split('=')[0].split('--')[1]] = previousValue.split('=')[1] : result[previousValue.split('--')[1]] = currentValue ) : currentValue;
      return currentValue;
    })
    return result;
}

function execute() {
    const args = process.argv.slice(2);
    return functions[args[0]](args.slice(1));
}
