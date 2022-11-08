## The Voice of Bulgaria on YouTube 2020

### Dev environment

In dev the app uses the [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) to serve the files locally.
The server can be started with `npm start`. The app is served on port `:3000`.

### Production

To build the app for production, run `npm run build`. The build appears in the `/dist` folder. All TypeScript is bundled
together. The custom CSS is minified and injected in a `<script>` tag in index.html.

The data for the app originates from the `videos-info.json` file. This file is included in the `/dist` folder and a URL to it
is emitted by Webpack. This way the file can be loaded dynamically into the app. More on this here: 
https://stackoverflow.com/q/70730055/9698467

The `videos-info.json` is refreshed by an AWS Lambda function every 6 hours. The lambda runs the script `/backend/lambda/update_data.py`, 
which fetches the latest statistics from YouTube for all videos listed in `videos-info.json` and merges them into the file.

The website is hosted on AWS in an S3 bucket. This is its URL: https://www.glasat2020.com.
