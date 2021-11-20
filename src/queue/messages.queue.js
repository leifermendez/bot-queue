const { REDIS_CONFIG } = require('../helpers/config')
const Queue = require('bee-queue');
const { messageProcess } = require('./messages.process')

const messagesQueue = new Queue('messages', REDIS_CONFIG);

messagesQueue.process(2, (job, done) => {
    if (job.data.mode === 'send_message') {
        messageProcess(job)
    }
    // Notify the client via push notification, web socket or email etc.
    done();
})

const addMessageQueue = (msg) => messagesQueue.createJob(msg).save();

module.exports = {
    addMessageQueue
}