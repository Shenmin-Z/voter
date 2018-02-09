<template>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BoardResult',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'avg',
      'count'
    ])
  }
}
</script>
