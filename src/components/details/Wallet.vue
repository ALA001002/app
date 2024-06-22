<template>
  <van-pull-refresh v-model="isLoading" @refresh="load">
    <van-cell
      v-for="item in list"
      :key="item.id"
      :title="getDirection(item.type, true, item.hash)"
      :label="item.createTime"
      title-class="is-text-ellipsis"
      is-link
      @click="select(item)"
    >
      <template #icon>
        <div class="is-flex-center">
          <van-icon :class="getColor(item.type)" size="28" style="width: 40px" class-prefix="icon" :name="getTypeIcon(item.type)" />
        </div>
      </template>
      <span class="has-text-dark">{{item.money}}</span><br>
      <span :class="getColor(item.status)">{{getStatus(item.status)}}</span>
    </van-cell>
    <van-empty v-if="!isLoading && !list.length" />
    <van-popup v-model="show" position="bottom" get-container="body" round closeable safe-area-inset-bottom>
      <van-cell-group class="mt-6">
        <van-cell :value="getDirection(data.type)" :title="$t('wallet.direction')" readonly />
        <van-cell :value="data.hash || '-'" :title="$t('wallet.hash')" title-class="cellTitle" readonly />
        <van-cell :value="data.from" :title="$t('wallet.from')" title-class="cellTitle" readonly />
        <van-cell :value="data.toAddress" :title="$t('wallet.to')" title-class="cellTitle" readonly />
        <van-cell :value="data.coin" :title="$t('wallet.coin')" readonly />
        <van-cell :value="data.money" :title="$t('wallet.num')" readonly />
        <van-cell :value="data.fee" :title="$t('wallet.fee')" readonly />
        <van-cell :value="getStatus(data.status)" :title="$t('wallet.status')" readonly />
        <van-cell :value="data.createTime" :title="$t('wallet.time')" readonly />
<!--        <van-cell :value="data.remark" :title="$t('wallet.remark')" title-class="cellTitle" readonly />-->
      </van-cell-group>
    </van-popup>
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
      this.$http.get('asset/withdrawHistory?coin=' + this.coin).then(data => {
        this.list = data
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
    getStatus(i) {
      switch(i) {
        case 1: return 'success'
        case 2: return 'fail'
        default: return 'pendding'
      }
    },
    getColor(type) {
      switch(type) {
        case 4: return 'has-text-primary'
        case 5: return 'has-text-primary'
        case 2: return 'has-text-danger'
        case 3: return 'has-text-danger'
      }
    },
    getTypeIcon(type) {
      switch(type) {
        case 2: return 'tibi'
        case 3: return 'tibi'
        case 4: return 'chongzhi'
        case 5: return 'chongzhi'
      }
    },
    getDirection(type) {
      switch(type) {
        case 2: return this.$t('wallet.walletStatus2')
        case 3: return this.$t('wallet.walletStatus2')
        case 4: return this.$t('wallet.walletStatus4')
        case 5: return this.$t('wallet.walletStatus4')
      }
    },
    select(data) {
      this.data = data
      this.show = true
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
