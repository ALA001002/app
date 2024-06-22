<template>
  <BackPanel :title="coin+' '+$t('wallet.deposit')">
    <div class="section">
      <div class="has-background-white panel">
        <h5 class="title is-6">{{coin+' '+$t('wallet.depositAddress')}}</h5>
        <van-tabs v-if="usdtFlag" v-model="select" type="card" class="my-3 mx-2" color="#377DFF">
          <van-tab name="todayTrade" title="ERC20">
            <vue-qr v-if="address" :text="address" :size="200" class="rect"></vue-qr>
            <div v-copy class="address">{{address}}<i class="icon icon-fuzhi"/></div>
          </van-tab>
          <van-tab name="yesterdayTrade" title="TRC20">
            <vue-qr v-if="trcAddress" :text="trcAddress" :size="200" class="rect"></vue-qr>
            <div v-copy class="address">{{trcAddress}}<i class="icon icon-fuzhi"/></div>
          </van-tab>
        </van-tabs>
        <div v-else>
          <vue-qr v-if="address" :text="address" :size="200" class="rect"></vue-qr>
          <div v-copy class="address">{{address}}<i class="icon icon-fuzhi"/></div>
        </div>
      </div>
    </div>
    <div class="section html-content" v-html="remark"/>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import vueQr from 'vue-qr'
export default {
  components: { BackPanel, vueQr },
  data() {
    return {
      remark: '',
      address: null,
      usdtFlag:false,
      trcAddress:null
    }
  },
  computed: {
    coin: function() {
      return this.$route.params.coin
    }
  },
  watch: {
    coin: {
      handler(val) {
        if (!val) return
        if(val==='USDT'){
          this.usdtFlag = true
          this.$http.get('asset/getWalletAddress', {currency: 'USDT_TRC20'}).then(data => {
            this.trcAddress = data
          })
        }
        this.$http.get('asset/getWalletAddress', {currency: val}).then(data => {
          this.address = data
        })
        this.$http.get('common/getSysArticle?key=cb'+val.toLowerCase()).then(data => {
          this.remark = data.content
        })
      },
      immediate: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  font-family:PingFangSC-Regular,PingFang SC;
}
.panel {
  text-align: center;
  padding: 30px;
  border-radius:4px;
}
.title {
  margin-top: 10px;
}
.address {
  background:rgba(55,125,255,.06);
  border-radius:4px;
  padding: 10px 15px;
  margin-top: 10px;
  word-wrap:break-word;
}
$color: rgba(55,125,255,.4);
.rect{
  padding: 2px;
  background: linear-gradient(to left,  $color,  $color) left top no-repeat,
  linear-gradient(to bottom,  $color,  $color) left top no-repeat,
  linear-gradient(to left,  $color,  $color) right top no-repeat,
  linear-gradient(to bottom,  $color,  $color) right top no-repeat,
  linear-gradient(to left,  $color,  $color) left bottom no-repeat,
  linear-gradient(to bottom,  $color,  $color) left bottom no-repeat,
  linear-gradient(to left,  $color,  $color) right bottom no-repeat,
  linear-gradient(to left,  $color,  $color) right bottom no-repeat;
  background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
  border-radius: 4px;
  overflow: hidden;
}
</style>
