# Raspberry Pi Rover

As Seen on [Bot Thoughts Blog](http://www.bot-thoughts.com/2013/04/raspberry-pi-telepresence-rover.html)

## Prerequisites

This is tested on a Raspberry Pi Model B, rev 1 but surely it'll work on all RPis

Requires [webiopi](https://code.google.com/p/webiopi) (0.7.0 as of this writing).

Also requires [MJPG-streamer](http://sourceforge.net/projects/mjpg-streamer/?source=navbar)

## Hardware

Assumes a [DRV8835 motor controller](https://www.pololu.com/product/2135) with:
 * GPIO 11 - mode
 * GPIO 9  - A Phase
 * GPIO 10 - A Enable
 * GPIO 21 - B Phase
 * GPIO 22 - B Enable

## Installation

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
