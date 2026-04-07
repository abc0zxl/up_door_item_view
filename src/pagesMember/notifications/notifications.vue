<script setup>
import { ref } from 'vue'

// 通知数据
const notifications = ref([
  {
    id: 1,
    type: 'order', // order: 订单通知, system: 系统通知, promotion: 促销通知
    title: '订单状态更新',
    content: '您的订单 #20231215001 已安排服务，服务人员将在今天下午14:00-16:00上门服务。',
    time: '2023-12-15 10:30',
    isRead: false,
    orderId: '20231215001',
    icon: '📦'
  },
  {
    id: 2,
    type: 'system',
    title: '系统维护通知',
    content: '为了提供更好的服务体验，系统将于今晚22:00-23:00进行维护，期间可能无法正常使用。',
    time: '2023-12-14 15:45',
    isRead: true,
    icon: '⚙️'
  },
  {
    id: 3,
    type: 'promotion',
    title: '限时优惠活动',
    content: '新用户专享：首次预约全屋保洁立减50元，活动截止12月20日，快来体验吧！',
    time: '2023-12-14 09:20',
    isRead: false,
    icon: '🎁'
  },
  {
    id: 4,
    type: 'order',
    title: '服务完成提醒',
    content: '您的空调清洗服务已完成，感谢您的使用！请对本次服务进行评价。',
    time: '2023-12-13 16:15',
    isRead: true,
    orderId: '20231213002',
    icon: '✅'
  },
  {
    id: 5,
    type: 'system',
    title: '新功能上线',
    content: '预约提醒功能已上线，现在可以设置服务前提醒，不错过任何重要服务。',
    time: '2023-12-12 11:30',
    isRead: true,
    icon: '✨'
  },
  {
    id: 6,
    type: 'promotion',
    title: '会员专享优惠',
    content: '会员用户专享：本月内预约任意服务可享受8折优惠，快来预约吧！',
    time: '2023-12-11 14:20',
    isRead: true,
    icon: '👑'
  },
  {
    id: 7,
    type: 'order',
    title: '支付成功提醒',
    content: '您的订单 #20231210003 支付成功，金额299元已到账，服务将按预约时间进行。',
    time: '2023-12-10 20:15',
    isRead: true,
    orderId: '20231210003',
    icon: '💳'
  }
])

// 筛选状态
const filterType = ref('all') // all: 全部, unread: 未读

// 方法
const goBack = () => {
  uni.navigateBack()
}

const handleFilterChange = (type) => {
  filterType.value = type
}

const handleMarkAsRead = (notificationId) => {
  const notification = notifications.value.find(item => item.id === notificationId)
  if (notification && !notification.isRead) {
    notification.isRead = true
    uni.showToast({
      title: '已标记为已读',
      icon: 'success'
    })
  }
}

