
<script setup>
import IndexNavber from '@/components/indexNavber.vue';
import { ref } from 'vue'

// 搜索关键词
const keyword = ref('')
// 当前选中的筛选类型
const activeFilter = ref('price')

// 服务列表数据
const serviceList = ref([
  {
    id: 1,
    name: '深度保洁·全屋除垢',
    sales: '1.2k+',
    rating: '99',
    price: '299',
    unit: '/4小时起',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAm9BtrJDJHn_BGlqtfMDzYPbHz5tR1QHo9O888YC1OMWqbOaml-FC2a5b_g6pVJn73xNgyX0pAiHr1ru_2ZHgVmTXQnXDefK2MMJvDoMBg3Hn-26u4J5FluBGNj7ut8_RK7p4ZOOtwR11W4gAi0bbqMFOK1pQJUxXNPxowGclRmXoiJEmmH0_7qr3BXzz6yJwR3NiUKmKpHJzQNK_MY_y-8p3sq0ZkiEVlIFAvY9zsN5uAzTVaRBEm43YodV2xoo6P4eJnCGZtA'
  },
  {
    id: 2,
    name: '空调加氟清洗·极速达',
    sales: '800+',
    rating: '98.5',
    price: '158',
    unit: '/次起',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_B51LuSAabxvpvhQltygUPSExLqDcfXEkVKerqpfomNM9XpySuXmz4vSZQgKBdw9gRnDAFsNPXt10YlUeMQFbUeGV9yIXxfjS9hkrT236EPld71aqNVrSI94UOYbh-6SpyyZz6LtXaHyrBE-2IN-_x0mEsyOtkK5fBaAHInRApHSBXD_mcrl0wpPJsY6lC1ic4dPxrb-2ENTCh3BLjPx5SIFlbUqbiDGBB0pUvqfs8zgpus07a_b4iyan2yP5OD2orP6V0H6HPQ'
  },
  {
    id: 3,
    name: '日式精细搬家·全程免手',
    sales: '450+',
    rating: '100',
    price: '588',
    unit: '/车起',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAQgez4vFcBbESVgJo-JfybzIXs5jjMYd8xrpBDllvyB0w4saBB_nzDC4iYnAvkrUrTh-q-E7NSYOyedH0fE6fPv7zgHQ2aPeVIzsptQgWrcee02VWSbVFYCoUTL2TkEwBB52jfh0YIfetTvhhX8nkey7TiPT3ot87UzgPih1i1drTE-Q4LeW0sE51V1q3tSND7yCuSzV1L3tKQ8wigfcUtYYR0u6XvZJjFsnj8Edr4JUJ2h_5E69TTpN4t2KqHiBI9yYSGPp-Sw'
  },
  {
    id: 4,
    name: '全身经络按摩·舒缓疲劳',
    sales: '2.1k+',
    rating: '99.2',
    price: '198',
    unit: '/60分钟',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHGIVXMQ8Tnzdl1j5MoII59FaRaAv0JJnxxTyqly56fcuHkYu0X8K9QaUOXiChKd05doIoIUX7op0jRtmZjx5y93Pzu2_f_hONXa21JGw3rAtqftoYSRhI_P21TSsB_klx4lkqt5AzUa4xknQUcuyNjZ1ekiQhnB6INMe5ybMornuj4nMdpqoeIK6rIIMy1m0P6YJHTTtpEKfsGO67Togyk-2vuWJOtgbNCKbdpeLkWEa01rshZg8P1mrkNRxKJAy_-0qznVGo9g'
  }
])

// 方法
const setFilter = (type) => {
  activeFilter.value = type
  // 实际项目中可调用接口重新获取数据
  console.log('切换筛选:', type)
}

const onSearchTap = () => {
  console.log('搜索', keyword.value)
}

const goToDetail = (id) => {
  console.log('跳转详情', id)
}

const onBook = (id) => {
  console.log('预约服务', id)
}


</script>
<template>

  <view class="service-list-page">
    <!-- <IndexNavber/> -->
    <main class="main-content">
      <!-- 搜索栏 -->
      <view class="search-section">
        <view class="search-box">
          <text class="search-icon">🔍</text>
          <input
            class="search-input"
            type="text"
            placeholder="         搜索家政、维修..."
            placeholder-class="search-placeholder"
            v-model="keyword"
          />
        </view>
      </view>

      <!-- 筛选栏（横向滚动） -->
      <scroll-view scroll-x class="filter-scroll" show-scrollbar="false">
        <view class="filter-list">
          <button
            class="filter-btn"
            :class="{ 'filter-active': activeFilter === 'price' }"
            @click="setFilter('price')"
          >
            价格优先
            <text class="filter-arrow">⌵</text>
          </button>
          <button
            class="filter-btn"
            :class="{ 'filter-active': activeFilter === 'sales' }"
            @click="setFilter('sales')"
          >
            销量优先
          </button>
          <button
            class="filter-btn"
            :class="{ 'filter-active': activeFilter === 'rating' }"
            @click="setFilter('rating')"
          >
            好评优先
          </button>
          <button
            class="filter-btn"
            :class="{ 'filter-active': activeFilter === 'distance' }"
            @click="setFilter('distance')"
          >
            距离优先
          </button>
        </view>
      </scroll-view>

      <!-- 服务列表 -->
      <view class="service-list">
        <view
          class="service-card"
          v-for="service in serviceList"
          :key="service.id"
          @click="goToDetail(service.id)"
        >
          <image class="service-img" :src="service.image" mode="aspectFill" />
          <view class="service-info">
            <view class="service-header">
              <text class="service-name">{{ service.name }}</text>
              <view class="meta-row">
                <text class="sales">销量 {{ service.sales }}</text>
                <view class="divider"></view>
                <text class="rating">好评率 {{ service.rating }}%</text>
              </view>
            </view>
            <view class="price-row">
              <view class="price-box">
                <text class="currency">¥</text>
                <text class="price">{{ service.price }}</text>
                <text class="unit">{{ service.unit }}</text>
              </view>
              <button class="book-btn" @click.stop="onBook(service.id)">
                预约
              </button>
            </view>
          </view>
        </view>
      </view>
    </main>


  </view>
