<template>
  <div
   class="board"
  >
    <div
      class="board__left"
    >
      <board-cards></board-cards>
    </div>
    <div
      class="board__right"
    >
      <board-buttons></board-buttons>
    </div>
  </div>
</template>

<script>
import BoardButtons from './BoardButtons'
import BoardCards from './BoardCards'
import BoardResult from './BoardResult'
import BoardUsers from './BoardUsers'

export default {
  name: '',
  components: {
    BoardButtons,
    BoardCards,
    BoardResult,
    BoardUsers
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
