<template>
  <Layout>
    <!-- 用户信息 -->
    <router-link tag="div" class="section has-background-white is-flex-center pt-4" to="/setting/account">
      <Img round width="2.7rem" height="2.7rem" fit="cover" bak="icon icon-morentouxiang" :src="user.avatar"/>
      <div class="is-grow pl-2 has-text-weight-medium is-size-6">{{ user.nickName || $t("app.editNickname") }}</div>
      <span class="has-text-grey-light">{{ $t("app.editAccount") }} &nbsp;&nbsp;</span>
      <van-icon class="has-text-grey-light" name="arrow" />
    </router-link>
    <!-- 资产 -->
    <div class="section has-background-white has-text-grey-light">
      <div class="is-flex-center">
        <span>{{ $t("app.totalAssets") }}</span>
        <van-icon :name="see?'eye-o':'closed-eye'" size="22" @click="see = !see"/>
      </div>
      <div class="py-1">
        <span class="is-size-6 has-text-dark">{{ see ? totalAssets : "--" }}</span>
        &nbsp;USDT
<!--        <span v-show="showProfit" v-bind:style="{color:ud>0?'green':'red',marginLeft:'5px'}">{{`${(ud>0?'+':'')+ud}%`}} (24h)</span>-->
      </div>
    </div>
    <div style="padding: 0 15px">
      <van-swipe :loop="false" :show-indicators="false" :stop-propagation="false" :width="walletWidth" height="84">
        <van-swipe-item v-for="w in wallet" :key="w.id">
          <router-link tag="div" class="has-background-info wallet px-3 py-3" :class="w.currency" style="margin-left: 10px" :to="'/wallet/details/'+w.currency">
            {{w.currency}}
            <p>{{see ? w.balance : "--" }}</p>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 导航 -->
    <div class="section has-background-white">
      <van-grid :border="false" :column-num="4" icon-size="1.173rem" >
        <van-grid-item
          v-for="(link, index) in links"
          :key="index"
          :text="link.name"
          :to="link.to"
          class="has-text-grey-dark"

        >
          <template #icon>
            <div class="grid-icon">
              <van-icon class-prefix="icon" size="24" color="#377DFF" :name="link.icon" />
            </div>
          </template>
        </van-grid-item>
      </van-grid>
      <Img style="border-radius:4px; overflow: hidden;" :src="imgUrl" @click="$router.push('/invite')"/>
    </div>
    <!-- 菜单 -->
    <div class="has-background-white mb-4">
      <van-cell v-for="item in menu" :key="item.title" v-bind="item" :icon-prefix="'newicon'" is-link />
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/layout/Index.vue'
import { get, sync, call } from 'vuex-pathify'

export default {
  name: 'Home',
  components: { Layout },
  data() {
    return {
      imgUrl: '',
      walletWidth: 170,
      showProfit: false,
    }
  },
  created() {
    this.walletWidth = (document.body.clientWidth - 40) / 2
    this.load()
    this.updateInfo()
    this.$http.get('common/profitStatus').then(data => {
      if(data == 1){
        this.showProfit = true
      } else {
        this.showProfit = false
      }
    })
  },
  computed: {
    user: get('user/info'),
    see: sync('config@see'),
    wallet: get('user/wallet'),
    hqList: get('hq/hq'),
    profit: get('user/profit'),
    links() {
      return [
        { name: this.$t('subscription.property'), icon: 'OTC', to: '/property' },
        { name: this.$t('app.deposit'), icon: 'chongzhi', to: '/wallet/deposit' },
        { name: this.$t('app.withdraw'), icon: 'tibi', to: '/wallet/withdraw' },
        { name: this.$t('app.switch'), icon: 'huazhuan' },

        // { name: this.$t('app.otc'), icon: 'OTC', to: '/otc' }
      ]
    },
    menu() {
       var authStatus = this.$t('app.idCardStatus'+(this.user.authStatus||0))
      return [
        { icon: 'kefu', title: this.$t('app.contactService'), to: '/iframe/1' },
        // { icon: 'bangzhu', title: this.$t('app.helpCenter'), to: '/help' },
        // { icon: 'yaoqingren', title: this.$t('app.myInviter'), to: '/myInviter' },
        { icon: 'zhanghaozhongxinzhanghaoguanli', title: this.$t('app.auth'), to: '/authentication', value: authStatus },
        // { icon: 'shoukuan', title: this.$t('app.payment'), to: '/payment' },
        { title: this.$t('app.licaijl'), icon: 'licai', to: '/DeFiHistory' },
        { icon: 'safe', title: this.$t('app.security'), to: '/security' },
        { icon: 'setting', title: this.$t('app.settings'), to: '/setting' },
        { icon: 'jinggao', title: this.$t('app.aboutUs'), to: '/about' }
      ]
    },
    totalAssets() {
      var usdt = 0
      for (var w of this.wallet) {
        if (w.currency === 'USDT') {
          usdt += w.balance
          // console.log(w.balance)
        } else {
          var price = this.hqList.find(p => p.from === w.currency && p.to === 'USDT')
          if (price) {
            // console.log(price.from, w.balance , price.price, price.price * w.balance )
            usdt += price ? price.price * w.balance : 0
          }

        }
      }
      return this.toNumber(usdt)
    },
    ud() {
      return this.profit==undefined?0:this.profit
    }
  },
  methods: {
    ...call({
      updateInfo: 'user/info'
    }),
    load() {
      this.$http.get('common/getSysNoticeList?type=4').then(data => {
        if (data.length) {
          this.imgUrl = data[0].url
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  border-radius: 4px 4px 0 0;
  background-image: url('~@/assets/images/yx.png');
  background-repeat:no-repeat;
  background-position:top right;
  background-size: contain;
  color: white;
}
.wallet.ETH{
  background-color: #33579B !important;
}
::v-deep {
  .icon-morentouxiang {
    font-size: 2.8rem;
  }
}
.grid-icon {
  background-color: rgba(55,125,255,0.06);
  border-radius: 50%;
  padding: 7px;
  margin-bottom: 6px;
}
</style>
