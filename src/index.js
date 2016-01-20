import express from 'express';
import app from './app';

const server = express();
const port = process.env.PORT || 4000;

server.use('/SERVICE_NAME', app);

server.listen(port, () => {
  console.log('Starting server on port', port);
});

export default server;
