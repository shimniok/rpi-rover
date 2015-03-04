# Raspberry Pi Rover

As Seen on [Bot Thoughts Blog](http://www.bot-thoughts.com/2013/04/raspberry-pi-telepresence-rover.html)

Requires [webiopi](https://code.google.com/p/webiopi) (0.7.0 as of this writing).

Also requires [MJPG-streamer](http://sourceforge.net/projects/mjpg-streamer/?source=navbar)

Clone the repo into a webiopi subdirectory, ```/usr/share/webiopi/rover```

Then you can access with ```http://*{yourpi}*:8000/rover/```

You can also proxy through Apache for a cleaner URL (http://*{yourpi}*/rover). In your site file, add:

```
ProxyRequests on
ProxyPass /rover/ http://localhost:8000/rover/
ProxyPassReverse /rover/ http://localhost:8000/rover/
ProxyPass /GPIO/ http://localhost:8000/GPIO/
ProxyPassReverse /GPIO/ http://localhost:8000/GPIO/
```

That's about it.
