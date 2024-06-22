<template>
  <BackPanel :title="$t('app.settings')">
    <van-cell :title="$t('app.setAccount')" to="/setting/account" is-link />
    <van-cell :title="$t('app.verionCheck')" is-link @click="dd">
      <div class="is-flex-center">
        <span class="is-grow">{{ version }}</span>
        <van-icon v-if="newVersion.version != version" class="pl-2 mr-1" dot />
      </div>
    </van-cell>
    <van-cell :title="$t('app.lang')" :value="langName" to="/setting/lang" is-link />
    <!-- <van-cell title="下单二次确认" is-link /> -->
    <van-cell @click="confirm">
      <div class="has-text-centered">{{ $t('app.logout') }}</div>
    </van-cell>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import { get, call } from 'vuex-pathify'
import { langs } from '@/i18n'
import { Dialog, Toast } from 'vant'
export default {
  components: { BackPanel },
  data() {
    return {
    }
  },
  computed: {
    lang: get('lang'),
    version: get('version'),
    newVersion: get('newVersion'),
    langName() {
      return (langs.find(p => p.id == this.lang) || {}).name
    }
  },
  methods: {
    logout: call('user/logout'),
    checkVersion: call('checkVersion'),
    confirm() {
      Dialog.confirm({ title: this.$t('app.confirmLogout') }).then(() => {
        this.logout()
        this.$router.push('/login')
      })
    },
    dd() {
      this.checkVersion({ callback: (data) => {
        if (data.version == this.version) {
          Toast('Latest version')
        }
      }})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
