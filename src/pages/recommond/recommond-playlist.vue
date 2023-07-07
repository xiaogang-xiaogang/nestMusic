<template>
  <div class="container">
    <div class="play-list" v-for="(item, index) in playList" :key="index">
        <img :src="item.url.toString()" alt="" @click="toPlayList(index)">
        <div class="title" @click="toPlayList(index)">{{ item.title }}</div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const props = defineProps({
    data:{
        type:Array,
        default:[]
    }
})

let playList:PlayList[] = []
function getPlayList(){
    for(let i=0;i<props.data.length;i++){
        let resources = props.data[i].resources
        for(let j=0;j<resources.length;j++){
            let musicList:PlayList = {"listId":'',"url":'',"title":''}
            musicList.listId= resources[j].resourceId
            musicList.url = resources[j].uiElement.image.imageUrl
            musicList.title = resources[j].uiElement.mainTitle.title
            playList.push(musicList)
        }
    }
}
const router = useRouter()
getPlayList()
function toPlayList(index:number){
    let id = playList[index].listId
    router.push({
        name:'playList',
        query:{
            id:id.toString(),
            page:"1"
        }
    })
}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    flex-wrap: wrap;
    .play-list{
        width: 200px;
        height: 220px;
        margin: 0 0 30px 20px;
        img{
            width: 200px;
            height: 200px;
            cursor: pointer;
        }
        .title{
            cursor: pointer;
        }
    }
}
</style>