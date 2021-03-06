<template>
  <div
    class="board-result"
  >
    <div 
      class="tab"
    >
      <div 
        class="tab__item"
        :class="tabClass(false)"  
        @click="setMode(false)"
      >Overall</div>
      <div 
        class="tab__item"
        :class="tabClass(true)"
        @click="setMode(true)"
      >By Role</div>
    </div>
    <div
      class="result"
      v-for="r in result"
      :key="r.name"
      v-show="r.total"
    >
      <div class="result__title">{{ r.name }}</div>
      <div
        class="result__chart"
      >
        <pie
          :data="r.count"
        ></pie>
      </div>
      <div
        class="result__legend"
      >
        <div>
          <div
            class="result__legend__each"
            v-for="(i, index) in r.count"
            :key="i.value"
          >
            <div>
              <div
                class="result__legend__color-box"
                :style="{ 'background-color': pieColors[index] }"
              ></div>
              <div class="result__legend__value">{{ i.value }}</div>
            </div>
            <div class="result__legend__percentage">{{ percentageString(i.count / r.total) }} ({{ i.count }} votes)</div>
          </div>
        </div>
        <div class="result__legend__avg">Avg: {{ avgString(r.avg) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from './Pie'
import { mapGetters, mapActions, mapState } from 'vuex'

import { pieColors, roles } from '../config'

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
    ...mapState([
      'byRole',
      'role'
    ]),
    ...mapGetters([
      'avg',
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
    },
    isHost () {
      return Boolean(roles.find(r => r.name === this.role).host)
    }
  },
  methods: {
    ...mapActions([
      'syncCountMode'
    ]),
    avgString (a) {
      return Math.round(a * 100) / 100
    },
    percentageString (p) {
      return Math.round(p * 100) + '%'
    },
    setMode (byRole) {
      if (this.isHost) {
        this.syncCountMode(byRole)
      }
    },
    tabClass (negate) {
      return {
        'tab__item--inactive': this.byRole ^ negate,
        'tab__item--no-pointer': !this.isHost
      }
    }
  }
}
</script>

<style>
.board-result {
  background-color: #fff;
  border-radius: 4px;
}

.tab {
  border-radius: 4px 4px 0 0;
}

.tab__item {
  width: 50%;
  float: left;
  text-align: center;
  line-height: 40px;
  height: 40px;
  cursor: pointer;
}

.tab__item--inactive {
  background-color: #edf2f7;
}

.tab__item--no-pointer {
  cursor: default;
}

.result {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
  margin: 15px 0;
  padding: 20px;
}

.result__title {
  flex: 0 0 100%;
  font-size: 20px;
  font-weight: bold;
}

.result__legend {
  padding-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result__legend__avg {
  align-self: center;
  font-size: 18px;
  color: #ED2F2F;
}

.result__legend__each {
  margin: 5px 0;
}

.result__legend__color-box {
  width: 15px;
  height: 15px;
  float: left;
  border-radius: 50%;
}

.result__legend__value {
  margin-left: 25px;
}

.result__legend__percentage {
  font-weight: 100;
  font-size: 14px;
  line-height: 18px;
}
</style>
