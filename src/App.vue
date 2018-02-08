<template>
  <div class="app">
    <div class="app__start">
      <!-- <welcome></welcome> -->
      <!-- <room></room> -->
    </div>
    <div class="app__in">
      <board></board>
    </div>
  </div>
</template>

<script>
import Board from './components/Board'
import Room from './components/Room'
import Welcome from './components/Welcome'

import './assets/default.css'

export default {
  name: 'app',
  components: {
    Board,
    Room,
    Welcome
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
  justify-content: center;
  height: 100%;
}

.app__start {

}

.app__in {
  align-self: flex-start;
  margin-top: 25px;
}
</style>
