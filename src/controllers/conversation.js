const flow = require('../flow/steps.json');
const messages = require('../flow/messages.json')
const { readChat } = require('./chat')
const { addMessageQueue } = require('../queue/messages.queue')


const listenMessage = (client) => {

    client.on('message', async msg => {
        const { from, to } = msg;
        let { body } = msg
        let step = await readChat(from, body)
        body = body.toLowerCase();

        if (flow.STEP_1.includes(body)) {
            const step1Msg = messages.STEP_1.join('');
            //ENVIAR A COLA
            addMessageQueue({ mode: 'send_message', data: { from, message: step1Msg } })
            return
        }


        if (flow.STEP_2.includes(body)) {

            const step2Msg = messages.STEP_2.join('')
            addMessageQueue({ mode: 'send_message', data: { from, message: step2Msg } })
            await readChat(from, body, 'STEP_2_1')
            return
        }

        /**
         * más step...
         */

        /***************************** FLOW ******************************** */

        if (step && step.includes('STEP_2_1')) {
            const step3Msg = messages.STEP_3.join('')
            addMessageQueue({ mode: 'send_message', data: { from, message: step3Msg } })
            await readChat(from, body)
            return
        }

        /**
         * más flows...
         */

    });
}


module.exports = {
    listenMessage
}