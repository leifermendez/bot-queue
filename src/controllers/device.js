const qrcode = require('qrcode-terminal');
const fs = require('fs')
const path = require('path')
const { Client } = require('whatsapp-web.js');
const { SESSION_FILE_PATH } = require('../helpers/config');
const { listenMessage } = require('./conversation')
let client;


const addDevice = () => {
    console.log('No tenemos session guardada');
    client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        listenMessage(client)
    });

    client.on('auth_failure', () => {
        console.log('** Error de autentificacion vuelve a generar el QRCODE **');
    })

    client.on('authenticated', (session) => {

        fs.writeFile(path.join(__dirname, `../../${SESSION_FILE_PATH}`), JSON.stringify(session), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
    return client
}

const logginDevice = () => {
    const session = require(path.join(__dirname, `../../${SESSION_FILE_PATH}`));
    console.log('Validando session con Whatsapp...')
    client = new Client({
        session
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        listenMessage(client)
    });

    client.on('auth_failure', () => {
        console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
    })

    client.initialize();

    return client
}

const getClient = () => client


module.exports = { addDevice, logginDevice, getClient }