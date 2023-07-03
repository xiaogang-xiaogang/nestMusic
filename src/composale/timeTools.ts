
// 将s转换成24小时进制
export const timeFormater = (val:number):string => {
    let second = val % 60 > 0 ? ((val % 60).toString()).length > 1 ? (val % 60).toString() : '0' + (val % 60).toString() : '00';
    let minute = val / 60 > 0 ? val / 60 > 60 ? ((parseInt(val / 60) % 60).toString()).length > 1 ? (parseInt(val / 60) % 60).toString() + ':' :
        '0' + (parseInt(val / 60) % 60).toString() + ':' : ((parseInt(val / 60)).toString()).length > 1 ? (parseInt(val / 60)).toString() + ':' :
        '0' + (parseInt(val / 60)).toString() + ':' : '00' + ':';
    let hours = val / 3600 > 0 ? val / 3600 > 24 ? ((parseInt(val / 3600) % 24).toString()).length > 1 ? (parseInt(val / 3600) % 24).toString() + ':' :
        '0' + (parseInt(val / 3600) % 24).toString() + ':' : (parseInt(val / 3600).toString().length > 1) ? parseInt(val / 3600).toString() + ':' :
        '0' + parseInt(val / 3600).toString() + ':' : '00' + ':';
    let days = val / 86400 > 0 ? parseInt(val / 86400) : '00';
    let str = (val > 86400 ? days + "天" : '') + (val > 3600 ? hours : '') + minute + second
    return str
}