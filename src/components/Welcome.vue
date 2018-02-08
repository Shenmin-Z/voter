<template>
  <div class="welcome shadow">
    <input 
      type="text"
      class="welcome__input"
      placeholder="Enter your name"
    >
    <div
      v-for="r in roles"
      :key="r.name"
    >
      <input 
        type="radio"
        class="welcome__radio"
        v-model="role"
      >
      {{ r.name }}
    </div>

    <button class="welcome__btn">OK</button>
  </div>
</template>

<script>
import { roles } from '../config'

export default {
  name: 'Welcome',
  data () {
    return {
      role: 'Dev',
      roles
    }
  }
}
</script>

<style>
.welcome {
  background-color: white;
  width: 300px;
}

.welcome__input {
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.welcome__radio {
  padding-right: 10px;
}

.welcome__btn {
  width: 100%;
  margin-top: 15px;
}
</style>

