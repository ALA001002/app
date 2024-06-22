<template>
  <BackPanel :title="$t('extra.withdrawalAddress')">
    <template slot="right" back>
      <img class="box20" @click="add" slot="right" src="@/assets/images/new/add.svg">
    </template>
    <div class="section">
      <div class="card-bg py-4 px-3 mb-4" v-for="item in list" :key="item.id" @click="back(item.address, item.id)">
        <div class="flex-between">
          <div class="flex">
            <CoinImg :coin="item.coin" class="box20 mr-2"></CoinImg>
            <span class="text-mid text-17px">{{item.coin}}</span>
          </div>
          <img class="box20" @click="del(item.id)" src="@/assets/images/new/delete.png">
          <!-- <div class="coin-type">ERC20</div> -->
        </div>
        <div class="text-mid text-15px mt-3 wb">{{$t('extra.address')}}: {{item.address}}</div>
        <div class="text-mid text-12px mt-3 wb">{{$t('wallet.remark')}}: {{item.remark}}</div>
      </div>
      <div class="card-bg radius-big" v-if="!loading&&!list.length">
        <no-data class="my-5"></no-data>
      </div>
      <div class="big-btn radius mt-5" @click="add" v-if="!loading&&!list.length">
        {{$t('extra.addAddress')}}
      </div>
    </div>
  </BackPanel>
</template>

<script>
import {Toast} from 'vant'
import BackPanel from '@/components/layout/BackPanel.vue'

export default {
  name: 'address-list',
  components: {BackPanel},
  data() {
    return {
      coin: this.$route.params.coin,
      loading: false,
      list: [],
      status: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.$http
        .get('asset/withdrawAddressList', { coin: this.coin })
        .then(data => {
          // console.log({ ...data[0] })
          this.list = data
        })
        .finally(() => {
          this.loading = false
        })
    },
    add() {
      this.$router.push('/wallet/addAddress/' + this.coin)
    },
    del(id) {
      const self = this
      this.status = 1
      this.$http
          .get('asset/delWithdrawAddress/'+id)
          .then(()=> {
            Toast.success()
            sessionStorage.removeItem('address')
            sessionStorage.removeItem('addressId')
            self.getData()
          })
    },
    back(address, id) {
      if(this.status == 1) {
        this.$router.go(-1)
      }
      sessionStorage.setItem('addressId', id)
      sessionStorage.setItem('address', address)
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
 .px-4 {
   padding-left: 1rem !important;
   padding-right: 1rem !important;
 }
 .big-title {
   font-size: 1.28rem;
   line-height: 3;
 }
.coin-type {
  background: #2c231c;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  padding: 0 15px;
  border-radius: 2px;
  color: var(--primary);
}
.mt-5 {
  margin-top: 1.5rem !important;
}
 .big-btn {
   width: 100%;
   height: 2.66667rem;
   border-radius: 0.21333rem;
   background: var(--color-green);
   color: var(--text-main);
   font-size: 0.85333rem;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
 }
 .flex-between {
   display: flex;
   align-items: center;
   justify-content: space-between;
 }
 .mr-2 {
   margin-right: 0.5rem !important;
 }
  .box20 {
    width: 1.06667rem;
    height: 1.06667rem;
  }
 .flex1 {
   flex: 1;
 }

 .flex {
   display: flex;
   align-items: center;
 }
 .card-bg{
   box-shadow:0px 0 10px 0px rgba(0,0,0,.1);
 }
</style>
