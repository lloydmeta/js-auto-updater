Javascript client auto updater
=====================

Intro
----

Got some kind of Single-page application (e.g. Backbone) that talks to your backend via an API and need a way to keep all your clients using the most up to date version? Use this library by adding `ClientAutoUpdater.setMonitor();` during JS initialisation, make sure your application sends a "Application-Version" header in all your API responses (e.g. `$ pwd -P` if you're using versioned folders for deployment) and whenever you update, your users' clients will be refreshed automatically.

Dependencies:

- JQuery
- localStorage support

Usage
-----

Include this library (and jQuery if you're not using it yet for some reason), then:

```javascript
$(ClientAutoUpdater.setMonitor());
```

Or really just `ClientAutoUpdater.setMonitor();` wherever you initialise (e.g. in baseRouter for Backbone JS apps)

License
------

Copyright (c) 2013 by Lloyd Chan

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, and to permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.