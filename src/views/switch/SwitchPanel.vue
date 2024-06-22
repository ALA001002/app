<template>
  <BackPanel :title="$t('app.switch')">
    <div class="hero">
      <div class="section has-background-white mb-2">
        <div class="is-flex-center mt-4">
          <van-button class="is-grow sw-btn" @click="showFormList=true">{{form.from}}</van-button>
          <van-icon class-prefix="icon" class="mx-3" name="qiehuan" @click="sw"/>
          <van-button class="is-grow sw-btn" @click="showToList=true">{{form.to}}</van-button>
        </div>
        <!-- 汇率 -->
        <van-field v-model="rateName" class="mt-4 mb-2 input disable" :label="$t('wallet.rate')" readonly/>
      </div>
      <div class="section has-background-white is-grow has-text-grey-light">
        <p>{{$t('exchange.balance')}}: {{fromWallet.balance}} {{fromWallet.currency}}</p>
        <van-field v-model="form.amount" class="input" type="number" :placeholder="$t('wallet.enterNum')">
          <template #button>
            {{form.from}} | <span class="has-text-info" @click="form.amount=fromWallet.balance">{{$t('wallet.all')}}</span>
          </template>
        </van-field>
        <p>{{$t('wallet.anticipate')}}: {{toNum}} {{toWallet.currency}}</p>
        <div class="mt-5">
          <van-button block type="info" :disabled="form.amount < data[form.from+'Min']" native-type="submit" @click="sub">{{$t('wallet.submit')}}</van-button>
        </div>
        <div class="html-content mt-2" v-html="remark"/>
      </div>
    </div>
    <van-action-sheet v-model="showFormList" :actions="formList" :cancel-text="$t('app.cancel')" close-on-click-action @select="formSelect"/>
    <van-action-sheet v-model="showToList" :actions="toList" :cancel-text="$t('app.cancel')" close-on-click-action @select="toSelect"/>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import { get } from 'vuex-pathify'
import { Toast, Dialog } from 'vant'
export default {
  components: { BackPanel },
  data() {
    return {
      data: {},
      remark: null,
      showFormList: false,
      showToList: false,
      form: {
        from: 'ETH',
        to: 'USDT',
        amount: null
      }
    }
  },
  created() {
    this.load()
    this.form.from = this.$route.query.from || 'ETH'
    this.form.to = this.$route.query.to || 'USDT'
  },
  computed: {
    userWallet: get('user/wallet'),
    wallet() {
      return this.userWallet.filter(p => p.supExchange === 1)
    },
    hq: get('hq/hq'),
    fromWallet() {
      return this.wallet.find(p => this.form.from == p.currency) || {}
    },
    toWallet() {
      return this.wallet.find(p => this.form.to == p.currency) || {}
    },
    rate() {
      if (this.form.from != 'USDT') {
        var hqFrom = this.hq.find(p => p.from == this.form.from) || {}
        if (this.data[this.form.from.toLowerCase()]) {
          hqFrom = this.data[this.form.from.toLowerCase()]
        }
        return this.toNumber(hqFrom.price)
      } else {
        var hqTo = this.hq.find(p => p.from == this.form.to) || {}
        if (this.data[this.form.to.toLowerCase()]) {
          hqTo = this.data[this.form.to.toLowerCase()]
        }
        return this.toNumber(1/hqTo.price)
      }
    },
    rateName() {
      return `1 ${this.form.from} ≈ ${this.rate} ${this.form.to}`
    },
    toNum() {
      var feeRate = this.data.feeRate
      var name = this.form.from !== 'USDT' ? this.form.from.toLowerCase() : this.form.to.toLowerCase()
      if (this.data[name]) feeRate = this.data[name].feeRate
      return this.toNumber((1 - feeRate) * this.rate * this.form.amount)
    },
    formList() {
      return this.wallet.filter(p=>p.currency!='PPB').map(p => {
        return {
          name: p.currency
        }
      })
    },
    toList() {
      var list
      if (this.form.from == 'USDT') {
        list = this.wallet.filter(p=>p.currency!='PPB').filter(p => p.currency != 'USDT')
      } else {
        list = this.wallet.filter(p=>p.currency!='PPB').filter(p => p.currency == 'USDT')
      }
      return list.map(p => {
        return {
          name: p.currency
        }
      })
    }
  },
  methods: {
    load() {
      this.$http.get('common/getExchangeInfo').then(data => this.data = data)
      this.$http.get('common/getSysArticle?key=sd').then(data => this.remark = data.content)
    },
    sub() {
      Dialog.confirm({ title: this.$t('wallet.confirmSwitch') }).then(() => {
        this.$http.post('asset/quickExchange', this.form).then(() => {
          Toast.success()
          this.form.amount = null
        })
      })
    },
    sw() {
      var tmp = this.form.from
      this.form.from = this.form.to
      this.form.to = tmp
    },
    formSelect(action) {
      this.form.from = action.name
      this.$nextTick(() => {
        this.form.to = this.toList[0].name
      })
    },
    toSelect(action) {
      this.form.to = action.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hero {
  height: 100%;
}
.input {
  border: 1px solid #F4F5F6;
  border-radius:2px;
}
.disable {
  background-color: #F4F5F6;
  ::v-deep {
    .van-cell__title {
      color: #aaaaaa;
    }
    .van-field__control{
      text-align: right;
    }
  }
}
.sw-btn {
  ::v-deep {
    .van-button__content{
      justify-content: space-between;
      &::after {
        font-family: "icon" !important;
        align-items: center;
        display: inline-flex;
        justify-content: center;
        content: "\e622";
        font-size: 8px;
        color: #aaaaaa;
      }
    }
  }
}
</style>
