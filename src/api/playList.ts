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

export async function getSongs(id:string,begin:string){
    const res = await <Promise<any>>api.get(
        '/api/playlist/track/all',{
            params:{
                id:id,
                limit:'10',
                offset:begin
            }
        }
    )
    return res.songs
}