</template>



<style lang="scss" scoped>
/* 全局颜色变量（与原设计系统对应） */
$primary: #ff851b;
$primary-dark: #ee7805;
$surface: #f7f6f5;
$surface-lowest: #ffffff;
$surface-container: #e8e8e7;
$on-surface: #2e2f2f;
$on-surface-variant: #454645;
$outline-variant: #adadac;
$shadow-color: rgba(255, 133, 27, 0.08);

.service-list-page {
  min-height: 100vh;
  background-color: $surface;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}






.icon-btn {
  background: transparent;
  padding: 8px;
  border-radius: 9999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    transform: scale(0.95);
  }
}

.icon {
  font-size: 24px;
}

.navbar-divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.05);
}

/* 主内容区（避开固定导航） */
.main-content {
//   padding-top: 80px;
  padding-bottom: 120px;
  padding-left: 16px;
  padding-right: 16px;

//   max-width: 1200px;
  margin: 0 auto;
}

/* 搜索栏 */
.search-section {

  margin-bottom: 10px;
}

.search-box {
  position: relative;
//   align-items: center;
//   width78: 280px;
//   width:540rpx;
  width: 100%;
    box-sizing: border-box;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
//   font-size: 20px;
  color: $on-surface-variant;
//   pointer-events: none;
    // box-sizing: border-box;
    
}

.search-input {
  width: 100%;
  height: 56px;
//   padding-left: 52px;
//   padding-right: 24px;
  background-color: $surface-lowest;
  border-radius: 28px;
  font-size: 16px;
  color: $on-surface;
  box-shadow: 0 8px 24px $shadow-color;
  border: none;
}

.search-placeholder {
//   color: $on-surface-variant;
}

/* 筛选栏（横向滚动） */
.filter-scroll {
//   box-sizing: border-box;
  white-space: nowrap;
  margin-bottom: 10px;
  width: 100%;
}

.filter-list {
  display: inline-flex;
//   max-width:1200px;
  gap: 12px;
  padding: 0 8px;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 24px;
  border-radius: 9999px;
  background-color: $surface-container;
  color: $on-surface-variant;
  font-size: 14px;
  font-weight: 600;
  border: none;
  transition: all 0.2s;

  &:active {
    transform: scale(0.96);
  }
}

.filter-active {
  background-color: $primary;
  color: white;
}

.filter-arrow {
  font-size: 16px;
}

/* 服务列表 */
.service-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.service-card {
  display: flex;
  gap: 16px;
  background-color: $surface-lowest;
  border-radius: 24px;
  padding: 16px;
  transition: box-shadow 0.3s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:active {
    transform: scale(0.99);
  }
}

.service-img {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  flex-shrink: 0;
  background-color: $surface-container;
}

.service-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.service-header {
  margin-bottom: 8px;
}

.service-name {
  font-size: 16px;
  font-weight: 700;
  color: $on-surface;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: $on-surface-variant;
}

.sales {
  flex-shrink: 0;
}

.divider {
  width: 1px;
  height: 12px;
  background-color: $outline-variant;
}

.rating {
  color: $primary;
  font-weight: 600;
  flex-shrink: 0;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width:100%;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 2px;
  flex-wrap: wrap;
  flex:1;
  min-width: 0;
  font-size: 14px;  
    border: none;
  transition: transform 0.1s;
  white-space: nowrap;
  &:active {
    transform: scale(0.94);
    }
}

.currency {
  font-size: 12px;
  font-weight: 700;
  color: $primary;
}

.price {
  font-size: 22px;
  font-weight: 800;
  color: $primary;
  line-height: 1;
}

.unit {
  font-size: 11px;
  color: $on-surface-variant;
  margin-left: 4px;
}

.book-btn {
  background-color: $primary;
  color: white;
  padding: 8px 18px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  transition: transform 0.1s;

  &:active {
    transform: scale(0.94);
  }
}


.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 12px 0 8px;
  color: #9ca3af;
  transition: all 0.2s;

  &:active {
    transform: scale(0.96);
  }
}

.tab-active {
  background-color: rgba(255, 133, 27, 0.15);
  color: $primary;
  border-radius: 32px;
  margin: 4px 8px;
}

.tab-icon {
  font-size: 24px;
  margin-bottom: 2px;
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
}
</style>