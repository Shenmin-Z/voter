<template>
  <div 
    class="app"
    :class="[connected ? 'app--start' : 'app--center']"
  >
    <div 
      class="app__header"
      v-if="connected"
    >
      <div class="inner">
        <div class="inner__room">{{ room }}</div>
        <div class="inner__self">
          {{ me }}
          <span 
            class="exit"
            @click="exit"
          >Exit</span>
        </div>
      </div>
    </div>
    <div 
      class="app__start"
      v-if="!connected"
    >
      <welcome v-if="!me"></welcome>
      <room v-else></room>
    </div>
    <div 
      class="app__in"
      v-else
    >
      <board></board>
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import Room from './components/Room'
import Welcome from './components/Welcome'
import { mapActions, mapMutations, mapState } from 'vuex'

import './assets/default.css'

export default {
  name: 'app',
  components: {
    Board,
    Room,
    Welcome
  },
  mounted () {
    this.preConnect()
    const [name, role, room] = ['name', 'role', 'room'].map(key => localStorage.getItem(key))
    if (name && role && room) {
      this.addSelf({ name, role })
      this.preJoin({ roomName: room })
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState([
      'connected',
      'room',
      'me'
    ])
  },
  methods: {
    ...mapActions([
      'preConnect',
      'preJoin'
    ]),
    ...mapMutations([
      'addSelf',
      'reset'
    ]),
    exit () {
      ['name', 'role', 'room'].map(key => localStorage.removeItem(key))
      this.reset()
      location.href = '/'
    }
  }
}
</script>

<style>
html,body { 
  height: 100%; 
  margin: 0px; 
  padding: 0px; 
}

html {
  background-color: #edf2f7;
  font-family: "Open Sans",sans-serif;
}

.app {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.app--center {
  justify-content: center;
}

.app--start {
  justify-content: flex-start;
}

.app__header {
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #edf2f7;
  box-sizing: border-box;
}

.inner {
  width: 600px;
  margin: 0 auto;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.inner__room {
  font-size: 30px;
  font-family: Helvetica, sans-serif;
}

.app__start {
  align-self: center;
}

.app__in {
  margin-top: 40px;
}

.exit {
  border: 1px solid #4b9ae8;
  border-radius: 5px;
  color: #4b9ae8;
  padding: 0 10px;
  cursor: pointer;
}
</style>
