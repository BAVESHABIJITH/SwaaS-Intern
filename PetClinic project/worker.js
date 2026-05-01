const { parentPort } = require('worker_threads');

parentPort.on('message', (data) => {
    console.log("From main:", data);
    parentPort.postMessage("Work done!");
    parentPort.postMessage("Work complete!!");
});