<template>
  <BackPanel :title="$t('wallet.selectCoin')">
    <van-cell 
    v-for="item in wallet" 
    :key="item.id" 
    :title="item.currency" 
    :to="'/wallet/'+goto+'/'+item.currency" 
    is-link
  />
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import { get } from 'vuex-pathify'
export default {
  components: { BackPanel },
  computed: {
    userWallet: get('user/wallet'),
    wallet() {
      var type = this.goto === 'withdraw' ? 'supWithdraw' : 'supRecharge'
      return this.userWallet.filter(p => p[type] === 1)
    },
    goto: function() {
      return this.$route.params.goto
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
