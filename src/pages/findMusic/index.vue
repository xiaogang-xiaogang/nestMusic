<template>
  <div class="container">
    <div class="header">
        <div class="every" @click="goRecommend" :class="{'active':active==0}">推荐</div>
        <div class="every" @click="goAllPlayList" :class="{'active':active==1}">歌单</div>
        <div class="every" @click="goRank" :class="{'active':active==2}">排行榜</div>
        <div class="every" @click="goAllArtist" :class="{'active':active==3}">歌手</div>
        <div class="every" @click="goNewMusic" :class="{'active':active==4}">最新音乐</div>
    </div>
    <router-view></router-view>
 </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {  useRoute, useRouter } from 'vue-router';
let active = ref(0)
const route = useRoute()
console.log(route.name)
if(route.name=='allPlayList'){
    active.value=1
}else if(route.name == 'rank'){
    active.value=2
}else if(route.name == 'newMusic'){
    active.value=4
}else if(route.name == 'allArtist'){
    active.value=3
}
const router= useRouter()
function goAllPlayList(){
    active.value = 1
    router.push({
        name:'allPlayList',
        query:{
            page:'1',
            cat:'全部'
        }
    })
}

function goRecommend(){
    active.value = 0
    router.push({
        name:'recommend'
    })
}

function goAllArtist(){
    active.value = 3
    router.push({
        name:'allArtist'
    })
}
function goRank(){
    active.value = 2
    router.push({
        name:'rank'
    })
}

function goNewMusic(){
    active.value = 4
    router.push({
        name:'newMusic',
        query:{
            flag:'0'
        }
    })
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgb(230, 230, 230);
    align-items: end;
    justify-content: center;
    .every{
        padding: 0 15px;
        height: 40px;
        cursor: pointer;
        color: #909399;
    }
    .active{
        border-bottom: 1px solid red;
        color: #000;
    }
    .every:hover{
        color: #000;
    }
}
</style>