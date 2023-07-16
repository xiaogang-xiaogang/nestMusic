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

export async function getAllPlayList(order:string,cat:string) {
    const res = await <Promise<any>>api.get(
        '/api/top/playlist',{
            params:{
                limit:50,
                offset:order,
                cat:cat
            }
        }
    )
    return res
}