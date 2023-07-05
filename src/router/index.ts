import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";


export enum RouteName{

}

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        component: ()=>import('@/pages/layout/index.vue'),
        redirect:'/findMusic',
        children:[
            {
                path:'/findMusic',
                name:'findMusic',
                component:()=>import('@/pages/findMusic/index.vue'),
                children:[
                    {
                        path:'',
                        name:'recommend',
                        component:()=>import('@/pages/recommond/index.vue')
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior:()=>{
        return {
            behavior:'smooth',
            top:0
        }
    }
})

export default router