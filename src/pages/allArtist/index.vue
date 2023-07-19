<template>
  <div class="container">
    <div class="header">
        <div class="area">
            <div class="title">语种:</div>
            <div @click="changeArea('-1')" :class="{'active':area=='-1'}">全部</div>
            <div @click="changeArea('7')" :class="{'active':area=='7'}">华语</div>
            <div @click="changeArea('96')" :class="{'active':area=='96'}">欧美</div>
            <div @click="changeArea('8')" :class="{'active':area=='8'}">日本</div>
            <div @click="changeArea('16')" :class="{'active':area=='16'}">韩国</div>
            <div @click="changeArea('0')" :class="{'active':area=='0'}">其他</div>
        </div>
        <div class="cate">
            <div class="title">分类:</div>
            <div @click="changeType('-1')" :class="{'active':type=='-1'}">全部</div>
            <div @click="changeType('1')" :class="{'active':type=='1'}">男歌手</div>
            <div @click="changeType('2')" :class="{'active':type=='2'}">女歌手</div>
            <div @click="changeType('3')" :class="{'active':type=='3'}">乐队组合</div>
        </div>
        <div class="initail">
            <div class="title">筛选:</div>
            <div @click="changeInit(item)" :class="{'active':(init=='-1'&&item=='热门') || (init=='0'&&item=='#') || init==item}" v-for="(item, index) in initail" :key="index">{{ item.toUpperCase() }}</div>
        </div>
    </div>
    <div v-if="loading"><Loading></Loading></div>
    <div class="songer-list" v-else>
        <div class="songer" v-for="(item, index) in songers" :key="index">
            <img v-lazy="item.imgUrl" alt="" @click="goArtistList(index)">
            <div class="name" @click="goArtistList(index)">{{ item.name }}</div>
        </div>
        <div v-if="!cont" style="width: 85%;"><Loading></Loading></div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import {Artist} from '@/composale/artist.d'
import { getArtist, cancelgetArtist } from '@/api/aritist'
import  Loading from '@/components/loading.vue'
import { useRoute, useRouter } from 'vue-router';

const initail = ['热门','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','#']
let area = ref('-1')
let type = ref('-1')
let init = ref('-1')

let count = 0
let loading = ref(true)
let cont = ref(true)
const songers = ref<Array<Artist>>([]);
const router = useRouter()
const route = useRoute()
if(route.query.area){
    area.value = route.query.area.toString()
}
if(route.query.type){
    type.value = route.query.type.toString()
}
if(route.query.init){
    init.value = route.query.init.toString()
    
}


async function changeArea(index:string){
    if(area.value!=index){
        area.value = index
        router.push({
            name:'allArtist',
            query:{
                area:area.value,
                type:type.value,
                init:init.value
            }
        })
        count=0
        songers.value=[]
        loading.value=true
        await cancelgetArtist('取消请求')
        getData()
    }
}

async function changeType(index:string){
    if(type.value!=index){
        type.value = index
        router.push({
            name:'allArtist',
            query:{
                area:area.value,
                type:type.value,
                init:init.value
            }
        })
        count=0
        songers.value=[]
        loading.value=true
        await cancelgetArtist('取消请求')
        getData()
    }
}

async function changeInit(index:string){
    if(index=='热门'&&init.value!='-1'){
        init.value='-1'
        router.push({
            name:'allArtist',
            query:{
                area:area.value,
                type:type.value,
                init:init.value
            }
        })
        count=0
        songers.value=[]
        loading.value=true
        await cancelgetArtist('取消请求')
        getData()
    }else if(index=='#'&&init.value!='0'){
        init.value='0'
        router.push({
            name:'allArtist',
            query:{
                area:area.value,
                type:type.value,
                init:init.value
            }
        })
        count=0
        songers.value=[]
        loading.value=true
        await cancelgetArtist('取消请求')
        getData()
    }else if(index!=init.value){
        init.value=index
        router.push({
            name:'allArtist',
            query:{
                area:area.value,
                type:type.value,
                init:init.value
            }
        })
        count=0
        songers.value=[]
        loading.value=true
        await cancelgetArtist('取消请求')
        getData()
    }
}

async function getData() {
    let res = await getArtist(area.value,type.value,init.value,count.toString())
    if(res.more){
        if(res.more==false){
            document.removeEventListener('scroll',canScroll)
        }
    }
    for(let i=0;i<res.artists.length;i++){
        let songer  = {} as Artist
        songer.id = res.artists[i].id
        songer.name = res.artists[i].name
        songer.imgUrl = res.artists[i].img1v1Url
        count++
        songers.value.push(songer)
    }
    loading.value = false
}
getData()
async function getLazy(){
    let scrollTop = document.documentElement.scrollTop
    let scrollHeight = document.documentElement.scrollHeight
    let clientHeight = document.documentElement.clientHeight
    if(clientHeight+scrollTop>scrollHeight-300){
        cont.value = false
        await getData()
        cont.value=true
    }
}
function canScroll(){
    if(cont.value==true){
        getLazy()
    }
}
function goArtistList(index:number){
    router.push({
        name:'artistList',
        query:{
            id:songers.value[index].id.toString()
        }
    })
}
onMounted(() => {
    document.addEventListener('scroll',canScroll)
})
onUnmounted(() => {
    document.removeEventListener('scroll',canScroll)
})
</script>

<style lang="scss" scoped>
.container{
    margin-left: 50px;

    .header{
        .area{
            display: flex;
            margin: 10px 0;
            div{
                margin: 0 10px;
                cursor: pointer;
            }
            .title{
                cursor: default;
            }
        }
        .cate{
            display: flex;
            margin: 10px 0;
            div{
                margin: 0 10px;
                cursor: pointer;
            }
            .title{
                cursor: default;
            }
        }
        .initail{
            display: flex;
            margin: 10px 0;
            flex-wrap: wrap;
            div{
                margin: 0 10px;
                cursor: pointer;
            }
            .title{
                cursor: default;
            }
        }
    }
    .songer-list{
        display: flex;
        flex-wrap: wrap;
        .songer{
            width: 200px;
            height: 230px;
            margin: 0 10px;
            margin-bottom: 10px;
            img{
                width: 200px;
                height: 200px;
                border-radius: 10px;
                cursor: pointer;
            }
            div:hover{
                color: red;
                cursor: pointer;
            }
        }
    }
}
.active{
    color: red;
}
</style>