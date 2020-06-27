import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles, useTheme  } from '@material-ui/core/styles';
import { VideoResultItem } from './Types';
import { Dialog, Grid, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { VideoCard } from './VideoCard';
import ReactPlayer from 'react-player';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

interface VideoListProps {
  videos: VideoResultItem[],
  metricsFn: (video: VideoResultItem) => string
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: 0,
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          &#10005;
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const VideoList = (props: VideoListProps) => {
  const [selectedVideo, setSelectedVideo] = React.useState<VideoResultItem | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => setSelectedVideo(null);

  return (
    <div>
      <Grid container justify="center" spacing={5}>
        {props.videos.map((video) => (
          <Grid key={video.id} item>
            <VideoCard video={video} metricsFn={props.metricsFn} selectVideo={setSelectedVideo} />
          </Grid>
        ))}
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={Boolean(selectedVideo)}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle id="responsive-dialog-title" onClose={handleClose}>
          {selectedVideo?.snippet.title}
        </DialogTitle>
        <DialogContent>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${selectedVideo?.id}`} 
            width='100%'
            controls={true}
            config={{
              // YouTube embedded player parameters: https://developers.google.com/youtube/player_parameters#Parameters
              youtube: { 
                playerVars: { 
                  modestbranding: 0 // show YouTube logo in player
                }
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
