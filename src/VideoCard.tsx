import * as React from 'react';
import { VideoResultItem } from './Types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
