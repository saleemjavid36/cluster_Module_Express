import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`The total number of CPUs is ${cpuCount}`);
    console.log(`Primary PID = ${process.pid}`);

    cluster.setupPrimary({
        exec: __dirname + "/index.js",
    });

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} has been killed`);
        console.log(`Starting another worker`);
        cluster.fork();
    });
} else {
    // Worker process logic
    // Make sure `index.js` contains the server code.
    console.log(`Worker PID = ${process.pid}`);
}