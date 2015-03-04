Raspberry Pi Rover

As Seen on Bot Thoughts Blog: 
http://www.bot-thoughts.com/2013/04/raspberry-pi-telepresence-rover.html

Requires webiopi (0.7.0 as of this writing)

Stick these files in a webiopi subdirectory (/usr/share/webiopi/rover)

Then you can access with http://{yourpi}:8000/rover/

Or you can also proxy through Apache. In your site file, add:

```
ProxyRequests on
ProxyPass /rover/ http://localhost:8000/rover/
ProxyPassReverse /rover/ http://localhost:8000/rover/
ProxyPass /GPIO/ http://localhost:8000/GPIO/
ProxyPassReverse /GPIO/ http://localhost:8000/GPIO/
```

