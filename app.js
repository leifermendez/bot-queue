/**
 * ⚡⚡⚡ DECLARAMOS LAS LIBRERIAS y CONSTANTES A USAR! ⚡⚡⚡
 */
require('dotenv').config();
require('./src/controllers/arena')
const path = require('path');
const fs = require('fs');
const { SESSION_FILE_PATH } = require('./src/helpers/config')
const device = require('./src/controllers/device')

/**
 * Revisamos si tenemos credenciales guardadas para inciar sessio
 * este paso evita volver a escanear el QRCODE
 */

const withSession = () => {
    device.logginDevice()
}

/**
 * Generamos un QRCODE para iniciar sesion
 */
const withOutSession = () => {
    device.addDevice()
}

/**
 * Revisamos si existe archivo con credenciales!
 */
(fs.existsSync(path.join(__dirname, `./${SESSION_FILE_PATH}`))) ? withSession(): withOutSession();