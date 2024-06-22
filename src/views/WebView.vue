<template>
  <BackPanel :title="title">
    <div id="panel" class="section" style="min-height: 100px" v-html="html"></div>
  </BackPanel>
</template>

<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Toast } from 'vant'
export default {
  components: { BackPanel },
  data() {
    return {
      title: null,
      html: null
    }
  },
  mounted() {
    NProgress.configure({ parent: '#panel' })
    this.title = this.$route.query.title
    this.load()
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    type() {
      return this.$route.query.type || 'id'
    }
  },
  watch: {
    id() {
      this.load()
    }
  },
  methods: {
    load() {
      this.html = null
      NProgress.start()
      var url = (this.type == 'key' ? 'common/getSysArticle?key=' : 'common/getSysNoticeById?id=') + this.id
      this.$http.api.get(url).then(data => {
        NProgress.done()
        data = data.data
        this.title = data.title
        this.html = data.content
      }).catch(err =>{
        NProgress.done()
        Toast.fail({ 
          icon: 'cross',
          message: err.msg,
          forbidClick: false, 
          duration: 2500
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
::v-deep .container {
  background-color: white !important;
  #panel {
    font-family: PingFangSC-Regular,PingFang SC;
    overflow-x: hidden;
    overflow-y: auto;
    image, img {max-width: 100%;}
    p{margin: 2px 0;}
  }
}
</style>
