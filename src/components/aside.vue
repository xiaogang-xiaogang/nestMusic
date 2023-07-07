<template>
  <div class="container">
    <div class="header">
        <div class="find-music" @click="goFindmusic">
            <img src="../assets/img/aside/音乐.png" alt="">
            <div>发现音乐</div>
        </div>
        <div class="find-mv">
            <img src="../assets/img/aside/MV.png" alt="">
            <div>MV</div>
        </div>
    </div>
    <div class="my-music">
        <div class="my-music-header">
            <span>我的音乐</span>
        </div>
        <div class="content">
            <div class="love-music">
                <img src="../assets/img/aside/爱心.png" alt="">
                我喜欢的音乐
            </div>
            <div class="current-play">
                <img src="../assets/img/aside/最近浏览.png" alt="">
                最近在听
            </div>
            <div class="current-play">
                <img src="../assets/img/aside/视频.png" alt="">
                最近播放
            </div>
        </div>
    </div>
    <div class="my-music-list">
        <div class="header">
            <span>我的歌单</span>
            <img src="../assets/img/aside/加号.png" placeholder="创建歌单">
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import {  useRouter } from 'vue-router';


const router= useRouter()
function goFindmusic(){
    router.push({
        path:'/findMusic'
    })
}

</script>

<style lang="scss" scoped>
    img{
        width: 30px;
        height: 30px;
    }   
    .container{
        position: absolute;
        left:0;
        top: 60px;
        width: 250px;
        height: 88%;
        border-right: 1px solid rgb(230, 230, 230);
        .header{
            width: 100%;
            .find-music{
                display: flex;
                justify-self: left;
                align-items: center;
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #BAF2F2F2 ;
                cursor: pointer;
                img{
                    margin: 0 5px 0 10px;
                }
            }
            .find-mv{
                display: flex;
                justify-self: left;
                align-items: center;
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #BAF2F2F2 ;
                cursor: pointer;
                img{
                    margin: 0 10px;
                }
            }
            .find-music:hover{
                background-color: rgba(24, 132, 252, 1);
            }
            .find-mv:hover{
                background-color: rgba(24, 132, 252, 1);
            }
        }
        .my-music{
            .my-music-header{
                width: 100%;
                height: 30px;
                line-height: 30px;
            }
            .content{
                .love-music{
                    width: 100%;
                    display: flex;
                    justify-self: left;
                    align-items: center;
                    width: 100%;
                    height: 50px;
                    border-bottom: 1px solid #BAF2F2F2 ;
                    cursor: pointer;
                    img{
                        margin: 0 5px 0 10px;
                    }
                }
                .love-music:hover{
                    background-color: rgba(24, 132, 252, 1);
                }
                .current-play{
                    width: 100%;
                    display: flex;
                    justify-self: left;
                    align-items: center;
                    width: 100%;
                    height: 50px;
                    border-bottom: 1px solid #BAF2F2F2 ;
                    cursor: pointer;
                    img{
                        margin: 0 5px 0 10px;
                    }
                }
                .current-play:hover{
                    background-color: rgba(24, 132, 252, 1);
                }
            }
        }
        .my-music-list{
            .header{
                width: 100%;
                height: 30px;
                line-height: 30px;
                position: relative;
                img{
                    position: absolute;
                    top: 2px;
                    right: 5px;
                    width: 26px;
                    height: 26px;
                    cursor: pointer;
                }
            }
        }
    }
</style>