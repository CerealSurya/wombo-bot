


require('dotenv').config();
const { google } = require('googleapis');
google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    q: 'wasted',
    maxResults: 1
}).then((response) => {
    const { data } = response;
    console.log(`Title: ${data.items[0].snippet.title}\nUrl: https://www.youtube.com/watch?v=${data.items[0].id.videoId}`)
})