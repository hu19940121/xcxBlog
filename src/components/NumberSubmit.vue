<template>
  <div class="box">
    <input
      v-model="number"
      type="number"
      class="input"
    >
    <button @tap="addNumber">
      Add new number
    </button>
    <van-button type="primary">
      红红火火
    </van-button>
  </div>
</template>

<script>

export default {
  name: 'NumberSubmit',
  data() {
    return {
      number: 0
    }
  },
  methods: {
    addNumber() {
      this.$store.dispatch('addNumber', Number(this.number))
    }
  }
}
</script>

<style lang="scss">
.box {
  .input {
    background: red;
    border: 1px solid lightgray;
    margin: 10px;
  }
}

</style>
