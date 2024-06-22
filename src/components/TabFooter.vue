<template>
  <van-tabbar
    id="tabbar_menu"
    v-model="active"
    :zIndex="999"
    :fixed="false"
    active-color="#377DFF"
    inactive-color="#AAA"
    route
    safe-area-inset-bottom
  >
    <van-tabbar-item
      v-for="tab in tabs"
      :key="tab.name"
      :icon="tab.icon"
      :to="tab.to"
      :icon-prefix="'newicon'"
    >
      {{ tab.name }}
    </van-tabbar-item>
    <!-- <van-tabbar-item icon="aim" url="http://192.168.0.17:8080">
      Test
    </van-tabbar-item> -->
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  computed: {
    tabs() {
      return [
        { name: this.$t('app.home'),type:2, icon: 'home', to: '/home' },
        { name: this.$t('app.licai'), icon: 'licai', to: '/DeFi' },
        { name: this.$t('app.options'), icon: '31daifahuo', to: '/options/btcusdt' },
        // { name: this.$t('spot.name'),type:1, icon: '31daifahuo', to: '/ico/btcusdt' },
        { name: this.$t('app.account'), icon: '31wode', to: '/account' },
        // { name: this.$t('subscription.swichtitle'), icon: 'saoma', to: '/activity' },
        // { name: this.$t('app.contract'), icon: 'heyue', to: '/contract' },
        // { name: this.$t('app.community'), icon: 'shequ', to: '/community' },
        // { name: this.$t('app.otc'), icon: 'OTC', to: '/otc' },
        // { name: this.$t('app.licai'), icon: 'zengjin', to: '/licai' },
        // { name: this.$t('app.options'), icon: 'heyue', to: '/options' },
        // { name: this.$t('app.options'), icon: 'heyue', to: '/options' },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
