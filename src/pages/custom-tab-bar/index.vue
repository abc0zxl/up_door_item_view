<script>
export default {
  data() {
    return {
      currentIndex: 0, // 当前选中的索引
      color: '#999999', // 未选中文字颜色
      selectedColor: '#ff851b', // 选中文字颜色
      list: [ // 导航栏配置数据
        {
          pagePath: "/pages/index/index",
          iconPath: "/static/tabs/index.png",
          selectedIconPath: "/static/tabs/index1.png",
          text: "首页"
        },
        {
          pagePath: "/pages/category/category",
          iconPath: "/static/tabs/catelog.png",
          selectedIconPath: "/static/tabs/catelog1.png",
          text: "分类"
        },
        {
          pagePath: "/pages/cart/cart",
          iconPath: "/static/tabs/car.png",
          selectedIconPath: "/static/tabs/car1.png",
          text: "购物车",
          isCenter: true // 标记为中间按钮，用于特殊样式
        },
        {
          pagePath: "/pages/my/my",
          iconPath: "/static/tabs/my.png",
          selectedIconPath: "/static/tabs/my1.png",
          text: "我的"
        }
      ]
    };
  },
    onShow() {
    // 同步选中状态
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const currentPath = currentPage.route;
    
    const index = this.list.findIndex(item => item.pagePath === `/${currentPath}`);
    if (index !== -1) {
      this.currentIndex = index;
    }
  },
  methods: {
    switchTab(index, url) {
      this.currentIndex = index;
      uni.switchTab({ url }); // 使用 uni.switchTab 进行跳转
    }
  }
};
</script>

<template>
  <!-- 自定义底部导航栏容器 -->
  <view class="custom-tab-bar">
    <view 
      v-for="(item, index) in list" 
      :key="index"
      class="tab-bar-item"
      :class="{ 'is-active': currentIndex === index, 'is-center': item.isCenter }"
      @click="switchTab(index, item.pagePath)"
    >
      <!-- 普通图标 -->
      <image 
        v-if="!item.isCenter && currentIndex !== index" 
        :src="item.iconPath" 
        class="tab-icon"
      />
      <!-- 选中时的图标 -->
      <image 
        v-if="!item.isCenter && currentIndex === index" 
        :src="item.selectedIconPath" 
        class="tab-icon"
      />
      <!-- 中间凸起按钮的图标 -->
      <image 
        v-if="item.isCenter" 
        :src="item.iconPath" 
        class="center-icon"
      />
      <text class="tab-text" :style="{ color: currentIndex === index ? selectedColor : color }">
        {{ item.text }}
      </text>
    </view>
  </view>
</template>



<style lang="scss">
// 自定义底部导航栏的样式
.custom-tab-bar {
  // border-radius:24px;
  border-radius: 24px 24px 0 0;//四个参数分别是，上左、上右、下左、下右的圆角半径
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px; // 固定高度
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #f0f0f0;
  padding-bottom: env(safe-area-inset-bottom); // 适配全面屏
  z-index: 999;
}

.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &.is-center {
    // 中间按钮凸起效果
    margin-top: -20px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
}

.center-icon {
  width: 40px;  // 中间图标稍大
  height: 40px;
  margin-bottom: 2px;
}

.tab-text {
  font-size: 10px;
  line-height: 1;
}
</style>