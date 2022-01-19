import json
import boto3
import urllib3
import datetime

s3 = boto3.client("s3")
response = s3.get_object(Bucket='www.glasat2020.com', Key='videos-info.json')
content = response['Body'].read().decode('utf-8')
videos = json.loads(content)

http = urllib3.PoolManager()
API_KEY = ""

def fetch_video_statistics(videos):
    """Fetch statistics for all videos"""
    all_ids = [v["id"] for v in videos["items"]]
    stats = {}
    
    # batch in 50s
    for i in range(0, len(all_ids), 50):
        ids = all_ids[i:i + 50]
        
        # fetch a batch of 50 videos
        stats_resp = http.request(
            'GET', 
            'https://www.googleapis.com/youtube/v3/videos',
            headers={
                "Referer": "www.glasat2020.com",
                "Content-Type": "application/json"
            },
            fields={
                "key": API_KEY,
                "part": "statistics",
                "id": ",".join(ids),
                "fields": "items(id,statistics)",
                "maxResults": len(ids)
            }
        )
        stats_json = json.loads(stats_resp.data)
        
        # extract the video statistics in the proper format
        for item in stats_json["items"]:
            stat = item["statistics"]
            stats[item["id"]] = {
                "viewCount": int(stat["viewCount"]) if stat["viewCount"].isdigit() else 0,
                "likeCount": int(stat["likeCount"]) if stat["likeCount"].isdigit() else 0,
                "favoriteCount": int(stat["favoriteCount"]) if stat["favoriteCount"].isdigit() else 0,
                "commentCount": int(stat["commentCount"]) if stat["commentCount"].isdigit() else 0
            }
            
    return stats

def lambda_handler(event, context):
    """Execute data fetch and update video data"""
    stats = fetch_video_statistics(videos)
    for video in videos["items"]:
        if video["id"] in stats:
            video["statistics"] = stats[video["id"]]
    videos["lastUpdatedAt"] = datetime.datetime.now().isoformat()
    # write data to S3 bucket
    s3.put_object(Body=json.dumps(videos), Bucket='www.glasat2020.com', Key='videos-info.json')
