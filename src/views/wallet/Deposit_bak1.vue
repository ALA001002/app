<template>
  <BackPanel :title="coin+' '+$t('wallet.deposit')">
    <div class="flex-y-full">
      <div class="flex-between px-4">
        <!-- <div class="link flex text-mid text-15px" @click="$router.push('/wallet/quicklyBuy/' + coin)">
          <img class="box18 mr-1" src="@/assets/images/new/home_icon_lend.svg">
          {{$t('extra.quicklyBuyCoins')}} <van-icon class=" ml-1" name="arrow"></van-icon>
        </div> -->
      </div>
      <div class="section page-full-part">
        <div class="part">
          <div class="card-bg flex-between  px-3 py-4" @click="showSelectModal=true">
            <div class="flex1">
              <span v-if="persion===1">{{ $t('deposit.selfRecharge') }}</span>
              <span v-else-if="persion===2">{{ $t('deposit.manualRecharge') }}</span>
              <!--              <span v-else>{{$t('wallet.expressway')}}</span>-->
              <!--              <span v-if="persion===2">{{$t('wallet.manualRecharge')}}</span>-->
            </div>
            <van-icon name="arrow" color="#ADACB0"></van-icon>
          </div>
          <!-- <div class="card-bg flex-between  px-3 py-4" @click="$refs.selectCoin.popup()" >
            <CoinImg class="box20 mr-2" :coin="coin"></CoinImg>
            <div class="flex1">
              <span>{{coin }}</span><span class="text-12px text-mid"></span>
            </div>
            <van-icon name="arrow" color="#ADACB0"></van-icon>
          </div> -->
          <div class="flex-between px-3 my-3">
            <span class="text-15px text-mid">{{ $t('deposit.chainName') }}</span>
            <div v-if="coin == 'USDT'" class="text-primary text-14px">{{usdtType===0?'TRC20':'ERC20'}}</div>
            <div v-else class="text-primary text-14px">{{ coin }}</div>
          </div>
          <div class="card-bg px-3 py-4" v-if="persion!==3">
            <div v-if="coin != 'USDT'">
              <div class="text-16px text-mid mb-5"> {{ $t('deposit.walletAddress') }}</div>
              <div class="my-3">
                <vue-qr ref="qr" v-if="address" :text="address" :size="160" class="m-auto radius-4"></vue-qr>
              </div>
              <div class="address mb-1  flex-between" style="margin-top: 42px;">
                <div class="text-10px flex1 wb text-mid">
                  {{ address }}
                </div>
                <div class="flex ml-3 text-13px text-mid" v-copy="address">
                  <i class="icon icon-fuzhi text-20px mr-1"/>{{ $t('deposit.copy') }}
                </div>
              </div>
            </div>
            <div v-else>
              <van-tabs v-model="usdtType" >
                <van-tab title='TRC20' @click="usdtType=0">
                  <div class="text-16px text-mid mb-5"> {{ $t('deposit.walletAddress') }}</div>
                  <div class="my-3">
                    <vue-qr ref="qr" v-if="address" :text="address" :size="160" class="m-auto radius-4"></vue-qr>
                  </div>
                  <div class="address mb-1  flex-between" style="margin-top: 42px;font-size: 0.5333rem">
                    <div class="text-10px flex1 wb text-mid">
                      {{ address }}
                    </div>
                    <div class="flex ml-3 text-13px text-mid" v-copy="address">
                      <i class="icon icon-fuzhi text-20px mr-1"/>{{ $t('deposit.copy') }}
                    </div>
                  </div>
                </van-tab>
                <van-tab title='ERC20' @click="usdtType=1">
                  <div class="text-16px text-mid mb-5"> {{ $t('deposit.walletAddress') }}</div>
                  <div class="my-3">
                    <vue-qr ref="qr" v-if="address" :text="address" :size="160" class="m-auto radius-4"></vue-qr>
                  </div>
                  <div class="address mb-1  flex-between" style="margin-top: 42px;font-size: 0.5333rem">
                    <div class="text-10px flex1 wb text-mid">
                      {{ address }}
                    </div>
                    <div class="flex ml-3 text-13px text-mid" v-copy="address">
                      <i class="icon icon-fuzhi text-20px mr-1"/>{{ $t('deposit.copy') }}
                    </div>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </div>

        </div>
        <!-- <div class="flex-between mt-4">{{$t('wallet.manualRecharge')}}
          <van-switch class="ml-2" active-color="#F6A702" inactive-color="#666" v-model="persion" size="16px" />
        </div> -->
        <van-form v-if="persion===2" :show-error="false" ref="form" @submit="onSubmit">

          <div class="input mt-4">
            <van-field autocomplete="new-password" v-model.trim="form.money" type="number" class="mt-0"
                       :placeholder="$t('deposit.rechargePrice')"
                       :rules="[{ required: true, message: $t('deposit.rechargePrice') }]" clearable/>
          </div>
          <div class="flex-between px-2 my-2">
            <span style="color: #F5A600"
                  class="text-12px text-mid">{{ $t('deposit.rechargeMin') }}:&nbsp;&nbsp;{{ rechargeMin }}{{ coin }}</span>
          </div>
          <div class="input  mt-4">
            <van-field autocomplete="new-password" v-model.trim="form.formAddress" class="mt-0"
                       :placeholder="$t('deposit.rechargeOrigin')"
                       :rules="[{ required: true, message: $t('deposit.rechargeOrigin') }]" clearable/>
          </div>
          <div class="input mt-4 flex-between">
            <span class="ml-4">{{ $t('deposit.rechargeCertificate') }}</span>
            <van-uploader class="block" v-model="fileList" :max-count="1" :after-read="afterRead" @delete="deleteFile"/>
          </div>
        </van-form>
        <!--        <van-form v-else-if="persion===3" :show-error="false" ref="form3" @submit="onSubmit3">
                  <div class="input mt-4">
                    <van-field autocomplete="new-password" v-model.trim="form.money" type="number" class="mt-0" :placeholder="$t('extra.rechargePrice')" :rules="[{ required: true, message: $t('extra.rechargePrice') }]" clearable />
                  </div>
                  <van-radio-group v-model="payPassageId" class="mt-4">
                    <van-cell-group>
                      <van-cell :title="item.passageName" v-for="item in fastList" :value="item.minEveryAmount + 'U - ' +  item.maxEveryAmount+'U'" clickable @click="payPassageId = item.id" :key="item.id">
                        <template #right-icon>
                          <van-radio class="ml-2" :name="item.id" />
                        </template>
                      </van-cell>
                    </van-cell-group>
                  </van-radio-group>
                </van-form>-->
      </div>
      <div class="btns section flex-between py-3" v-if="persion===3">
        <div class="footer-btn" @click="onSubmit3">{{ $t('wallet.submit') }}</div>
      </div>
      <div class="btns section flex-between py-3" v-else>
        <div class="footer-btn btn-plain mr-4" @click="save">{{ $t('invite.saveImage') }}</div>
        <div class="footer-btn" v-copy="persion===2?address:(tabIndex==0?trcAddress:address)">{{ $t('deposit.copy') }}</div>
        <div class="footer-btn ml-4" v-if="persion===2" @click="onSubmit">{{ $t('wallet.submit') }}</div>
      </div>
    </div>

