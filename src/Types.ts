export interface SearchResult {
  kind: string,
  etag: string,
  nextPageToken: string | undefined,
  prevPageToken: string | undefined,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: SearchResultItem[]
}

export interface SearchResultItem {
  kind: string,
  etag: string,
  id: {
    kind: string,
    videoId: string,
    channelId: string,
    playlistId: string
  },
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {[key: string]: {
      url: string,
      width: number,
      height: number
    }},
    channelTitle: string,
    liveBroadcastContent: string
  }
}

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
    description: string,
    thumbnails: {[key: string]: {
      url: string,
      width: number,
      height: number
    }},
    channelTitle: string,
    tags: string[],
    categoryId: string,
    liveBroadcastContent: string,
    localized: {
      title: string,
      description: string
    }
  },
  statistics: {
    viewCount: number,
    likeCount: number,
    dislikeCount: number,
    favoriteCount: number,
    commentCount: number
  }
}
