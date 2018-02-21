<template>
  <div class="app">
    <div 
      class="app__header"
      v-if="room && me"
    >
      <div class="inner">
        <div class="inner__room">{{ room }}</div>
        <div class="inner__self">{{ me }}</div>
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
      'preConnect'
    ]),
    ...mapMutations([
    ])
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
  align-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;
}

.app__header {
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #edf2f7;
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

.inner__self {

}

.app__start {

}

.app__in {
  align-self: flex-start;
  margin-top: 40px;
}
</style>
