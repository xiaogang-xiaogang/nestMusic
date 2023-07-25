import api from '@/utils/ajax'

export async function anonimousLogin() {
    let res = await <Promise<any>>api.get(
        '/api/register/anonimous'
    )
    return res.userId
}

export async function getKey() {
    const res = await <Promise<any>>api.get(
        '/api/login/qr/key',{
            params:{
                timestamp:Date.now(),
            }
        }
    )
    return res.data.unikey
}

export async function getImg(key:string) {
    const res1= await <Promise<any>>api.get(
        '/api/login/qr/create',
        {
            params:{
                key:key,
                qrimg:true,
                timestamp:Date.now()
            }
        }
    )
    return res1.data.qrimg
}

export async function checkStatus(key:string) {
    const res = await <Promise<any>>api.get(
        '/api/login/qr/check?noCookie=true',
        {
            params:{
                key:key,
                timestamp:Date.now(),
            }
        }
    )
    console.log(res.message)
    return res.code
}

export async function getLoginStatus(cookie = '') {
    const res = await <Promise<any>>api.post(
      `/login/status?timestamp=${Date.now()}`,
      {
        cookie,
      },
    )
    return res.data
  }