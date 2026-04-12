<script setup>
import { ref } from 'vue'

// 设置选项数据
const settings = ref([
  {
    title: '账号与安全',
    icon: '🔐',
    items: [
      { label: '修改手机号', value: '138****8888', hasArrow: true },
      { label: '修改密码', value: '', hasArrow: true },
      { label: '实名认证', value: '已认证', hasArrow: true },
      { label: '账号安全', value: '高', hasArrow: true }
    ]
  },
  {
    title: '通知设置',
    icon: '🔔',
    items: [
      { label: '订单通知', value: '', hasSwitch: true, switchValue: true },
      { label: '促销通知', value: '', hasSwitch: true, switchValue: false },
      { label: '系统通知', value: '', hasSwitch: true, switchValue: true }
    ]
  },
  {
    title: '隐私设置',
    icon: '👁️',
    items: [
      { label: '隐私政策', value: '', hasArrow: true },
      { label: '用户协议', value: '', hasArrow: true },
      { label: '个人信息收集', value: '', hasArrow: true }
    ]
  },
  {
    title: '通用设置',
    icon: '⚙️',
    items: [
      { label: '语言设置', value: '简体中文', hasArrow: true },
      { label: '清除缓存', value: '256MB', hasArrow: true },
      { label: '关于我们', value: '版本 1.0.0', hasArrow: true }
    ]
  }
])

// 开关状态
const switchStates = ref({
  '订单通知': true,
  '促销通知': false,
  '系统通知': true
})

// 方法
const handleSwitchChange = (itemLabel) => {
  switchStates.value[itemLabel] = !switchStates.value[itemLabel]
  console.log(`${itemLabel} 开关状态:`, switchStates.value[itemLabel])
}

const handleMenuItemClick = (sectionTitle, itemLabel) => {
  console.log(`点击了 ${sectionTitle} - ${itemLabel}`)
  
  // 根据不同的菜单项执行不同的操作
  switch(itemLabel) {
    case '清除缓存':
      uni.showModal({
        title: '清除缓存',
        content: '确定要清除所有缓存数据吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '缓存已清除',
              icon: 'success'
            })
          }
        }
      })
      break
    case '关于我们':
      uni.navigateTo({
        url: '/pages/my/about'
      })
      break
    default:
      uni.showToast({
        title: `${itemLabel}功能开发中`,
        icon: 'none'
      })
  }
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<template>
  <view class="settings-page">
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <button class="nav-btn" @click="goBack">
          <text class="material-symbols-outlined">←</text>
        </button>
        <view class="navbar-title">设置</view>
        <view class="navbar-right">
          预留右侧按钮位置
        </view>
      </view>
    </view> -->

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 设置项分组 -->
      <view class="settings-section" v-for="section in settings" :key="section.title">
        <view class="section-header">
          <text class="section-icon">{{ section.icon }}</text>
          <text class="section-title">{{ section.title }}</text>
        </view>
        
        <view class="section-content">
          <view 
            class="menu-item" 
            v-for="item in section.items" 
            :key="item.label"
            @click="handleMenuItemClick(section.title, item.label)"
          >
            <view class="item-left">
              <text class="item-label">{{ item.label }}</text>
              <text class="item-value" v-if="item.value">{{ item.value }}</text>
            </view>
            
            <view class="item-right">
              <!-- 开关 -->
              <view class="switch-wrapper" v-if="item.hasSwitch">
                <view 
                  class="switch" 
                  :class="{ 'switch-on': switchStates[item.label] }"
                  @click.stop="handleSwitchChange(item.label)"
                >
                  <view class="switch-thumb"></view>
                </view>
              </view>
            
              <!-- 箭头 -->
              <text 
                class="material-symbols-outlined arrow" 
                v-if="item.hasArrow"
              >→</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 退出登录按钮 -->
      <view class="logout-section">
        <button class="logout-button" @click="handleLogout">退出登录</button>
      </view>
    </main>
  </view>
</template>

<style lang="scss" scoped>
// 颜色变量（与my页面保持一致）
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

.settings-page {
  min-height: 100vh;
  background-color: $surface;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

// 顶部导航栏
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: $surface-lowest;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
}

.navbar-left, .navbar-right {
  width: 80rpx;
}

.navbar-title {
  font-weight: 700;
  font-size: 36rpx;
  color: $on-surface;
}

.nav-btn {
  background: transparent;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;

  .material-symbols-outlined {
    font-size: 40rpx;
    color: $on-surface;
  }

  &:active {
    background-color: $surface-container;
  }
}

// 主内容区
.main-content {
  // padding-top: 88rpx;
  padding-bottom: 120rpx;
}

// 设置项分组
.settings-section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 32rpx 48rpx 24rpx;
  gap: 16rpx;
}

.section-icon {
  font-size: 32rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: $on-surface-variant;
}

.section-content {
  background-color: $surface-lowest;
  border-radius: 32rpx;
  margin: 0 32rpx;
  overflow: hidden;
}

// 菜单项
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 32rpx;
  border-bottom: 1rpx solid $surface-container;
  transition: background-color 0.2s ease;

  &:active {
    background-color: $surface-container-low;
  }

  &:last-child {
    border-bottom: none;
  }
}

.item-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.item-label {
  font-size: 32rpx;
  font-weight: 600;
  color: $on-surface;
}

.item-value {
  font-size: 28rpx;
  color: $on-surface-variant;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

// 开关样式
.switch-wrapper {
  display: flex;
  align-items: center;
}

.switch {
  width: 100rpx;
  height: 56rpx;
  background-color: $surface-container-high;
  border-radius: 28rpx;
  position: relative;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &.switch-on {
    background-color: $primary-fixed;
  }
}

.switch-thumb {
  width: 48rpx;
  height: 48rpx;
  background-color: $surface-lowest;
  border-radius: 50%;
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  transition: transform 0.3s ease;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}

.switch-on .switch-thumb {
  transform: translateX(44rpx);
}

// 箭头
.arrow {
  font-size: 32rpx;
  color: $outline-variant;
}

// 退出登录按钮
.logout-section {
  padding: 0 32rpx;
  margin-top: 64rpx;
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

// 底部安全区域
.bottom-safe-area {
  height: env(safe-area-inset-bottom);
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
}
</style>