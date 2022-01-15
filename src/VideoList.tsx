import * as React from 'react';
import { VideoResultItem } from './Types';
import { VideoCard } from './VideoCard';

interface VideoListProps {
  videos: VideoResultItem[],
  metricsFn: (video: VideoResultItem) => string
}

export const VideoList = ({videos, metricsFn}: VideoListProps) => (
  <div className="video-list">
    {videos.map((video) => (
      <VideoCard key={video.id} video={video} metricsFn={metricsFn} />
    ))}
  </div>
);
