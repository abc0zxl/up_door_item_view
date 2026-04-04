
<script setup>
import { ref } from 'vue'

// 订单状态数据
const orderStatuses = ref([
  { icon: '1', label: '待付款' },
  { icon: '2', label: '待发货' },
  { icon: '3', label: '待收货' },
  { icon: '4', label: '待评价' },
  { icon: '5', label: '售后' }
])

// 方法
const handleAddressManage = () => {
  console.log('跳转地址管理')
  // uni.navigateTo({ url: '/pages/address/address' })
}

const handleSettings = () => {
  console.log('跳转设置')
  // uni.navigateTo({ url: '/pages/settings/settings' })
}

const handleLogout = () => {
  console.log('退出登录')
  // 处理退出登录逻辑
}
</script>

<template>
  <view class="profile-page">
    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 个人资料头部 -->
      <view class="profile-header">
        <view class="avatar-wrapper">
          <view class="avatar-glow"></view>
          <image 
            class="avatar-image" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7js9VUKbplxxS_kt_slMAW2mAc_rvFMvZAXFR0lbCy2t_Z9MrSniubIjGz_VTb8e3G8ec5WbAHK-PSYRCzsMyF2DrBNTZA8OzyXnwIKbn5Pnp_4yAwUPUWLdpIPyrykISWRxKT9CyjF1BFPftloksgjuZYMCfgJxPYBX84HiBVTiZGk0moeaez73ZCawiT3OcDcQSMOtfIrpd4l-nV8Z1mlqxWwpbPOLepycGaZHkgEvvQIT_zJTiY_xb6idh7m90YktC-dFuOg"
            mode="aspectFill"
          />
          <view class="verified-badge">
            <text class="material-symbols-outlined filled">S</text>
          </view>
        </view>
        <text class="user-name">上门管家</text>
        <text class="user-bio">用心服务每一刻</text>
      </view>

      <!-- 订单状态网格 -->
      <view class="order-card">
        <view class="order-header">
          <text class="order-title">我的订单</text>
          <view class="all-orders-btn">
            <text class="all-orders-text">全部订单</text>
            <text class="material-symbols-outlined">-》</text>
          </view>
        </view>
        <view class="order-grid">
          <view class="order-item" v-for="order in orderStatuses" :key="order.label">
            <view class="order-icon">
              <text class="material-symbols-outlined">{{ order.icon }}</text>
            </view>
            <text class="order-label">{{ order.label }}</text>
          </view>
        </view>
      </view>

      <!-- 双功能卡片 -->
      <view class="function-grid">
        <view class="function-card">
          <view class="function-icon favorite-icon">
            <text class="material-symbols-outlined filled">F</text>
          </view>
          <view>
            <text class="function-title">收藏</text>
            <text class="function-subtitle">12个项目</text>
          </view>
        </view>
        <view class="function-card">
          <view class="function-icon notification-icon">
            <text class="material-symbols-outlined filled">N</text>
          </view>
          <view>
            <text class="function-title">通知</text>
            <text class="function-subtitle">3条未读</text>
          </view>
        </view>
      </view>

      <!-- 全宽菜单按钮 -->
      <view class="menu-section">
        <button class="menu-button" @click="handleAddressManage">
          <view class="menu-left">
            <view class="menu-icon">
              <text class="material-symbols-outlined">L</text>
            </view>
            <text class="menu-text">地址管理</text>
          </view>
          <text class="material-symbols-outlined menu-arrow">-》</text>
        </button>
        <button class="menu-button" @click="handleSettings">
          <view class="menu-left">
            <view class="menu-icon">
              <text class="material-symbols-outlined">S</text>
            </view>
            <text class="menu-text">设置</text>
          </view>
          <text class="material-symbols-outlined menu-arrow">-》</text>
        </button>
      </view>

      <!-- 退出登录按钮 -->
      <view class="logout-section">
        <button class="logout-button" @click="handleLogout">退出登录</button>
      </view>
    </main>
  </view>
</template>


<style lang="scss" scoped>
// 颜色变量
$primary-color: #924700;
$primary-fixed: #ff851b;
$primary-light: #fff0e8;
$surface: #f7f6f5;
$surface-lowest: #ffffff;
$surface-container-low: #f1f1f0;
$surface-container: #e8e8e7;
$surface-container-high: #e2e2e1;
$surface-variant: #dcdddc;
$on-surface: #2e2f2f;
$on-surface-variant: #5b5c5b;
$outline-variant: #adadac;
$secondary-container: #bed2ff;
$secondary: #0058bb;
$tertiary-container: #f5bf26;
$tertiary: #745700;
$error: #b02500;

.profile-page {
  min-height: 100vh;
  background-color: $surface;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  padding-bottom: 120rpx;
}

.main-content {
  padding: 48rpx 48rpx 0;
}

// 个人资料头部
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64rpx;
}

.avatar-wrapper {
  position: relative;
  margin-bottom: 24rpx;
}

