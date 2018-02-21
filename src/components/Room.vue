<template>
  <div class="room shadow">
    <div v-if="rooms">
      <div class="room__title">Existing Rooms</div>
      <div
        class="room__card"
        v-for="r in rooms"
        :key="r"
        @click="name = r"
      >
        {{ r }}
      </div>
    </div>
    <input 
      type="text"
      placeholder="Enter new or existing room name"
      class="room__input"
      v-model="name"
    >
    <button
      class="room__btn"
      :class="{ invalid: !name }"
      @click="enterRoom"
    >Enter</button>
  </div> 
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Room',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState([
      'rooms'
    ])
  },
  methods: {
    ...mapActions([
      'preJoin'
    ]),
    enterRoom () {
      if (this.name) {
        this.preJoin({ roomName: this.name })
      }
    }
  }
}
</script>

<style>
.room {
  background-color: white;
  width: 300px;
}

.room__title {
  margin: 10px 0;
}

.room__card {
  line-height: 20px;
  background-color: #2F2E2D;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  display: inline-block;
  padding: 5px 10px;
  margin: 0 15px 10px 0;
  cursor: pointer;
}

.room__input {
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.room__btn {
  width: 100%;
}
</style>
