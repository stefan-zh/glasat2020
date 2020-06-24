import * as React from 'react';
import { videosInfo } from './videos-info';
// import { fetchVideos } from './services';

export const App = () => {
  React.useEffect(() => {
    // window.gapi.load('client', fetchVideos);
  });

  return (
    <p>Hello world! {videosInfo.items.length}</p>
  );
}