<!--    <van-action-sheet v-model="showSelectModal" close-on-click-action :cancel-text="$t('app.cancel')" :actions="actions.filter(t=> ['ETH','BTC'].indexOf(this.coin)===-1 || t.type!==1 )"-->
<!--                      :round="false" @select="setType"/>-->
    <van-action-sheet v-model="showAccount" close-on-click-action :cancel-text="$t('app.cancel')" :actions="accounts"
                      :round="false" @select="accountSelect"/>
    <!-- <SelectCoinVue addPersion ref="selectCoin" filter="supRecharge" @select="coin=$event" :title="$t('extra.recharge')"></SelectCoinVue> -->
  </BackPanel>
</template>

<script>
// import SelectCoinVue from '@/components/SelectCoin.vue'
import BackPanel from '@/components/layout/BackPanel.vue'
import vueQr from 'vue-qr'
// import { downloadImg } from '@/utils/helper'
import saveImg from '@/utils/saveImg'

export default {
  components: {
    vueQr, BackPanel
    // SelectCoinVue,
  },
  data() {
    return {
      tabIndex: 0,
      coin: this.$route.params.coin,
      remark: '',
      showAccount: false,
      persion: 2,
      usdtType: 0,
      address: '',
      trcAddress: '',
      payPassageId: '',
      rechargeMin: 0,
      fastList: [],
      account: this.$t('extra.spotAccount'),
      fileList: [],
      accounts: [
        {
          name: this.$t('extra.spotAccount'),
        },
        {
          name: this.$t('extra.spotAccount') + '2',
        },
      ],
      form: {
        file: null,
        money: null,
        coin: null,
        formAddress: null,
        // toAddress: null,
      },
      showSelectModal: false,
      actions: [
        // { name: this.$t('wallet.expressway'), type: 3 },
        {name: this.$t('deposit.selfRecharge'), type: 1},
        {name: this.$t('deposit.manualRecharge'), type: 2},
      ],
    }
  },
  watch: {
    usdtType(val){
      const rqUrl = 'asset/manualRechargeAddress'
      this.$http.get(rqUrl, {currency:val===0?'USDT_TRC20':'USDT'})
          .then(data => {
            this.address = data.address
            this.form.coin = 'USDT'
            // this.form.toAddress = data
          })
    },
    coin: {
      handler(val) {
        this.form.coin = ''
        if (!val) return
        this.persion = 2
        // var rqUrl = 'asset/getWalletAddress'
        // if( ['ETH','BTC'].indexOf(this.coin)!==-1 ){
        //   this.persion = 2
        // }
        // if (this.persion == 2) {
        const rqUrl = 'asset/manualRechargeAddress'
        // }
        if (val === 'USDT') {
          this.usdtFlag = true
          // this.$http.get(rqUrl, {currency: 'USDT_TRC20'})
          //     .then(data => {
          //       if (this.persion == 1) {
          //         this.trcAddress = data
          //       } else {
          //         this.trcAddress = data.address
          //       }
          //       this.form.coin = 'USDT'
          //       // this.form.toAddress = data
          //     })
          this.$http.get(rqUrl, {currency: 'USDT_TRC20'})
              .then(data => {
                this.address = data.address
                this.form.coin = 'USDT'
                // this.form.toAddress = data
              })
        } else {
          this.$http
              .get(rqUrl, {currency: val})
              .then(data => {
                if (this.persion == 1) {
                  this.address = data
                } else {
                  this.address = data.address
                }
                this.form.coin = val
                // this.form.toAddress = data
              })
        }
        this.$http
            .get('common/getSysArticle?key=cb' + val.toLowerCase())
            .then(data => {
              if (data) {
                this.remark = data.content
              }
            })
        this.$http.get('pay/passageList').then(data => {
          this.fastList = data
        })
      },
      immediate: true,
    },
  },
  methods: {
    accountSelect(val) {
      // console.log(val)
      this.account = val.name
    },
    afterRead({file}) {
      this.form.file = file
    },
    deleteFile() {
      this.form.file = null
    },
    setType({type}) {
      this.persion = type
      if (type === 2) {
        if (this.form.coin == 'USDT') {
          this.$http.get('asset/manualRechargeAddress', {currency: 'USDT_TRC20'})
              .then(data => {
                this.trcAddress = data.address
                this.form.coin = 'USDT'
                this.rechargeMin = data.rechargeMin
                // this.form.toAddress = data
              })
          this.$http.get('asset/manualRechargeAddress', {currency: 'USDT'})
              .then(data => {
                this.address = data.address
                this.form.coin = 'USDT'
                this.rechargeMin = data.rechargeMin
                // this.form.toAddress = data
              })
        } else {
          this.$http
              .get('asset/manualRechargeAddress', {currency: this.form.coin})
              .then(data => {
                this.address = data.address
                // this.form.toAddress = data.address
                this.rechargeMin = data.rechargeMin
              })
        }
        return
      }
      if (type === 1) {
        if (this.form.coin == 'USDT') {
          this.$http.get('asset/getWalletAddress', {currency: 'USDT_TRC20'})
              .then(data => {
                this.trcAddress = data
                this.form.coin = 'USDT'
                // this.form.toAddress = data
              })
          this.$http.get('asset/getWalletAddress', {currency: 'USDT'})
              .then(data => {
                this.address = data
                this.form.coin = 'USDT'
                // this.form.toAddress = data
              })
        } else {
          this.$http
              .get('asset/getWalletAddress', {currency: this.form.coin})
              .then(data => {
                this.address = data
                // this.form.toAddress = data
              })
        }
        return
      }
      /*   if (type === 3) {
           this.fastList = []
           this.payPassageId = ''
           this.$http.get('pay/passageList').then(data => {
             this.fastList = data
           })
           return
         }*/
    },
    save() {
      saveImg(this.$refs.qr.$el)
    },
    onSubmit3() {
      if (!this.form.money) {
        return this.$toast(this.$t('extra.rechargePrice'))
      }
      if (!this.payPassageId) {
        return this.$toast(this.$t('extra.chooseExpressway'))
      }
      const way = this.fastList.find(item => item.id === this.payPassageId)
      if (
          this.form.money < way.minEveryAmount ||
          this.form.money > way.maxEveryAmount
      ) {
        return this.$toast(this.$t('extra.numNotValidate'))
      }

      // 跳转到外部更新
      if (window.plus && window.plus.os.name === 'Android') {
        this.$http
            .post('pay/createOrder', {
              amount: this.form.money,
              payPassageId: this.payPassageId,
            })
            .then(({payUrl}) => {
              localStorage.setItem('payUrl', payUrl)
              this.$router.push('/url')
            })
      } else {
        let newWindow = window.open('', '_blank')
        this.$http
            .post('pay/createOrder', {
              amount: this.form.money,
              payPassageId: this.payPassageId,
            })
            .then(({payUrl}) => {
              // window.open(payUrl)
              newWindow.location = payUrl
            })
      }
    },
    onSubmit() {
      if (!this.form.money) {
        return this.$toast(this.$t('deposit.rechargePrice'))
      }
      if (!this.form.formAddress) {
        return this.$toast(this.$t('deposit.rechargeOrigin'))
      }
      if (!this.form.file) {
        return this.$toast(this.$t('deposit.rechargeCertificate'))
      }

      if (this.form.coin === 'USDT') {
        if (this.tabIndex === 0) {
          this.form.coin = 'USDT_TRC20'
        } else {
          this.form.coin = 'USDT'
        }
      }
      // console.log({ ...this.form })
      const formData = new FormData()
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })
      this.$http.post('asset/recharge', formData).then(() => {
        if (this.form.coin === 'USDT' || this.form.coin === 'USDT_TRC20') {
          this.form.coin === 'USDT'
        }
        this.$toast(this.$t('extra.success'))
        this.$router.go(-1)
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.block ::v-deep {
  .van-uploader__preview,
  .van-uploader__upload {
    margin: 0;
    background: #333;
  }
}

.van-form {
  .input {
    background: #1d1c21;
    overflow: hidden;

    .van-field {
      background: #1d1c21;
      margin-top: 24px;
      border-radius: 4px;
      font-size: 16px;
      height: 60px;
      line-height: 40px;
    }

    .van-field {
      height: auto;
    }

    ::v-deep {
      .van-field__label {
        width: auto;
      }
    }
  }
}

.card-bg {
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
  border-radius: 0.21333rem;
  overflow: hidden;
  background: var(--card-bg-color) !important;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-y-full{
  background: white;
}

.my-3{
  text-align: center;
}
.py-3 {
  padding-top: 0.75rem!important;
  padding-bottom: 0.75rem!important;
}

.section {
  padding: 0.53333rem 0.8rem;
}
.btns {
  display: flex;
  justify-content: space-between;
}
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mr-4 {
  margin-right: 1rem!important;
}
.btn-plain {
  background: var(--color-green)!important;
  color: white!important;
  border: 0.05333rem solid #f2a900;
}
.footer-btn, .radius-4 {
  border-radius: 0.21333rem;
}
.footer-btn {
  width: 100%;
  height: 2.13333rem;
  color: #16151a;
  font-size: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
}
.wb {
  word-break: break-all;
}
.van-form .input{
  background: white;
}
.van-field__body{
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
}
.van-field__control {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: black;
  line-height: inherit;
  text-align: left;
  background-color: white;
  border: 0;
  resize: none;
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
}
.mt-0{
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
}
.van-form .input .van-field{
  background: white;
  color: var(--text-deep-color);
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
}
.mt-4{
  box-shadow: rgb(234, 234, 234) 0px 0px 0.53333rem;
}
</style>
