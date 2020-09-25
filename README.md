# chat_socketio
An example of chatting web app using [Socket.IO](https://socket.io/).

## Installation
Pulling code, run `npm install`.\
To set it up, sequentially run:
1. `docker-compose up -d`
2. `docker exec -it nodejs_server /bin/sh`
3. `node index.js`

## Usage
Visit your [localhost](http://localhost/) and open new tabs to simulate multiple users.

## Note
This repo forks from [Socket.IO Chat Demo](https://github.com/socketio/socket.io/tree/master/examples/chat) and is added **private message** feature

## Reference
- [Socket.IO Chat Demo](https://github.com/socketio/socket.io/tree/master/examples/chat)