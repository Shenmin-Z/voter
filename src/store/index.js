import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: 'room name',
    users: [
      {
        name: 'alice',
        role: 'dev'
      },
      {
        name: 'bob',
        role: 'qa'
      },
      {
        name: 'ding',
        role: 'dev'
      },
      {
        name: 'lala',
        role: 'dev'
      },
      {
        name: 'jim',
        role: 'dev'
      },
      {
        name: 'tom',
        role: 'qa'
      }
    ],
    votes: [
      { name: 'alice', vote: 3 },
      { name: 'bob', vote: 3 },
      { name: 'ding', vote: 4 },
      { name: 'lala', vote: 5 },
      { name: 'jim', vote: 2 },
      { name: 'tom', vote: 3 }
    ]
  },
  getters: {
    avg ({ votes }) {
      return votes.map(v => v.vote)
        .filter(Number.isInteger)
        .reduce((acc, i) => acc + i) / votes.length
    },
    count ({ votes }) {
      return votes.map(v => v.vote)
        .filter(Number.isInteger)
        .reduce((acc, i) => {
          acc[i] ? acc[i]++ : acc[i] = 1
          return acc
        }, {})
    }
  },
  mutations: {

  }
})
