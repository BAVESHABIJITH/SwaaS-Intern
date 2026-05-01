const { Worker } = require('worker_threads');

const worker = new Worker("./worker.js");
worker.postMessage("Start working");
worker.on('message', (data) => {
    console.log(data);
});

worker.on('error', (error) => {
    console.error('Worker error:', error);
});

worker.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
    }
});