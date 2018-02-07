<template>
  <div class="room shadow">
    <input 
      type="text"
      placeholder="Enter new or existing room name"
      class="room__input"
    >
    <button
      class="room__left-btn"
    >Create Room</button>
    <button
      class="room__right-btn"
    >Enter Room</button>
  </div> 
</template>

<script>
export default {
  name: ''
}
</script>

<style>
.room {
  background-color: white;
  width: 300px;
}

.room__input {
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
}

.room__left-btn {
  width: 120px;
  display: inline-block;
}

.room__right-btn {
  width: 120px;
  float: right;
}
</style>
