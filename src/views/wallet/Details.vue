<template>
  <BackPanel :title="coin">
    <div class="hero" style="overflow: hidden;">
      <div class="section">
        <div class="has-background-white">
          <div class="card">
            <div class="is-flex-center">
              <div><strong>{{coin}}</strong></div>
            </div>
            <div>
              <strong>{{$t('wallet.balance')}} {{account.balance}}</strong>
              <strong>{{$t('subscription.dj')}} {{account.frozen}}</strong>
              <small class="has-text-grey-light">{{$t('wallet.balance')}}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="has-background-white is-grow pt-3 pb-1" style="overflow: hidden;">
        <van-tabs v-model="select" type="card" class="hero" color="#377DFF" animated swipeable>
          <van-tab name="Wallet" :title="$t('wallet.walletLog')">
            <Wallet :coin="coin" style="height: 100%; overflow: auto; padding-top:15px;" />
          </van-tab>
          <van-tab name="Asset" :title="$t('wallet.assetLog')">
            <Asset :coin="coin" style="height: 100%; overflow: auto; padding-top:15px;" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import { get } from 'vuex-pathify'
import Wallet from '@/components/details/Wallet.vue'
import Asset from '@/components/details/Asset.vue'
export default {
  components: { BackPanel, Wallet, Asset },
  data() {
    return {
      select: 'Wallet'
    }
  },
  computed: {
    wallet: get('user/wallet'),
    coin: function() {
      return this.$route.params.coin
    },
    account() {
      return this.wallet.find(p => this.coin == p.currency) || {}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hero {height: 100%;}
::v-deep {
  .has-background-light{
    background-image: linear-gradient(white 16%, whitesmoke 20%, whitesmoke);
  }
  .van-tabs__content {
    flex-grow: 1;
    flex-basis: 0%;
  }
  .van-tab__pane {
    height: 100%;
  }
}
.card {
  border-radius:4px 4px 0px 0px;
}
</style>
