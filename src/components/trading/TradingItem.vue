<template>
  <div @click="select">
    <span class="icon"><img style="border-radius: 50%;" :src="icon" /></span>
    <span class="has-text-left">{{ from }}<small class="has-text-grey-light">/{{ to }}</small></span>
    <van-skeleton title-width="100%" title :loading="!price && price != 0">
      <span class="has-text-centered">{{ numFilter(price) }}</span>
    </van-skeleton>
    <van-skeleton title-width="100%" title :loading="!change && change != 0">
      <span class="has-text-right">
        <TextFormat
          class="is-pulled-right"
          :float="change"
          :text="change"
          isFormat
          isBlock
        />
      </span>
    </van-skeleton>
  </div>
</template>

<script>
import TextFormat from '@/components/TextFormat.vue'
export default {
  props: {
    from: String,
    to: String,
    price: String,
    change: Number,
    icon: String
  },
  components: { TextFormat },
  methods: {
    select() {
      this.$emit('select')
    },
    numFilter(value) {
      var tempVal
      if(value > 1){
        tempVal = parseFloat(value).toFixed(7)
      }else{
        tempVal = parseFloat(value).toFixed(10)
      }
      var realVal = tempVal.substring(0, tempVal.length - 1)
      return realVal
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .van-skeleton__title {
  height: 20px;
}
.icon{
  width: 32px;
  height: 32px;
  img{
    width: 32px;
    height: 32px;
  }
}
</style>
