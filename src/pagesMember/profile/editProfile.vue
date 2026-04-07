<script setup>
import { ref, reactive } from 'vue'

// 用户信息数据
const userInfo = reactive({
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7js9VUKbplxxS_kt_slMAW2mAc_rvFMvZAXFR0lbCy2t_Z9MrSniubIjGz_VTb8e3G8ec5WbAHK-PSYRCzsMyF2DrBNTZA8OzyXnwIKbn5Pnp_4yAwUPUWLdpIPyrykISWRxKT9CyjF1BFPftloksgjuZYMCfgJxPYBX84HiBVTiZGk0moeaez73ZCawiT3OcDcQSMOtfIrpd4l-nV8Z1mlqxWwpbPOLepycGaZHkgEvvQIT_zJTiY_xb6idh7m90YktC-dFuOg',
  nickname: '上门管家',
  bio: '用心服务每一刻',
  phone: '138****8888',
  gender: 'male', // male: 男, female: 女, unknown: 未知
  birthday: '1990-01-01',
  region: '北京市 朝阳区'
})

// 表单验证状态
const formErrors = reactive({
  nickname: '',
  bio: ''
})

// 编辑状态
const isEditing = ref(false)

// 方法
const goBack = () => {
  uni.navigateBack()
}

const handleSave = () => {
  // 表单验证
  if (!validateForm()) {
    return
  }
  
  // 模拟保存数据
  uni.showLoading({
    title: '保存中...'
  })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}

const handleAvatarChange = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePaths = res.tempFilePaths
      if (tempFilePaths.length > 0) {
        // 模拟上传头像
        uni.showLoading({
          title: '上传中...'
        })
        
        setTimeout(() => {
          uni.hideLoading()
          userInfo.avatar = tempFilePaths[0]
          uni.showToast({
            title: '头像更新成功',
            icon: 'success'
          })
        }, 800)
      }
    }
  })
}

const handleGenderChange = (gender) => {
  userInfo.gender = gender
}

const handleBirthdayChange = (e) => {
  userInfo.birthday = e.detail.value
}

const handleRegionChange = () => {
  uni.showActionSheet({
    itemList: ['北京市 朝阳区', '上海市 浦东新区', '广州市 天河区', '深圳市 南山区'],
    success: (res) => {
      const regions = ['北京市 朝阳区', '上海市 浦东新区', '广州市 天河区', '深圳市 南山区']
      userInfo.region = regions[res.tapIndex]
    }
  })
}

const validateForm = () => {
  let isValid = true
  
  // 清空错误信息
  formErrors.nickname = ''
  formErrors.bio = ''
  
  // 昵称验证
  if (!userInfo.nickname.trim()) {
    formErrors.nickname = '昵称不能为空'
    isValid = false
  } else if (userInfo.nickname.length > 20) {
    formErrors.nickname = '昵称不能超过20个字符'
    isValid = false
  }
  
  // 简介验证
  if (userInfo.bio.length > 50) {
    formErrors.bio = '简介不能超过50个字符'
    isValid = false
  }
  
  return isValid
}

const getGenderText = (gender) => {
  const genderMap = {
    'male': '男',
    'female': '女',
    'unknown': '未知'
  }
  return genderMap[gender] || '未知'
}

const getGenderIcon = (gender) => {
  const iconMap = {
    'male': '👨',
    'female': '👩',
    'unknown': '👤'
  }
  return iconMap[gender] || '👤'
}

// 计算剩余字符数
const remainingChars = (field, maxLength) => {
  return maxLength - (userInfo[field]?.length || 0)
}
</script>

