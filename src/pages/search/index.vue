<template>
  <div class="padding">
    <hsh-top-nav title="搜索结果" />

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
</template>

<script>
  import hshTopNav from '@/components/hsh-top-nav'
  import articleItem from '@/components/article-item'

  import { getArticleList } from '@/api/index'

  export default {
    components: {
      'article-item':articleItem,
      'hsh-top-nav':hshTopNav,

    },
    data() {
      return {
        resultCount: 0,
        pageInfo: {
          pageSize: 5,
          page: 1
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
    methods: {
      getArticleList() {
        const params = {
          ...this.pageInfo,
          ...this.otherParams
        }
        getArticleList({...params }).then((res)=>{
          this.resultList = res.data.dataSet
          this.resultCount = res.data.count
        })
      },
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
    border-bottom: 2px solid $classC;
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
