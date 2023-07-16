<template>
  <div>
    <Category :list="catlist" :loading="catLoading" tag="歌单"></Category>
 </div>
</template>

<script lang="ts" setup>
import Category from './playList-category.vue'
import { getCatList} from '@/api/playList'
import { Catlist } from '@/composale/playList.d'
import { ref } from 'vue';

let catlist = [] as Array<Catlist>
let categories:any = []
let catLoading = ref(true)
async function getCategory(){
  const res = await getCatList()
  let j=0
  while(res.categories.hasOwnProperty(j.toString())){
    let k = j.toString()
    let cat = {} as Catlist
    cat.category = res.categories[k]
    cat.names = []
    catlist.push(cat)
    j++
  }
  for(let i=0;i<res.sub.length;i++){
    catlist[res.sub[i].category].names.push(res.sub[i].name)
  }
  catLoading.value = false
}
getCategory()
</script>

<style lang="scss" scoped>

</style>