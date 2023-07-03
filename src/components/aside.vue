<template>
  <div class="container">
    <div class="header">
        <div class="find-music">
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

</script>

<style lang="scss" scoped>
    img{
        width: 30px;
        height: 30px;
    }   
    .container{
        position: fixed;
        left:0;
        top: 60px;
        width: 15%;
        height: 90%;
        border-right: 1px solid rgb(230, 230, 230);
    }
</style>