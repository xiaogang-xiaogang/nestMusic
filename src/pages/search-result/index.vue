<template>
  <div class="container">
    <div class="title">{{ route.query.keyword }}
        <span v-if="route.query.type=='1'&& res">
            找到{{ res.songCount }}单曲
        </span>
        <span v-if="route.query.type=='100' && res">
            找到{{ res.artistCount }}歌手
        </span>
        <span v-if="route.query.type=='10' && res">
            找到{{ res.albumCount }}专辑
        </span>
        <span v-if="route.query.type=='1000' && res">
            找到{{ res.playlistCount }}歌单
        </span>
    </div>
    <div class="tag-container">
        <div @click="changeType('1')" class="tag" :class="{'active':route.query.type=='1'}">单曲</div>
        <div @click="changeType('100')" class="tag" :class="{'active':route.query.type=='100'}">歌手</div>
        <div @click="changeType('10')" class="tag" :class="{'active':route.query.type=='10'}">专辑</div>
        <div @click="changeType('1000')" class="tag" :class="{'active':route.query.type=='1000'}">歌单</div>
    </div>
    <div v-if="loading"><Loading></Loading></div>
    <component :is="com" :res="res"  v-else></component>
 </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Songs from './songs.vue'
import Albums from './albums.vue'
import Playlists from './platlists.vue'
import Artists from './artists.vue'
import { searchAll, cancelSearchAll } from '@/api/findMusic';
import Loading from '@/components/loading.vue';



const route = useRoute()
let res:any
let loading = ref(true)
const com = computed(()=>{
    if(route.query.type=='1'){
        return Songs
    }else if(route.query.type=='10'){
        return Albums
    }else if(route.query.type=='100'){
        return Artists
    }else{
        return Playlists
    }
})

async function getData(){
    cancelSearchAll()
    if(route.query.page){
        res = await searchAll(route.query.keyword,route.query.type,(route.query.page-1)*50)
        console.log(res)
        loading.value = false
    }else{
        res = await searchAll(route.query.keyword,route.query.type,0)
        loading.value = false
    }
}
getData()
watch(
    ()=>route.query.keyword,
    keyword => {
        loading.value = true
        
    }
)
watch(
    ()=>route.query.type,
    keyword => {
        loading.value = true
    }
)
watch(
    ()=>route.query.page,
    keyword => {
        loading.value = true
        getData()
    }
)

const router = useRouter()
function changeType(type:string){
    router.push({
        name:'search',
        query:{
            keyword:route.query.keyword,
            type,
            page:'1'
        }
    }).then(()=>{
        getData()
    })
}
</script>

<style lang="scss" scoped>
.container{
    padding-left: 50px;
    width: calc(100% - 300px);
    .title{
        font-size: 30px;
        span{
            font-size: 14px;
        }
    }
    .tag-container{
        display: flex;
        width: 100%;
        border-bottom: 1px solid rgba(128, 128, 128, 0.325);
        div{
            width: 60px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        }
        .active{
            color: red;
            border-bottom: red solid 1px;
        }
    }
}
</style>