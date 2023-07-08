import { defineStore } from "pinia";


export const useMusicPlayStore = defineStore('musicPlay',{
    state:()=>{
        return {
            id:'',
            name:'',
            songer:''
        }
    }
})