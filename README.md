## The Voice of Bulgaria on YouTube 2020

### Dev environment

In dev the app uses two servers: one that serves the front-end and one that serves the backend. This is because I can hot-reload 
changes on the front-end without having to restart the backend server.

The backend server can be started with `npm start` locally. It runs `server.ts` on port `5000`.

The front-end server serves the front-end files and can be started with `npm run start:dev`. It is by default on port `3000`.

It is a [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) that serves the content (HTML, JS, etc). There is 
one endpoint `/videos`, which cannot be served statically locally. The webpack-dev-server redirects requests to it via a _proxy_ 
to the backend server.

### Production

There is no need for proxy on production (Heroku) since there is only one server in production and it serves the `/videos` endpoint 
and the static files.

To push to Heroku: `git push heroku main`.

### Fetching statistics

When the backend server starts, it fetches the statistics information for the YouTube videos for the Voice of Bulgaria, and merges 
them onto the `videosInfo` array that it reads from disk. The `videosInfo` array only contains data that doesn't change, such as song 
title, performer, upload date, etc. This data merge happens when the server starts, but Heroku recycles its dynos after 30 minutes of
inactivity, so after each restart the latest statistics are fetched again.
