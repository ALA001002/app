<template>
  <BackPanel :title="$t('app.googleAuthenticate')">
    <div class="google padding16">
      <div class="flex-row">
        <div class="mr-2 index-style">01</div>
        <div class="flex1">
          <div>{{ $t('app.copyOrScanCodeFollows') }}</div>
          <div class="secret">
            <div class="color-gray title-code">{{ $t('app.length16Code') }}</div>
            <div class="bg-gray copy-code flex-row">
              <span class="flex1">{{ code.secretKey }}</span>
              <span class="color-main" v-copy="code.secretKey">{{ $t('app.copy') }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: left">
        <vue-qr :text="(code.secretKeyQrcode||'').replace('url=','')" :size="200"/>
      </div>
      <div class="flex-row  mt-2">
        <div class="mr-2 index-style">02</div>
        <div class="flex1">
          <div>{{ $t('app.openGoogle') }}</div>
          <img style="width: 200px;object-fit: contain;margin-top: 10px" src="@/assets/images/add-google.png" alt=""/>
        </div>
      </div>

      <div class="flex-row mt-2">
        <div class="mr-2 index-style">03</div>
        <div class="flex1">
          <div>{{ $t('app.returnApp') }}</div>
        </div>
      </div>
      <div class="tip">{{ $t('app.pleaseConfirmDataAndNext') }}</div>
      <button class="next" v-if="!checkFlag" @click="visible=true">{{ $t('next') }}</button>
      <button class="next" v-else @click="visible=true">{{ $t('confirm') }}</button>
      <van-dialog v-model="visible"
                  :show-confirm-button="false"
                  show-cancel-button
                  :cancel-button-text="$t('app.cancel')"
                  :title="$t('app.validCode')">
        <van-field v-model="codeValue" :placeholder="$t('app.pleaseInputCode')"/>
        <van-button type="primary" style="width: 100%" @click="bindGoogleSecret">{{$t('app.bind')}}</van-button>
      </van-dialog>
    </div>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import vueQr from 'vue-qr'
import {call, get} from 'vuex-pathify'
import {Toast} from 'vant'

export default {
  data() {
    return {
      codeValue: null,
      visible: false,
      checkFlag: false,
      code: {secretKeyQrcode: null, secretKey: null}
    }
  },
  components: {BackPanel, vueQr},
  computed: {
    user: get('user/info')
  },
  mounted() {
    this.loadQrCode()
  },
  methods: {
    ...call({
      updateInfo: 'user/info'
    }),
    // submit() {
    //   this.$http.post('/user/bindGoogleSecret', {
    //     googleSecretKey: this.code.secretKey,
    //     googleCaptcha: this.codeValue
    //   }).then(() => {
    //
    //   }).catch(() => {
    //     Toast.fail('app.bindError')
    //     self.visible = true
    //   })
    // },
    confirm() {
      const self = this
      this.$http.post('/user/checkGoogleSecret', {googleCaptcha: this.codeValue}).then(() => {
        self.checkFlag = true
      }).catch(() => {
        Toast.fail(this.$t('app.validError'))
        self.visible = true
      })
    },
    check() {

    },
    async bindGoogleSecret() {
      await this.$http.post('/user/bindGoogleSecret', {
        googleCaptcha: this.codeValue,
        googleSecretKey: this.code.secretKey
      })
      this.$toast('success')
      this.updateInfo()
      this.$router.back()
    },
    async loadQrCode() {
      const data = await this.$http.get('/user/createGoogleSecret')
      this.code = data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  touch-action: none;
}

.next {
  border: none;
  background: #FCD535;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  margin-top: 20px;
}

.tip {
  background: #FEF5D9;
  padding: 16px;
  border-radius: 10px;
  margin-top: 20px;
}

.google {
  background: white;
  height: 100%;

  .title-code {
    margin: 8px 0;
  }
}

.color-main {
  color: #B3A36C;
}

.index-style {
  font-size: 20px;
  color: #BCBDBC;
}

.color-gray {
  color: #BCBDBC;
}

.bg-gray {
  background: #f0f0f0;
}

.flex-row {
  display: flex;
}

.copy-code {
  padding: 16px;
  border-radius: 10px;
}

.flex1 {
  flex: 1;
}

.padding16 {
  padding: 16px;
}
</style>
