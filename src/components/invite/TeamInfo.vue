<template>
  <BackPanel :title="$t('invite.viewTeamInfo')">

  </BackPanel>
</template>
<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import {call} from 'vuex-pathify'

export default {
  props:['uid'],
  components: {BackPanel},
  methods: {
    ...call({
      updateInfo: 'user/info',
    })
  },
  mounted() {
  }
}
</script>
