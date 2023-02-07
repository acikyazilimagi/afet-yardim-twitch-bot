# author: @morph3

from twitchio.ext import commands
import sys
from utils import is_address

# https://www.learndatasci.com/tutorials/how-stream-text-data-twitch-sockets-python/

# load env
ENV = {}
f = open(".env","r").read()
for line in f.splitlines():
    k, v = line.split("=")
    ENV[k] = v
    
msg_counter = 0

streamer_list = []
with open("streamers.txt", "r") as f:
    streamer_list = f.read().splitlines()
print(f"[+] streamer list: {streamer_list}")

class Bot(commands.Bot):

    def __init__(self):
        # Initialise our Bot with our access token, prefix and a list of channels to join on boot...
        super().__init__(token=ENV["ACCESS_TOKEN"], prefix='?', initial_channels=[sys.argv[1]])

    async def event_ready(self):
        # We are logged in and ready to chat and use commands...
        print(f'Logged in as | {self.nick}')
        print(f'User id is | {self.user_id}')

    @commands.command()
    async def hello(self, ctx: commands.Context):
        # Send a hello back!
        await ctx.send(f'Hello {ctx.author.name}!')

    async def event_message(self, message):
    # Messages with echo set to True are messages sent by the bot...
    # For now we just want to ignore them...

        msg = {}
        #['author', 'channel', 'content', 'echo', 'first', 'id', 'raw_data', 'tags', 'timestamp']
        msg["author"] = message.author.name
        msg["channel"] = message.channel.name
        msg["content"] = message.content
        msg["timestamp"] = message.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        #print(dir(message.timestamp))
        """
        {
            'author': 'this_isthe_way', 
            'channel': 'levo', 
            'content': 'artçı oldu levo duyur istiyorsan niğde den hissettik', 
            'echo': False, 
            'first': False, 
            'id': '4628c526-19aa-496d-b671-e45f4cea2418', 
            'raw_data': '@badge-info=;badges=premium/1;client-nonce=ba5435cec4a3679461578e04899e83c0;color=#D2691E;display-name=this_isthe_way;emotes=;first-msg=0;flags=;id=4628c526-19aa-496d-b671-e45f4cea2418;mod=0;returning-chatter=0;room-id=71978007;subscriber=0;tmi-sent-ts=1675785441965;turbo=0;user-id=92102986;user-type= :this_isthe_way!this_isthe_way@this_isthe_way.tmi.twitch.tv PRIVMSG #levo :artçı oldu levo duyur istiyorsan niğde den hissettik', 
            'tags': {'@badge-info': '', 'badges': 'premium/1', 'client-nonce': 'ba5435cec4a3679461578e04899e83c0', 'color': '#D2691E', 'display-name': 'this_isthe_way', 'emotes': '', 'first-msg': '0', 'flags': '', 'id': '4628c526-19aa-496d-b671-e45f4cea2418', 'mod': '0', 'returning-chatter': '0', 'room-id': '71978007', 'subscriber': '0', 'tmi-sent-ts': '1675785441965', 'turbo': '0', 'user-id': '92102986', 'user-type': ''}, 
            'timestamp': datetime.datetime(2023, 2, 7, 15, 57, 21, 965000)
        }
        """
        print(msg)

bot = Bot()
bot.run()