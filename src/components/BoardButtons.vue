<template>
  <div 
    class="buttons shadow"
    v-show="isHost"
  >
    <button
      class="buttons__btn"
      @click="startVote"
    >
      Restart
    </button>
    <button
      class="buttons__btn"
      :class="{ invalid: !votes.length }"
      v-if="!finished"
      @click="finish"
    >
      Finish
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { roles } from '../config'

export default {
  name: 'BoardButtons',
  computed: {
    ...mapState([
      'finished',
      'votes',
      'role'
    ]),
    isHost () {
      return Boolean(roles.find(r => r.name === this.role).host)
    }
  },
  methods: {
    ...mapActions([
      'startVote',
      'finishVote'
    ]),
    finish () {
      if (this.votes.length) {
        this.finishVote()
      }
    }
  }
}
</script>

<style>
.buttons {
  background-color: #fff;
  padding: 5px 15px;
  margin-bottom: 25px;
}

.buttons__btn {
  width: 100%;
  margin: 15px 0;
}
</style>
