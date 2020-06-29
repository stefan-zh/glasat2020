import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import { VideoResultItem } from './Types';
import { Container, CircularProgress } from '@material-ui/core';
import { Header } from './Header';
import { Footer } from './Footer';
import { VideoList } from './VideoList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center'
  },
});

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
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  // the videos data from backend
  const [videos, setVideos] = React.useState<VideoResultItem[]>([]);
  // the artists' names
  // const [names] = React.useState<string[]>(() => {
  //   const names = [...videosInfo.items.reduce((acc: string[], video) => acc.concat(video.snippet.artists), [])];
  //   return [...new Set(names.sort())];
  // });
  // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  const [metricsFn, setMetricsFn] = React.useState<(video: VideoResultItem) => string>(() => viewCountFn)

  React.useEffect(() => {
    // fetch videos from backend
    const fetchVideos = async () => {
      const resp = await axios.get('/videos');
      const videos: VideoResultItem[] = resp.data.items;
      setVideos([...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);
      setIsLoading(false);
    }
    
    fetchVideos();
    // window.gapi.load('client', fetchVideos);
  }, []);

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
      <Header sortFn={sortFn} />
      <div className={classes.spinner} style={{visibility: isLoading ? 'visible' : 'hidden'}}>
        <CircularProgress color="secondary" disableShrink={true} /> 
      </div>
      {/* {names.map((name) => (<p>{name}</p>))} */}
      <VideoList videos={videos} metricsFn={metricsFn} />
      <Footer />
    </Container>
  );
}
