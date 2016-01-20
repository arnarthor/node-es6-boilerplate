import express from 'express';

const app = express();

app.get('/services/helloworld/hello', (req, res) => {
  res.json({message: 'Hello boilerplate!'});
});

app.get('/services/helloworld/world', (req, res) => {
  res.json({message: 'World boilerplate'});
});

export default app;
