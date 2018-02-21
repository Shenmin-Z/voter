import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

import { avg, count, total } from './helpers'
import { roles } from '../config'

const url = location.protocol + '//' + location.hostname
let cs // connection socket
let rs // room socket

export default new Vuex.Store({
  state: {
    room: '',
    rooms: [],
    me: '',
    role: '',
    connected: false,
    byRole: true, // Show voting result by voter' role or simply overall result
    finished: false,
    users: [
      {
        name: 'alice',
        role: 'Dev'
      },
      {
        name: 'bob',
        role: 'QA'
      },
      {
        name: 'ding',
        role: 'Dev'
      },
      {
        name: 'lala',
        role: 'Dev'
      },
      {
        name: 'jim',
        role: 'Dev'
      },
      {
        name: 'tom',
        role: 'QA'
      }
    ],
    votes: [
      { name: 'alice', vote: 3 },
      { name: 'bob', vote: 3 },
      { name: 'ding', vote: 3 },
      { name: 'lala', vote: 5 },
      { name: 'jim', vote: 2 },
    ]
  },
  getters: {
    // Voting result
    avg ({ votes }) {
      return avg(votes)
    },
    count ({ votes }) {
      return count(votes)
    },
    votesByRole ({ users, votes }) {
      return roles.filter(r => r.vote !== false)
        .map(r => r.name)
        .map(n => {
          const names = users.filter(u => u.role === n).map(u => u.name)
          return {
            role: n,
            votes: votes.filter(v => names.indexOf(v.name) !== -1)
          }
        })
        .map(i => ({
          name: i.role,
          avg: avg(i.votes),
          count: count(i.votes),
          total: total(i.votes)
        }))
    },
    total ({ votes }) {
      return total(votes)
    }
  },
  mutations: {
    loadRooms (state, { rooms }) {
      rooms.forEach(r => state.rooms.push(r))
    },
    addSelf (state, { name, role }) {
      state.me = name
      state.role = role
    },
    setConnected (state, v) {
      state.connected = v
    },
    setCountMode (state, v) {
      state.byRole = v
    }
  },
  actions: {
    preConnect ({ commit }) {
      cs = io(url)
      cs.on('rooms', (rooms) => commit('loadRooms', { rooms }))
    },
    preJoin ({ dispatch, state }, { roomName }) {
      if (state.connected) return
      cs.emit('pre-join', { room: roomName })
      cs.on('ack', () => {
        rs = io(url + '/' + roomName)
        dispatch('join')
      })
    },
    join ({ commit, state }) {
      const { me: name, role } = state
      rs.emit('join', { name, role })
      rs.on('ack', () => commit('setConnected', true))

      rs.on('joined', ({ name, role }) => console.log(name))
    }
  }
})