const handleMarkAllAsRead = () => {
  const unreadNotifications = notifications.value.filter(item => !item.isRead)
  if (unreadNotifications.length === 0) {
    uni.showToast({
      title: '没有未读通知',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '确认操作',
    content: `确定要将 ${unreadNotifications.length} 条未读通知标记为已读吗？`,
    success: (res) => {
      if (res.confirm) {
        notifications.value.forEach(item => {
          item.isRead = true
        })
        uni.showToast({
          title: '全部标记为已读',
          icon: 'success'
        })
      }
    }
  })
}

const handleClearAll = () => {
  if (notifications.value.length === 0) {
    uni.showToast({
      title: '没有通知可清除',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '确认清除',
    content: '确定要清除所有通知吗？此操作不可撤销。',
    success: (res) => {
      if (res.confirm) {
        notifications.value = []
        uni.showToast({
          title: '通知已清空',
          icon: 'success'
        })
      }
    }
  })
}

const handleNotificationClick = (notification) => {
  // 标记为已读
  if (!notification.isRead) {
    notification.isRead = true
  }
  
  // 根据通知类型执行不同操作
  switch(notification.type) {
    case 'order':
      if (notification.orderId) {
        uni.navigateTo({
          url: `/pages/pageOrder/orderDetail/orderDetail?id=${notification.orderId}`
        })
      }
      break
    case 'promotion':
      uni.switchTab({
        url: '/pages/index/index'
      })
      break
    default:
      // 系统通知无特殊操作
      break
  }
}

const getNotificationTypeText = (type) => {
  const typeMap = {
    'order': '订单通知',
    'system': '系统通知',
    'promotion': '促销通知'
  }
  return typeMap[type] || '通知'
}

const getNotificationTypeColor = (type) => {
  const colorMap = {
    'order': '#ff851b',
    'system': '#007AFF',
    'promotion': '#FF3B30'
  }
  return colorMap[type] || '#8E8E93'
}

// 计算属性
const filteredNotifications = () => {
  if (filterType.value === 'all') {
    return notifications.value
  } else if (filterType.value === 'unread') {
    return notifications.value.filter(item => !item.isRead)
  }
  return notifications.value
}

const unreadCount = () => {
  return notifications.value.filter(item => !item.isRead).length
}

const formatTime = (timeStr) => {
  const now = new Date()
  const time = new Date(timeStr)
  const diff = now - time
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }
}
</script>

<template>
  <view class="notifications-page">
    <!-- 顶部导航栏 -->
    <view class="top-navbar">
      <view class="navbar-content">
        <view class="nev-left">
        <button class="nav-btn" @click="goBack">
          <!-- <text class="material-symbols-outlined">←</text> -->
          <text class="material-symbols-outlined">《</text>
        <view class="unread-count" v-if="unreadCount() > 0">{{ unreadCount() }}条未读</view>

        </button>
        </view>
        <view class="navbar-title">通知中心</view>
        <!-- 占位元素，保持三元素等间距 -->
        <view class="placeholder"></view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 操作栏 -->
      <view class="action-bar">
        <button class="action-btn" @click="handleMarkAllAsRead">
          <text class="btn-icon">✓</text>
          <text class="btn-text">全部已读</text>
        </button>
        <button class="action-btn" @click="handleClearAll">
          <text class="btn-icon">🗑️</text>
          <text class="btn-text">清空全部</text>
        </button>
      </view>

      <!-- 筛选标签 -->
      <view class="filter-tabs">
        <button 
          class="filter-tab" 
          :class="{ 'filter-active': filterType === 'all' }"
          @click="handleFilterChange('all')"
        >
          全部通知
        </button>
        <button 
          class="filter-tab" 
          :class="{ 'filter-active': filterType === 'unread' }"
          @click="handleFilterChange('unread')"
        >
          未读通知
        </button>
      </view>

      <!-- 通知列表 -->
      <view class="notifications-list">
        <view 
          class="notification-item" 
          v-for="notification in filteredNotifications()" 
          :key="notification.id"
          :class="{ 'notification-unread': !notification.isRead }"
          @click="handleNotificationClick(notification)"
        >
          <!-- 通知图标 -->
          <view class="notification-icon">
            <text class="icon-text">{{ notification.icon }}</text>
          </view>
          
          <!-- 通知内容 -->
          <view class="notification-content">
            <view class="notification-header">
              <text class="notification-title">{{ notification.title }}</text>
              <text class="notification-time">{{ formatTime(notification.time) }}</text>
            </view>
            
            <text class="notification-text">{{ notification.content }}</text>
            
            <view class="notification-footer">
              <view 
                class="notification-type" 
                :style="{ color: getNotificationTypeColor(notification.type) }"
              >
                {{ getNotificationTypeText(notification.type) }}
              </view>
              
              <button 
                class="mark-read-btn" 
                v-if="!notification.isRead"
                @click.stop="handleMarkAsRead(notification.id)"
              >
                <text class="mark-read-text">标记已读</text>
              </button>
            </view>
          </view>
          
          <!-- 未读标记 -->
          <view class="unread-dot" v-if="!notification.isRead"></view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredNotifications().length === 0">
        <view class="empty-icon">🔔</view>
        <text class="empty-title">暂无通知</text>
        <text class="empty-desc">有新的通知时会在这里显示</text>
      </view>
    </main>
  </view>
</template>

<style lang="scss" scoped>
// 颜色变量（与项目保持一致）
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

.notifications-page {
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
    // background-color: #e02c2c;
  display: flex;
//   justify-content: space-between;
justify-content: center;
  align-items: center;
  height: 120rpx;
  padding: 50rpx 32rpx 0rpx 32rpx;
//   gap: 0rpx;
}

.nav-btn {
    // background-color: #14e225;
//   background: transparent;
  width: 140rpx;
  height: 80rpx;
//   border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  flex-shrink: 0;

  .material-symbols-outlined {
    font-size: 40rpx;
    color: $on-surface;
  }

  &:active {
    background-color: $surface-container;
  }
}


.nav-left {
    display: flex;
    flex-direction: row;
}

.navbar-title {
    // background-color: #21a6ff;
  font-weight: 700;
  font-size: 36rpx;
  color: $on-surface;
  text-align: center;
  flex: 1;
  margin: 0 32rpx;
}

.unread-count {
    // background-color: #1fe718;
  font-size: 28rpx;
  color: $primary-fixed;
  font-weight: 600;
  text-align: center;
  flex-shrink: 0;
  min-width: 120rpx;
}

.placeholder {
  width: 130rpx;
  flex-shrink: 0;
}

// 主内容区
.main-content {
  padding-top: 180rpx;
  padding-bottom: 120rpx;
}

// 操作栏
.action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 16rpx;
  padding: 32rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 16rpx 24rpx;
  background-color: $surface-container;
  border-radius: 24rpx;
  border: none;
  font-size: 26rpx;
  color: $on-surface-variant;
  transition: all 0.2s ease;

  &:active {
    background-color: $surface-container-high;
    transform: scale(0.95);
  }
}

