<template>
    <view class="pay-container">
        <web-view 
            :src="localPageUrl" 
            @message="handleMessage"
        ></web-view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePayStore } from '@/stores/modules/pay'

const localPageUrl = ref('')
const userPayParams = usePayStore()
const Params = userPayParams.profile.payHtml
const initWebview = () => {
    // 从路由参数获取后端返回的完整表单HTML字符串

    console.log("获取过来的参数是",Params)
    if (!Params) {
        uni.showToast({
            title: '支付参数缺失',
            icon: 'none',
            complete: () => setTimeout(() => uni.navigateBack(), 1500)
        })
        return
    }

    try {
        // 微信小程序兼容方案：使用URL编码传递HTML
        const encodedHtml = encodeURIComponent(Params)
        // 本地 HTML 文件的路径（相对于项目根目录，实际打包后该文件会被拷贝到对应位置）
        // 这里使用 /hybrid/html/alipay_form.html 是因为 uni-app 默认会将 hybrid 目录下的资源原样打包
        localPageUrl.value = `/hybrid/html/alipay_form.html?formHtml=${encodedHtml}`
        
        console.log('生成的支付页面URL:', localPageUrl.value)
        
    } catch (error) {
        console.error('处理支付参数失败:', error)
        uni.showToast({
            title: '支付参数处理失败',
            icon: 'none',
            complete: () => setTimeout(() => uni.navigateBack(), 1500)
        })
    }
}
onMounted(() => {
    initWebview()
})

// 接收支付完成后的回调（如果支付成功页面会重定向到 return_url，可以在那个页面中 postMessage）
const handleMessage = (evt) => {
    console.log('WebView 消息：', evt.detail)
    // 你可以根据 return_url 页面发送的消息处理支付结果
    // 具体需要你在 return_url 对应的页面中通过 window.parent.postMessage 发送数据
}
</script>

<style scoped>
.pay-container {
    width: 100%;
    height: 100vh;
    background: #fff;
}
</style>