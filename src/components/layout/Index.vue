<template>
  <div class="hero is-full">
    <HeadSafeArea />
    <slot name="header" />
    <PullPanel class="container has-background-light">
      <slot />
    </PullPanel>
    <div class="footer">
      <TabFooter />
    </div>
  </div>
</template>

<script>
import HeadSafeArea from '../HeadSafeArea'
import TabFooter from '../TabFooter'
import PullPanel from '@/components/PullPanel.vue'
export default {
  components: { HeadSafeArea, TabFooter, PullPanel },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.container {
  overflow: auto;
  flex-basis: 0%;
  width: 100%;
}
.is-full{
  height: 100%;
}
</style>
