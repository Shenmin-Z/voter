<template>
  <svg
    :width="size"
    :height="size"
  >
    <circle
      :r="size / 4"
      :cx="size / 2"
      :cy="size / 2"
      v-for="(d, i) in data"
      :key="d.value"
      :style="{
        stroke: pieColors[i],
        'stroke-width': size / 2,
        'stroke-dasharray': styles[i].len + ' ' + size * 10,
        'stroke-dashoffset': styles[i].offset
      }"
    ></circle>
  </svg>
</template>

<script>
const PI = 3.14

import { pieColors } from '../config'

export default {
  name: 'Pie',
  props: {
    data: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      default: 200
    }
  },
  data () {
    return {
      pieColors
    }
  },
  computed: {
    styles () {
      return this.data.map(i => i.count / this.total * 2 * PI * this.size / 4)
        .reduce((acc, e, i, a) => [...acc, {
          len: e,
          offset: i === 0 ? 0 : acc[i - 1].offset - a[i - 1]
        }], [])
    },
    total () {
      return this.data.reduce((acc, i) => acc + i.count, 0)
    }
  }
}
</script>

<style scoped>
svg {
  transform: rotate(-90deg);
  border-radius: 50%;
}

circle {
  fill: transparent;
}
</style>
