<script setup>
import SangSwiper from '@/components/SangSwiper.vue';
import { ref, onMounted } from 'vue';
import { getHomeBannerAPI } from '@/services/home';
import IndexNavber from '@/components/indexNavber.vue';

const bannerList = ref([])

const getHomeBannerData = async () => {
  try {
    const res = await getHomeBannerAPI()
    console.log("轮播数据", res)
    bannerList.value = res.data || []
    console.log(bannerList.value)
  } catch (e) {
    console.error("请求失败", e)
  }
}

onMounted(() => {
  getHomeBannerData()
})

const navigateToGoodsList = (value) => {
  console.log("触发了点击事件", value)
  uni.navigateTo({
    url: '/pages/goods/goods'
  })
}
</script> 

<template>
  <view class="c1">
    <IndexNavber/>

    <!-- 轮播图父容器：加 relative 定位 -->
    <view class="swiper-container">
      <view class="scroll-view">
        <SangSwiper :list="bannerList" />
      </view>

      <!-- 搜索框：直接浮在轮播图上 -->
      <view class="search-section">
        <view class="search-box">
          <view class="search-input-wrapper">
            <text class="search-icon">search</text>
            <input 
              class="search-input" 
              placeholder="Search for cleaning, maintenance..." 
              type="text"
            />
          </view>
          <button class="search-btn">搜索</button>
        </view>
      </view>

    </view>
         <!-- 服务功能区 -->
      <view class="service-section">
    <!-- 网格服务项 2列 -->
    <view class="grid-box">
      <!-- 1. 保洁 -->
      <view class="item-card">
        <view class="item-icon">
          <text class="icon-font">1</text>
        </view>
        <text class="item-title">保洁</text>
        <!-- <text class="item-desc">深度清洁/日常保洁</text> -->
      </view>

      <!-- 2. 维修 -->
      <view class="item-card">
        <view class="item-icon">
          <text class="icon-font">2</text>
        </view>
        <text class="item-title">维修</text>
        <!-- <text class="item-desc">家电维护/房屋修缮</text> -->
      </view>

      <!-- 3. 换洗 -->
      <view class="item-card" value="1" @click="navigateToGoodsList(value)">
        <view class="item-icon">
          <text class="icon-font">3</text>
        </view>
        <text class="item-title">换洗</text>
        <!-- <text class="item-desc">衣物洗护/床品除螨</text> -->
      </view>

      <!-- 4. 搬运 -->
      <view class="item-card">
        <view class="item-icon">
          <text class="icon-font">4</text>
        </view>
        <text class="item-title">搬运</text>
        <!-- <text class="item-desc">同城搬家/大件运输</text> -->
      </view>

      <!-- 5. 喂养 -->
      <view class="item-card">
        <view class="item-icon">
          <text class="icon-font">5</text>
        </view>
        <text class="item-title">喂养</text>
        <!-- <text class="item-desc">宠物喂养/上门遛狗</text> -->
      </view>

      <!-- 6. 管道 -->
      <view class="item-card">
        <view class="item-icon">
          <text class="icon-font">6</text>
        </view>
        <text class="item-title">管道</text>
        <!-- <text class="item-desc">疏通管道/漏水检测</text> -->
      </view>
    </view>

    <!-- 新人优惠横幅 -->
    <view class="promo-banner">
      <view class="promo-left">
        <text class="promo-tag">New User Offer</text>
        <text class="promo-title">新人首单 5折</text>
        <text class="promo-desc">最高可抵扣50元</text>
      </view>
      <view class="promo-btn">立即领取</view>
      <view class="promo-circle"></view>
    </view>
      </view>
  </view>

</template>

<style>
/* 最外层 */


/* 轮播图外层：定位基准 */
.swiper-container {
  position: relative; /* 关键：让搜索框相对于它定位 */
  width: 343px;
  margin: 0 auto;
}

/* 你的轮播图：完全不动！ */
.scroll-view {
  /* background-color: #a8ffff; */
  height: 192px;
  width: 343px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

/* 搜索框：浮在轮播图上 */
.search-section {
  position: absolute;
  bottom: -10px; 
  left: 0;
  right: 0;
}

/* 搜索框样式 */
.search-box {
  background: white;
  border-radius: 50px;
  height: 40px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.search-icon {
  margin-right: 10px;
  color: #999;
}
.search-input {
  border: 0;
  outline: none;
  font-size: 14px;
  width: 100%;
}
.search-btn {
  background: #FF7A00;
  color: white;
  border-radius: 60px;
  padding: 0px 13px;
  border: none;
  font-weight: bold;
}





/* ------------------------------
   1. 整个区域：渐变背景 + 上圆角
------------------------------ */
.service-section {
  margin-top: 60rpx;
  padding: 40rpx 20rpx 60rpx;
  border-top-left-radius: 80rpx;
  border-top-right-radius: 80rpx;
  background: linear-gradient(to bottom, #fff7ed, #ffffff);
}

/* ------------------------------
   2. 网格布局：2列
------------------------------ */
.grid-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24rpx;
}

/* ------------------------------
   3. 服务卡片
------------------------------ */
.item-card {
  width: 48%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 40rpx;
  border: 1rpx solid rgba(255, 237, 213, 0.5);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  aspect-ratio: 4/3;
}

/* 点击缩小 */
.item-card:active {
  transform: scale(0.95);
  transition: transform 0.2s;
}

/* 图标背景 */
.item-icon {
  width: 60px;
  height: 60px;
  background-color: #ffedd5;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

/* 图标字体 */
.icon-font {
  font-family: "Material Icons Outlined";
  font-size: 40rpx;
  color: #ea580c;
}

/* 标题 */
.item-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #1c1917;
}

/* 描述 */
.item-desc {
  font-size: 20rpx;
  color: #78716c;
  margin-top: 8rpx;
}

/* ------------------------------
   4. 新人优惠横幅
------------------------------ */
.promo-banner {
  margin-top: 60rpx;
  background-color: #f97316;
  border-radius: 40rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.promo-left {
  position: relative;
  z-index: 10;
}

.promo-tag {
  font-size: 20rpx;
  color: #ffedd5;
  font-weight: bold;
}

.promo-title {
  font-size: 40rpx;
  font-weight: 900;
  color: #ffffff;
  margin-top: 10rpx;
}

.promo-desc {
  font-size: 20rpx;
  color: #ffedd5;
  margin-top: 8rpx;
}

.promo-btn {
  position: relative;
  z-index: 10;
  background-color: #ffffff;
  color: #ea580c;
  padding: 30rpx 50rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  align-items: center;
  white-space: nowrap;
  font-weight: bold;
}

/* 装饰圆形 */
.promo-circle {
  position: absolute;
  right: -40rpx;
  bottom: -40rpx;
  width: 160rpx;
  height: 160rpx;
  background-color: #fb923c;
  border-radius: 50%;
  opacity: 0.5;
  filter: blur(20rpx);
}
</style>