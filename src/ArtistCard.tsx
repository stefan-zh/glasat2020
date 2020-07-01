import * as React from 'react';
import { Card, CardContent, CardHeader, Grid, Typography, CardActionArea, CardMedia, makeStyles } from '@material-ui/core';
import { ArtistGrouping, VideoResultItem } from './Types';

const useStyles = makeStyles({
  root: {
    maxWidth: 135,
  },
});

/**
 * The Thumbnail Video Card inside the Artist Card
 */
interface ThumbnailCardProps {
  video: VideoResultItem,
  selectVideo: (video: VideoResultItem) => void
}

const ThumbnailCard = (props: ThumbnailCardProps) => {
  const classes = useStyles();
  const video = props.video;
  const title = video.snippet.title;
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
          <Typography variant="body2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/**
 * The Artist Card
 */
interface ArtistCardProps {
  grouping: ArtistGrouping,
  metricsFn: (grouping: ArtistGrouping) => string,
  selectVideo: (video: VideoResultItem) => void
}

export const ArtistCard = ({grouping, metricsFn, selectVideo}: ArtistCardProps) => {
  const {name, videos} = {...grouping};
  const sortedVideos = videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);
  const metrics = metricsFn(grouping);

  return (
    <Card>
      <CardHeader title={name} subheader={metrics} />
      <CardContent>
        <Grid container justify="flex-start" spacing={2}>
          {sortedVideos.map((video) => (
            <Grid key={video.id} item>
              <ThumbnailCard video={video} selectVideo={selectVideo} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
