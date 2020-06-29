export interface VideoResult {
  kind: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: VideoResultItem[]
}

export interface VideoResultItem {
  kind: string,
  etag: string,
  id: string,
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    fullTitle: string,
    artists: string[],
    description: string,
    thumbnails: {[key: string]: {
      url: string,
      width: number,
      height: number
    }},
    channelTitle: string,
    tags: string[]
  },
  statistics: {
    viewCount: number,
    likeCount: number,
    dislikeCount: number,
    favoriteCount: number,
    commentCount: number
  }
}
