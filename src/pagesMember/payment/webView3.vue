<template>
    <view class="pay-container">
        <web-view 
            :src="payUrl" 
            @message="handleMessage"
            @load="onPageLoad"
            @error="onPageError"
        ></web-view>
        
        <!-- 加载状态提示 -->
        <view v-if="loading" class="loading-mask">
            <view class="loading-content">
                <text class="loading-text">正在加载支付页面...</text>
                <view class="loading-spinner"></view>
            </view>
        </view>
        
        <!-- 错误提示 -->
        <view v-if="error" class="error-mask">
            <view class="error-content">
                <text class="error-title">支付页面加载失败</text>
                <text class="error-message">{{ errorMessage }}</text>
                <button class="retry-btn" @click="retryLoad">重新加载</button>
                <button class="back-btn" @click="goBack">返回上一页</button>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 响应式数据
const payUrl = ref('')
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

// 支付宝沙箱基础URL
const ALIPAY_BASE_URL = 'https://mobileclientgw-sandbox.dl.alipaydev.com/cashier/mobilepay.htm?'


// 页面加载时获取参数
onLoad((options) => {
    console.log('接收到的参数:', options)
    
    // 从路由参数获取支付参数
    const payParams = options.payParams || ''
    
    if (!payParams) {
        showError('支付参数缺失')
        return
    }
    
    // 拼接完整的支付URL
    const fullPayUrl = ALIPAY_BASE_URL + payParams
    console.log('生成的支付URL:', fullPayUrl)
    
    payUrl.value = fullPayUrl
    loading.value = true
})

// 页面加载完成
const onPageLoad = (e) => {
    console.log('支付页面加载完成', e)
    loading.value = false
    error.value = false
}

// 页面加载错误
const onPageError = (e) => {
    console.error('支付页面加载失败', e)
    showError('支付页面加载失败，请检查网络连接')
}

// 处理WebView消息
const handleMessage = (evt) => {
    console.log('接收到WebView消息:', evt.detail)
    
    // 处理支付结果回调
    const message = evt.detail.data[0]
    if (message && message.type === 'payment_result') {
        handlePaymentResult(message)
    }
}

// 处理支付结果
const handlePaymentResult = (result) => {
    console.log('支付结果:', result)
    
    // 根据支付结果进行相应处理
    if (result.success) {
        uni.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
        })
        
        // 支付成功后跳转到订单详情页面
        setTimeout(() => {
            uni.navigateTo({
                url: '/pages/pageOrder/orderDetail/orderDetail?orderId=' + result.orderId
            })
        }, 1500)
    } else {
        uni.showModal({
            title: '支付失败',
            content: result.message || '支付过程中出现错误',
            showCancel: false,
            success: () => {
                // 返回订单支付页面
                uni.navigateBack()
            }
        })
    }
}

// 显示错误信息
const showError = (message) => {
    error.value = true
    errorMessage.value = message
    loading.value = false
}

// 重新加载
const retryLoad = () => {
    error.value = false
    loading.value = true
    
    // 重新设置URL触发重新加载
    const currentUrl = payUrl.value
    payUrl.value = ''
    setTimeout(() => {
        payUrl.value = currentUrl
    }, 100)
}

// 返回上一页
const goBack = () => {
    uni.navigateBack()
}

// 页面挂载完成
onMounted(() => {
    console.log('webview3页面已挂载')
})
</script>

<style scoped>
.pay-container {
    width: 100%;
    height: 100vh;
    position: relative;
}

.loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.loading-content {
    text-align: center;
    background: white;
    padding: 40rpx;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.loading-text {
    font-size: 32rpx;
    color: #333;
    display: block;
    margin-bottom: 30rpx;
}

.loading-spinner {
    width: 60rpx;
    height: 60rpx;
    border: 6rpx solid #f3f3f3;
    border-top: 6rpx solid #007AFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.error-content {
    text-align: center;
    background: white;
    padding: 40rpx;
    border-radius: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    max-width: 80%;
}

.error-title {
    font-size: 36rpx;
    color: #D32F2F;
    display: block;
    margin-bottom: 20rpx;
    font-weight: bold;
}

.error-message {
    font-size: 28rpx;
    color: #666;
    display: block;
    margin-bottom: 40rpx;
    line-height: 1.5;
}

.retry-btn, .back-btn {
    width: 200rpx;
    height: 70rpx;
    border-radius: 10rpx;
    font-size: 28rpx;
    margin: 0 10rpx;
}

.retry-btn {
    background-color: #007AFF;
    color: white;
    border: none;
}

.back-btn {
    background-color: #f5f5f5;
    color: #333;
    border: 1rpx solid #ddd;
}
</style>