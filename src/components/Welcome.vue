<template>
  <div class="welcome shadow">
    <input 
      type="text"
      class="welcome__input"
      placeholder="Enter your name"
      v-model="name"
    >
    <div
      v-for="r in roles"
      :key="r.name"
    >
      <input 
        type="radio"
        :value="r.name"
        class="welcome__radio"
        v-model="role"
      >
      {{ r.name }}
    </div>

    <button 
      class="welcome__btn"
      :class="{ invalid: !name && role }"
      @click="addMyself"
    >OK</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { roles } from '../config'

export default {
  name: 'Welcome',
  data () {
    return {
      name: '',
      role: 'Dev',
      roles
    }
  },
  methods: {
    ...mapMutations([
      'addSelf'
    ]),
    addMyself () {
      const { name, role } = this
      this.addSelf({ name, role })
      // Store in localStorage
      localStorage.setItem('name', name)
      localStorage.setItem('role', role)
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

