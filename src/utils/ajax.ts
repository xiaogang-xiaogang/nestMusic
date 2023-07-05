import axios, { AxiosInstance } from "axios"

// 允许请求带上cookie
axios.defaults.withCredentials = true
const service: AxiosInstance & {cancelToken?: any} = axios.create({
    timeout: 240000,
})

// 用于取消请求
service.cancelToken = axios.CancelToken

// 设置响应拦截器
service.interceptors.response.use(
    response=>{
        if(response.status === 200 && response.data.code === 200){
            return response.data
        }else {
            return rejectError(new Error(response.data.result || '接口错误'));
        }
    },
    error => {
        return rejectError(error)
    }
)

async function rejectError(error:any) {
    const response = error.response || {}
    const status = response.status
    switch(status){
        case 401:{
            const currentURL = `${window.location.href}`;
            const loginPath = response.data.result;
            window.sessionStorage.removeItem('userName');
            window.location.href = getRealUrl(loginPath, { origin: currentURL });
            return Promise.reject(new Error('401'));
        }
        case 403: {
            const url403 = '/403';
            window.location.href = getRealUrl(url403, { path: window.location.pathname });
            return;
        }
        default: {
            return Promise.reject(error);
        }
    }
}

function getRealUrl(url: string, params: { [key: string]: string }) {
    let param = '?';
    Object.keys(params || {}).forEach(key => {
        if (params[key] != null) {
            param += key + '=' + params[key] + '&';
        }
    });
    param = param.substring(0, param.length - 1);
    return url + param;
}

export default service;