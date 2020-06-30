import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import { VideoResultItem, ArtistGrouping } from './Types';
import { Container, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';
import { Footer } from './Footer';
import { VideoList } from './VideoList';
import { VideoDialog } from './VideoDialog';

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
  const [sortOrder, setSortOrder] = React.useState<number>(1);
  // the videos data from backend
  const [videos, setVideos] = React.useState<VideoResultItem[]>([]);
  // the videos grouped by artist
  const [artistGroups, setArtistGroups] = React.useState<ArtistGrouping[]>([]);
  const [selectedVideo, setSelectedVideo] = React.useState<VideoResultItem | null>(null);
  // const [names] = React.useState<string[]>(() => {
  //   const names = [...videosInfo.items.reduce((acc: string[], video) => acc.concat(video.snippet.artists), [])];
  //   return [...new Set(names.sort())];
  // });
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string | undefined>();
  // https://medium.com/swlh/how-to-store-a-function-with-the-usestate-hook-in-react-8a88dd4eede1
  const [metricsFn, setMetricsFn] = React.useState<(video: VideoResultItem) => string>(() => viewCountFn)

  React.useEffect(() => {
    // fetch videos from backend
    const fetchVideos = async () => {
      const resp = await axios.get('/videos');
      const videos: VideoResultItem[] = resp.data.items;
      setVideos([...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);
      setLastUpdatedAt(resp.data.lastUpdatedAt);
      setIsLoading(false);
    }
    
    fetchVideos();
  }, []);

  /**
   * Changes the UI based on the selected sort order
   */
  React.useEffect(() => {
    switch (sortOrder) {
      case 1: {
        setVideos([...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);
        setMetricsFn(() => viewCountFn);
        break;
      }
      case 2: {
        setVideos([...videos.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount)]);
        setMetricsFn(() => likeCountFn);
        break;
      }
      case 3: {
        const byArtist = videos.reduce((acc: {[name: string]: ArtistGrouping}, video: VideoResultItem) => {
          for (const name of video.snippet.artists) {
            const videos = (name in acc) ? [...acc[name].videos, video] : [video];
            const viewCount = (acc[name]?.statistics.viewCount || 0) + video.statistics.viewCount;
            const likeCount = (acc[name]?.statistics.likeCount || 0) + video.statistics.likeCount;
            acc[name] = {
              name: name,
              videos: videos,
              statistics: {
                viewCount: viewCount,
                likeCount: likeCount
              }
            }
          }
          return acc;
        }, {});
        const sortedGroups = Object.values(byArtist).sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);
        setArtistGroups(sortedGroups);
        console.log(sortedGroups);
        break;
      }
      case 4: {
        break;
      }
      case 5: {
        setVideos(vds => [...vds.sort((a, b) => {
          const first = moment(a.snippet.publishedAt, moment.ISO_8601);
          const second = moment(b.snippet.publishedAt, moment.ISO_8601);
          return second.diff(first);
        })]);
        setMetricsFn(() => dateFn);
      }
    }
  }, [sortOrder]);

  /**
   * Closes the Video Dialog
   */
  const closeDialog = () => setSelectedVideo(null);

  return (
    <Container maxWidth="lg">
      <Header sortFn={setSortOrder} lastUpdatedAt={lastUpdatedAt} />
      <div className={classes.spinner} style={{visibility: isLoading ? 'visible' : 'hidden'}}>
        <CircularProgress color="secondary" disableShrink={true} /> 
      </div>
      {/* {names.map((name) => (<p>{name}</p>))} */}
      <VideoList videos={videos} metricsFn={metricsFn} selectVideo={setSelectedVideo} />
      <Footer />
      <VideoDialog selectedVideo={selectedVideo} closeDialog={closeDialog} />
    </Container>
  );
}
