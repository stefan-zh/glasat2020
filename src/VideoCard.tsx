import * as React from 'react';
import { VideoResultItem } from './Types';
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 345,
  },
});

interface VideoCardProps {
  video: VideoResultItem,
  metricsFn: (video: VideoResultItem) => string,
  selectVideo: (video: VideoResultItem) => void
}

export const VideoCard = (props: VideoCardProps) => {
  const classes = useStyles();
  const video = props.video;
  const title = video.snippet.title;
  const metrics = props.metricsFn(video);
  const cardOnClick = () => props.selectVideo(video);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardOnClick}>      
        <CardMedia
          component="img"
          alt={title}
          image={video.snippet.thumbnails['medium'].url}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {video.snippet.title}
          </Typography>
          <Typography color="textSecondary">
            {metrics}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
