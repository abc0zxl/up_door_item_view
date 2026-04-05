
<script setup>
import { ref } from 'vue'

// 用户头像图片（使用原 HTML 中的图片）
const userAvatar = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuBUSpn1yYaIzS5a8YTWxhCDRvqfcJxXEN5RMiINPuwY8nG5sdw3IlxjqYD0hf-nJGwk3j4z44ziq6IEwe2xOwja727TdidXu3LorQ8S6F-eup57xeqFNffUCIXroaSeRAB9lAQ13u_MXGXquhojlPPUbcpcu6txk4EW6hmWasziXPDdhgt4yNLaarA79b1qqpASYl31UxBIe1ycB1kAi1e6F2lhwbIOxD72tZeKrpmYSwn-mlGVlZQs5103yYRCRhMcyhs24ekrnA')

// 地图装饰背景图
const mapImage = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuAfC562r2J36hw7WS4mgJzpNoKarHYb6uEcr7oYKSL1jPNpjqcWs15ikjw4ynkRPz1Pm4aFIdht3kiPi6pqrYeXOCgSgIkkp9gEDwLXysWyl4YnwzVyXQ0Ex0hrSgFWJX55e2DS3dewcbU-uWT8c7K_HDAUpTXvsZRaJaSmZhQONo304LZ56wE6bF0cbgTaSk4LDO0Aqodi6zXYa2gX-wfDcnf3ySwNZz50clMyZERWGsatOQsQmRp_gTMkd2uUSBPt9sYiMKQm2A')

// 地址列表数据
const addressList = ref([
  {
    id: 1,
    name: '张伟杰',
    phoneMask: '138 **** 5678',
    detail: '北京市朝阳区三里屯街道幸福二村 4号楼 3单元 602室',
    isDefault: true
  },
  {
    id: 2,
    name: '李美玲',
    phoneMask: '155 **** 0092',
    detail: '上海市徐汇区田林路 140号 越界创意园区 2号楼 105室',
    isDefault: false
  },
  {
    id: 3,
    name: '王小明',
    phoneMask: '130 **** 1234',
    detail: '广东省深圳市南山区粤海街道 软件产业基地 5栋 D座 12层',
    isDefault: false
  }
])

// 返回上一页
const handleBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.showToast({
        title: '暂无上一页',
        icon: 'none'
      })
    }
  })
}

// 点击头像（演示用，可跳转个人中心）
const handleAvatarTap = () => {
  uni.showToast({
    title: '个人中心开发中',
    icon: 'none'
  })
}

// 编辑地址
const handleEditAddress = (item) => {
  uni.showModal({
    title: '编辑地址',
    content: `编辑：${item.name} ${item.phoneMask}\n${item.detail}`,
    confirmText: '去编辑',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '编辑功能开发中',
          icon: 'none'
        })
      }
    }
  })
}

// 新增地址
const handleAddAddress = () => {
  uni.navigateTo({
    url: '/pagesMember/address_form/address_form',
    fail: () => {
      uni.showToast({
        title: '新增地址页面开发中',
        icon: 'none'
      })
    }
  })
}
</script>

<template>
  <view class="address-page">
    <!-- 自定义导航栏 -->
    <!-- <view class="custom-navbar">
      <view class="navbar-content">
        <view class="back-btn" hover-class="back-btn-hover" @tap="handleBack">
          <text class="icon-text">←</text>
        </view>
        <text class="navbar-title">地址管理</text>
        <view class="avatar" @tap="handleAvatarTap">
          <image class="avatar-img" :src="userAvatar" mode="aspectFill"></image>
        </view>
      </view>
    </view> -->
    <view class="divider"></view>

    <!-- 主内容区域（页面滚动） -->
    <scroll-view class="main-scroll" scroll-y enhanced :show-scrollbar="false">
      <!-- 地址列表 -->
                <!-- v-for="(item, index) in addressList" -->
      <view class="address-list">
        <view
          v-for="item in addressList"
          :key="item.id"
          class="address-card"
          :class="{ 'address-card-default': item.isDefault }"
          hover-class="address-card-hover"
        >
          <view class="address-info">
            <view class="user-info">
              <text class="user-name">{{ item.name }}</text>
              <text class="user-phone">{{ item.phoneMask }}</text>
            </view>
            <text class="address-detail">{{ item.detail }}</text>
          </view>
          <view class="card-actions">
            <view class="edit-btn" @tap.stop="handleEditAddress(item)">
              <text class="edit-icon">✎</text>
            </view>
            <text v-if="item.isDefault" class="default-tag">默认</text>
          </view>
        </view>
      </view>

      <!-- 装饰区域：地图卡片 + 安全提示卡片 -->
      <view class="decorative-grid">
        <!-- 地图卡片 -->
        <view class="map-card" hover-class="map-card-hover">
          <view class="map-bg" :style="{ backgroundImage: 'url(' + mapImage + ')' }">
            <view class="map-overlay"></view>
            <view class="map-label">
              <text class="map-subtitle">当前覆盖区域</text>
              <text class="map-title">北京核心城区</text>
            </view>
          </view>
        </view>

        <!-- 安全提示卡片 -->
        <view class="security-card">
          <view class="security-icon">
            <text class="icon-shield">🔒</text>
          </view>
          <view class="security-texts">
            <text class="security-title">隐私安全保障</text>
            <text class="security-desc">您的地址信息已通过金融级加密，仅用于服务上门。</text>
          </view>
        </view>
      </view>

      <!-- 底部占位，防止内容被固定按钮遮挡 -->
      <view class="bottom-placeholder"></view>
    </scroll-view>

    <!-- 固定底部新增按钮 -->
    <view class="fixed-footer">
      <button class="add-btn" hover-class="add-btn-hover" @tap="handleAddAddress">
        <text class="add-icon">+</text>
        <text class="add-text">新增地址</text>
      </button>
    </view>
  </view>
