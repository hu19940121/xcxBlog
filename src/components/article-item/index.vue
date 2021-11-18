<template>
  <div>
    <div
      class="article-item flex"
      @click="linkToDetail(info)"
    >
      <img
        class="banner"
        :src="`https://cdn.jsdelivr.net/npm/typecho-joe-next@6.0.0/assets/thumb/${getRandomInt(1,20)}.jpg`"
        alt=""
      >
      <div class="article-info padding-left-sm padding-tb-xs flex flex-direction justify-between">
        <p>{{ info.title }}</p>
        <div class="flex justify-between time">
          <span>{{ info.year }}年{{ info.month }}月{{ info.day }}日</span>
          <!-- <span>1阅读</span> -->
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
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    },
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
