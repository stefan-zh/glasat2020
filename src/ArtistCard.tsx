import * as React from 'react';
import { ArtistGrouping, VideoResultItem } from './Types';

/**
 * The Thumbnail Video Card inside the Artist Card
 */
const ThumbnailCard = ({video, name}: {video: VideoResultItem, name: string}) => (
  <a href={`https://www.youtube.com/watch?v=${video?.id}`} data-fancybox={name}>
    <div className="card" style={{width: "135px"}}>
      <img width="100%" src={video.snippet.thumbnails['medium'].url} />
        <div className="card-content">
          <span className="small-title">{video.snippet.title}</span>
        </div>
    </div>
  </a>
);

/**
 * The Artist Card
 */
interface ArtistCardProps {
  grouping: ArtistGrouping,
  metricsFn: (grouping: ArtistGrouping) => string
}

export const ArtistCard = ({grouping, metricsFn}: ArtistCardProps) => {
  const {name, videos} = {...grouping};
  const sortedVideos = videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);
  const metrics = metricsFn(grouping);

  return (
    <div className="card">
      <div className="card-content">
        <h5>{name}</h5>
        <span className="secondary">{metrics}</span>
      </div>
      <div className="card-content">
        <div className="flex gap-16">
          {sortedVideos.map((video) => (
            <ThumbnailCard key={video.id} video={video} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}
