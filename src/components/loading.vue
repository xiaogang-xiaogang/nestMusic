<template>
    <div class="container">
        <div class="loading">
        </div>
        <span class="text">
            数据加载中
        </span>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
}
    .loading {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: conic-gradient(transparent, #a5a5a5);
        position: relative;
        animation: spinner5 700ms linear infinite;
        mask-image: radial-gradient(transparent, transparent 6.5px, black 6.5px);
        -webkit-mask-image: radial-gradient(transparent, transparent 6.5px, black 6.5px);
        margin-right: 10px;
    }
    @keyframes spinner5 {
        to {
            transform: rotate(360deg);
        }
    }
    .text {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #a5a5a5;
        line-height: 22px;
        position: relative;
    }
</style>