.btn-icon {
  font-size: 24rpx;
}

.btn-text {
  font-weight: 500;
}

// 筛选标签
.filter-tabs {
  display: flex;
  padding: 0 32rpx 32rpx;
  gap: 16rpx;
}

.filter-tab {
  padding: 20rpx 40rpx;
  background-color: $surface-container;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;
  color: $on-surface-variant;
  border: none;
  transition: all 0.2s ease;

  &.filter-active {
    background-color: $primary-fixed;
    color: $surface-lowest;
  }

  &:active {
    transform: scale(0.95);
  }
}

// 通知列表
.notifications-list {
  padding: 0 32rpx;
}

.notification-item {
  background-color: $surface-lowest;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  &.notification-unread {
    background-color: rgba($primary-fixed, 0.05);
    border-left: 4rpx solid $primary-fixed;
  }

  &:active {
    transform: scale(0.98);
  }
}

// 通知图标
.notification-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  background-color: $surface-container;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-text {
  font-size: 36rpx;
}

// 通知内容
.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.notification-title {
  font-size: 30rpx;
  font-weight: 700;
  color: $on-surface;
  flex: 1;
  margin-right: 16rpx;
}

.notification-time {
  font-size: 24rpx;
  color: $on-surface-variant;
  white-space: nowrap;
}

.notification-text {
  font-size: 26rpx;
  color: $on-surface-variant;
  line-height: 1.5;
  margin-bottom: 16rpx;
  display: block;
}

.notification-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-type {
  font-size: 22rpx;
  font-weight: 600;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  background-color: rgba($primary-fixed, 0.1);
}

.mark-read-btn {
  background: transparent;
  border: 1rpx solid $outline-variant;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  font-size: 22rpx;
  color: $on-surface-variant;
  transition: all 0.2s ease;

  &:active {
    background-color: $surface-container;
  }
}

.mark-read-text {
  font-weight: 500;
}

// 未读标记
.unread-dot {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
  width: 12rpx;
  height: 12rpx;
  background-color: $primary-fixed;
  border-radius: 50%;
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 32rpx;
  text-align: center;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.3;
}

.empty-title {
  font-size: 36rpx;
  font-weight: 700;
  color: $on-surface;
  margin-bottom: 16rpx;
}

.empty-desc {
  font-size: 28rpx;
  color: $on-surface-variant;
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