</template>


<style scoped>
/* 页面整体 */
.address-page {
  width: 100%;
  min-height: 100vh;
  background-color: #F7F6F5;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 自定义导航栏 */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #F7F6F5;
  z-index: 100;
  padding-top: var(--status-bar-height, 0px);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112rpx;
  padding: 0 32rpx;
}

.back-btn {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.back-btn-hover {
  background-color: #E8E8E7;
}

.icon-text {
  font-size: 48rpx;
  color: #924700;
  font-weight: normal;
  line-height: 1;
}

.navbar-title {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 40rpx;
  font-weight: 700;
  color: #924700;
  letter-spacing: -0.5rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  background-color: #DCDDDC;
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.divider {
  height: 2rpx;
  background-color: #F1F1F0;
  /* margin-top: 112rpx; */
}

/* 主滚动区域 */
.main-scroll {
  flex: 1;
  padding: 32rpx 32rpx 0;
  box-sizing: border-box;
}

/* 地址列表 */
.address-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.address-card {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 12rpx 32rpx rgba(255, 133, 27, 0.04);
  transition: transform 0.1s;
}

.address-card-hover {
  transform: scale(0.98);
}

.address-info {
  flex: 1;
  padding-right: 24rpx;
}

.user-info {
  margin-bottom: 16rpx;
}

.user-name {
  font-size: 38rpx;
  font-weight: 700;
  color: #2E2F2F;
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin-right: 24rpx;
}

.user-phone {
  font-size: 28rpx;
  color: rgba(46, 47, 47, 0.7);
  font-weight: 500;
}

.address-detail {
  font-size: 28rpx;
  line-height: 1.5;
  color: #5B5C5B;
  font-weight: 500;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.edit-btn {
  width: 96rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #F1F1F0;
  transition: background-color 0.2s;
}

.edit-btn:active {
  background-color: #E2E2E1;
}

.edit-icon {
  font-size: 40rpx;
  color: #5B5C5B;
}

.default-tag {
  background-color: #FF851B;
  color: #431D00;
  font-size: 20rpx;
  font-weight: 700;
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  letter-spacing: 0.5rpx;
}

/* 装饰区域网格 */
.decorative-grid {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: 16rpx;
  margin-bottom: 40rpx;
}

/* 地图卡片 */
.map-card {
  border-radius: 32rpx;
  overflow: hidden;
  height: 360rpx;
  position: relative;
}

.map-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.3s;
}

.map-card-hover .map-bg {
  transform: scale(1.02);
}

.map-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
}

.map-label {
  position: absolute;
  bottom: 32rpx;
  left: 32rpx;
  color: #FFFFFF;
}

.map-subtitle {
  font-size: 22rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
  opacity: 0.8;
  display: block;
  margin-bottom: 8rpx;
}

.map-title {
  font-size: 36rpx;
  font-weight: 700;
  display: block;
}

/* 安全卡片 */
.security-card {
  background-color: #F5BF26;
  border-radius: 32rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
}

.security-icon {
  width: 96rpx;
  height: 96rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24rpx;
}

.icon-shield {
  font-size: 56rpx;
}

.security-texts {
  display: flex;
  flex-direction: column;
}

.security-title {
  font-size: 36rpx;
  font-weight: 700;
  color: #523D00;
  margin-bottom: 12rpx;
}

.security-desc {
  font-size: 26rpx;
  color: rgba(82, 61, 0, 0.8);
  line-height: 1.4;
}

/* 底部占位 */
.bottom-placeholder {
  height: 200rpx;
}

/* 固定底部按钮 */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-top: 2rpx solid #F1F1F0;
  padding: 24rpx 32rpx calc(24rpx + constant(safe-area-inset-bottom));
  padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
  z-index: 100;
}

.add-btn {
  width: 100%;
  background: linear-gradient(135deg, #FF851B 0%, #803D00 100%);
  border-radius: 9999rpx;
  height: 112rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  border: none;
  box-shadow: 0 12rpx 32rpx rgba(255, 133, 27, 0.3);
}

.add-btn::after {
  border: none;
}

.add-btn-hover {
  transform: scale(0.98);
  opacity: 0.9;
}

.add-icon {
  font-size: 48rpx;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1;
}

.add-text {
  font-size: 34rpx;
  font-weight: 800;
  color: #FFFFFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 确保按钮样式正确 */
button {
  background: transparent;
  padding: 0;
  margin: 0;
  line-height: 1;
}
</style>