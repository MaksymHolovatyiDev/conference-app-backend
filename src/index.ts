const cors = require("cors");
const express = require("express");
const http = require('http');
const path = require('path');

const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || "8000";


const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/peer',
    ssl: {}
});

app.use(cors());

app.use(peerServer);

app.use(express.static(path.join(__dirname)));


app.get("/", (_: any, response: { sendFile: (arg0: string) => void; }) => {
    response.sendFile(__dirname + "/index.html");
});

server.listen(port);
console.log('Listening on: ' + port);