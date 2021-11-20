/**
 * Enviamos un mensaje simple (texto) a nuestro cliente
 * @param {*} number 
 */
const sendMessage = (number = null, text = null) => new Promise((resolve, reject) => {
    const { getClient } = require('./device')
    const clientSession = getClient()
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const message = text;
    const msg = clientSession.sendMessage(number, message);
    console.log('⚡⚡⚡ Enviando mensajes....')
    resolve(true)
})

module.exports = { sendMessage }