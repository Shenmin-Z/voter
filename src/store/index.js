import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { avg, count, total } from './helpers'
import { roles } from '../config'

export default new Vuex.Store({
  state: {
    room: 'room name',
    me: 'alice',
    byRole: false,
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
      { name: 'tom', vote: 3 }
    ]
  },
  getters: {
    byRole ({ byRole }) {
      return byRole
    },
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
  }
})
