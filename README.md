# Afet Yardim Twitch Bot

### Requirements
node > 10

### Install Dependencies
`npm install` or `yarn install`

### Run Application
`npm start` or `node index.js`

### General Info

Change config.js to your needs or use environment variables

```
JSON DATA FORMAT
{
    channel: 'twitch',
    raw_text, (string)
    epoch, (unix timestamp, seconds since epoch, number)
    extra_parameters, (string)
}
```

### Environment Variable Configuration

| ENVIRONMENT VARIABLE NAME | TYPE | DEFAULT VALUE | PURPOSE |
|---|---|---|---|
| BACKEND_GO_API_URL | string | "https://dweet.io/dweet/for/twitch-deprem-adres-test" | Configure where to send collected data. |
| BACKEND_GO_API_KEY | string |  | If given, it will send this variable as a header with name "x-api-key" |
| TWITCH_BOT_BATCH_SIZE | integer | 5 | Number of twitch messages to group within a single request. (If this number is 5, it will send 1 request with 5 messages to BACKEND_GO_API_URL at a time) |
| TWITCH_BOT_FILTER_KEYWORD_MATCH | boolean | true | Whether to filter with keyword match BEFORE SENDING to BACKEND_GO_API_URL. |
| TWITCH_BOT_FILTER_CITY_MATCH | boolean | true | Whether to filter with city match BEFORE SENDING to BACKEND_GO_API_URL. |
| TWITCH_BOT_LOG_CHAT | boolean | true | Whether to log all twitch chat messages to stdout in realtime. |
| TWITCH_BOT_CHANNELS | array of string | kendinemuzisyen,jahrein,levo,haskologlu,wtcn,surhaybakis,hasanabi,elraenn,haruncan,hype,hazretiyasuo,toqtir,htalks,tugaygok,tolunayoren,evrimagaci,baran | Configure which twitch channels to follow. |

Important Note, make sure to keep channel array to a maximum of 50 channels due to a potential IRC connection limit.

Note that we are aware that os environment variables are strings, but we are parsing them when read.
So values of "false", "fALse", "0", are converted to false. "true", "tRue", "1", are converted to true.
Integer values examples "5", "7", "1" are converted to 5, 7, 1. if you send float such as "10.0" it will not accept and use default value instead.
Likewise for channels array. '["channelA", "channelB", "channelC"]' or 'channelA;channelB;channelC' or 'channelA    channelB-channelC' are all converted to same array.

TODO features
* ~~better filtering~~
* better documentation

