<template>
  <div>
    <div
      v-for="(itemm,index) in 5"
      :key="index"
      class="article-item flex"
    >
      <img
        class="banner"
        src="https://resource.kaier001.com/bea1.jpg"
        alt=""
      >
      <div class="article-info padding-left-sm padding-tb-xs flex flex-direction justify-between">
        <p>d短发短发短发水电费水电费</p>
        <div class="flex justify-between time">
          <span>2021年11月10日</span>
          <span>1阅读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
.article-item {
  padding: 30px 0;
  border-bottom: 2px solid $classC;
  .banner {
    width: 240px;
    height: 160px;
    border-radius: $radius-inner;
  }
  .article-info {
    .time {
      font-size: 26px;
      color: $minor;
    }
  }
}
</style>