<template>
  <view class="edit-profile-page">
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <button class="nav-btn" @click="goBack">
          <text class="material-symbols-outlined">←</text>
        </button>
        <view class="navbar-title">编辑资料</view>

      </view>
    </view> -->

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 头像编辑 -->
      <view class="avatar-section">
        <view class="avatar-wrapper">
          <view class="avatar-glow"></view>
          <image 
            class="avatar-image" 
            :src="userInfo.avatar" 
            mode="aspectFill"
          />
          <view class="avatar-edit-overlay" @click="handleAvatarChange">
            <text class="edit-icon">📷</text>
            <text class="edit-text">更换头像</text>
          </view>
        </view>
      </view>

      <!-- 基本信息表单 -->
      <view class="form-section">
        <!-- 昵称 -->
        <view class="form-item">
          <view class="form-label">昵称</view>
          <view class="form-input-wrapper">
            <input 
              class="form-input" 
              type="text" 
              placeholder="请输入昵称"
              v-model="userInfo.nickname"
              maxlength="20"
            />
            <text class="char-count">{{ remainingChars('nickname', 20) }}</text>
          </view>
          <text class="error-text" v-if="formErrors.nickname">{{ formErrors.nickname }}</text>
        </view>

        <!-- 个人简介 -->
        <view class="form-item">
          <view class="form-label">个人简介</view>
          <view class="form-input-wrapper">
            <textarea 
              class="form-textarea" 
              placeholder="请输入个人简介"
              v-model="userInfo.bio"
              maxlength="50"
              auto-height
            />
            <text class="char-count">{{ remainingChars('bio', 50) }}</text>
          </view>
          <text class="error-text" v-if="formErrors.bio">{{ formErrors.bio }}</text>
        </view>

        <!-- 手机号 -->
        <view class="form-item">
          <view class="form-label">手机号</view>
          <view class="form-input-wrapper">
            <text class="form-value">{{ userInfo.phone }}</text>
            <button class="change-btn" @click="handlePhoneChange">修改</button>
          </view>
        </view>

        <!-- 性别 -->
        <view class="form-item">
          <view class="form-label">性别</view>
          <view class="gender-selector">
            <button 
              class="gender-option" 
              :class="{ 'gender-active': userInfo.gender === 'male' }"
              @click="handleGenderChange('male')"
            >
              <text class="gender-icon">👨</text>
              <text class="gender-text">男</text>
            </button>
            <button 
              class="gender-option" 
              :class="{ 'gender-active': userInfo.gender === 'female' }"
              @click="handleGenderChange('female')"
            >
              <text class="gender-icon">👩</text>
              <text class="gender-text">女</text>
            </button>
            <button 
              class="gender-option" 
              :class="{ 'gender-active': userInfo.gender === 'unknown' }"
              @click="handleGenderChange('unknown')"
            >
              <text class="gender-icon">👤</text>
              <text class="gender-text">未知</text>
            </button>
          </view>
        </view>

        <!-- 生日 -->
        <view class="form-item">
          <view class="form-label">生日</view>
          <view class="form-input-wrapper">
            <picker 
              class="form-picker" 
              mode="date" 
              :value="userInfo.birthday"
              @change="handleBirthdayChange"
            >
              <text class="picker-text">{{ userInfo.birthday }}</text>
              <text class="material-symbols-outlined picker-arrow">→</text>
            </picker>
          </view>
        </view>

        <!-- 地区 -->
        <view class="form-item">
          <view class="form-label">地区</view>
          <view class="form-input-wrapper">
            <button class="region-btn" @click="handleRegionChange">
              <text class="region-text">{{ userInfo.region }}</text>
              <text class="material-symbols-outlined region-arrow">→</text>
            </button>
          </view>
        </view>
                        <button class="save-btn" @click="handleSave">保存</button>

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
$error-color: #ff3b30;

.edit-profile-page {
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

.save-btn {
  background: transparent;
  color: $primary-fixed;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
  padding: 16rpx 24rpx;

  &:active {
    opacity: 0.7;
  }
}

// 主内容区
.main-content {
  padding-top: 88rpx;
  padding-bottom: 120rpx;
}

// 头像编辑区域
.avatar-section {
  display: flex;
  justify-content: center;
  padding: 64rpx 32rpx 48rpx;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
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
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 4px solid $surface-lowest;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.avatar-edit-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: $surface-lowest;
  padding: 16rpx;
  border-radius: 0 0 80rpx 80rpx;
  text-align: center;
  font-size: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.edit-icon {
  font-size: 28rpx;
}

.edit-text {
  font-size: 22rpx;
}

// 表单区域
.form-section {
  background-color: $surface-lowest;
  border-radius: 32rpx;
  margin: 0 32rpx;
  overflow: hidden;
}

.form-item {
  padding: 32rpx;
  border-bottom: 1rpx solid $surface-container;

  &:last-child {
    border-bottom: none;
  }
}

.form-label {
  font-size: 28rpx;
  font-weight: 600;
  color: $on-surface;
  margin-bottom: 16rpx;
}

.form-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-input, .form-textarea {
  flex: 1;
  font-size: 28rpx;
  color: $on-surface;
  border: none;
  background: transparent;
  padding: 0;

  &::placeholder {
    color: $on-surface-variant;
  }
}

.form-textarea {
  min-height: 120rpx;
  line-height: 1.5;
}

.char-count {
  font-size: 24rpx;
  color: $on-surface-variant;
  margin-left: 16rpx;
  min-width: 60rpx;
  text-align: right;
}

.form-value {
  font-size: 28rpx;
  color: $on-surface;
  flex: 1;
}

.change-btn {
  background: transparent;
  color: $primary-fixed;
  font-size: 26rpx;
  border: 1rpx solid $primary-fixed;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;

  &:active {
    background-color: rgba($primary-fixed, 0.1);
  }
}

// 性别选择器
.gender-selector {
  display: flex;
  gap: 24rpx;
}

.gender-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  background: transparent;
  border: 2rpx solid $surface-container;
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
  transition: all 0.2s ease;

  &.gender-active {
    border-color: $primary-fixed;
    background-color: rgba($primary-fixed, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.gender-icon {
  font-size: 36rpx;
}

.gender-text {
  font-size: 26rpx;
  color: $on-surface;
  font-weight: 500;
}

// 选择器样式
.form-picker, .region-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
}

.picker-text, .region-text {
  font-size: 28rpx;
  color: $on-surface;
}

.picker-arrow, .region-arrow {
  font-size: 28rpx;
  color: $outline-variant;
}

// 错误提示
.error-text {
  font-size: 24rpx;
  color: $error-color;
  margin-top: 8rpx;
  display: block;
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