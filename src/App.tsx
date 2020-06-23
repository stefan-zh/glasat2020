import * as React from 'react';
import { SearchResult, VideoResult, VideoResultItem } from './Types';

const gapi = window.gapi;
const apiKey = 'AIzaSyAWDHgXePt72ygRKzozk_ZbMAPPcHgpOr0'
const glasatChannel = 'UCdQohU_yE1l3Rby4SsTVdww'

const fetchVideos = async () => {
  await gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  });
  const searchParams = {
    part: ["snippet"],
    channelId: glasatChannel,
    order: "date",
    publishedAfter: '2020-01-01T00:00:00Z',
    publishedBefore: '2020-06-15T10:30:30Z',
    type: "video",
    fields: "items/id/videoId",
    maxResults: 50,
    pageToken: ""
  };
  let searchResult: {
    items: [{id: {videoId: string}}],
    nextPageToken: string | undefined
  };
  let videos: VideoResultItem[] = [];

  // fetch all videos in pages
  do {
    const resp = await (gapi.client as any).youtube.search.list(searchParams);
    searchResult = JSON.parse(resp.body);
    const ids = searchResult.items.map((item) => item.id.videoId);
    console.log(ids);

    // fetch all videos separately
    // const videoParams = {
    //   part: ["snippet,statistics"],
    //   id: ids.join()
    // }
    // const videoResp = await (gapi.client as any).youtube.videos.list(videoParams);
    // const videoResult: VideoResult = JSON.parse(videoResp.body);
    // videos = videos.concat(videoResult.items);
    if (searchResult.nextPageToken) {
      searchParams.pageToken = searchResult.nextPageToken;
    }
  }
  while (searchResult.nextPageToken)

  // // fetch all videos separately
  // const videoParams = {
  //   part: ["snippet,statistics"],
  //   id: videoIds.join()
  // }
  // const videoResp = await (gapi.client as any).youtube.videos.list(videoParams);
  // const videoResult: VideoResult = JSON.parse(videoResp.body);

  console.log(JSON.stringify(videos));
}

export const App = () => {

  React.useEffect(() => {
    gapi.load('client', fetchVideos);
  });

  return (
    <p>Hello world!</p>
  );
}
