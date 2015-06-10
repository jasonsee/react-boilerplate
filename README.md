#react-boilerplate

##Overview

The react-boilerplate is a collection of configuration files and organization
conventions designed to ease the process of bootstrapping new javascript heavy
web applications at WTA. It uses [gulp](http://gulpjs.com/) as a build tool
and [sass](http://sass-lang.com/) to generate CSS. Both tools require
some minimal setup.

##Installation

0. Clone this repo and point it at a new git repository for your project.

1. Install [node](http://nodejs.org/). If you're on OSX, there's a handy pkg
   installer available on the node homepage. This is the recommended method of
   installation.

3. Install the gulp CLI as a global node package. `npm install -g gulp`

4. Install the dependencies for your project. From the root of this repo, run
   `npm install`. This will read the packages.json file and install packages
   into `./node_modules`.

5. Configure your application in `config.js`:

    - `apiFallback`: This is the url of the API you are pointing to.
    - `portFallback`: This is the port you will access the web server on.
    it defaults to `http://localhost:9000`.

6. Start the development server with `gulp`.

##Goodies

Here are some common, custom patterns you can use with the boilerplate.

###Simple Proxy

No need to worry about Cross domain calls! To fetch outside data...

```
var ajax = require('ajax');

// For your server...
ajax.get('/api/session/login');

```
