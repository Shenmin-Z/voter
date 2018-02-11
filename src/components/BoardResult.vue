<template>
  <div
    class="shadow board-result"
  >
    <div
     class="result"
     v-for="r in result"
     :key="r.name"
    >
      <div
        class="result--chart"
      >
        <pie
          :data="r.count"
        ></pie>
      </div>
      <div
        class="result--legend"
      >
        <div
          v-for="(i, index) in r.count"
          :key="i.value"
        >
          <div>
            <div
              class="result--legend--color-box"
              :style="{ 'background-color': pieColors[index] }"
            ></div>
            <div>{{ i.value }}</div>
          </div>
          <div>{{ percentageString(i.count / r.total) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from './Pie'
import { mapGetters } from 'vuex'

import { pieColors } from '../config'

export default {
  name: 'BoardResult',
  components: {
    Pie
  },
  data () {
    return {
      pieColors
    }
  },
  computed: {
    ...mapGetters([
      'avg',
      'byRole',
      'count',
      'total',
      'votesByRole'
    ]),
    result () {
      if (this.byRole) {
        return this.votesByRole
      } else {
        return [{
          name: 'Overall',
          avg: this.avg,
          count: this.count,
          total: this.total
        }]
      }
    }
  },
  methods: {
    percentageString (p) {
      return Math.round(p * 100) + '%'
    }
  }
}
</script>

<style>
.board-result {
  background-color: #fff;
}

.result {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.result--legend--color-box {
  width: 20px;
  height: 20px;
  float: left;
}

</style>
