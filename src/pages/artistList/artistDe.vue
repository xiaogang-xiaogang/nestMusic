<template>
  <div class="container">
    <div v-if="loading"><Loading></Loading></div>
    <template v-else>
      <div v-for="(item, index) in list" :key="index">
      <div class="title">{{ item.ti }}</div>
      <div class="txt" v-for="(text, index) in item.txt.split('\n')" :key="index">{{ text }}</div>
    </div>
    </template>

 </div>
</template>

<script lang="ts" setup>
import { getIntroduce} from '@/api/aritist'
import { ref } from 'vue';
import Loading from '@/components/loading.vue';
const props = defineProps({
  id:{
    type:Number,
    default:''
  }
})
interface Int{
  ti:String,
  txt:String
}
let loading = ref(true)
let list = [] as Array<Int>
async function getData() {
  const res = await getIntroduce(props.id.toString())
  for(let i=0;i<res.length;i++){
    let t = {} as Int
    t.ti = res[i].ti
    t.txt = res[i].txt
    list.push(t)
  }
  loading.value = false
}
getData()
</script>

<style lang="scss" scoped>
.container{
  .title{
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .txt{
    color: gray;
    margin: 7px 0;
  }
}
</style>