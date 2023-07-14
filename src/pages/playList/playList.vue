<template>
  <div v-if="pageLoading" class="page-loading">
   <Loading></Loading>
 </div>
 <div v-else class="container">
    <div class="header">
        <div class="header-left">
            <img :src="details.imgUrl.toString()" alt="">
        </div>
        <div class="header-right">
            <div class="name-container">
                <div class="tag">歌单</div>
                <div class="name">{{ details.name }}</div>
            </div>
            <div class="create-container">
                <div class="creator"><img :src="details.creatorUrl.toString()" alt=""> <div>{{ details.creator }}</div></div>
                <div class="create-time">{{ details.createTime.getFullYear() }}-{{ details.createTime.getMonth() }}-{{ details.createTime.getDay() }}创建</div>
            </div>
            <div class="play">

            </div>
            <div class="inf">
                <span class="music-count">歌曲数:{{ details.count }}</span>
                <span class="paly-count">播放数:{{ details.playCount }}</span>
            </div>
            <div class="description">
                简介;{{ details.description }}
            </div>
        </div>
    </div>
    <div class="bottom">
        <div class="content-title">
            <div class="active">歌单列表</div>
            <div>精选评论</div>
        </div>
        <div class="bottom-content">
            <SongList :count="Number(details.count)"></SongList>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { getListDetail, getSongs } from '@/api/playList'
import {PlayListDetail , SongDetail} from '@/composale/playList.d'
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SongList from '@/components/songList.vue'
import Loading from '@/components/loading.vue'
let details:PlayListDetail = {} as PlayListDetail
let pageLoading = ref(true)
const route = useRoute()
async function getDetail() {
    if(route.query.id){
        let playList = await getListDetail(route.query.id.toString())
        details.id = playList.id
        details.count = parseInt(playList.trackCount)
        details.imgUrl = playList.coverImgUrl
        details.name = playList.name
        details.playCount = parseInt(playList.playCount)
        details.description = playList.description
        details.creator = playList.creator.nickname
        details.creatorUrl = playList.creator.avatarUrl
        details.createTime = new Date(parseInt(playList.createTime))
        console.log(details.createTime)
        pageLoading.value = false
    }
}
getDetail()
</script>

<style lang="scss" scoped>
.page-loading{
    margin: auto;
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
                display: flex;
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
                    margin-left: 10px;
                    height: 35px;
                    line-height: 35px;
                }
            }
            .inf{
                margin-bottom: 5px;
                .music-count{
                    margin-right: 18px;
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