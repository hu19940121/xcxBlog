<template>
  <div class="top-nav-wrapper">
    <div
      class="top-nav"
      :style="{ paddingTop:navBarMarginTop + 'px' }"
    >
      <van-nav-bar
        ref="vanNavBar"
        :title="title"
        z-index="2"
        left-text="返回"
        left-arrow
      >
        <template #left>
          <van-icon
            v-if="showCanGohome"
            name="wap-home-o"
            size="18"
            style="margin-right:87px;"
            color="#86909c"
            @click="goHome"
          />
          <van-icon
            v-else-if="isHomePage"
            name="wap-nav"
            color="#86909c"
            size="18"
            @click="leftClick"
          />

          <van-icon
            v-else
            name="arrow-left"
            color="#86909c"
            size="18"
            @click="back"
          />
        </template>
        <template
          v-if="isHomePage"
          #right
        >
          <van-icon
            name="search"
            size="18"
            style="margin-right:87px;"
            color="#86909c"
            @click="rightClick"
          />
        </template>
      </van-nav-bar>
      <hsh-left-nav ref="hshLeftNav" />
    </div>
    <div
      :style="{ height: (navBarMarginTop + 46) + 'px'}"
      class="placeholder"
    />

    <van-popup
      v-model="showSearch"
      duration="0.3"
      position="top"
    >
      <div
        :style="{ paddingTop:(navBarMarginTop + 46) + 'px' }"
        class="content"
      >
        <div class="content-inner">
          <van-search
            v-model="keywords"
            style="padding:0;"
            placeholder="请输入搜索关键词"
            @search="onSearch"
          />
          <div class="padding-tb-sm">
            <van-icon name="guide-o" /> 标签搜索
          </div>
          <div class="tags">
            <van-tag
              v-for="(tag,index) in tags"
              :key="index"
              type="primary"
              class="margin-right-xs"
              @click="clickTag(tag.slug)"
            >
              {{ tag.name }}
            </van-tag>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import hshLeftNav from '@/components/hsh-left-nav'
  import { getTags } from '@/api'
  export default {
    components: {
      hshLeftNav,
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      isHomePage: {
        type: Boolean,
        default: false
      },
      showCanGohome: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        keywords:'',
        showSearch: false,
        navBarMarginTop: 0,
        searchIconMarginRight: 0,
        tags:[]
      }
    },
    mounted () {
      this.$Taro.getSystemInfo({}).then(res  => {
        this.navBarMarginTop =  res.statusBarHeight || 0
      })
      this.searchIconMarginRight = this.$Taro.getMenuButtonBoundingClientRect().width
      this.getTags()
    },
    methods: {
      leftClick() {
        this.$refs.hshLeftNav.show = true
        this.$emit('leftClick')
      },
      rightClick() {
        this.$emit('rightClick')
        this.showSearch= true
      },
      back() {
        this.$Taro.navigateBack()
      },
      onSearch(val) {
        if (!val) {
          this.$Taro.showToast({
            title: '请输入关键词～',
            icon: 'none',
          })
          return false
        }
        this.$Taro.navigateTo({
          url:`/pages/search/index?filterSlug=${val}&filterType=search`
        })
        this.showSearch = false
      },
      clickTag(tagName) {
        this.$Taro.navigateTo({
          url:`/pages/search/index?filterSlug=${tagName}&filterType=tag`
        })
        this.showSearch = false
      },
      goHome() {
        this.$Taro.redirectTo({
          url:`/pages/index/index`
        })
      },
      getTags() {
        getTags().then(res=>{
          this.tags = res.data || []
        })
      }
    },
  }
</script>

<style lang="scss" >
.top-nav-wrapper {
  position: relative;
  .top-nav {
    position: fixed;
    width: 100%;
    z-index: 99999999;
    background-color: #fff;
  }
  .placeholder {
    width: 100%;
    /* height: 120px; */
  }
  .content {
    .content-inner {
      padding :30px
    }
  }

}
</style>
