import * as React from 'react';
import { videosInfo } from './videos-info';
import { VideoResultItem } from './Types';
import { Container, Grid, Paper } from '@material-ui/core';
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
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Header sortFn={sortFn} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={10}>
            {videos.map((video) => (
              <Grid key={video.id} item>
                <Paper style={{height: 140, width: 100}} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <ul>
        {videos.map((video) => (
          <li>
            <p>{video.snippet.title}</p>
            <p>{selectFn(video)}</p>
          </li>
        ))}
        </ul>
      </Grid>
    </Container>
    // <p>Hello world! {videosInfo.items.length}</p>
  );
}
