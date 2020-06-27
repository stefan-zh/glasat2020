import * as React from 'react';
import { videosInfo } from './videos-info';
import { VideoResultItem } from './Types';
import { Container, Grid } from '@material-ui/core';
import { Header } from './Header';
import { VideoList } from './VideoList';
import * as moment from 'moment';
// import { fetchVideos } from './services';

// selectors
const viewCountFn = (video: VideoResultItem) => {
  return `${video.statistics.viewCount.toLocaleString()} гледания`;
}
const likeCountFn = (video: VideoResultItem) => {
  return `${video.statistics.likeCount.toLocaleString()} харесвания`;
}
const dateFn = (video: VideoResultItem) => {
  const date = moment(video.snippet.publishedAt, moment.ISO_8601);
  return date.format("D MMMM YYYY");
}

export const App = () => {
  // state variables
  const [videos, setVideos] = React.useState<VideoResultItem[]>(
    [...videosInfo.items.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]
  );
  // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  const [metricsFn, setMetricsFn] = React.useState<(video: VideoResultItem) => string>(() => viewCountFn)

  React.useEffect(() => {
    // window.gapi.load('client', fetchVideos);
  });

  const sortFn = (order: number) => {
    switch (order) {
      case 1: {
        setVideos(vds => [...vds.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);
        setMetricsFn(() => viewCountFn);
        break;
      }
      case 2: {
        setVideos(vds => [...vds.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount)]);
        setMetricsFn(() => likeCountFn);
        break;
      }
      case 3: {
        setVideos(vds => [...vds.sort((a, b) => {
          const first = moment(a.snippet.publishedAt, moment.ISO_8601);
          const second = moment(b.snippet.publishedAt, moment.ISO_8601);
          return second.diff(first);
        })]);
        setMetricsFn(() => dateFn);
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
          <VideoList videos={videos} metricsFn={metricsFn} />
        </Grid>
      </Grid>
    </Container>
  );
}
