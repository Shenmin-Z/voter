const app = require('http').createServer(handler)
const io = require('socket.io')(app)
const fs = require('fs')
const path = require('path')

app.listen(443)

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
  // Needs to create room before it can be joined
  socket.on('pre-join', ({ room }, fn) => {
    if (!rooms.find(r => r.name === room)) {
      console.log('New room: ' + room)
      newRoom(room)
    }
    fn()
  })
})

const namespaces = []

function newRoom (name) {
  rooms.addRoom(name)
  if (namespaces.includes(name)) return
  namespaces.push(name)
  const rs = io.of('/' + name.split(' ').join('-'))
  const userMap = new Map()
  rs.on('connection', (socket) => {
    let user
    const room = rooms.find(r => r.name === name)
    const push = () => rs.emit('push', room)
    socket.on('join', ({ name, role }, fn) => {
      console.log(name + ' joined')
      fn()
      user = { name, role }
      room.users.push(user)
      push()
    })
    socket.on('disconnect', () => {
      console.log(user.name + ' has left')
      room.users = room.users.filter(u => u !== user)
      if (room.users.length > 0) {
        push()
      } else {
        const index = rooms.indexOf(room)
        rooms.splice(index, 1)
      }
    })
    socket.on('vote', (vote) => {
      if (userMap.has(user)) {
        userMap.get(user).vote = vote
      } else {
        const v = {
          name: user.name,
          vote
        }
        userMap.set(user, v)
        room.votes.push(v)
      }
      push()
    })
    socket.on('start', () => {
      room.finished = false
      room.votes = []
      userMap.clear()
      push()
    })
    socket.on('finish', () => {
      room.finished = true
      push()
    })
    socket.on('mode', (byRole) => {
      room.byRole = !room.byRole
      push()
    })
  })
}
