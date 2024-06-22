<template>
  <BackPanel>
    <div class="py-4 has-background-white">
      <h4 class="section title mb-1">
        <span>{{ $t('login.restPassword') }}</span>
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
        <van-field
          v-model="form.password"
          :placeholder="$t('login.enterPWD2')"
          :type="!showPwd?'password':'text'"
          :right-icon="!showPwd?'eye-o':'closed-eye'"
          :rules="[{ required: true, message: $t('login.enterPWD2'), pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/ }]"
          clearable
          @click-right-icon="showPwd = !showPwd"
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
import { get } from 'vuex-pathify'
export default {
  components: { BackPanel, SendCaptcha },
  data() {
    return {
      showPwd: false,
      sendTo: null,
      form: {
        password: null,
        captcha: null
      }
    }
  },
  computed: {
    user: get('user/info')
  },
  methods: {
    onSubmit() {
      this.$http.post('user/modifyPwd', this.form).then(() => {
        Toast.success(this.$t('login.forgetSuccess'))
        this.$router.back()
      })
    },
    show(data) {
      this.sendTo = data
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