<script setup>
import { ref } from 'vue';

// 猜你喜欢
const recommendList = ref([
  {
    name: "Emergency Electrical Repair",
    price: "¥120.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQXwMryI63wOydtgyYE0JPJkPmzsqTm8h2tV8mgeC4OgF6QpkDe8XI6lTu5Hg95A1HIjJNpz_uflL9mskL7WADnRQaOjjw8iMVGetlB50T0Q9X6La6KaWnoL14UdGD2gVBYjTUjI7gKuS7XNQ00n3XhsZLpNh2cq1HkUXNGOn5QJJ8p_35prWcpVQyzRriXpCINR86qUeufNCBOT1PHMpjRKZVQjWJez8XU7PhNjLmP9F5HxVBnig9xNQltOsO9t-iamqdCAlQhQ"
  },
  {
    name: "Curtain Cleaning Service",
    price: "¥45.00/m",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw08GPgOP5MgMSZhBixBG1575pFZGxSpPRBo6iIawBLXMXcbEc8VZP_3Arda66Bj1W3WjApRC0z7TXqSv--3m_JlAKHHJMzMDClwcXH6MDlJDEenQJF_O6uvjVh60nFC2mQnukXzc6VdENhXrkxpaW5P5UxHmTjMKy3b8K_iRGa_LBJOTp38eN5-H_D3-Br_-8H3dqb48AoxnHnMdgst3T7R2KxkbEbE1NtdZILT1mXNJK_NsY2lPBji-QvEpxHNHRlwEwoCbjgA"
  }
])
const flat = ref(true)

const handleCheckChange = () => {
  console.log('checkbox changed:', !flat)
  flat.value = !flat.value  // 注意要使用 .value
}


// 控制选中状态


// onLoad(() => {})

</script>

<template>
  <view class="page-container">
    <view class="content">
      <view class="cart-header">
        <text class="title">购物车 (3)</text>
        <text class="edit-btn">编辑</text>
      </view>

      <!-- 购物车商品1 -->
      <!-- ✅ 动态样式 -->
      <view class="cart-item" :class="{ select: !flat }">
        <!-- ✅ 绑定 checked + 事件 -->
        <checkbox 
          class="check-box" 
          :checked="flat" 
          @tap="handleCheckChange"
        />
        <image class="item-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjUj6lPetvB1Ro_YTWgF-8ORcotVMB1ZP5evAvK78thP3B2VZzijkMJdEAqzinYzKNPFXhIRvmREVgYwYJL0koS1Gt4bbYLCS_B8Ec-JjhhusGP1puvWOGVIlGcYpLMyBL8u5SgxqDIei67m9-Mw1EkD4MHA3gn6AocUMhTWezsFUWyuRVGPtF-6QpNN_bdmbOPziYXB5NOpmvvQC-nYJ11sLP5xIfMxF3rFaarIHtFLFtuynH65CX9CbCmTH-ku_3aTh3ukOsTA" mode="aspectFill"></image>
        <view class="item-info">
          <view>
            <text class="item-name">Full House Deep Cleaning 4h</text>
            <view class="item-tag">Daily Cleaning</view>
          </view>
          <view class="flex-row">
            <text class="item-qty">Qty: x1</text>
            <text class="item-price">¥299.00</text>
          </view>
        </view>
      </view>

      <!-- 猜你喜欢 -->
      <view class="recommend-section">
        <text class="section-title">猜你喜欢</text>
        <view class="grid grid-cols-2 gap-4">
          <view class="card" v-for="(item, index) in recommendList" :key="index">
            <image class="card-img" :src="item.image" mode="aspectFill"></image>
            <view class="card-info">
              <text class="card-name">{{item.name}}</text>
              <text class="card-price">{{item.price}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部结算栏 -->
    <view class="checkout-bar">
      <view class="check-left">
        <checkbox class="check-box" value="all" checked />
        <text class="check-text">全选</text>
      </view>
      <view class="check-right">
        <view class="price-box">
          <text class="price-tip">合计:</text>
          <text class="total-price">¥457.00</text>
        </view>
        <button class="pay-btn">结算 (2)</button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
/* 全局布局 */
page {
  background-color: #f5fbf8;
  color: #171d1b;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}
.page-container {
  padding-bottom: 160rpx;
}

/* 内容区域 */
.content {
  padding: 0rpx 20rpx 60rpx;
  max-width: 750rpx;
  margin: 0 auto;
}
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
}
.edit-btn {
  font-size: 26rpx;
  color: #f97316;
  font-weight: 500;
}

/* 购物车商品 */
.cart-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  
  border: 1rpx solid rgba(187, 202, 197, 0.3);
  &.select {
      opacity: 0.7;

  }
}
.cart-item.select {
  opacity: 0.7;
}

.check-box {
  transform: scale(0.9);
}
::v-deep .uni-checkbox-input {
  border-radius: 50% !important;
  border-color: #6c7a76 !important;
}
::v-deep .uni-checkbox-input-checked {
  background-color: #f97316 !important;
  border-color: #f97316 !important;
}
.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  border: 1rpx solid rgba(187, 202, 197, 0.2);
}
.item-info {
  flex: 1;
  height: 160rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item-name {
  font-size: 30rpx;
  font-weight: bold;
  line-height: 1.2;
}
.item-tag {
  background: #e3eae7;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  margin-top: 10rpx;
  display: inline-block;
}
.item-qty {
  background: #e3eae7;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
}
.item-price {
  font-size: 36rpx;
  font-weight: 900;
  color: #f97316;
}

/* 推荐 */
.recommend-section {
  margin-top: 80rpx;
}
.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
}
.card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  border: 1rpx solid rgba(187, 202, 197, 0.2);
}
.card-img {
  width: 100%;
  height: 240rpx;
}
.card-info {
  padding: 20rpx;
}
.card-name {
  font-size: 26rpx;
  font-weight: 600;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-price {
  font-size: 30rpx;
  font-weight: 900;
  color: #f97316;
  margin-top: 10rpx;
  display: block;
}

/* 结算栏 */
.checkout-bar {
  position: fixed;
  bottom: 0rpx;
  left: 20rpx;
  right: 20rpx;
  max-width: 750rpx;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  border-radius: 32rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1rpx solid rgba(187, 202, 197, 0.2);
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}
.check-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.check-text {
  font-size: 28rpx;
  font-weight: 600;
}
.check-right {
  display: flex;
  align-items: center;
  gap: 30rpx;
}
.price-box {
  text-align: right;
}
.price-tip {
  font-size: 22rpx;
}
.total-price {
  font-size: 40rpx;
  font-weight: 900;
  color: #f97316;
}
.pay-btn {
  background: #f97316;
  color: #fff;
  border-radius: 50rpx;
  padding: 24rpx 50rpx;
  font-size: 30rpx;
  font-weight: bold;
}
</style>