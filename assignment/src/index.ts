import cluster from 'cluster';
import os from 'os';
import { createServer } from './infrastructureLayer/config/app';
import { db } from './infrastructureLayer/config/db';

const bootstrap = async () => {
  const PORT = process.env.PORT || 3000;

  if (cluster.isMaster) {
    // Fork workers
    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    // Worker processes share the same port
    const app = await createServer();

    db().then(() => {
      app?.listen(4000, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  }
};

bootstrap();
