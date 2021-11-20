const { sendMessage } = require('../controllers/messages')


const messageProcess = (job) => {
    const { from, message, mode } = job.data.data || { from: null, message: null }
    sendMessage(from, message)
}


module.exports = { messageProcess }