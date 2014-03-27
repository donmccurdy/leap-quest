Leap Quest [![stillmaintained](http://stillmaintained.com/donmccurdy/leap-quest.png)](http://stillmaintained.com/donmccurdy/leap-quest)
==========

Multiplayer Micro-RPG built on:

* WebGL + [THREE.js](http://threejs.org/)
* [Node.js](http://nodejs.org/)
* WebSockets (HTML5 + [ws](http://einaros.github.io/ws/))
* [Leap](http://js.leapmotion.com/) JavaScript API (*optional*). 

A proof-of-concept, browser-based game.

## Local Development

There are two ways to get this project up and running.

(1) [Heroku Toolbelt](https://toolbelt.heroku.com/)

```bash
git clone git@github.com:donmccurdy/leap-quest.git
cd leap-quest
foreman start
```
(2) Run directly

```bash
git clone git@github.com:donmccurdy/leap-quest.git
cd leap-quest

# Configuration. You can also add these to ~/.bashrc, if you prefer.
export QUEST_ENV="development" QUEST_HOST="localhost"
export QUEST_PORT=5000 QUEST_PROTOCOL="ws://" QUEST_VERSION="0.1"

#Start
node index.js
```

In either case, the game will run at `http://localhost:5000`.
