// CommonJS Import Statements
const express = require('express'),
      http = require('http'),
      path = require("path"),
      bodyParser = require("body-parser"),
      { Server } = require("socket.io");


// App Configuration and Server Setup
const app = express();;
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));
const PORT   = 3000;
const server = http.createServer(app), io = new Server(server);


// IO and Socket Events
io.on('connection', (socket) => {
    console.log(`[${new Date().toLocaleString()}] connection to remote client established`);
    socket.on('form-submit', (o) => {
        console.log(`[${new Date().toLocaleString()}] retrieved form-submit data from remote client`);
        io.emit('form-submit', o);
        console.log(`[${new Date().toLocaleString()}] emitting form-submit data to all clients`);
    });
    socket.on('disconnect', () => {
        console.log(`[${new Date().toLocaleString()}] connection to remote client reset`)
    });
});


// app.get Events
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/templates/index.html"));
});


// Listen on PORT
server.listen(PORT, () => {
    console.log(`[${new Date().toLocaleString()}] PORT *:${PORT} is open.`);
});
