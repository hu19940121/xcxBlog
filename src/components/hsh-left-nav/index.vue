<template>
  <div>
    <van-popup
      v-model="show"
      duration="0.3"
      position="left"
      :style="{ height: '100%',width:'80%' }"
    >
      <div class="left-nav-contianer">
        <img
          src="https://cdn.jsdelivr.net/npm/typecho-joe-next@6.0.0/assets/img/wap_aside_image.jpg"
          alt=""
          class="banner"
        >
        <div class="rest">
          <div class="card author-info">
            <div class="flex">
              <img
                class="avatar"
                src="https://thirdqq.qlogo.cn/g?b=qq&nk=673822024&s=100"
                alt=""
              >
              <div class="info margin-left-xs">
                <p class="name margin-bottom-xs">
                  {{ settingInfo.title }}
                </p>
                <p class="desc">
                  {{ settingInfo.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="card">
            <p class="leiji-article margin-bottom-xs">
              累计撰写<span class="strong">{{ articleCount }}</span>篇文章
            </p>
            <!-- <p class="leiji-pingjia">
              累计收到<span class="strong">{{ commentsCount }}</span>条评论
            </p> -->
          </div>
          <div class="card cate">
            <p class="leiji-article margin-bottom">
              首页
            </p>
            <!-- <p class="leiji-pingjia">
              栏目
            </p> -->
            <van-collapse
              v-model="activeNames"
              accordion
              class="van-collapse"
              :border="false"
            >
              <van-collapse-item
                title="栏目"
                title-class="title-class"
                value-class="title-class"
                :border="false"
                name="2"
              >
                <div class="collapse-list">
                  <p
                    v-for="(cate,index) in cates"
                    :key="index"
                    class="padding-left-xs margin-bottom-xs"
                    @click="clickCate(cate.slug)"
                  >
                    {{ cate.name }}
                  </p>
                  <!-- <p class="padding-left-xs margin-bottom-xs">
                    web前端
                  </p>
                  <p class="padding-left-xs margin-bottom-xs">
                    linux
                  </p> -->
                </div>
              </van-collapse-item>
              <van-collapse-item
                title="页面"
                title-class="title-class"
                value-class="title-class"

                :border="false"
                name="3"
              >
                <div class="collapse-list">
                  <p class="padding-left-xs margin-bottom-xs">
                    关于
                  </p>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        activeNames: ['1'],
        show: false
      }
    },
    computed: {
      ...mapState('article',{
        cates: 'cates',
        articleCount: 'articleCount',
        commentsCount: 'commentsCount'
      }),
      ...mapState('settings',{
        settingInfo:'settingInfo'
      })
    },

    methods: {
      clickCate(cateName) {
        this.$Taro.navigateTo({
          url:`/pages/search/index?filterSlug=${cateName}&filterType=category`
        })
        this.show = false
      },
    },
  }
</script>

<style lang="scss">
.title-class {
  font-size: 28px;
}
.left-nav-contianer {
  background-color: #f2f6fc;
  height: 100%;
  .banner {
    height: 300px;
  }
  .rest {
    .strong {
      color: $theme;
    }
    .card {
      background: #fff;
      padding: 30px;
      border-radius: 18px;
      width: 80%;
      margin: 0 auto;
      .avatar {
        width: 100px;
        height: 100px;
      }
      .info {
        .name {
          font-size: 30px;
          color:$main;
          font-weight: 500;
        }
        .desc {
          font-size: 24px;
          color: $routine;
        }

      }
      .leiji-article {
        color: $routine;
      }
      .leiji-pingjia {
        color: $routine;
      }
    }
    .author-info {
      position: relative;
      margin-top: -40px;
      margin-bottom: 30px;
      z-index: 1000
    }
    .cate {
      margin-top: 30px;
      .collapse-list {
        border-left: 1px solid $classC;
        padding-left: 15px;
      }
    }
  }
}
</style>
