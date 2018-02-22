<template>
  <div class="cards">
    <div
      class="cards__card"
      :class="{ 'cards__card--active': votes.length && c === active }"
      v-for="c in cardValues"
      :key="c"
      @click="select(c)"
    >
      {{ c }}
    </div>
  </div>
</template>

<script>
import { cardValues } from '../config'
import { mapActions, mapState } from 'vuex'

export default {
  name: '',
  data () {
    return {
      active: null,
      cardValues
    }
  },
  computed: {
    ...mapState([
      'votes'
    ])
  },
  methods: {
    ...mapActions([
      'vote'
    ]),
    select (v) {
      this.active = v
      this.vote(v)
    }
  }
}
</script>

<style>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}

.cards__card {
  background-color: #fff;
  font-size: 42px;
  color: rgb(51, 51, 51);
  text-align: center;
  border: 1px solid rgb(213, 217, 222);
  border-radius: 3px;
  padding: 30px 0;
  cursor: pointer;
}


.cards__card--active {
  background-color: rgb(75, 154, 232);
  color: #fff;
  border: 0;
}
</style>
