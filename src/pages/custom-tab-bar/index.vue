<template>
  <view class="tabbar">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tabbar-item"
      @click="navTo(item.pagePath, index)"
    >
      <image :src="index === current ? item.selectedIconPath : item.iconPath" class="icon"></image>
      <view class="text" :style="{ color: index === current ? selectedColor : color }">
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      color: "#333",
      selectedColor: "#27ba9b",
      list: [
        {
          text: "首页",
          pagePath: "/pages/index/index",
          iconPath: "/static/tabs/index.png",
          selectedIconPath: "/static/tabs/index1.png"
        },
        {
          text: "分类",
          pagePath: "/pages/category/category",
          iconPath: "/static/tabs/catelog.png",
          selectedIconPath: "/static/tabs/catelog1.png"
        },
        {
          text: "购物车",
          pagePath: "/pages/cart/cart",
          iconPath: "/static/tabs/car.png",
          selectedIconPath: "/static/tabs/car1.png"
        },
        {
          text: "我的",
          pagePath: "/pages/my/my",
          iconPath: "/static/tabs/my.png",
          selectedIconPath: "/static/tabs/my1.png"
        },
      ],
      current: 0
    };
  },
  onShow() {
    const page = getCurrentPages().pop();
    this.current = this.list.findIndex((item) => item.pagePath === `/${page.route}`);
  },
  methods: {
    navTo(path) {
      uni.switchTab({ url: path });
    }
  }
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #aaf1ff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);

  /* 👇 核心：顶部两个圆角 大小自己改 */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 999;
}
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}
.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}
</style>