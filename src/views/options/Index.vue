<template>
  <Layout>
    <!-- 头部 -->
    <div
      class="section pb-1 has-text-centered has-text-weight-bold is-size-6"
      slot="header"
    >
      {{ $t("app.options") }}
    </div>
    <div class="section has-background-white mt-3">
      <TradingList :list="list" @select="tradingSelect"/>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/components/layout/Index.vue'
import TradingList from '@/components/trading/TradingList.vue'
import { get } from 'vuex-pathify'

export default {
  name: 'Home',
  components: { Layout, TradingList },
  data() {
    return {
    }
  },
  computed: {
    hq: get('hq/hq'),
    list: function() {
      return this.hq
      //.filter(p => !!p.supTimeContract)
    }
  },
  methods: {
    tradingSelect(data) {
      this.$router.push('/options/'+data.symbolCode)
    }
  }
}
</script>
