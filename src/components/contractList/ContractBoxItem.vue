<template>
  <router-link tag="div" class="box has-text-dark  has-text-weight-bold" :to="data?'/options/'+data.symbolCode:''">
    <small>{{ data.symbolName }}</small>
    <p class="is-size-6 my-1" style="line-height: 1rem">
      <van-skeleton title-width="100%" title :loading="!data.price && data.price != 0">
        <TextFormat :float="data.change" :text="numFilter(data.price)" />
      </van-skeleton>
    </p>
    <van-skeleton title-width="100%" title :loading="!data.change && data.change != 0">
      <small>
        <TextFormat :float="data.change" :text="data.change" isFormat />
      </small>
    </van-skeleton>
  </router-link>
</template>

<script>
import TextFormat from '@/components/TextFormat.vue'
export default {
  props: {
    data: Object
  },
  components: { TextFormat },
  methods: {
    numFilter(value) {
      var tempVal
      if(value > 1){
        tempVal = parseFloat(value).toFixed(3)
      }else{
        tempVal = parseFloat(value).toFixed(5)
      }
      let realVal = tempVal.substring(0, tempVal.length - 1)
      return realVal
    }
  }

}
</script>
<style lang="scss" scoped>
.box {
  width: 108px;
  ::v-deep .van-skeleton__row:not(:first-child) {
    margin: 0.34rem auto auto auto;
  }
}
</style>
