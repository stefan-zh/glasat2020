import * as React from 'react';
import { SearchResult } from './Types';

const gapi = window.gapi;
const apiKey = 'AIzaSyAWDHgXePt72ygRKzozk_ZbMAPPcHgpOr0'
const glasatChannel = 'UCdQohU_yE1l3Rby4SsTVdww'


const fetchVideos = async () => {
  await gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  });
  const resp = await (gapi.client as any).youtube.search.list({
    part: ["snippet"],
    channelId: glasatChannel,
    order: "date",
    publishedAfter: '2020-01-01T00:00:00Z',
    publishedBefore: '2020-06-15T10:30:30Z'
  });
  const result: SearchResult = JSON.parse(resp.body);
  console.log(JSON.stringify(result));
}

export const App = () => {

  React.useEffect(() => {
    gapi.load('client', fetchVideos);
  });

  return (
    <p>Hello world!</p>
  );
}
