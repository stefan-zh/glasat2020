import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import { google } from 'googleapis';
import { videosInfo } from './videos-info';

const app = express();
const server = new http.Server(app);

// Set up Google client
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyAWDHgXePt72ygRKzozk_ZbMAPPcHgpOr0'
});

const ytOptions = {
  headers: {
    "Referer": "yt-glasat.herokuapp.com"
  },
}

// asynchronous function to fetch statistics for all videos
const fetchVideoStatistics = async () => {
  const allIds = videosInfo.items.map((video) => video.id);
  let nextPageToken = "";

  // batch in 50s
  // while (allIds.length) {
    const ids = allIds.splice(0, 50);

    // fetch all videos separately
    const statisticsResp = await youtube.videos.list({
      part: ["statistics"],
      id: ids,
      fields: "items(id,statistics),nextPageToken",
      maxResults: 50,
      pageToken: nextPageToken
    }, ytOptions);
    nextPageToken = statisticsResp.data.nextPageToken || "";
  // }
  console.log(JSON.stringify(statisticsResp.data));
  
  

  
  // console.log(statisticsResp);
}

fetchVideoStatistics();

// In production, we serve the contents from /dist
// In dev, we use webpack-dev-server to serve the contents.
//
// (webpack-dev-server is very configurable through webpack.config.js and 
// we use it to proxy the socket requests to this ExpressJS server.)
// more: https://stackoverflow.com/a/41726825/9698467
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// данните от Гласът на България
app.get('/videos', function (_req, res) {
  res.send(videosInfo);
});

// the port is either dynamically assigned (on a service like Heroku)
// or can be picked up from the constants
const port = process.env.PORT || 5000;

// Starts the server
server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
