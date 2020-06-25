import * as React from 'react';
import { VideoResultItem } from './Types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
  const subtext = props.catFn(video);

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        image={video.snippet.thumbnails['medium'].url}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {video.snippet.title}
        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>
        <Typography color="textSecondary">
          {subtext}
        </Typography>
      </CardActions>
    </Card>
  );
}
