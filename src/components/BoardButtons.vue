<template>
  <div class="buttons shadow">
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

export default {
  name: 'Buttons',
  computed: {
    ...mapState([
      'finished',
      'votes'
    ])
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
}

.buttons__btn {
  width: 100%;
  margin: 15px 0;
}
</style>
