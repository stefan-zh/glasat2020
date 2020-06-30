import * as React from 'react';
import { VideoResultItem } from './Types';
import { Grid } from '@material-ui/core';
import { VideoCard } from './VideoCard';

interface VideoListProps {
  videos: VideoResultItem[],
  metricsFn: (video: VideoResultItem) => string,
  selectVideo: (video: VideoResultItem) => void
}

export const VideoList = ({videos, metricsFn, selectVideo}: VideoListProps) => (
  <Grid container justify="center" spacing={5}>
    {videos.map((video) => (
      <Grid key={video.id} item>
        <VideoCard video={video} metricsFn={metricsFn} selectVideo={selectVideo} />
      </Grid>
    ))}
  </Grid>
);
