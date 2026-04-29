<script setup>
import { ref,onMounted } from 'vue'
import { getCategoryListAPI } from '@/services/catelog'
// import { indexNavber } from '@/components/indexNavber.vue'

const ViceCategoryList = ref([])
const getParam = defineProps({
    cateId:{
        type:Number,
        default:1
    },
    title:{
        type:String,
        default:''
    }
})
const requestParam = {
    sortBy:'AAAA',
    cityCode:97,
    pageNum:1,
    pageSize:10,
}

const getCategoryList = async () => {
    if(!getParam.cateId)
    {
        uni.showToast({
            title: '请求错误',
            icon: 'fail'
        })
    } 
    requestParam.categoryId = getParam.cateId
    console.log("传递过来的参数是"+getParam.cateId+"和"+getParam.title)
    console.log("开始申请二级分类")
    const res = await getCategoryListAPI(requestParam)
    ViceCategoryList.value = res.data.list || []
    console.log("获取的对象是"+res)
    console.log(ViceCategoryList.value)
}

onMounted(() => {
    getCategoryList()
})


// 二级分类数据
// const subcategories = ref([
//   {
//     id: 1,
//     title: '保洁服务',
//     icon: '🧹',
//     items: [
//       { id: 101, icon: '🏠', name: '全屋保洁', desc: '全面清洁，焕然一新' },
//       { id: 102, icon: '🛋️', name: '深度保洁', desc: '细致入微，彻底清洁' },
//       { id: 103, icon: '🪟', name: '玻璃清洁', desc: '窗明几净，视野开阔' },
//       { id: 104, icon: '🧽', name: '厨房保洁', desc: '油污清除，洁净如新' },
//       { id: 105, icon: '🚽', name: '卫生间保洁', desc: '消毒除菌，清新舒适' }
//     ]
//   },
//   {
//     id: 2,
//     title: '家电维修',
//     icon: '🔧',
//     items: [
//       { id: 201, icon: '❄️', name: '空调维修', desc: '制冷制热，专业维修' },
//       { id: 202, icon: '📺', name: '电视维修', desc: '画面声音，全面修复' },
//       { id: 203, icon: '🧊', name: '冰箱维修', desc: '制冷保鲜，快速解决' },
//       { id: 204, icon: '👕', name: '洗衣机维修', desc: '洗涤脱水，专业维护' },
//       { id: 205, icon: '🍚', name: '电饭煲维修', desc: '烹饪加热，精准修复' }
//     ]
//   },
//   {
//     id: 3,
//     title: '搬家服务',
//     icon: '🚚',
//     items: [
//       { id: 301, icon: '📦', name: '小型搬家', desc: '个人物品，轻松搬运' },
//       { id: 302, icon: '🏢', name: '家庭搬家', desc: '全家物品，专业搬运' },
//       { id: 303, icon: '💼', name: '办公室搬家', desc: '办公设备，安全转移' },
//       { id: 304, icon: '🎹', name: '钢琴搬运', desc: '贵重乐器，专业搬运' },
//       { id: 305, icon: '🛋️', name: '家具拆装', desc: '专业拆装，保护家具' }
//     ]
//   },
//   {
//     id: 4,
//     title: '家居维修',
//     icon: '🏠',
//     items: [
//       { id: 401, icon: '💡', name: '灯具安装', desc: '照明设备，专业安装' },
//       { id: 402, icon: '🚪', name: '门窗维修', desc: '开合顺畅，安全牢固' },
//       { id: 403, icon: '🚿', name: '水管维修', desc: '漏水堵塞，快速解决' },
//       { id: 404, icon: '🔌', name: '电路维修', desc: '用电安全，专业检修' },
//       { id: 405, icon: '🧱', name: '墙面修补', desc: '裂缝破损，完美修复' }
//     ]
//   },
//   {
//     id: 5,
//     title: '其他服务',
//     icon: '✨',
//     items: [
//       { id: 501, icon: '🌿', name: '绿植养护', desc: '植物养护，美化环境' },
//       { id: 502, icon: '🔑', name: '开锁换锁', desc: '紧急开锁，安全可靠' },
//       { id: 503, icon: '🧹', name: '地毯清洗', desc: '深层清洁，焕然一新' },
//       { id: 504, icon: '🛋️', name: '沙发清洗', desc: '布艺皮质，专业清洗' },
//       { id: 505, icon: '🚗', name: '汽车保养', desc: '车辆维护，专业服务' }
//     ]
//   }
// ])

// 当前选中的分类
// const activeCategory = ref(1)

// 方法
// const goBack = () => {
//   uni.navigateBack()
// }

// const handleCategoryClick = (categoryId) => {
//   activeCategory.value = categoryId
// }

