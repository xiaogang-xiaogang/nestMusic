<template>
  <div class="container">
    <div v-if="loading">
        <Loading></Loading>
    </div>
    <div class="self-content" v-else>
        <div class="self-container" v-for="(item, index) in data" :key="index">
            <div class="img-container" @click="toMvPlay(index)">
                <div class="play-button"></div>
                <img :src="item.picUrl" alt="">
            </div>
            <div class="text" @click="toMvPlay(index)">{{ item.name }}</div>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { getSelf } from '@/api/findMusic'
import { ref } from 'vue';
import Loading from '@/components/loading.vue';
import { useRouter } from 'vue-router';
const data = ref([])
let loading = ref(true)
async function getData() {
    let res = await getSelf()
    for(let i=0;i<res.length;i++){
        data.value.push(res[i])
    }
    loading.value = false
}
getData()
const router = useRouter()
function toMvPlay(index:number){
    let id = data.value[index].id
    router.push({
        name:'mvPlay',
        query:{
            id:id.toString(),
        }
    })
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 250px;
    .self-content{
        display: flex;
        width: 100%;
        height: 100%;
        .self-container{
            width: 30%;
            height: 100%;
            margin: 0px 10px;
            .img-container{
                width: 100%;
                height: 90%;
                margin-bottom: 5px;
                position: relative;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
                .play-button{
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 50px;
                    height: 50px;
                    background-color: gray; /* 设置按钮的背景颜色 */
                    opacity: 0.6;
                    border-radius: 50%; 
                }
                .play-button:before {
                    content: "";
                    display: block;
                    width: 0;
                    height: 0;
                    border-top: 15px solid transparent; /* 设置三角形的上边 */
                    border-bottom: 15px solid transparent; /* 设置三角形的下边 */
                    border-left: 25px solid #fff; /* 设置三角形的左边 */
                    margin: 11px 0 0 17px; /* 调整三角形的位置 */
                    opacity: 0.6;
                }
            }
            .text{
                cursor: pointer;
            }
            .text:hover{
                color: red;
            }
        }
    }
}
</style>