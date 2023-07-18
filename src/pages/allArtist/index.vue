<template>
  <div class="container">
    <div class="header">
        <div class="area">
            <div class="title">语种:</div>
            <div >全部</div>
            <div>华语</div>
            <div>欧美</div>
            <div>日本</div>
            <div>韩国</div>
            <div>其他</div>
        </div>
        <div class="cate">
            <div class="title">分类:</div>
            <div>全部</div>
            <div>男歌手</div>
            <div>女歌手</div>
            <div>乐队组合</div>
        </div>
        <div class="initail">
            <div class="title">筛选:</div>
            <div v-for="(item, index) in initail" :key="index">{{ item.toUpperCase() }}</div>
        </div>
    </div>
    <div v-if="loading">1111</div>
    <div class="songer-list" v-else>
        <div class="songer" v-for="(item, index) in songers" :key="index">
            <img v-lazy="item.imgUrl" alt="">
            <div class="name">{{ item.name }}</div>
        </div>
        <div v-if="!cont">1111</div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import {Artist} from '@/composale/artist.d'
import { getArtist } from '@/api/aritist'

const initail = ['热门','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','#']
let area = ref('-1')
let type = ref('-1')
let init = ref('-1')
let count = 0
let loading = ref(true)
let cont = ref(true)
const songers = ref<Array<Artist>>([])

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