.avatar-glow {
  position: absolute;
  inset: 0;
  background-color: $primary-fixed;
  opacity: 0.1;
  filter: blur(40rpx);
  border-radius: 50%;
  transform: scale(1.1);
}

.avatar-image {
  position: relative;
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  border: 4px solid $surface-lowest;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.verified-badge {
  position: absolute;
  bottom: 8rpx;
  right: 8rpx;
  background-color: $primary-fixed;
  padding: 8rpx;
  border-radius: 10%;
  border: 2px solid $surface-lowest;
  
  .material-symbols-outlined {
    font-size: 30rpx;
    color: #0f0400;
  }
}

.user-name {
  font-size: 48rpx;
  font-weight: 700;
  color: $on-surface;
  margin-top: 24rpx;
  letter-spacing: -0.5rpx;
}

.user-bio {
  color: $on-surface-variant;
  font-weight: 500;
  margin-top: 8rpx;
  font-size: 28rpx;
}

// 订单卡片
.order-card {
  background-color: $surface-lowest;
  border-radius: 32rpx;
  padding: 48rpx 40rpx;
  margin-bottom: 48rpx;
  box-shadow: 0 12px 32px rgba(255, 133, 27, 0.06);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48rpx;
}

.order-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $on-surface;
}

.all-orders-btn {
  display: flex;
  align-items: center;
  color: $on-surface;
  
  .all-orders-text {
    font-size: 28rpx;
    margin-right: 8rpx;
  }
  
  .material-symbols-outlined {
    font-size: 28rpx;
  }
}

.order-grid {
  margin-left:-10px;  
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16rpx;
}

.order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.order-icon {
  width: 112rpx;
  height: 112rpx;
  border-radius: 24rpx;
  background-color: rgba(255, 133, 27, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .material-symbols-outlined {
    font-size: 48rpx;
    color: $primary-fixed;
  }
}

.order-label {
  font-size: 24rpx;
  font-weight: 500;
  color: $on-surface;
}

// 功能网格
.function-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
  margin-bottom: 48rpx;
}

.function-card {
  background-color: $surface-lowest;
  padding: 40rpx;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
//   transition: all 0.2s ease;
  
  &:active {
    // transform: scale(0.98);
    background-color: $surface-container-low;
  }
}

.function-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .material-symbols-outlined {
    font-size: 48rpx;
  }
}

.favorite-icon {
  background-color: $secondary-container;
  
  .material-symbols-outlined {
    color: $secondary;
  }
}

.notification-icon {
  background-color: rgba($tertiary-container, 0.2);
  
  .material-symbols-outlined {
    color: $tertiary;
  }
}

.function-title {
  display: block;
  font-weight: 700;
  color: $on-surface;
  font-size: 32rpx;
  margin-bottom: 8rpx;
}

.function-subtitle {
  font-size: 24rpx;
  color: $on-surface;
}

// 菜单区域
.menu-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 64rpx;
}

.menu-button {
  background-color: $surface-lowest;
  width:100%;
  padding: 40rpx;
  border-radius: 60rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  transition: all 0.2s ease;
  
//   &:active {
//     // transform: scale(0.98);
//   }
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.menu-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: $surface-container-low;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .material-symbols-outlined {
    font-size: 40rpx;
    color: $on-surface-variant;
  }
}

.menu-text {
  font-weight: 600;
  color: $on-surface;
  font-size: 32rpx;
}

.menu-arrow {
  color: $outline-variant;
  font-size: 32rpx;
//   transition: transform 0.2s ease;
}

.menu-button:active .menu-arrow {
  transform: translateX(8rpx);
}

// 退出登录区域
.logout-section {
  padding: 0 16rpx;
}

.logout-button {
  width: 100%;
  padding: 40rpx 0;
  border-radius: 70rpx;
  background-color: $surface-container;
  color: $on-surface-variant;
  font-weight: 700;
  font-size: 32rpx;
  text-align: center;
  border: none;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.95);
    background-color: $surface-container-high;
  }
}

// 底部导航栏
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 48rpx 48rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -12px 32px rgba(255, 133, 27, 0.08);
  z-index: 50;
}

.nav-items {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 120rpx;
  padding: 0 32rpx;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16rpx 32rpx;
  transition: all 0.15s ease;
  
  &:active {
    transform: scale(0.9);
  }
  
  .material-symbols-outlined {
    font-size: 44rpx;
    color: #78716c;
  }
}

.nav-label {
  font-size: 20rpx;
  font-weight: 500;
  margin-top: 8rpx;
  color: #78716c;
}

.nav-item.active {
  background-color: rgba(255, 133, 27, 0.1);
  border-radius: 48rpx;
  
  .material-symbols-outlined {
    color: $primary-fixed;
  }
  
  .active-label {
    color: $primary-fixed;
    font-weight: 700;
  }
}

// 工具类
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  
  &.filled {
    font-variation-settings: 'FILL' 1;
  }
}
</style>