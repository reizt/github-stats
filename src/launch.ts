import server from './server';

const port = 6400;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});