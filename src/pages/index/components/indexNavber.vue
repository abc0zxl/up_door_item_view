<script>

//获取安全区域
const systemInfo = uni.getSystemInfoSync()
const safeAreaTop = systemInfo.safeArea?.top || 0
//
</script>

<template>
  <view class="navbar" :style="{paddingTop: safeAreaTop + 'px'}">
    <!-- logo文字 -->
    <view class="logo">
      <image class="logo-image" src="@/static/image/logo.png"></image>
      <text class="logo-text">上门帮</text>
    </view>
  </view>
</template>

<style lang="scss">
/* 自定义导航条 */
.navbar {
//   background-image: url("@/static/image/nav_bg.png");
  background-color: #ffffff;
  background-size: cover;
  position: relative;
  display: flex;
  height: 160rpx; /* 给导航一个高度 */
  z-index: 1; /* 确保导航栏显示在正确层级 */
  flex-direction: column;
  padding-top: 20px;
  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 30rpx;
    padding-top: 20rpx;
    .logo-image {
      width: 100rpx;
      height: 100rpx;
    }
    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #ff7a21e4;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 40rpx;
      font-weight: 600;
    }
  }
}
</style>