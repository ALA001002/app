<template>
  <BackPanel>
    <div class="py-4 has-background-white">
      <h4 class="section title mb-1">
        <span>{{ $t('login.restPayPassword') }}</span>
      </h4>
      <p :style="sendTo?'':'visibility:hidden'" class="my-0 mx-3 has-text-grey-light">
        {{$t('app.sendTo')}} {{sendTo}}
      </p>
      <van-form :show-error="false" @submit="onSubmit">
        <van-field
          v-model="form.captcha"
          center
          clearable
          :placeholder="$t('login.enterCaptcha')"
          :rules="[{ required: true, message: $t('login.enterCaptcha') }]"
        >
          <template #button>
            <SendCaptcha :required="false" @send="show"/>
          </template>
        </van-field>
        <van-password-input
          :value="form.payPassword"
          :focused="showKeyboard"
          @focus="showKeyboard=true"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard=false"
        />
        <div style="margin: 16px;">
          <van-button block type="info" native-type="submit">
            {{ $t('login.sub') }}
          </van-button>
        </div>
      </van-form>
    </div>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import SendCaptcha from '@/components/SendCaptcha.vue'
import { Toast } from 'vant'
import { get, call } from 'vuex-pathify'
export default {
  components: { BackPanel, SendCaptcha },
  data() {
    return {
      showPwd: false,
      sendTo: null,
      showKeyboard: true,
      form: {
        payPassword: '',
        captcha: null
      }
    }
  },
  computed: {
    user: get('user/info')
  },
  methods: {
    ...call({
      updateInfo: 'user/info'
    }),
    onSubmit() {
      this.$http.post('user/modifyPwd', this.form).then(() => {
        Toast.success(this.$t('login.forgetSuccess'))
        this.updateInfo()
        this.$router.replace('/')
      })
    },
    show(data) {
      this.sendTo = data
    },
    onInput(key) {
      this.form.payPassword = (this.form.payPassword + key).slice(0, 6)
    },
    onDelete() {
      this.form.payPassword = this.form.payPassword.slice(0, this.form.payPassword.length - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 60px;
}
.title {
  font-size: 25px;
  font-weight: 500;
  margin-top: 0;
}
.small {
  color: #999999;
  font-size: 75%;
}
</style>
