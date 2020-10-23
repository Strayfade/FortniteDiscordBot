# FortniteDiscordBot
Discord bot to post fortnite news!

### Usage:
1. Run **`install.bat`** upon first launch to install required packages, and Python.
2. Open **`config.json`** and change variables depending on your bot usage. Discord Channel IDs can be retrieved by right-clicking on any channel and pressing **Copy ID**.
3. Get the Discord Token from any active Discord Developer Application and add the bot to your server.

4. Finally, run **`run.bat`** and the program will start. To send news in the given channels, type **SEND** in any channel. This will trigger the news output in all channels.

### config.json Structure:
```
{
  "brNewsChannel":                  "Channel ID for BR News",
  "brShopChannel":                  "Channel ID for BR Shop",
  "brLeaksChannel":                 "Channel ID for BR Leaks",
  "brProgressChannel":              "Channel ID for BR Season Progress",
  "stwNewsChannel":                 "Channel ID for STW News",
  "creativeNewsChannel":            "Channel ID for Creative News",
  "creativeFeaturedIslandsChannel": "Channel ID for Featured Islands",

  "discordToken":                   "Discord Login Token goes Here"
}
```
