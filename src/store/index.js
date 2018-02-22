import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

import { avg, count, total } from './helpers'
import { roles } from '../config'

const url = location.protocol + '//' + location.hostname
let cs // connection socket
let rs // room socket
const initialState = {
  room: '',
  rooms: [],
  me: '',
  role: '',
  connected: false,
  byRole: true, // Show voting result by voter' role or simply overall result
  finished: false,
  users: [],
  votes: []
}

export default new Vuex.Store({
  state: { ...initialState },
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
    reset (state) {
      Object.keys(initialState).forEach(key => { state[key] = initialState[key] })
    },
    setConnected (state, v) {
      state.connected = v
    },
    setCountMode (state, v) {
      state.byRole = v
    },
    setRoom (state, r) {
      state.room = r
    },
    updateFromServer (state, { byRole, finished, users, votes }) {
      state.byRole = byRole
      state.finished = finished
      state.users = users
      state.votes = votes
    }
  },
  actions: {
    preConnect ({ commit }) {
      cs = io(url)
      cs.on('rooms', (rooms) => commit('loadRooms', { rooms }))
      cs.on('disconnect', commit('reset'))
    },
    preJoin ({ commit, dispatch, state }, { roomName }) {
      if (state.connected) return
      cs.emit('pre-join', { room: roomName }, () => {
        rs = io(url + '/' + roomName)
        commit('setRoom', roomName)
        dispatch('join')
      })
    },
    join ({ commit, state }) {
      const { me: name, role } = state
      rs.emit('join', { name, role }, () => commit('setConnected', true))
      rs.on('push', (data) => {
        console.info('Received server push')
        commit('updateFromServer', data)
      })
    },
    vote (context, vote) {
      rs.emit('vote', vote)
    },
    startVote () {
      rs.emit('start')
    },
    finishVote () {
      rs.emit('finish')
    }
  }
})
