<template>
  <div class="home-page">
    <hsh-top-nav
      :title="settingInfo.title"
      is-home-page
      @leftClick="handleLeftClick"
      @rightClick="handleRighttClick"
    />
    <div class="main-wrapper padding">
      <div class="main">
        <hsh-swiper />
        <van-tabs
          v-model="active"
          duration="0.3"
          @change="handleTabChange"
        >
          <van-tab
            name="created"
            title="最新文章"
          />
          <!-- <van-tab
            name="views"
            title="热门文章"
          /> -->
        </van-tabs>
        <div class="article-list">
          <template v-for="(item,index) in articleList">
            <article-item
              :key="index"
              :info="item"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import hshTopNav from '@/components/hsh-top-nav'
  import hshSwiper from './components/hsh-swiper.vue'
  import articleItem from '@/components/article-item'
  import { getArticleList } from '@/api/index'
  import { mapState, mapActions, mapMutations } from 'vuex'
  const DEFAULT_PAGESIZE = 5
  const DEFAULT_PAGE = 1

  // function
  export default {
    components: {
      'hsh-top-nav':hshTopNav,
      'hsh-swiper':hshSwiper,
      'article-item':articleItem
    },
    data() {
      return {
        active: 'created',
        isEnd: false,
        articleList:[],
        pageInfo:{
          pageSize: DEFAULT_PAGESIZE,
          page: DEFAULT_PAGE
        }
      }
    },
    computed: {
      ...mapState('settings',{
        settingInfo:'settingInfo'
      })
    },
    mounted () {
      this.getArticleList()
      this.getSetting()
      this.getCate()
      this.getComments()

      wx.showShareMenu({
        // withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
    },
    onReachBottom() {
      this.pageInfo.page = this.pageInfo.page + 1
      this.getArticleList()
    },
    onPullDownRefresh() {
      this.resetParams()
      this.getArticleList()
    },
    methods: {
      ...mapActions('settings', {
        getSetting: 'getSetting'
      }),
      ...mapActions('article', {
        getCate: 'getCate',
        getComments: 'getComments'
      }),
      ...mapMutations('article',{
        CHANGE_ARTICLE_COUNT:'CHANGE_ARTICLE_COUNT'
      }),
      getArticleList() {
        if (this.isEnd) {
          return false
        }
        const params = {
          ...this.pageInfo
        }
        getArticleList({...params }).then((res)=>{
          this.CHANGE_ARTICLE_COUNT(res.data.count)
          this.$Taro.stopPullDownRefresh()
          if (res.data.dataSet.length === 0 ) {
            this.isEnd = true
          }
          this.articleList = this.articleList.concat(res.data.dataSet)
        })
      },
      handleLeftClick() {
      },
      handleRighttClick() {
      },
      handleTabChange(name) {
        this.resetParams()

        this.getArticleList()
      },
      resetParams() {
        this.pageInfo.pageSize = DEFAULT_PAGESIZE
        this.pageInfo.page = DEFAULT_PAGE
        this.isEnd = false
        this.articleList = []
      }
    },
  }
</script>

<style lang="scss">
// 魔改 tabs 样式
.van-tabs__line {
  display: none;
}
.van-tab.van-tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -20px;
  z-index: 1;
  width: 40px;
  height: 3px;
  background-color: #ee0a24;
  border-radius: 3px;
}
page {
  background: #f4f5f5;
  font-size: 28px;
}
.home-page {
  overflow: hidden;
  .main-wrapper {
    .main {
      background: #fff;
      border-radius: $radius-wrap;
      padding: 30px;
      .article-list{
        /* .article-item {
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
        } */
      }
    }
  }
}

</style>
