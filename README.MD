

# Twitch chat on an Apple Watch


So because the cookie accept prompt can't be dismissed on an Apple Watch, I have created this proxy for Twitch Chat that doesn't have any cookie stuff.


# Building

Clone the repo, and just run

```nodejs
npm install
```
This will pull down expressJS to run the webserver

# Running
To get chat working, in `settings.json` replace the `<channel_name>` with the channel name you want to track the chat of.

If you want to see more messages, you can update `backlog_count` to be more than the default 10.


```json
{
    "port": 8080,
    "channel": "<channel_name>",
    "backlog_count": 10
}
```


Run with the following command

```nodejs
npm start
```

This will start the web server listening on port 8080 by default, in order to view on an Apple Watch, the computer IP address and port will need a manual DNS entry like `chat.local` and then navigate to that in a browser on the watch and chat should start appearing. Chat can be viewed in any browser window this way.