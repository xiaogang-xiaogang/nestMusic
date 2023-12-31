import api from '@/utils/ajax'

export async function getListDetail(id:string){
    const res = await <Promise<any>>api.get(
        '/api/playlist/detail',{
            params:{
                id:id
            }
        }
    )
    return res.playlist
}

export async function getSongs(id:string,begin:string,limit?:string){
    const res = await <Promise<any>>api.get(
        '/api/playlist/track/all',{
            params:{
                id:id,
                limit:limit?limit:'10',
                offset:begin
            }
        }
    )
    return res.songs
}

export async function getCatList() {
    const res = await <Promise<any>>api.get(
        '/api/playlist/catlist'
    )
    return res
}

let cancelTokenAllPlayListSource:any
export async function getAllPlayList(order:string,cat:string) {
    cancelTokenAllPlayListSource = api.cancelToken.source()
    const res = await <Promise<any>>api.get(
        '/api/top/playlist',{
            params:{
                limit:50,
                offset:order,
                cat:cat
            },
            cancelToken:cancelTokenAllPlayListSource.token
        }
    )
    return res
}

export function cancelGetAllPlayList(){
    cancelTokenAllPlayListSource.cancel('取消上次请求歌单')
}

export async function getRank() {
    const res = await <Promise<any>>api.get(
        '/api/toplist'
    )
    return res.list as Array
}

export async function getNewAl(offset:string,area:string,limit?:string) {
    const res = await <Promise<any>>api.get(
        '/api/album/new',{
            params:{
                offset:offset,
                area:area,
                limit:limit?limit:10
            }
        }
    )
    return res
}