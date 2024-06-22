<template>
  <div id="iframe-view">
    <BackPanel :title="$t('app.contactService')">
      <iframe :src=address frameborder="0">

      </iframe>
    </BackPanel>
  </div>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
export default {
  name: 'iframe',
  data(){
    return {
      address:''
    }
  },
  components:{
    BackPanel
  },
  mounted() {
    this.loadKefu(this.$route.params.type)
  },
  methods:{
    loadKefu(type){
      let self = this
      // this.address = `https://chatlink.meiqia.cn/widget/standalone.html?eid=6656e2d7bc88534ad3ab8ef448515ccd&language=en&type=${type}`
      this.$http.get(`/common/kefuAddress?type=${type}`).then((data)=>{
        self.address = data
      })
    }
  }
}
</script>

<style scoped>
#iframe-view,iframe{
  height: 100%;
  width: 100%;
}
</style>
