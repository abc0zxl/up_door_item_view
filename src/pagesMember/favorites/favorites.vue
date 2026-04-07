<script setup>
import { ref } from 'vue'

// 收藏数据
const favorites = ref([
  {
    id: 1,
    title: '深度全屋保洁',
    description: '含客厅、卧室、厨房、卫生间及阳台的基础除尘与高温杀菌',
    price: '299',
    originalPrice: '399',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT0EwILZl3qTm_OUu2XHfj1MZqqxacQ-HevcxhJLG2ZX7NBS4nqgQQcJgYvNTXgjqJjEYzJUqRO2SEMXnRTtJxvqaFuaC6l7OHDIte3qUnYbUIuxzMbHBEOl5TZfwvf_xCkhkYz0MnFlcg7I6dfh0fDVEV3OdyjS28MM_Cvv4JnDwSLRSCGd05B-y9HMpoVLBx-6Mpoge9xJaWURIDESiotwfwpqKbU_RXsjF7SJs91fr0Qogdn82YNBJvTepwBkAYvYWw5cADqw',
    rating: '4.9',
    orders: '1.2k+',
    tags: ['深度清洁', '高温杀菌', '赠送擦窗'],
    isActive: true
  },
  {
    id: 2,
    title: '空调加氟清洗',
    description: '专业空调清洗加氟服务，极速上门，当天完成',
    price: '158',
    originalPrice: '220',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_B51LuSAabxvpvhQltygUPSExLqDcfXEkVKerqpfomNM9XpySuXmz4vSZQgKBdw9gRnDAFsNPXt10YlUeMQFbUeGV9yIXxfjS9hkrT236EPld71aqNVrSI94UOYbh-6SpyyZz6LtXaHyrBE-2IN-_x0mEsyOtkK5fBaAHInRApHSBXD_mcrl0wpPJsY6lC1ic4dPxrb-2ENTCh3BLjPx5SIFlbUqbiDGBB0pUvqfs8zgpus07a_b4iyan2yP5OD2orP6V0H6HPQ',
    rating: '4.8',
    orders: '800+',
    tags: ['极速上门', '专业清洗', '当天完成'],
    isActive: true
  },
  {
    id: 3,
    title: '日式精细搬家',
    description: '全程免手，专业打包，家具保护，安全可靠',
    price: '588',
    originalPrice: '688',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAQgez4vFcBbESVgJo-JfybzIXs5jjMYd8xrpBDllvyB0w4saBB_nzDC4iYnAvkrUrTh-q-E7NSYOyedH0fE6fPv7zgHQ2aPeVIzsptQgWrcee02VWSbVFYCoUTL2TkEwBB52jfh0YIfetTvhhX8nkey7TiPT3ot87UzgPih1i1drTE-Q4LeW0sE51V1q3tSND7yCuSzV1L3tKQ8wigfcUtYYR0u6XvZJjFsnj8Edr4JUJ2h_5E69TTpN4t2KqHiBI9yYSGPp-Sw',
    rating: '5.0',
    orders: '450+',
    tags: ['全程免手', '专业打包', '家具保护'],
    isActive: true
  },
  {
    id: 4,
    title: '全身经络按摩',
    description: '专业按摩师上门服务，舒缓疲劳，放松身心',
    price: '198',
    originalPrice: '268',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHGIVXMQ8Tnzdl1j5MoII59FaRaAv0JJnxxTyqly56fcuHkYu0X8K9QaUOXiChKd05doIoIUX7op0jRtmZjx5y93Pzu2_f_hONXa21JGw3rAtqftoYSRhI_P21TSsB_klx4lkqt5AzUa4xknQUcuyNjZ1ekiQhnB6INMe5ybMornuj4nMdpqoeIK6rIIMy1m0P6YJHTTtpEKfsGO67Togyk-2vuWJOtgbNCKbdpeLkWEa01rshZg8P1mrkNRxKJAy_-0qznVGo9g',
    rating: '4.9',
    orders: '2.1k+',
    tags: ['专业按摩', '上门服务', '舒缓疲劳'],
    isActive: true
  }
])

// 筛选状态
const filterType = ref('all') // all, active, inactive

// 方法
const goBack = () => {
  uni.navigateBack()
}

const handleFilterChange = (type) => {
  filterType.value = type
}

const handleRemoveFavorite = (itemId) => {
  uni.showModal({
    title: '确认移除',
    content: '确定要从收藏中移除这个服务吗？',
    success: (res) => {
      if (res.confirm) {
        const index = favorites.value.findIndex(item => item.id === itemId)
        if (index !== -1) {
          favorites.value[index].isActive = false
          uni.showToast({
            title: '已移除收藏',
            icon: 'success'
          })
        }
      }
    }
  })
}

const handleServiceDetail = (itemId) => {
  console.log('查看服务详情:', itemId)
  uni.navigateTo({
    url: `/pages/goodsDetail/Detail?id=${itemId}`
  })
}

const handleBookNow = (itemId) => {
  console.log('立即预约:', itemId)
  uni.showToast({
    title: '跳转预约页面',
    icon: 'none'
  })
}

