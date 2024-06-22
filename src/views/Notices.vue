<template>
  <BackPanel :title="$t('app.notice')">
    <van-cell
      v-for="item in list"
      :key="item.id"
      :title="item.title"
      :label="parseTime(item.createTime, '{y}-{m}-{d}')"
      :to="`/view?id=${item.id}&title=${item.title}`"
      is-link/>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import { parseTime } from '@/utils/helper'
export default {
  components: { BackPanel },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    parseTime,
    load() {
      this.$http.get('common/getSysNoticeList?type=1').then(data => {
        this.list = data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
