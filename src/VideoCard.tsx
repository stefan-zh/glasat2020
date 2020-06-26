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
  catFn: (video: VideoResultItem) => string
}

export const VideoCard = (props: VideoCardProps) => {
  const classes = useStyles();
  const video = props.video;
  const title = video.snippet.title;
  const subtext = props.catFn(video);

  return (
    <Card className={classes.root}>
      <CardActionArea>      
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
            {subtext}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