// 计算属性
const filteredFavorites = () => {
  if (filterType.value === 'all') {
    return favorites.value.filter(item => item.isActive)
  } else if (filterType.value === 'active') {
    return favorites.value.filter(item => item.isActive)
  }
  return favorites.value.filter(item => !item.isActive)
}

const favoriteCount = () => {
  return favorites.value.filter(item => item.isActive).length
}
</script>

<template>
  <view class="favorites-page">
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <button class="nav-btn" @click="goBack">
          <text class="material-symbols-outlined">←</text>
        </button>
        <view class="navbar-title">我的收藏</view>
        <view class="favorite-count">{{ favoriteCount() }}个收藏</view>
      </view>
    </view> -->

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 筛选标签 -->
      <!-- <view class="filter-tabs">
        <button 
          class="filter-tab" 
          :class="{ 'filter-active': filterType === 'all' }"
          @click="handleFilterChange('all')"
        >
          全部收藏
        </button>
        <button 
          class="filter-tab" 
          :class="{ 'filter-active': filterType === 'active' }"
          @click="handleFilterChange('active')"
        >
          有效收藏
        </button>
      </view> -->

      <!-- 收藏列表 -->
      <view class="favorites-list">
        <view 
          class="favorite-item" 
          v-for="item in filteredFavorites()" 
          :key="item.id"
          @click="handleServiceDetail(item.id)"
        >
          <!-- 服务图片 -->
          <image class="service-image" :src="item.image" mode="aspectFill" />
          
          <!-- 服务信息 -->
          <view class="service-info">
            <view class="service-header">
              <text class="service-title">{{ item.title }}</text>
              <button 
                class="remove-btn" 
                @click.stop="handleRemoveFavorite(item.id)"
              >
                <text class="material-symbols-outlined">❤️</text>
              </button>
            </view>
            
            <text class="service-desc">{{ item.description }}</text>
            
            <!-- 标签 -->
            <view class="tag-list">
              <text class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</text>
            </view>
            
            <!-- 评分和销量 -->
            <view class="meta-info">
              <view class="rating">
                <text class="rating-star">⭐</text>
                <text class="rating-value">{{ item.rating }}</text>
              </view>
              <text class="orders">销量 {{ item.orders }}</text>
            </view>
            
            <!-- 价格和操作 -->
            <view class="price-action">
              <view class="price-info">
                <text class="current-price">¥{{ item.price }}</text>
                <text class="original-price">¥{{ item.originalPrice }}</text>
              </view>
              <button class="book-btn" @click.stop="handleBookNow(item.id)">
                立即预约
              </button>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="filteredFavorites().length === 0">
        <view class="empty-icon">❤️</view>
        <text class="empty-title">暂无收藏</text>
        <text class="empty-desc">去发现更多优质服务吧</text>
        <button class="empty-btn" @click="goBack">
          返回首页
        </button>
      </view>
    </main>
  </view>
</template>

<style lang="scss" scoped>
// 颜色变量（与my页面保持一致）
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

.favorites-page {
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

.favorite-count {
  font-size: 28rpx;
  color: $on-surface-variant;
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
  // padding-top: 88rpx;
  padding-bottom: 120rpx;
}

// 筛选标签
.filter-tabs {
  display: flex;
  padding: 32rpx;
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

// 收藏列表
.favorites-list {
  padding: 0 32rpx;
}

.favorite-item {
  background-color: $surface-lowest;
  border-radius: 32rpx;
  margin-bottom: 32rpx;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}

.service-image {
  width: 100%;
  height: 300rpx;
  object-fit: cover;
}

.service-info {
  padding: 32rpx;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16rpx;
}

.service-title {
  font-size: 32rpx;
  font-weight: 700;
  color: $on-surface;
  flex: 1;
  margin-right: 16rpx;
}

.remove-btn {
  background: transparent;
  border: none;
  padding: 8rpx;
  border-radius: 50%;

  .material-symbols-outlined {
    font-size: 36rpx;
    color: $primary-fixed;
  }

  &:active {
    background-color: $surface-container;
  }
}

.service-desc {
  font-size: 28rpx;
  color: $on-surface-variant;
  line-height: 1.4;
  margin-bottom: 20rpx;
  display: block;
}

// 标签列表
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.tag {
  background-color: rgba($primary-fixed, 0.1);
  color: $primary-fixed;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: 500;
}

// 元信息
.meta-info {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.rating-star {
  font-size: 24rpx;
}

.rating-value {
  font-size: 26rpx;
  font-weight: 600;
  color: $on-surface;
}

.orders {
  font-size: 26rpx;
  color: $on-surface-variant;
}

// 价格和操作
.price-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;

}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
  flex-shrink: 0;
}

.current-price {
  font-size: 36rpx;
  font-weight: 800;
  color: $primary-fixed;
}

.original-price {
  font-size: 28rpx;
  color: $on-surface-variant;
  text-decoration: line-through;
}

.book-btn {
  background: linear-gradient(135deg, $primary-fixed, #ff6b00);
  color: $surface-lowest;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.3);
  margin-right: 0;
  &:active {
    transform: scale(0.95);
  }
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
  margin-bottom: 48rpx;
}

.empty-btn {
  background-color: $primary-fixed;
  color: $surface-lowest;
  padding: 24rpx 48rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 600;
  border: none;

  &:active {
    transform: scale(0.95);
  }
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