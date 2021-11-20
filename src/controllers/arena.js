const Arena = require('bull-arena');
// Mandatory import of queue library.
const Bee = require('bee-queue');

const initArena = Arena({
    // All queue libraries used must be explicitly imported and included.
    Bee,

    // Provide a `Bull` option when using bull, similar to the `Bee` option above.

    queues: [{

        name: 'messages',

        // User-readable display name for the host. Required.
        hostId: 'Queue Server 1',

        // Queue type (Bull or Bee - default Bull).
        type: 'bee',

        // Queue key prefix. Defaults to "bq" for Bee and "bull" for Bull.
        prefix: 'foo',
    }, ],

    // Optionally include your own stylesheet
    customCssPath: 'https://example.com/custom-arena-styles.css',

    // Optionally include your own script
    customJsPath: 'https://example.com/custom-arena-js.js',
});

module.exports = { initArena }