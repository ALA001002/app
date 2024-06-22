<template>
  <BackPanel :title="$t('app.setAccount')">
    <van-cell title="UID" :value="user.uid" />
    <van-cell :title="$t('app.avatar')" to="/setting/avatar" is-link>
      <template #right-icon>
        <Img round width="24px" height="24px" fit="cover" bak="icon icon-morentouxiang" :src="user.avatar"/>
      </template>
    </van-cell>
    <van-cell :title="$t('app.nickname')" :value="user.nickName || $t('app.noNickname')" :to="user.nickName?null:'/setting/nickname'" :is-link="!user.nickName"/>
    <!--<van-cell :title="$t('app.area')" :value="user.areaName"/>-->
    <!--<van-cell :title="$t('app.bindPhone')" :value="user.phone||'-'"/>-->
    <van-cell :title="$t('app.bindMail')" :value="user.email||'-'"/>
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
