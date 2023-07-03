<template>
  <div class="header-container">
    <div class="left-content">
      <img src="../assets/img/logo.png" alt="">
      <span class="title">小杨音乐馆</span>
    </div>
    <div class="right-content">
      <span class="login">登陆</span>
      <span class="gap">|</span>
      <span class="register">注册</span>
    </div>
 </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.header-container{
    background-color: #c62f2f;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    padding: 0 10px;
    position: relative;
    .left-content{
      height: 100%;
      display: flex;
      align-items: center;
      img{
        height: 80%;
        border-radius: 50%;
      }
      .title{
        margin-left: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 30px;
        color: #fafafa;
        letter-spacing: 0;
        text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135 
      }
    }
    .right-content{
      position: absolute;
      right: 10px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      .login{
        font-size: 20px;
      }
      .login:hover{
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
      .gap{
        margin: 0 5px;
        font-size: 35px;
        font-weight: lighter;
      }
      .register{
        font-size: 20px;
      }
      .register:hover{
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
}
</style>