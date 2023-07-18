<template>
    <div v-if="pageLoading" class="page-loading">
     <Loading></Loading>
   </div>
   <div v-else class="container">
      <div class="header">
          <div class="header-left">
              <img :src="details.url" alt="">
          </div>
          <div class="header-right">
              <div class="name-container">
                  <div class="tag">专辑</div>
                  <div class="name">{{ details.name }}</div>
              </div>
              <div class="create-container">
                  <div class="creator">歌手：{{ details.artist }}</div>
                  <div class="create-time">时间：{{ details.publishTime.getFullYear() }}-{{ details.publishTime.getMonth() }}-{{ details.publishTime.getDay() }}</div>
              </div>
              <div class="play">
  
              </div>
              <div class="description" v-if="details.description">
                  简介:{{ details.description }}
              </div>
          </div>
      </div>
      <div class="bottom">
          <div class="content-title">
              <div class="active">歌单列表</div>
              <div>精选评论</div>
          </div>
          <div class="bottom-content">
              <!-- <SongList :count="Number(details.count)"></SongList> -->
              <AlSongList :songsList="songsList"></AlSongList>
          </div>
      </div>
   </div>
  </template>
  
  <script lang="ts" setup>
  import { getAlDetail } from '@/api/al'
  import {AlDetails} from '@/composale/al.d'
  import { SongDetail } from '@/composale/playList.d'
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Loading from '@/components/loading.vue'
  import AlSongList from '@/components/alSongList.vue'
  let details:AlDetails = {} as AlDetails
  let songsList = [] as Array<SongDetail>
  let pageLoading = ref(true)
  const route = useRoute()
  async function getDetail() {
      if(route.query.id){
          let playList = await getAlDetail(route.query.id.toString())
          details.id = playList.album.id
          details.url = playList.album.picUrl
          details.name = playList.album.name
          details.description = playList.album.description
          details.artist = playList.album.artist.name
          details.artistId = playList.album.artist.id
          details.publishTime = new Date(parseInt(playList.album.publishTime))
          pageLoading.value = false
          let n= playList.songs.length
          for(let i=0;i<n;i++){
            let song:SongDetail = {} as SongDetail
            song.title = playList.songs[i].name
            song.songer = playList.songs[i].ar[0].name
            song.alId = playList.songs[i].al.id
            song.alName = playList.songs[i].al.name
            song.isLove = false
            song.timeLong = Math.floor(parseInt(playList.songs[i].dt)/1000)
            song.id = playList.songs[i].id
            songsList.push(song)
        }
      }
  }
  getDetail()
  </script>
  
  <style lang="scss" scoped>
  .page-loading{
      margin: 70px 80px;
  }
  .container{
      width: calc(100% - 250px) ;
      .header{
          width: 90%;
          height: 30%;
          margin: 10px auto;
          display: flex;
          .header-left{
              width: 20%;
              margin-right: 30px;
              img{
                  width: 100%;
              }
          }
          .header-right{
                width:80%;
              .name-container{
                  display: flex;
                  align-items: center;
                  .tag{
                      border: 1px solid red;
                      height: 25px;
                      width: 40px;
                      text-align: center;
                      line-height: 25px;
                      margin-right: 10px;
                      border-radius: 5px;
                      color: red;
                  }
                  .name{
                      font-size: 30px;
                  }
              }
              .create-container{
                  .creator{
                      display: flex;
                      img{
                          width: 35px;
                          height: 35px;
                          border-radius: 50%;
                      }
                      div{
                          margin-left: 5px;
                          font-size: 14px;
                          height: 35px;
                          line-height: 35px;
                          color: rgb(0, 195, 255);
                          cursor: pointer;
                      }
                  }
                  .create-time{
                      font-size: 14px;
                      height: 35px;
                      line-height: 35px;
                  }
              }
          }
      }
      .bottom{
          width: 90%;
          margin: 0 auto;
          .content-title{
              display: flex;
              margin-bottom: 10px;
              div{
                  width: 100px;
                  height: 50px;
                  line-height: 50px;
                  text-align: center;
              }
              .active{
                  border-bottom: 2px solid red;
              }
          }
      }
  }
  </style>