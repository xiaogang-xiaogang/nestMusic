<template>
  <div class="container">
    <div class="category" >
      <div class="all" :class="{'active':cate=='ALL'}" @click="change('ALL')">全部</div>
      <div class="china" :class="{'active':cate=='ZH'}" @click="change('ZH')">华语</div>
      <div class="english" :class="{'active':cate=='EA'}" @click="change('EA')">欧美</div>
      <div class="south-dog" :class="{'active':cate=='KR'}" @click="change('KR')">韩国</div>
      <div class="xiaoriben" :class="{'active':cate=='JP'}" @click="change('JP')">日本</div>
    </div>
    <div v-if="loading"><Loading></Loading></div>
    <div class="alList">
      <div class="al" v-for="(item, index) in alList" :key="index">
        <img v-lazy="item.url" alt="" @click="goAlList(item.id)">
        <div class="title" @click="goAlList(item.id)">{{ item.name }}</div>
        <div class="songer">{{ item.artist }}</div>
      </div>
      <div v-if="!canContinue"><Loading></Loading></div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { getNewAl } from '@/api/playList';
import { useRoute, useRouter } from 'vue-router';
import { Al } from '@/composale/al.d'
import { onMounted, onUnmounted, ref } from 'vue';
import Loading from '@/components/loading.vue';
import _ from 'lodash-es'

let count = ref(0)
let canContinue = ref(true)
let alList = [] as Array<Al>
let loading = ref(true)
const route = useRoute()
const router = useRouter()
let cate = ref('ALL')
if(route.query.cate){
  if(route.query.cate=='ZH'){
    cate.value='ZH'
  }else if(route.query.cate=='EA'){
    cate.value='EA'
  }else if(route.query.cate=='KR'){
    cate.value='KR'
  }else if(route.query.cate=='JP'){
    cate.value='JP'
  }
}
async function getData(area?:string){
  let limit = '15'
  if(count.value==0){
    alList = []
    limit = '25'
  }
  let res:any
  if(area){
    res = await getNewAl(count.value.toString(),area,limit)
  }else{
    if(route.query.area){
      res = await getNewAl(count.value.toString(),route.query.area.toString(),limit)
    }else{
      res = await getNewAl(count.value.toString(),'ALL',limit)
    }
  }
  for(let i=0;i<res.albums.length;i++){
    let al = {} as Al
    al.id = res.albums[i].id
    al.name = res.albums[i].name
    al.artist = res.albums[i].artists[0].name
    al.artistId = res.albums[i].artists[0].id
    al.url = res.albums[i].picUrl
    alList.push(al)
    count.value++
  }
  loading.value = false
}
getData()
async function change(index:string){
  if(cate.value!=index){
    cate.value = index
    loading.value = true
    router.push({
      name:'newMusic',
      query:{
        flag:'1',
        cate:index
      }
    })
    count.value=0
    getData(index)
  }
}

async function lazyGetData(){
  const scrollTop = document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  if(scrollTop+clientHeight>scrollHeight-300){
    canContinue.value = false
    if(route.query.cate){
      await getData(route.query.cate.toString())
      canContinue.value = true
    }else{
      await getData()
      canContinue.value = true
    }
  }
}

function canLazy(){
  if(canContinue.value==true){
    lazyGetData()
  }
}

function goAlList(id:String){
  router.push({
    name:'alList',
    query:{
      id:id.toString()
    }
  })
}

onMounted(()=>window.addEventListener('scroll',canLazy))
onUnmounted(()=>window.removeEventListener('scroll',canLazy))
</script>

<style lang="scss" scoped>
.container{
  .category{
    display: flex;
    font-weight: lighter;
    div{
      margin: 0 10px;
      cursor: pointer;
    }
    .active{
      font-weight: bold;
    }
    margin-bottom: 20px;
  }
  .alList{
    display: flex;
    flex-wrap: wrap;
    // overflow: hidden;
    .al{
      width: 200px;
      height: 240px;
      margin: 8px 10px;
      // margin-top: 10px;
      img{
        width: 200px;
        height: 200px;
        cursor: pointer;
      }
      div{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 20px;
        cursor: pointer;
      }
      .songer{
        font-weight: lighter;
        font-size: 14px;
      }
    }
  }
}
</style>