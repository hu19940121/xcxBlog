<template>
  <div>
    <div
      class="article-item flex"
      @click="linkToDetail(info)"
    >
      <img
        class="banner"
        :src="`https://cdn.jsdelivr.net/npm/typecho-joe-next@6.0.0/assets/thumb/${num}.jpg`"
        alt=""
      >
      <div class="article-info padding-left-sm padding-tb-xs flex flex-direction justify-between">
        <p>{{ info.title }}</p>
        <div class="flex justify-between time">
          <span>{{ info.year }}年{{ info.month }}月{{ info.day }}日</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default: ()=>({})
      },
      num:{
        type: Number,
        default: 1
      }
    },
    data() {
      return {
      }
    },
    methods: {
      linkToDetail(article) {
        this.$Taro.navigateTo({
          url:`/pages/detail/index?cid=${article.cid}&title=${article.title}`
        })
      },
      getRandomInt(min, max) {
        if (!(/^\d+$/.test(min) && /^\d+$/.test(max) && max > min)) {
            throw 'param error!';
        }
        min = parseInt(min);
        max = parseInt(max);
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        return num
      }
    },
  }
</script>

<style lang="scss">
.article-item {
  padding: 30px 0;
  border-top: 2px solid $classC;
  .banner {
    width: 240px;
    height: 160px;
    border-radius: $radius-inner;
  }
  .article-info {
    flex: 1;
    .time {
      font-size: 26px;
      color: $minor;
    }
  }
}
</style>
