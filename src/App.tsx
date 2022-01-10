import * as React from 'react';
import axios from 'axios';
import * as moment from 'moment';
import { VideoResultItem, ArtistGrouping, VideoStatistics } from './Types';
import { Container, CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from './Header';
import { Footer } from './Footer';
import { VideoList } from './VideoList';
import { VideoDialog } from './VideoDialog';
import { ArtistCard } from './ArtistCard';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center'
  },
});

// selectors
const viewCountFn = <T extends {statistics: VideoStatistics}>(item: T) => {
  return `${item.statistics.viewCount.toLocaleString()} гледания`;
}
const likeCountFn = <T extends {statistics: VideoStatistics}>(item: T) => {
  return `${item.statistics.likeCount.toLocaleString()} харесвания`;
}
const dateFn = (item: VideoResultItem) => {
  const date = moment(item.snippet.publishedAt, moment.ISO_8601);
  return date.format("D MMMM YYYY");
}

export const App = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [sortOrder, setSortOrder] = React.useState<number>(1);
  // native data objects
  const [videos, setVideos] = React.useState<VideoResultItem[]>([]);
  const [byArtist, setByArtist] = React.useState<{[name: string]: ArtistGrouping}>({});
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string | undefined>();
  // produced data objects
  const [selectedVideo, setSelectedVideo] = React.useState<VideoResultItem | null>(null);
  const [body, setBody] = React.useState<JSX.Element | undefined>();

  /**
   * Fetches the video data from the backend and sets the data objects 
   */
  React.useEffect(() => {
    // fetch videos from backend
    const fetchVideos = async () => {
      const resp = await axios.get('/videos');
      const videos: VideoResultItem[] = resp.data.items;

      // set the videos from the backend sorted by viewCount
      setVideos([...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);

      // set the videos grouped by artist
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
              likeCount: likeCount,
              dislikeCount: 0,
              favoriteCount: 0,
              commentCount: 0
            }
          }
        }
        return acc;
      }, {});
      setByArtist(byArtist);

      // set lastUpdated, the body and clear loading
      setLastUpdatedAt(resp.data.lastUpdatedAt);
      setBody(() => (<VideoList videos={videos} metricsFn={viewCountFn} selectVideo={setSelectedVideo} />));
      setIsLoading(false);
    }
    
    fetchVideos();
  }, []);

  /**
   * Changes the UI based on the selected sort order
   */
  React.useEffect(() => {
    if (videos.length < 1) {
      return
    }
    switch (sortOrder) {
      case 1: {
        const sortedVideos = [...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]
        setBody(() => (<VideoList videos={sortedVideos} metricsFn={viewCountFn} selectVideo={setSelectedVideo} />));
        break;
      }
      case 2: {
        const sortedVideos = [...videos.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount)];
        setBody(() => (<VideoList videos={sortedVideos} metricsFn={likeCountFn} selectVideo={setSelectedVideo} />));
        break;
      }
      case 3: {
        const sortedGroups = Object.values(byArtist).sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);
        setBody(() => (
          <Grid container justify="flex-start" spacing={2}>
            {sortedGroups.map((grouping) => (
              <Grid key={grouping.name} item xs={12}>
                <ArtistCard grouping={grouping} metricsFn={viewCountFn} selectVideo={setSelectedVideo} />
              </Grid>
            ))}
          </Grid>
        ));
        break;
      }
      case 4: {
        const sortedVideos = [...videos.sort((a, b) => {
          const first = moment(a.snippet.publishedAt, moment.ISO_8601);
          const second = moment(b.snippet.publishedAt, moment.ISO_8601);
          return second.diff(first);
        })];
        setBody(() => (<VideoList videos={sortedVideos} metricsFn={dateFn} selectVideo={setSelectedVideo} />));
        break;
      }
    }
  }, [sortOrder, videos]);

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
      {body}
      <Footer />
      <VideoDialog selectedVideo={selectedVideo} closeDialog={closeDialog} />
    </Container>
  );
}
