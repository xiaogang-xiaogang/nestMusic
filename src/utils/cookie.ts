export function getCookieMap(cookie:string):Map{
    const cookieMap = new Map();

    cookie.split("; ").forEach((cookie) => {
        const [key, value] = cookie.split("=");
        cookieMap.set(key, value);
    })
    return cookieMap
}