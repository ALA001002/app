<template>
  <van-overlay :z-index="999" :show="showNewVersion" @click="showNewVersion=false">
    <div class="wrapper" @click.stop>
      <van-image :src="require('@/assets/images/update.png')" />
      <div class="section has-background-white">
        <p class="title is-5 is-flex-center">{{ $t('app.verionNew') }}<span class="ml-1 tag is-link">v{{ newVersion.version }}</span></p>
        <p class="has-text-weight-light my-5 is-size-7" v-html="newVersion.remark"/>
        <button class="button is-dark is-fullwidth is-rounded" @click="update"> {{ $t('app.verionUpdate') }} </button>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { get } from 'vuex-pathify'
import { download } from '@/utils/version'
import { loadVersion } from '@/utils/version'

export default {
  data() {
    return {
      showNewVersion: false
    }
  },
  created() {
    loadVersion()
  },
  computed: {
    version: get('version'),
    newVersion: get('newVersion')
  },
  watch: {
    newVersion(val) {
      if (val.version > this.version) {
        this.showNewVersion = true
      }
    }
  },
  methods: {
    update() {
      download(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  margin: 15vh 30px 0 30px;
  >div{
    width: 100%;
    box-sizing: border-box;
    border-radius:0 0 10px 10px;
    >.button {
      font-size: 16px;
    }
  }
}
</style>
