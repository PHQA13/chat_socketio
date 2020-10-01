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
This repo forks from [Socket.IO Chat Demo](https://github.com/socketio/socket.io/tree/master/examples/chat) and is added following features:
- Sending private messages
- Sending files *(**The flow in code:** client-side emits binary data (as [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects), then server-side sends binary data (as [Buffer](https://nodejs.org/api/buffer.html) objects) back to client-side **without saving file**; **References [How to save files from binary data on the client-side](https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link)**)*

## Reference
- [Socket.IO Chat Demo](https://github.com/socketio/socket.io/tree/master/examples/chat)
- [How to save files from binary data on the client-side](https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link)