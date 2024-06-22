<template>
  <BackPanel :title="$t('app.security')">
<!--    <van-cell :title="$t('app.loginPassword')" to="/security/password" is-link/>-->
    <van-cell :title="$t('app.payPassword')"
              :value="user.payPwdStatus==0?$t('app.noSetPayPassword'):''" to="/security/payPassword" is-link/>
    <van-cell :title="$t('app.googleAuthenticate')"
              :value="user.googleSecretStatus==0?$t('app.noAuthenticate'):$t('app.authenticated')"
              :to="user.googleSecretStatus==1?null:'/google'" :is-link="user.googleSecretStatus!=1"/>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import { get } from 'vuex-pathify'
export default {
  components: { BackPanel },
  computed: {
    user: get('user/info')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
