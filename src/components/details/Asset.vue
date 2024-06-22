<template>
  <van-pull-refresh v-model="isLoading" @refresh="load">
    <van-cell
      v-for="item in list"
      :key="item.id"
      :title="getTitle(item)"
      :label="item.operateTime"
      title-class="is-text-ellipsis"
    >
      <span :class="getColor(item.dim)">{{item.dim?'-':'+'}}{{Number(item.amount)}}</span><br>
    </van-cell>
    <van-empty v-if="!isLoading && !list.length" />
  </van-pull-refresh>
</template>

<script>
export default {
  props: {
    coin: String
  },
  data() {
    return {
      isLoading: false,
      show: false,
      data: {},
      list: []
    }
  },
  watch: {
    coin: {
      handler() {
        this.load()
      },
      immediate: true
    }
  },
  methods: {
    load() {
      this.$http.get('asset/getAssetHistory?coin=' + this.coin).then(data => {
        this.list = data
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
    getTitle(data) {
      switch(data.type) {
        case 1:
          return this.$t('wallet.assetStatus1')
        case 2:
          return this.$t('wallet.assetStatus2')
        case 3:
          return this.$t('wallet.assetStatus3')
        case 4:
          return this.$t('wallet.assetStatus4')
        case 5:
          return this.$t('wallet.assetStatus5')
        case 6:
          return this.$t('wallet.assetStatus6')
        case 7:
          return this.$t('wallet.assetStatus7')
        case 8:
          return this.$t('wallet.assetStatus8')
        case 10:
          return this.$t('wallet.assetStatus10')
        case 11:
          return this.$t('wallet.assetStatus11')
        case 12:
          return this.$t('wallet.assetStatus12')
        case 13:
          return this.$t('wallet.assetStatus13')
        case 14:
          return this.$t('wallet.assetStatus14')
        case 15:
          return this.$t('wallet.assetStatus15')
        case 16:
          return this.$t('wallet.assetStatus16')
        case 17:
          return this.$t('wallet.assetStatus17')
        case 18:
          return this.$t('wallet.assetStatus18')
        case 19:
          return this.$t('wallet.assetStatus19')
        case 20:
          return this.$t('wallet.assetStatus20')
        case 21:
          return this.$t('wallet.assetStatus21')
        case 22:
          return this.$t('wallet.assetStatus22')
        case 23:
          return this.$t('wallet.assetStatus23')
        case 24:
          return this.$t('wallet.assetStatus24')
        case 25:
          return this.$t('wallet.assetStatus25')
        default:
          return this.$t('wallet.assetStatus0')
      }
    },
    getColor(dim) {
      switch(dim) {
        case 0: return 'has-text-primary'
        case 1: return 'has-text-danger'
        default: return 'has-text-grey'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cellTitle {
  flex: inherit;
  width: 80px;
}
</style>
