<template>
  <BackPanel full :title="$t('extra.addAddress')">
    <div class="section page-full-part">
      <div class="card-bg  flex-between  px-3 py-4" @click="$refs.selectCoin.popup()">
        <div class="flex1">
          <div class="flex">
            <CoinImg class="box20 mr-2" :coin="coin"></CoinImg>
            <span>{{ coin }}</span><span class="text-12px text-mid"></span>
          </div>
        </div>
        <van-icon name="arrow" color="#ADACB0" size="16px"></van-icon>
      </div>
      <!-- <div class="flex my-3 mt-4" style="gap:15px">
        <div class="coin-type" :class="{active:coinType===type}" @click="coinType=type" v-for="type in coinTypes" :key="type">{{type}}</div>
      </div> -->
      <div class="text-15px text-shallow my-3">{{ $t('extra.address') }}</div>
      <input type="text" v-model="form.address" class="input-bg" :placeholder="$t('extra.enterAddress')">
      <div class="text-15px text-shallow my-3">{{ $t('extra.addressName') }}</div>
      <input type="text" v-model="form.remark" class="input-bg" :placeholder="$t('extra.enterAddressName')">
      <van-field
          v-model="form.captcha"
          center
          class="input-bg"
          style="margin-top:30px"
          clearable
          :placeholder="$t('login.enterCaptcha')"
          :rules="[{ required: true, message: $t('login.enterCaptcha') }]"
      >
        <template #button>
          <SendCaptcha :required="false" @send="show"/>
        </template>
      </van-field>
    </div>
    <div class="section">
      <div class="big-btn radius mt-5" :disabled="!form.address || !form.remark" @click="onSubmit">
        {{ $t('wallet.submit') }}
      </div>
    </div>
    <SelectCoinVue ref="selectCoin" filter="supWithdraw" @select="coin=$event"
                   :title="$t('extra.withdrawalType')"></SelectCoinVue>
  </BackPanel>
</template>

<script>
// import QrScan from '@/components/QrScan.vue'
// import { get } from 'vuex-pathify'
import SendCaptcha from '@/components/SendCaptcha.vue'
import {Toast} from 'vant'
import SelectCoinVue from '@/components/SelectCoin.vue'
import BackPanel from '@/components/layout/BackPanel.vue'

export default {
  components: {
    BackPanel,
    SelectCoinVue,
    SendCaptcha
  },
  data() {
    return {
      coin: this.$route.params.coin,
      coinType: 'ERC20',
      coinTypes: ['ERC20', 'TRC20'],
      form: {
        address: '',
        remark: '',
        captcha: '',
      },
    }
  },
  methods: {
    show(data) {
      this.sendTo = data
    },
    onSubmit() {
      this.$http
          .post('asset/bindWithdrawAddr', {coin: this.coin, ...this.form})
          .then(() => {
            Toast.success()
            this.$router.go(-1)
          })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.coin-type {
  background: #18171c;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  padding: 0 15px;
  border-radius: 2px;
  color: #9b9aa1;

  &.active {
    color: var(--primary);
  }
}

.py-4 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.px-3 {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}

.type-list .type-item {
  margin-bottom: 1.28rem;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex1 {
  flex: 1;
}

.flex {
  display: flex;
  align-items: center;
}

.mr-2 {
  margin-right: 0.5rem !important;
}

.box20 {
  width: 1.06667rem;
  height: 1.06667rem;
}

.card-bg {
  background: white !important;
  border-radius: 0.21333rem;
  padding: 0.53333rem;
  overflow: hidden;
  box-shadow: rgb(234, 234, 234) 0 0 0.53333rem;
}

.van-icon {
  position: relative;
  display: inline-block;
  font: normal normal normal 0.74667rem/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.input-bg {
  width: 100%;
  height: 2.56rem;
  background: white;
  border-radius: 0.42667rem;
  font-size: 0.69333rem;
  padding: 0 0.8rem;
}

.big-btn[disabled], .mid-btn[disabled] {
  background: #3B3A3F !important;
  color: #57565B !important;
  pointer-events: none;
}
 .big-btn.radius {
   border-radius: 0.53333rem;
 }
 .mt-5 {
   margin-top: 1.5rem !important;
 }
 .big-btn {
   width: 100%;
   height: 2.66667rem;
   border-radius: 0.21333rem;
   background: var(--color-green);
   color: var(--text-main);
   font-size: 0.85333rem;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
 }
 //.van-cell{
 //  border-radius: 0.21333rem;
 //  padding: 0 0.8rem;
 //}
</style>
