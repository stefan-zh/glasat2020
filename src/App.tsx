import * as React from 'react';
import { videosInfo } from './videos-info';
import { VideoResultItem } from './Types';
import { Container, Grid } from '@material-ui/core';
import { Header } from './Header';
import { VideoCard } from './VideoCard';
// import { fetchVideos } from './services';

// selectors
const selectViewCount = (video: VideoResultItem) => {
  return `${video.statistics.viewCount.toLocaleString()} гледания`;
}
const selectLikeCount = (video: VideoResultItem) => {
  return `${video.statistics.likeCount.toLocaleString()} харесвания`;
}

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
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Header sortFn={sortFn} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={5}>
            {videos.map((video) => (
              <Grid key={video.id} item>
                <VideoCard video={video} catFn={selectFn} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