const handleSubcategoryClick = (subcategory) => {
  console.log('选择了子分类:', subcategory)
  uni.showToast({
    title: `选择了${subcategory.serviceName}`,
    icon: 'none'
  })
  
  // 这里可以跳转到对应的服务列表页面
  uni.navigateTo({
    url: '/pages/goods/goods?serviceId='+subcategory.serviceId+'&categoryId='+getParam.cateId
  })
}

// 获取当前分类的子分类列表
// const currentSubcategories = () => {
//   const category = subcategories.value.find(item => item.id === activeCategory.value)
//   return category ? category.items : []
// }

// 获取当前分类标题
const currentCategoryTitle = () => {
  return getParam.title || ''
}
</script>

<template>
  <view class="subcategory-page">
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <button class="nav-btn" @click="goBack">
          <text class="material-symbols-outlined">←</text>
        </button>
        <view class="navbar-title">服务分类</view>
        <view class="navbar-right">
          预留右侧按钮位置
        </view>
      </view>
    </view> -->

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 左侧分类导航 -->
      <!-- <view class="category-sidebar">
        <view 
          class="category-item" 
          v-for="category in subcategories" 
          :key="category.id"
          :class="{ 'category-active': activeCategory === category.id }"
          @click="handleCategoryClick(category.id)"
        >
          <text class="category-icon">{{ category.icon }}</text>
          <text class="category-name">{{ category.title }}</text>
        </view>
      </view> -->

      <!-- 右侧子分类列表 -->
      <view class="subcategory-content">
        <!-- 分类标题 -->
        <view class="content-header">
          <text class="content-title">{{ currentCategoryTitle() }}</text>
          <text class="content-count">{{ ViceCategoryList.length }}个服务</text>
        </view>

        <!-- 子分类网格 -->
        <view class="subcategory-grid">
          <view 
            class="subcategory-item" 
            v-for="item in ViceCategoryList" 
            :key="item.id"
            @click="handleSubcategoryClick(item)"
          >
            <!-- 左侧图标区域 -->
            <view class="item-icon-area">
              <image class="item-icon" :src="item.coverImage" mode="aspectFill"/>
            </view>
            
            <!-- 右侧文字区域 -->
            <view class="item-text-area">
              <text class="item-name">{{ item.serviceName }}</text>
              <text class="item-desc">{{ item.description }}</text>
            </view>
          </view>
        </view>
      </view>
    </main>
  </view>
</template>

<style lang="scss" scoped>
// 颜色变量（参考您的项目配色）
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

.subcategory-page {
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

// 主内容区
.main-content {
//  padding-top: 88rpx;
  display: flex;
  height: calc(100vh - 88rpx);
}

// 左侧分类导航
.category-sidebar {
  width: 240rpx;
  background-color: $surface-container-low;
  border-right: 1rpx solid $surface-container;
  overflow-y: auto;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid $surface-container;
  transition: all 0.2s ease;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: $surface-container;
  }

  &.category-active {
    background-color: $surface-lowest;
    border-right: 4rpx solid $primary-fixed;
  }
}

.category-icon {
  font-size: 48rpx;
  margin-bottom: 16rpx;
}

.category-name {
  font-size: 24rpx;
  font-weight: 600;
  color: $on-surface;
  text-align: center;
  line-height: 1.2;
}

.category-active .category-name {
  color: $primary-fixed;
  font-weight: 700;
}

// 右侧子分类内容
.subcategory-content {
  flex: 1;
  padding: 32rpx;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.content-title {
  font-size: 32rpx;
  font-weight: 700;
  color: $on-surface;
}

.content-count {
  font-size: 24rpx;
  color: $on-surface-variant;
}

// 子分类网格
.subcategory-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24rpx;
}

.subcategory-item {
  background-color: $surface-lowest;
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
}

// 左侧图标区域
.item-icon-area {
  width: 160rpx;
  height: 160rpx;
  background: linear-gradient(135deg, rgba($primary-fixed, 0.1), rgba($primary-fixed, 0.2));
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.item-icon {
//   font-size: 48rpx;
  width: 100%;
  height: 100%;
}

// 右侧文字区域
.item-text-area {
  // color:#ff851b;
  flex: 1;
  min-width: 0;
}

.item-name {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  // color: $on-surface;
  color: #ff851b;
  margin-bottom: 8rpx;
  line-height: 1.2;
}

.item-desc {
  display: block;
  font-size: 24rpx;
  color: $on-surface-variant;
  line-height: 1.4;
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

// 响应式适配
@media (min-width: 768px) {
  .subcategory-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32rpx;
  }
}

@media (min-width: 1024px) {
  .subcategory-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>