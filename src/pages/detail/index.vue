<template>
  <div>
    <hsh-top-nav
      :show-can-gohome="showCanGohome"
      :title="title"
    />
    <to-wxml :nodes="res" />
  </div>
</template>

<script>
  import towxml from '@/components/towxml/index'
  import { getArticleDetail } from '@/api/index'
  import hshTopNav from '@/components/hsh-top-nav'

  export default {
    components: {
      'hsh-top-nav':hshTopNav,
    },
    data() {
      return {
        res:'',
        title:'',
        showCanGohome: false
      }
    },

    onLoad(options) {
      this.title =  decodeURIComponent(options.title)
      this.getDetail(options.cid)
      wx.showShareMenu({
        // withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
      this.judgeCanshowHome()
    },
    methods: {
      judgeCanshowHome() {
        const currentPageUrl = this.getCurrentPageUrl()
        if (this.$Taro.getCurrentPages().length === 1 && currentPageUrl!== 'pages/index/index') {
          this.showCanGohome = true
        } else {
          this.showCanGohome = false
        }
      },

      getCurrentPageUrl() {
        const pages = this.$Taro.getCurrentPages() //获取加载的页面
        const currentPage = pages[pages.length-1] //获取当前页面的对象
        const url = currentPage.route //当前页面url
        return url
      },
      getDetail(cid) {
        getArticleDetail({ cid }).then((res)=>{
          this.res = towxml(res.data.text,'markdown',{
            // theme:'dark',
            events:{
              tap:(e)=>{
                console.log('tap',e);
              }
            }
          })
        })
      }
    },
    onShareAppMessage() {
      return {
        title: this.title
      }
    }
  }
</script>

<style lang="scss">

</style>
