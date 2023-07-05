<template>
  <div class="container">
    <div class="header">
        <div class="every active">推荐</div>
        <div class="every">歌单</div>
        <div class="every">排行榜</div>
        <div class="every">歌手</div>
        <div class="every">最新音乐</div>
    </div>
    <router-view></router-view>
 </div>
</template>

<script lang="ts" setup>

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