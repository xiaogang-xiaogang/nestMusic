import api from '@/utils/ajax'

export async function getFindMusic() {
    const res = await (<Promise<any>>api.get('/api/homepage/block/page'))
    return res.data as any
}

export async function getSelf() {
    const res = await (<Promise<any>>api.get('/api/personalized/privatecontent'))
    return res.result as any
}
let cancelTokenSource = new Array(4)
export async function search(keyword:string,type:number) {
    if(type==1000){
        cancelTokenSource[4] = api.cancelToken.source()
    }else if(type==10){
        cancelTokenSource[1] = api.cancelToken.source()
    }else if(type==100){
        cancelTokenSource[2] = api.cancelToken.source()
    }else{
        cancelTokenSource[0] = api.cancelToken.source()
    }
    const res = await <Promise<any>>api.get(
        '/api/search',{
            params:{
                keywords:keyword,
                type,
                limit:'2'
            },
            cancelToken:cancelTokenSource.token
        }
    )
    return res.result
}

export async function cancelSearch(){
    for(let i=0;i<4;i++){
        if(cancelTokenSource[i]){
            cancelTokenSource[i].cancel("取消上一次请求")
        }
    }
}