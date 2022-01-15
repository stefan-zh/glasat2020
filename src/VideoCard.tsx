import * as React from 'react';
import { VideoResultItem } from './Types';

interface VideoCardProps {
  video: VideoResultItem,
  metricsFn: (video: VideoResultItem) => string
}

export const VideoCard = (props: VideoCardProps) => {
  const video = props.video;
  const metrics = props.metricsFn(video);

  return (
    <a href={`https://www.youtube.com/watch?v=${video?.id}`} data-fancybox={video?.id}>
      <div className="card" style={{width: "345px"}}>
        <img src={video.snippet.thumbnails['medium'].url} />
        <div className="card-content">
          <h5 style={{marginBottom: "0.35em"}}>{video.snippet.title}</h5>
          <span className="secondary">{metrics}</span>
        </div>
      </div>
    </a>
  );
}
