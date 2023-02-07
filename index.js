const tmi = require("tmi.js");
const { isPossiblyAddress } = require('./addresscheck');

// Define configuration options
const opts = {
  channels: ["kendinemuzisyen"]
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
    console.log('Detected Turkish address: ' + msg);
  } else {
    console.log('Irrelevant Chat: ' + msg);
  }

  // Try to detect if the message contains a Turkish address
  // For the purpose of this example, we will consider any message that contains the word "Address" as a Turkish address.
  if (msg.toLowerCase().includes("address")) {
    console.log(`Detected Turkish address: ${msg}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`Connected to ${addr}:${port}`);
}