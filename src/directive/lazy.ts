import { createApp, Directive } from 'vue';
import { useIntersectionObserver } from '@vueuse/core'


// 懒加载指令
const lazy: Directive = {
    mounted(el: HTMLImageElement, binding) {
    /**
     *
     * @param {*} el 图片的dom对象
     * @param {*} binding.value 指令绑定的图片地址
     */
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            // 图片进入可视区域
            if (isIntersecting) {
                el.src = binding.value
                // 关闭监控
                stop()
            }
            // 图片加载失败，显示默认图片
            el.onerror = () => {
                el.src = ''
            }
        })
    },
};
export default lazy;