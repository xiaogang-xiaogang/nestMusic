<template>
  <div class="container">
    <div v-if="detailLoading"><Loading></Loading></div>
    <template v-else> 
      <div class="header" >
      <div class="left">
        <img :src="artistDetail.imgUrl" alt="">
      </div>
      <div class="right">
        <div class="name">{{ artistDetail.name }}</div>
        <div class="tag" v-if="artistDetail.alias">
          <div v-for="(item, index) in artistDetail.alias" :key="index">{{ item }}</div>
        </div>
        <div>收藏</div>
        <div class="size">
          <div>单曲数:{{ artistDetail.musicSize }}</div>
          <div>专辑数:{{ artistDetail.albumSize }}</div>
          <div>mv数:{{ artistDetail.mvSize }}</div>
        </div>
      </div>
    </div>
    <div class="title">
      <div @click="changeCom(0)" :class="{'active':comIndex==0}">专辑</div>
      <div @click="changeCom(1)" :class="{'active':comIndex==1}">MV</div>
      <div @click="changeCom(2)" :class="{'active':comIndex==2}">歌手详情</div>
      <div @click="changeCom(3)" :class="{'active':comIndex==3}">相似歌手</div>
    </div>
    <component :is="com" :id="artistDetail.id" style="margin-left: 50px;margin-top: 30px;"></component>
    </template>
 </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { getArtistDetail } from '@/api/aritist'
import { ArtistDetail } from '@/composale/artist';
import { computed, ref } from 'vue';
import Loading from '@/components/loading.vue';
import Album from './album.vue'
import Mv from './mv.vue'
import ArtistDe from './artistDe.vue'
import Smiliar from './smiliar.vue'

const route = useRoute()
let artistDetail = {} as ArtistDetail
let detailLoading = ref(true)
let comIndex = ref(0)
const com = computed(()=>{
  if(comIndex.value==0){
    return Album
  }else if(comIndex.value==1){
    return Mv
  }else if(comIndex.value==2){
    return ArtistDe
  }else{
    return Smiliar
  }
})
async function getSongerDetail(){
    if(route.query.id){
        let res = await getArtistDetail(route.query.id.toString())
        artistDetail.id = res.artist.id
        artistDetail.albumSize = res.artist.albumSize
        artistDetail.musicSize = res.artist.musicSize
        artistDetail.mvSize = res.artist.mvSize
        artistDetail.imgUrl = res.artist.avatar
        artistDetail.name = res.artist.name
        if(res.artist.alias){
          artistDetail.alias = []
          for(let i=0;i<res.artist.alias.length;i++){
            artistDetail.alias.push(res.artist.alias[i])
          }
        }
        detailLoading.value = false
    }
}
getSongerDetail()

function changeCom(index:number){
  if(index!=comIndex.value){
    comIndex.value = index
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: calc(100% - 250px) ;
  .header{
    margin-left: 50px;
    display: flex;
    .left{
      width: 20%;
      margin-right: 40px;
      img{
        width: 100%;
      }
    }
    .right{
      width: 70%;
      .name{
        font-size: 30px;
        font-weight: bolder;
      }
      .tag{
        display: flex;
        div{
          margin-right: 10px;
          font-size: 14px;
          font-weight: lighter;
        }
      }
      .size{
        display: flex;
        div{
          margin-right: 20px;
        }
      }
    }
  }
  .title{
    margin-left: 50px;
    margin-top: 50px;
    width: calc(100% - 50px);
    display: flex;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    font-size: 20px;
    div{
      padding: 4px 10px;
      cursor: pointer;
    }
    .active{
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>