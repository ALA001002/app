<template>
  <Layout>
    <van-popup
        v-model="showModal" round style="width: 90%;">
      <div style="padding: 10px;" v-if="content">
        <div v-html="content"></div>
        <van-button class="is-grow sw-btn" type="primary" size="large" @click="()=>this.showModal=false">{{$t('app.has_read')}}</van-button>
      </div>
    </van-popup>
    <!-- 头部 -->
    <div class="section pb-0" slot="header">
<!--      <img :src="require(`../assets/images/logo.jpg`)" height="30px"/>-->
      <div  class="is-pulled-right" style="display: flex;">
        <img src="@/assets/images/new/download.svg"  style="margin-right: 0.5rem;width: 0.8rem"
             @click="downloadVisible = true"
        />
        <router-link tag="span" to="/notices">
          <van-icon name="volume-o" size="24"/>
        </router-link>
      </div>
    </div>
    <div class="section has-background-white">
      <!-- 轮播图 -->
      <van-swipe :autoplay="5000" class="is-radius" :stop-propagation="false">
        <van-swipe-item v-for="(item, index) in banner" :key="index" @click="bannerTo(item)">
          <Img :src="item.url" class="is-radius" fit="fill" lazy-load />
        </van-swipe-item>
      </van-swipe>
      <!-- 通知栏 -->
      <van-notice-bar :scrollable="false" class="px-0 has-text-weight-light" color="#242424" background="#ffffff" left-icon="volume-o">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
          style="line-height: 2.13333rem; height: 2.13333rem;"
          :stop-propagation="false"
        >
          <van-swipe-item v-for="notice in notices" :key="notice.id" @click="noticeTo(notice)">{{notice.title}}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
      <van-divider style="margin: 0px;" />
    </div>
    <!-- 快捷导航 -->
    <van-grid :border="false" icon-size="1.173rem">
      <van-grid-item
              v-for="(link, index) in links"
              :key="index"
              :text="link.name"
              :to="link.to"
              class="has-text-grey-dark"
      >
        <span :class="'newicon '+ link.icon" style="font-size: 20px;color: rgb(55, 125, 255)"/>
        <span style="font-size: 12px;margin-top: 5px;color: rgb(55, 125, 255)">{{link.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 常用合约 -->
    <div class="section has-background-white">
      <ContractBoxList :list="myList" />
    </div>
    <!-- 合约列表 -->
    <div class="section has-background-white mt-3">
      <TradingList :list="list" @select="tradingSelect"/>
    </div>
    <!-- 平台底部信息 -->
<!--    <div class="py-5 px-3 has-text-centered has-text-weight-light">
      &lt;!&ndash;<router-link tag="small" :to="`/view?type=key&id=ptxxqpl&title=${this.$t('app.sysInfo')}`" class="has-text-link">
        {{ $t("app.sysInfo") }} >
      </router-link>&ndash;&gt;
      <div class="columns is-mobile has-text-grey-light mt-0">
        <div v-for="(link, index) in links2" :key="index" class="column px-0">
          <small>
            <van-icon class-prefix="icon" :name="link.icon" />
            &nbsp;{{ link.name }}
          </small>
        </div>
      </div>
    </div>-->
    <van-dialog v-model="downloadVisible"  :title="$t('home.download')" getContainer="body" :confirm-button-text="$t('home.confirm')">
      <!--      <vue-qr :text="downloadUrl" class="m-auto" :size="180"></vue-qr>-->
      <div class="input-box flex-between ">
        <span class="text-12px line14">{{downloadUrl}}</span>
        <img class="box24" v-copy="downloadUrl" v-copy:success="()=>jumpDownUrl()" src="@/assets/images/new/invate_copy.svg">
      </div>
    </van-dialog>
  </Layout>
</template>

<script>
import Layout from '@/components/layout/Index.vue'
import ContractBoxList from '@/components/contractList/ContractBoxList.vue'
import TradingList from '@/components/trading/TradingList.vue'
import { get } from 'vuex-pathify'
import NProgress from 'nprogress'
import {Toast} from 'vant'

export default {
  name: 'Home',
  components: {
    Layout,
    ContractBoxList,
    TradingList
  },
  data() {
    return {
      downloadUrl:null,
      downloadVisible:false,
      showModal:true,
      i18n: false,
      content:null,
      myIndex: localStorage['myIndex'] ? JSON.parse(localStorage['myIndex']) : [],
      banner: [],
      notices: []
    }
  },
  created() {
    this.loadData()
    this.queryDownloadUrl()
  },
  computed: {
    list: get('hq/hq'),
    myList() {
      const myList = this.list
      myList.sort((a, b) => {
        return this.myIndex.includes(a.symbolCode) ? 1
          : this.myIndex.includes(b.symbolCode) ? -1 : 0
      })
      return myList.slice(0, 3)
    },
    links() {
      return [
        // { name: this.$t('app.platform'), icon: 'ptjs', to: `/view?type=key&id=ptjs&title=${this.$t('app.platform')}` },
        // { name: this.$t('app.help'), icon: 'xrzn', to: `/view?type=key&id=xrzn&title=${this.$t('app.help')}` },
        { name: this.$t('app.contactService'), icon: 'newicon-lianxiren', to: '/iframe/1' },
        { name: this.$t('app.invite'), icon: 'newicon-yaoqing', to: '/invite' },
        { name: this.$t('app.deposit'), icon: 'newicon-48', to: '/wallet/deposit' },

        // { name: this.$t('app.licai'), icon: 'newicon-licai',  to: '/DeFi' }
        {icon: 'newicon-jinggao', name: this.$t('app.aboutUs'), to: '/about'}
        // { name: this.$t('app.platform'), icon: 'ptjs', to: `/view?type=key&id=ptjs&title=${this.$t('app.platform')}` }
      ]
    },
    links2() {
      return [
        { name: this.$t('app.globalBD'), icon: 'quanqiu' },
        { name: this.$t('app.appTeam'), icon: 'tuandui' },
        { name: this.$t('app.encryption'), icon: 'jiami' }
      ]
    }
  },
  methods: {
    queryDownloadUrl(){
      const self =this
      this.$http.api.get('/common/getDownUrl?type=2').then((res)=>{
        self.downloadUrl = res.data.url
      })
    },
    jumpDownUrl() {
      window.location.href = this.downloadUrl
    },
    queryContent(id){
      this.$http.api.get(`common/getSysNoticeById?id=${id}`).then(data => {
        NProgress.done()
        data = data.data
        this.title = data.title
        this.content = data.content
      }).catch(err =>{
        NProgress.done()
        Toast.fail({
          icon: 'cross',
          message: err.msg,
          forbidClick: false,
          duration: 2500
        })
      })
    },
    loadData() {
      // banner
      this.$http.get('common/getSysNoticeList?type=3').then(data => {
        this.banner = data
      })
      // 公告
      this.$http.get('common/getSysNoticeList?type=1').then(data => {
        this.notices = (data||[]).slice(0, 3)
        if(!this.notices || this.notices.length==0) {
          this.showModal=false
        }
        this.queryContent(this.notices[0].id)
      })
    },
    bannerTo() {
      // console.log(data)
    },
    noticeTo(data) {
      this.$router.push(`/view?id=${data.id}&title=${data.title}`)
    },
    tradingSelect(data) {
      this.$router.push('/options/'+data.symbolCode)
    }
  }
}
</script>
<style lang="scss" scoped>
.is-radius {
  overflow: hidden;
  height: 180px;
  width: 100%;
}
</style>
