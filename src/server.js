const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')
const path = require('path')

app.listen(80)

// Server static files
function handler (req, res) {
  if (['/', '/dist/build.js'].indexOf(req.url) === -1) {
    res.writeHead(403)
    return res.end('Resource forbidden')
  }

  fs.readFile(path.join(__dirname, '../', req.url === '/' ? 'index.html' : req.url),
  (err, data) => {
    if (err) {
      res.writeHead(500)
      return res.end('Error loading resource.')
    }

    res.writeHead(200)
    res.end(data)
  })
}

// Socket.io
const rooms = []
rooms.addRoom = (name) => rooms.push({
  name,
  byRole: true,
  finished: false,
  users: [],
  votes: []
})

io.on('connection', (socket) => {
  socket.emit('rooms', rooms.map(r => r.name))
  socket.on('pre-join', ({ room }) => {
    if (!rooms.find(r => r.name === room)) {
      newRoom(room)
    }
  })
})

function newRoom (name) {
  io.of('/' + name)
    .on('connection', (socket) => {
      let userName = ''
      const room = rooms.find(r => r.name === name)
      socket.on('join', ({ name, role }) => {
        userName = name
        socket.emit('joined', { name, role })
        room.users.push({ name, role })
      })
      socket.on('disconnect', (socket) => {
        socket.broadcast.emit('disconnected', { name: userName })
      })
    })
}
