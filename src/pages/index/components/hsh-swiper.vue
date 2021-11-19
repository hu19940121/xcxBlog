<template>
  <div>
    <div class="swiper-box">
      <swiper
        class="swiper"
        indicator-color="#999"
        indicator-active-color="#333"
        :circular="true"
        :indicator-dots="true"
        :autoplay="true"
      >
        <swiper-item class="swiper-item"  v-for="(banner,index) in bannerList"  :key="index">
          <img
            class=""
            :src="banner.image"
            alt=""
          >
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState('settings',{
        bannerList: 'bannerList'
      })
    },
  }
</script>

<style lang="scss">
.swiper-box {
  .swiper {
    width: 100%;
    height: 360px;
    .swiper-item {
      /* width: 600px !important; */
      img {
        width: 100%;
        height: 360px;
      }
    }
  }

}
</style>
