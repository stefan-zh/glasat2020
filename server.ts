import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import axios from 'axios';
import { videosInfo } from './videos-info';
import { VideoStatistics, VideoResult } from './src/Types'

const app = express();
const server = new http.Server(app);
const API_KEY = "AIzaSyAWDHgXePt72ygRKzozk_ZbMAPPcHgpOr0";

// we'll use this variable to update it with latest statistics
let videos: VideoResult = videosInfo;

// To make the queries successfully, we need to set the Referer header.
// The allowed Referer's are set in the developers console:
// https://console.developers.google.com
const headers = {
  "Referer": "glasat2020.herokuapp.com"
}

// asynchronous function to fetch statistics for all videos
const fetchVideoStatistics = async () => {
  const allIds = videos.items.map((video) => video.id);
  const stats: {[id: string]: VideoStatistics} = {};

  // batch in 50s
  while (allIds.length) {
    const ids = allIds.splice(0, 50);

    // fetch a batch of 50 videos
    const statisticsResp = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      headers: headers,
      params: {
        key: API_KEY,
        part: "statistics",
        id: ids.join(),
        fields: "items(id,statistics)",
        maxResults: ids.length
      }
    });

    // save the video statistics in the proper format
    for (const {id, statistics} of statisticsResp.data.items) {
      stats[id] = {
        viewCount: Number(statistics.viewCount) || 0,
        likeCount: Number(statistics.likeCount) || 0,
        dislikeCount: Number(statistics.dislikeCount) || 0,
        favoriteCount: Number(statistics.favoriteCount) || 0,
        commentCount: Number(statistics.commentCount) || 0
      };
    }
  }
  return stats;
}

// execute data fetch and update video data
fetchVideoStatistics().then((stats: {[id: string]: VideoStatistics}) => {
  for (const video of videos.items) {
    video.statistics = (video.id in stats) ? stats[video.id] : video.statistics
  }
  videos.lastUpdatedAt = new Date().toISOString();
});

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
  res.send(videos);
});

// the port is either dynamically assigned (on a service like Heroku)
// or can be picked up from the constants
const port = process.env.PORT || 5000;

// Starts the server
server.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
