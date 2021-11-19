<template>
  <div>
    <hsh-top-nav title="搜索结果" />
    <div class="padding">
      <div class="result-list">
        <p class="title padding-tb-sm flex align-center">
          <img
            class="icon margin-right-xs"
            src="@/assets/img/yumao.svg"
            alt=""
          >  搜索到<span class="padding-lr-xs qi"> {{ resultCount }} </span>篇与<span class="padding-lr-xs qi"> {{ otherParams.filterSlug }} </span>相关的结果
        </p>
        <template v-for="(item,index) in resultList">
          <article-item
            :key="index"
            :info="item"
            :num="produceNum(index + 1, 20)"
          />
        </template>
        <div
          v-if="resultCount === 0"
          class="no-data flex flex-direction align-center "
        >
          <img
            class="no-data-img"
            src="@/assets/img/no-result.svg"
            alt=""
          >
          <p class="margin-top-sm">
            没有找到相关结果...
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import hshTopNav from '@/components/hsh-top-nav'
  import articleItem from '@/components/article-item'

  import { getArticleList } from '@/api/index'
  import { produceNum } from '@/utils'

  const DEFAULT_PAGESIZE = 5
  const DEFAULT_PAGE = 1
  export default {
    components: {
      'article-item':articleItem,
      'hsh-top-nav':hshTopNav,

    },
    data() {
      return {
        resultCount: 0,
        isEnd: false,
        pageInfo: {
          pageSize: DEFAULT_PAGESIZE,
          page: DEFAULT_PAGE
        },
        resultList:[],
        otherParams: {
          filterType: '',
          filterSlug: ''
        }
      }
    },
    onLoad(options) {
      this.otherParams.filterType = options.filterType
      this.otherParams.filterSlug =  decodeURIComponent(options.filterSlug)
      this.getArticleList()
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
      produceNum,
      getArticleList() {
        if (this.isEnd) {
          return false
        }
        const params = {
          ...this.pageInfo,
          ...this.otherParams
        }
        this.$Taro.showLoading({
          title: '加载中',
        })
        getArticleList({...params }).then((res)=>{
          this.$Taro.hideLoading()
          this.$Taro.stopPullDownRefresh()
          if (res.data.dataSet.length === 0 ) {
            this.isEnd = true
          }
          this.resultList = this.resultList.concat(res.data.dataSet)

          // this.resultList = res.data.dataSet
          this.resultCount = res.data.count
        })
      },

      resetParams() {
        this.pageInfo.pageSize = DEFAULT_PAGESIZE
        this.pageInfo.page = DEFAULT_PAGE
        this.isEnd = false
        this.resultList = []
      }
    },
  }
</script>

<style lang="scss" >
.result-list {
  margin-top: 30px;
  padding: 0 30px;
  border-radius: $radius-wrap;
  background: $background;
  box-shadow: $box-shadow;
  .no-data {
    padding: 100px 0;
    .no-data-img {
      width: 240px;
      height: 240px;
    }
  }

  .title {
    flex-wrap: wrap;
    color: $main;
    /* border-bottom: 2px solid $classC; */
    .icon {
      width: 40px;
      height: 40px;
    }
    .qi {
      color: $theme;
    }
  }
}
</style>
