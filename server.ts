import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

const app = express();
const server = new http.Server(app);

// In production, we serve the contents from /dist
// In dev, we use webpack-dev-server to serve the contents.
//
// (webpack-dev-server is very configurable through webpack.config.js and 
// we use it to proxy the socket requests to this ExpressJS server.)
// more: https://stackoverflow.com/a/41726825/9698467
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// the port is either dynamically assigned (on a service like Heroku)
// or can be picked up from the constants
const port = process.env.PORT || 5000;

// Starts the server
server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
