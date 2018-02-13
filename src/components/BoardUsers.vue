<template>
  <div class="users shadow">
    <div
      class="users__row"
      v-for="(u, index) in userVotingStatus"
      :key="index"
    >
      <div class="users__row__name">{{ u.name }}</div>
      <div
        class="users__row__status"
        v-if="!finished"
        v-show="u.voted"
      >
        {{ u.voted? '&#10004;' : '' }}
      </div>
      <div 
        class="users__row__vote"
        v-if="finished"
      >
        {{ u.vote }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Users',
  computed: {
    ...mapState([
      'finished',
      'users',
      'votes'
    ]),
    userVotingStatus () {
      return this.users.map(u => {
        const user = this.votes.find(v => v.name === u.name)
        return {
          name: u.name,
          voted: Boolean(user),
          vote: user ? user.vote : ''
        }
      })
    }
  }
}
</script>

<style>
.users {
  margin-top: 25px;
  padding: 0;
  background-color: #fff;
}

.users__row {
  border-bottom: 1px solid #d5d9de; 
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
}

.users__row__status {
  font-size: 10px;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  text-align: center;
  background-color: #28A745;
  color: #fff;
}
</style>
