import * as React from 'react';
import { videosInfo } from './videos-info';
import { VideoResultItem } from './Types';
import { Container } from '@material-ui/core';
import { Header } from './Header';
// import { fetchVideos } from './services';

// selectors
const selectViewCount = (video: VideoResultItem) => video.statistics.viewCount.toLocaleString();
const selectLikeCount = (video: VideoResultItem) => video.statistics.likeCount.toLocaleString();

export const App = () => {
  // state variables
  const [videos, setVideos] = React.useState<VideoResultItem[]>(
    [...videosInfo.items.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]
  );
  // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  const [selectFn, setSelectFn] = React.useState<(video: VideoResultItem) => string>(() => selectViewCount)

  React.useEffect(() => {
    // window.gapi.load('client', fetchVideos);
  });

  const sortFn = (order: number) => {
    switch (order) {
      case 1: {
        setVideos(vds => [...vds.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);
        setSelectFn(() => selectViewCount);
        break;
      }
      case 2: {
        setVideos(vds => [...vds.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount)]);
        setSelectFn(() => selectLikeCount);
        break;
      }
    }
  }

  return (
    <Container maxWidth="lg">
      <Header sortFn={sortFn} />
      <ul>
      {videos.map((video) => (
        <li>
          <p>{video.snippet.title}</p>
          <p>{selectFn(video)}</p>
        </li>
      ))}
      </ul>
    </Container>
    // <p>Hello world! {videosInfo.items.length}</p>
  );
}
