<template>
  <div
   class="board"
  >
    <div
      class="board__left"
    >
      <board-result v-if="finished"></board-result>
      <board-cards v-else></board-cards>
    </div>
    <div
      class="board__right"
    >
      <board-buttons></board-buttons>
      <board-users></board-users>
    </div>
  </div>
</template>

<script>
import BoardButtons from './BoardButtons'
import BoardCards from './BoardCards'
import BoardResult from './BoardResult'
import BoardUsers from './BoardUsers'

import { mapState } from 'vuex'

export default {
  name: '',
  components: {
    BoardButtons,
    BoardCards,
    BoardResult,
    BoardUsers
  },
  computed: {
    ...mapState([
      'finished'
    ])
  }
}
</script>

<style>
.board {
  width: 650px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.board__left {
  width: 400px;
}

.board__right {
  width: 200px;
}
</style>
