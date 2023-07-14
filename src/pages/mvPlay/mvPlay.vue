<template>
  <div>
    <div v-if="loading"><Loading></Loading></div>
    <div v-else>
      <div class="mv-container">
        <video controls :src="mv.url" class="video"></video>
        <div class="artist">
          <img :src="mv.imgUrl" alt="">
          <span>{{ mv.artistName }}</span>
        </div>
        <div class="title">{{ mv.name }}</div>
        <div class="basic-inf">
          <span>发布：{{ mv.publishTime }}</span>
          <span>播放：{{ mv.playCount }}次</span>
        </div>
        <div class="tag-group">
          <span v-for="(item, index) in mv.videoGroup" :key="index">{{ item.split(',')[0] }}</span>
        </div>
        <div class="operation">
          <div class="like same">
            <img src="../../assets/img/zan1.png" alt="">
            <span>赞({{ mv.likedCount }})</span>
          </div>
          <div class="sub same">
            <img src="../../assets/img/shoucang1.png" alt="">
            <span>收藏({{ mv.subCount }})</span>
          </div>
          <div class="share same">
            <img src="../../assets/img/fenxiang.png" alt="">
            <span>分享({{ mv.shareCount }})</span>
          </div>
        </div>
        <Comment></Comment>
      </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Loading from '@/components/loading.vue'
import { getMv , getMvUrl, getLikeCount} from '@/api/mv'
import { useRoute } from 'vue-router';
import { Mv } from '@/composale/mv';
import Comment from '@/components/comment.vue'
const loading = ref(true)
const route = useRoute()
const mv:Mv = {} as Mv
async function getData(){
  if(route.query){
    let res = await getMv(route.query.id)
    mv.id = res.id
    mv.name = res.name
    mv.artistId = res.artistId
    mv.artistName = res.artistName
    mv.commentCount = res.commentCount
    mv.playCount = res.playCount
    mv.shareCount = res.shareCount
    mv.duration = res.duration
    mv.imgUrl = res.artists[0].img1v1Url
    mv.subCount = res.subCount
    mv.publishTime =res.publishTime
    mv.videoGroup = []
    for(let i=0;i<res.videoGroup.length;i++){
      mv.videoGroup.push(res.videoGroup[i].name+','+res.videoGroup[i].id)
    }
    loading.value = false
  }
}
getData()
async function getUrl() {
  if(route.query){
    let res = await getMvUrl(route.query.id)
    mv.url = res.url
  }
}
getUrl()
async function getLiked() {
  if(route.query){
    let res = await getLikeCount(route.query.id)
    mv.likedCount = res
  }
}
getLiked()
</script>

<style lang="scss" scoped>
.mv-container{
  width: 100%;
  margin: 100px 0 0 50px;
  .video{
    height: 600px;
    width: 70%;
    border-radius: 5px;
  }
  .artist{
    height: 60px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img{
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span{
      font-size: 20px;
      color: #a5a5a5;
    }
    span:hover{
      color: red;
    }
  }
  .title{
    margin-top: 20px;
    font-size: 30px;
    font-weight: bolder;
  }
  .basic-inf{
    color: #a5a5a5;
    margin-top: 10px;
    span{
      margin-right: 30px;
    }
  }
  .tag-group{
    margin-top: 20px;
    span{
      padding: 3px 5px;
      margin: 0 5px;
      border: 1px solid #a5a5a5;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .operation{
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    .same{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px;
      height: 40px;
      border: 1px solid #a5a5a5;
      border-radius: 20px;
      cursor: pointer;
      margin-right: 20px;
      img{
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>