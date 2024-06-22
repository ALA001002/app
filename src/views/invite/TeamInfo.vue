<template>
  <BackPanel :title="$t('invite.teamInfo')">
    <div class="tabs">
      <ul>
        <li v-for="(item,index) in tabs" v-bind:key="index+'_index'" @click="()=>showSubmenu(index)">
          <a type="primary">{{item}}</a>
          <span v-if="index!==(tabs.length-1)"> > </span>
        </li>
      </ul>
    </div>
    <div class="team-info">
      <div>
        <span>UID</span>
        <span>{{$t('invite.teamNum')}}</span>
        <span>{{$t('invite.rechargeNum')}}</span>
      </div>
      <template v-for="(item,index) in invites">
        <div v-bind:key="index" @click="()=>showTeam(item.uid)">
          <span>{{item.uid}}</span>
          <span>{{item.teamNum}}</span>
          <span>{{item.rechargeNum}}</span>
        </div>
      </template>
      <div v-if="!invites || invites.length===0">
        {{$t('invite.noData')}}
      </div>
    </div>
  </BackPanel>
</template>
<script>
import BackPanel from '@/components/layout/BackPanel.vue'
import {get} from 'vuex-pathify'

export default {
  components: {BackPanel},
  computed:{
    user: get('user/info')
  },
  data(){
    return {
      invites:[],
      tabs:[]
    }
  },
  watch:{
    user(){
      this.queryContent()
    }
  },

  mounted() {
    this.queryContent()
  },
  methods:{
    queryContent(){
      if(this.user){
        this.tabs = []
        this.tabs.push(this.user.uid)
        this.$http.get(`/invite/myTeamList?uid=${this.user.uid}`).then(res=>{
          this.invites = res
        })
      }
    },
    showTeam(uid){
      this.tabs = [...this.tabs,uid]
      this.$http.get(`/invite/myTeamList?uid=${uid}`).then(res=>{
        this.invites = res
      })
    },
    showSubmenu(index){
      const tab = this.tabs[index]
      this.tabs.length = index+1
      this.$http.get(`/invite/myTeamList?uid=${tab}`).then(res=>{
        this.invites = res
      })
    }
  },
}
</script>
<style scoped lang="scss">
.team-info{
  background: white;
  padding: 10px;
  >div{
    display: flex;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    align-items: center;
    span{
      flex: 1;
      text-align: center;
      &:first-child{
        flex: 0.5;
      }
    }
    &:not(:first-child){
      margin-top: 5px;
    }
  }
}
.tabs {
  padding: 5px 20px;
  ul {
    display: flex;
    li {
      margin-left: 10px;
      list-style: none;
      a{
        color: blue;
        text-decoration: underline;
      }
    }
  }
}
</style>
