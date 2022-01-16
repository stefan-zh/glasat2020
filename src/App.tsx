import * as React from 'react';
import { VideoResultItem, ArtistGrouping, VideoStatistics, VideoResult } from './Types';
import { Header } from './Header';
import { Footer } from './Footer';
import { VideoList } from './VideoList';
import { ArtistCard } from './ArtistCard';
const videosFile = require('./videos-info.json');

// selectors
const viewCountFn = <T extends {statistics: VideoStatistics}>(item: T) => {
  return `${item.statistics.viewCount.toLocaleString()} гледания`;
}
const likeCountFn = <T extends {statistics: VideoStatistics}>(item: T) => {
  return `${item.statistics.likeCount.toLocaleString()} харесвания`;
}
const dateFn = (item: VideoResultItem) => {
  const date = new Date(item.snippet.publishedAt).toLocaleString("bg-BG", {dateStyle: "long"});
  // includes 3 characters at the back of year: "14 юни 2020 г."
  return date.slice(0, -3);
}

export const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [sortOrder, setSortOrder] = React.useState<number>(1);
  // native data objects
  const [videos, setVideos] = React.useState<VideoResultItem[]>([]);
  const [byArtist, setByArtist] = React.useState<{[name: string]: ArtistGrouping}>({});
  const [lastUpdatedAt, setLastUpdatedAt] = React.useState<string | undefined>();
  // produced data objects
  const [body, setBody] = React.useState<JSX.Element | undefined>();

  /**
   * Fetches the video data from the backend and sets the data objects 
   */
  React.useEffect(() => {
    // fetch videos from backend
    const fetchVideos = async () => {
      const resp = await fetch(videosFile);
      const data = await resp.json() as VideoResult;
      const videos: VideoResultItem[] = data.items;

      // set the videos from the backend sorted by viewCount
      setVideos([...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]);

      // set the videos grouped by artist
      const byArtist = videos.reduce((acc: {[name: string]: ArtistGrouping}, video: VideoResultItem) => {
        for (const name of video.snippet.artists) {
          const videos = (name in acc) ? [...acc[name].videos, video] : [video];
          const viewCount = (acc[name]?.statistics.viewCount || 0) + video.statistics.viewCount;
          const likeCount = (acc[name]?.statistics.likeCount || 0) + video.statistics.likeCount;
          acc[name] = {
            name: name,
            videos: videos,
            statistics: {
              viewCount: viewCount,
              likeCount: likeCount,
              dislikeCount: 0,
              favoriteCount: 0,
              commentCount: 0
            }
          }
        }
        return acc;
      }, {});
      setByArtist(byArtist);

      // set lastUpdated, the body and clear loading
      setLastUpdatedAt(data.lastUpdatedAt);
      setBody(() => (<VideoList videos={videos} metricsFn={viewCountFn} />));
      setIsLoading(false);
    }
    
    fetchVideos();
  }, []);

  /**
   * Changes the UI based on the selected sort order
   */
  React.useEffect(() => {
    if (videos.length < 1) {
      return
    }
    switch (sortOrder) {
      case 1: {
        const sortedVideos = [...videos.sort((a, b) => b.statistics.viewCount - a.statistics.viewCount)]
        setBody(() => (<VideoList videos={sortedVideos} metricsFn={viewCountFn} />));
        break;
      }
      case 2: {
        const sortedVideos = [...videos.sort((a, b) => b.statistics.likeCount - a.statistics.likeCount)];
        setBody(() => (<VideoList videos={sortedVideos} metricsFn={likeCountFn} />));
        break;
      }
      case 3: {
        const sortedGroups = Object.values(byArtist).sort((a, b) => b.statistics.viewCount - a.statistics.viewCount);
        setBody(() => (
          <div className="flex gap-16">
            {sortedGroups.map((grouping) => (
              <ArtistCard key={grouping.name} grouping={grouping} metricsFn={viewCountFn} />
            ))}
          </div>
        ));
        break;
      }
      case 4: {
        const sortedVideos = [...videos.sort((a, b) => {
          const first = new Date(a.snippet.publishedAt).getTime();
          const second  = new Date(b.snippet.publishedAt).getTime();
          return first < second ? 1 : -1;
        })];
        setBody(() => (<VideoList videos={sortedVideos} metricsFn={dateFn} />));
        break;
      }
    }
  }, [sortOrder, videos]);

  return (
    <div id="container">
      <Header sortFn={setSortOrder} lastUpdatedAt={lastUpdatedAt} />
      {isLoading ? <div className="loader" /> : body}
      <Footer />
    </div>
  );
}
