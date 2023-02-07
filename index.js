const tmi = require("tmi.js");
const { isPossiblyAddress } = require('./addresscheck');
const { config } = require('./config');
const { notifyAddress } = require('./notify');

// Define configuration options
const opts = {
  channels: config.CHANNELS,
};

// Create a client with our options
const client = new tmi.Client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  }
  
  if (isPossiblyAddress(msg)) {
    const data = { 
      author: context.username, 
      message: msg, 
      channel: target.startsWith('#') ? target.slice(1) : target, // remove # from channel name 
      timestamp: parseInt(context['tmi-sent-ts'].slice(0,-3))  // convert string milliseconds to number seconds 
    };
    if (config.LOG_CHAT) {
      console.log('Detected Turkish address: ' + msg);
    }
    notifyAddress(data)
      .catch(e => console.error(e));
  } else {
    if (config.LOG_CHAT) {
      console.log('Irrelevant Chat: ' + msg);
    }
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`Connected to ${addr}:${port}`);
}