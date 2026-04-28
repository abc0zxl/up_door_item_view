<template>
  <view class="payment-result-page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 支付结果内容 -->
    <view class="result-content">
      <!-- 图标区域 -->
      <view class="icon-wrapper" :style="{backgroundColor: statusInfo.bgColor}">
        <text class="result-icon">{{ statusInfo.icon }}</text>
      </view>
      
      <!-- 状态文字 -->
      <text class="result-title">{{ statusInfo.title }}</text>
      <text class="result-subtitle">{{ statusInfo.subtitle }}</text>
      
      <!-- 按钮区域 -->
      <view class="button-group">
        <button class="btn-continue" @tap="continuePay" v-if="orderStatus === 'CreateOrder'">
          <text class="btn-text">继续支付</text>
        </button>
        <button class="btn-home" @tap="goToHome">
          <text class="btn-text">回到首页</text>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores/modules/member'
import { getOrderDetailAPI } from '@/services/order'

// 获取状态栏高度
const statusBarHeight = ref(20)
const memberStore = useMemberStore()

// 订单状态
const orderStatus = ref('')
const orderDetail = ref({})

// 状态映射
const statusMap = {
  'CreateOrder': {
    icon: '⏳',
    title: '支付失败',
    subtitle: '订单未完成支付，请继续支付',
    bgColor: '#FFF3E0'
  },
  'Paid': {
    icon: '✅',
    title: '支付成功',
    subtitle: '订单支付完成，等待工作人员接单',
    bgColor: '#E8F5E8'
  },
  'Err': {
    icon: '❌',
    title: '发生错误',
    subtitle: '请联系客服',
    bgColor: '#FFF3E0'
  }
}

// 计算状态信息
const statusInfo = ref({})

// 获取订单详情
const getOrderDetail = async () => {
  try {
    console.log('获取订单详情，订单ID:', memberStore.profile.orderId)
    const res = await getOrderDetailAPI({orderId: memberStore.profile.orderId})
    console.log('订单详情响应:', res.data)
    
    orderDetail.value = res.data
    orderStatus.value = res.data.orderStatus || 'Err'
    
    // 设置状态信息
    statusInfo.value = statusMap[orderStatus.value] || statusMap['Err']
    
    console.log('订单状态:', orderStatus.value)
    console.log('状态信息:', statusInfo.value)
  } catch (error) {
    console.error('获取订单详情失败:', error)
    // 默认显示支付失败状态
    orderStatus.value = 'CreateOrder'
    statusInfo.value = statusMap['CreateOrder']
  }
}

// 继续支付（返回上一页）
const continuePay = () => {
  // 发送全局事件，告诉上一页是从paymentResult返回的
  uni.$emit('fromPaymentResult', {
    timestamp: Date.now(),
    orderId: memberStore.profile.orderId,
    message: '从支付结果页面返回'
  })
  
  uni.navigateBack({
    delta: 1,
    fail: () => {
      uni.showToast({
        title: '无法返回上一页',
        icon: 'none'
      })
    }
  })
}

// 回到首页
const goToHome = () => {
  uni.switchTab({
    url: '/pages/index/index',
    success: () => {
      console.log('成功跳转到首页')
    },
    fail: (err) => {
      console.log('跳转首页失败:', err)
      // 降级方案
      uni.reLaunch({
        url: '/pages/index/index'
      })
    }
  })
}

// 页面加载时获取订单状态
onLoad(() => {
  getOrderDetail()
})

// 页面挂载
onMounted(() => {
  try {
    const systemInfo = uni.getSystemInfoSync()
    statusBarHeight.value = systemInfo.statusBarHeight || 20
  } catch(e) {
    console.log('获取系统信息失败:', e)
  }
})
</script>

<style scoped>
.payment-result-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.status-bar {
  width: 100%;
  background-color: transparent;
}

.result-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 60rpx;
  text-align: center;
}

.icon-wrapper {
  width: 200rpx;
  height: 200rpx;
  border-radius: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.1);
}

.result-icon {
  font-size: 100rpx;
  line-height: 1;
}

.result-title {
  font-size: 56rpx;
  font-weight: 800;
  color: white;
  margin-bottom: 20rpx;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2);
}

.result-subtitle {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 80rpx;
  line-height: 1.5;
}

.button-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

button {
  margin: 0;
  border: none;
  border-radius: 50rpx;
  height: 100rpx;
  font-size: 32rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

button::after {
  border: none;
}

.btn-continue {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
}

.btn-continue:active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.98);
}

.btn-home {
  background: white;
  color: #667eea;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
}

.btn-home:active {
  transform: scale(0.98);
  box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.2);
}

.btn-text {
  font-weight: 600;
}
</style>