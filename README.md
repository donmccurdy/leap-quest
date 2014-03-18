Leap Quest [![stillmaintained](http://stillmaintained.com/donmccurdy/leap-quest.png)](http://stillmaintained.com/donmccurdy/leap-quest)
==========

Multiplayer micro-RPG, built as a proof-of-concept in-browser JavaScript application.

Leap Motion support is planned, but will be optional.

## Technology

1. WebGL (via [three.js](http://threejs.org/))
2. [Node.js](http://nodejs.org/) (game server)
3. [Leap.js](http://js.leapmotion.com/)
4. WebSockets (HTML5 + [ws](http://einaros.github.io/ws/))

## Local Development

There are two ways to get this project up and running.

1. [Heroku Toolbelt](https://toolbelt.heroku.com/)

```bash
git clone git@github.com:donmccurdy/leap-quest.git
cd leap-quest
foreman start
```

2. Run directly

```bash
git clone git@github.com:donmccurdy/leap-quest.git
cd leap-quest

# Configuration. You can also add these to ~/.bashrc, if you prefer.
export QUEST_ENV="production" QUEST_HOST="leap-quest.herokuapp.com"
export QUEST_PORT=80 QUEST_PROTOCOL="ws://" QUEST_VERSION="0.1"

#Start
node index.js
```
