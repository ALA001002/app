<template>
  <div style="min-height: 100vh; padding-bottom: 70px; position: relative;">
    <HeadSafeArea />
    <van-nav-bar
      safe-area-inset-top
      @click-left="$router.replace('/')"
    >
      <template #left>
        <img class="activity-back" src="@/assets/images/activity/return.png" alt="">
      </template>
    </van-nav-bar>
    <component :is="component" @change="(name) => component = name "/>
  </div>
</template>

<script>
import Login from '@/components/login/Index'
import Register from '@/components/login/Register'
import Forget from '@/components/login/Forget'
import HeadSafeArea from '@/components/HeadSafeArea'
export default {
  components: { Login, Register, Forget, HeadSafeArea },
  data() {
    return {
      component: 'Login'
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.component = 'Register'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.activity-back {
  width: 17px;
  height: 16px;
}
</style>
