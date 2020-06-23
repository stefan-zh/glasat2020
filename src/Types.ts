export interface SearchResult {
  kind: string,
  etag: string,
  nextPageToken: string,
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
