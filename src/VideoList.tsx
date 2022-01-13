import * as React from 'react';
import { VideoResultItem } from './Types';
import { VideoCard } from './VideoCard';

interface VideoListProps {
  videos: VideoResultItem[],
  metricsFn: (video: VideoResultItem) => string,
  selectVideo: (video: VideoResultItem) => void
}

export const VideoList = ({videos, metricsFn, selectVideo}: VideoListProps) => (
  <div className="video-list">
    {videos.map((video) => (
      <VideoCard key={video.id} video={video} metricsFn={metricsFn} selectVideo={selectVideo} />
    ))}
  </div>
);
