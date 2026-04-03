<script>

export default {
  data() {
    return {
      activeIndex: 0,
      menuList: [
        { name: "保洁" },{ name: "清洗" },{ name: "搬家" },{ name: "月嫂" },
        { name: "维修" },{ name: "洗护" },{ name: "甲醛" },{ name: "数码" }
      ],
      commonList: [
        { icon: "cleaning_services", name: "日常保洁" },
        { icon: "vacuum", name: "深度保洁" },
        { icon: "window", name: "擦玻璃" }
      ],
      specialList: [
        { icon: "kitchen", name: "厨房保洁" },{ icon: "bathtub", name: "卫生间保洁" },
        { icon: "weekend", name: "沙发除螨" },{ icon: "bed", name: "床垫清洗" },
        { icon: "ac_unit", name: "空调清洗" },{ icon: "pest_control", name: "全屋杀虫" }
      ]
    };
  }
};
</script>

<template>
  <view class="category-page">


    <!-- 主体内容 -->
    <view class="main">
      <!-- 左侧分类导航 -->
      <scroll-view scroll-y class="left-menu">
        <view
          v-for="(item, index) in menuList"
          :key="index"
          class="menu-item"
          :class="activeIndex === index ? 'active' : ''"
          @click="activeIndex = index"
        >
          {{ item.name }}
        </view>
      </scroll-view>

      <!-- 右侧内容区 -->
      <view class="right-content">
        <!-- 轮播banner -->
        <view class="banner">
          <view class="banner-mask">
            <view class="banner-title">品质保洁</view>
            <view class="banner-desc">专业工具 深度除菌</view>
          </view>
        </view>

        <!-- 常用服务 -->
        <view class="section">
          <view class="section-title">常用保洁</view>
          <view class="grid-box">
            <view v-for="(item, idx) in commonList" :key="idx" class="grid-item">
              <view class="item-icon">{{ item.icon }}</view>
              <view class="item-text">{{ item.name }}</view>
            </view>
          </view>
        </view>

        <!-- 专项服务 -->
        <view class="section">
          <view class="section-title">专项服务</view>
          <view class="grid-box">
            <view v-for="(item, idx) in specialList" :key="idx" class="grid-item">
              <view class="item-icon">{{ item.icon }}</view>
              <view class="item-text">{{ item.name }}</view>
            </view>
          </view>
        </view>

        <!-- 活动卡片 -->
        <view class="activity-card">
          <view>
            <view class="act-title">换季大扫除</view>
            <view class="act-desc">三房两厅深度保洁 8折起</view>
          </view>
          <button class="act-btn">去查看</button>
        </view>
      </view>
    </view>


  </view>
</template>



<style scoped>
/* 页面容器 */
.category-page {
  background-color: #f5fbf8;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 120rpx;
}

/* 顶部导航 */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 88rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.05);
  box-sizing: border-box;
  z-index: 99;
}
.bar-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}
.logo {
  font-size: 36rpx;
  font-weight: 900;
  color: #f97316;
}
.icon {
  font-size: 36rpx;
  color: #666;
}

/* 主体 */
.main {
  /* margin-top: 88rpx; */
  display: flex;
}

/* 左侧菜单 */
.left-menu {
  width: 150rpx;
  background: #eff5f2;
  /* height: calc(100vh - 68rpx - 120rpx); */
  position: fixed;
  /* top: 88rpx; */
  left: 0;
}
.menu-item {
  padding: 30rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #666;
}
.menu-item.active {
  background: #fff;
  color: #f97316;
  font-weight: bold;
  border-left: 6rpx solid #f97316;
}

/* 右侧内容 */
.right-content {
  margin-left: 150rpx;
  padding: 20rpx;
  flex: 1;
}

/* banner */
.banner {
  height: 320rpx;
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
  margin-bottom: 30rpx;
}
.banner image {
  width: 100%;
  height: 100%;
}
.banner-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #81ffe9 50%, transparent);
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #006b5e;
}
.banner-desc {
  font-size: 24rpx;
  color: #007669;
  margin-top: 10rpx;
}

/* 模块标题 */
.section-title {
  font-size: 26rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
}

/* 网格布局 */
.grid-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-bottom: 40rpx;
}
.grid-item {
  width: 200rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-icon {
  width: 70rpx;
  height: 70rpx;
  background: #fff7ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #f97316;
  margin-bottom: 15rpx;
}
.item-text {
  font-size: 24rpx;
  color: #333;
}

/* 活动卡片 */
.activity-card {
  background: #fff1e6;
  border-radius: 20rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}
.act-title {
  font-size: 28rpx;
  font-weight: bold;
}
.act-desc {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}
.act-btn {
  background: #f97316;
  color: #fff;
  font-size: 24rpx;
  border-radius: 50rpx;
  padding: 10rpx 30rpx;
  border: none;
}

/* 底部导航 */
.bottom-tab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 110rpx;
  background: rgba(255,255,255,0.95);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1rpx solid #eee;
  z-index: 99;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #999;
}
.tab-item.active {
  color: #f97316;
  background: #fff7ed;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}
.material-icons {
  font-size: 36rpx;
}
.tab-text {
  font-size: 22rpx;
  margin-top: 8rpx;
}
</style>