<template>
  <view class="service-detail-page">
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <view class="navbar-left">
          <button class="nav-btn" @click="goBack">
            <text class="icon">←</text>
          </button>
        </view>
        <view class="navbar-title">服务详情</view>
        <view class="navbar-right">
          <button class="nav-btn" @click="onShare">
            <text class="icon">↗</text>
          </button>
        </view>
      </view>
      <view class="navbar-divider"></view>
    </view> -->

    <main class="main-content">
      <!-- 轮播图区域 -->
      <view class="hero-banner">
        <swiper class="banner-swiper" :indicator-dots="false" :autoplay="false">
          <swiper-item v-for="(img, idx) in bannerImages" :key="idx">
            <image class="banner-img" :src="img" mode="aspectFill" />
          </swiper-item>
        </swiper>
        <view class="banner-counter">{{ currentBannerIndex + 1 }} / {{ bannerImages.length }}</view>
      </view>


      <!-- 服务信息卡片 -->
      <view class="info-card">
        <view class="price-stats">
          <view class="price-box">
            <text class="currency">¥</text>
            <text class="price">{{ serviceData.price }}</text>
          </view>
          <view class="stats-box">
            <view class="stats-row">
              <text class="stat">{{ serviceData.orders }}+ 已订</text>
              <text class="stat">{{ serviceData.rating }}% 好评</text>
            </view>
            <view class="original-price">¥{{ serviceData.originalPrice }}</view>
          </view>
        </view>

        <view class="service-title">{{ serviceData.title }}</view>
        <view class="service-desc">{{ serviceData.description }}</view>

        <view class="tag-list">
          <view class="tag" v-for="tag in serviceData.tags" :key="tag.name">
            <text class="tag-icon">{{ tag.icon }}</text>
            <text class="tag-text">{{ tag.name }}</text>
          </view>
        </view>
      </view>

      <!-- 选择规格 / 地址 -->
      <view class="selectors">
        <button class="selector-btn" @click="selectSpec">
          <view class="selector-label">规格</view>
          <view class="selector-value">选择：时长/面积/服务内容</view>
          <text class="arrow">›</text>
        </button>
        <button class="selector-btn" @click="selectAddress">
          <view class="selector-label">送至</view>
          <view class="address-info">
            <text class="address-line">{{ address.address }}</text>
            <text class="delivery-tip">{{ address.tip }}</text>
          </view>
          <text class="arrow">›</text>
        </button>
      </view>

      <!-- 服务亮点 (Bento 布局) -->
      <view class="highlights">
        <view class="section-title">服务亮点</view>
        <view class="highlight-grid">
          <view class="highlight-card hero-card">
            <image class="hero-bg" :src="heroImage" mode="aspectFill" />
            <view class="hero-overlay"></view>
            <view class="hero-content">
              <text class="hero-title">高温蒸汽消杀</text>
              <text class="hero-desc">140℃高温除菌，杀灭99.9%家庭细菌</text>
            </view>
          </view>
          <view class="highlight-card" v-for="item in features" :key="item.title">
            <view class="feature-icon">{{ item.icon }}</view>
            <view class="feature-text">
              <text class="feature-title">{{ item.title }}</text>
              <text class="feature-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="bottom-placeholder"></view>
    </main>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="action-icons">
        <button class="action-btn" @click="toggleFavorite">
          <text class="icon">{{ isFavorited ? '❤️' : '🤍' }}</text>
          <text class="label">收藏</text>
        </button>
        <button class="action-btn" @click="contactService">
          <text class="icon">💬</text>
          <text class="label">客服</text>
        </button>
        <button class="action-btn" @click="goToCart">
          <text class="icon">🛒</text>
          <text class="label">购物车</text>
          <view v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</view>
        </button>
      </view>
      <view class="cta-buttons">
        <button class="cta-btn add-cart" @click="addToCart">加入购物车</button>
        <button class="cta-btn buy-now" @click="buyNow">立即购买</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 轮播图数据
const bannerImages = ref([
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCT0EwILZl3qTm_OUu2XHfj1MZqqxacQ-HevcxhJLG2ZX7NBS4nqgQQcJgYvNTXgjqJjEYzJUqRO2SEMXnRTtJxvqaFuaC6l7OHDIte3qUnYbUIuxzMbHBEOl5TZfwvf_xCkhkYz0MnFlcg7I6dfh0fDVEV3OdyjS28MM_Cvv4JnDwSLRSCGd05B-y9HMpoVLBx-6Mpoge9xJaWURIDESiotwfwpqKbU_RXsjF7SJs91fr0Qogdn82YNBJvTepwBkAYvYWw5cADqw'
])
const currentBannerIndex = ref(0)

// 服务数据
const serviceData = reactive({
  price: '299',
  originalPrice: '399',
  orders: '1200',
  rating: '99',
  title: '深度全屋保洁 · 焕然一新套餐',
  description: '含客厅、卧室、厨房、卫生间及阳台的基础除尘与高温杀菌，赠送玻璃内侧擦拭。',
  tags: [
    { name: '无忧退', icon: '✅' },
    { name: '极速上门', icon: '⚡' },
    { name: '官方认证', icon: '🏅' }
  ]
})

// 地址数据
const address = reactive({
  address: '北京市 朝阳区 幸福大街...',
  tip: '今天 14:00 前下单，预计明日上门'
})

// 亮点数据
const heroImage = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuC7NNFYDBIo-_WEUr6Kpu_wgJG7P1iDEwgCPonRluZ6kXSitSkHqnxTzZnovHg0lWaJAb30XfjmqG3UG81-D5qPfLTISb4b_PBhnLNwnSiTZZ3IKHyN7eu7VCipEVBEAoukdjDakscOab5cBoI2dn7kGqfQxGmfhhRu54mlxCx51eJ5xb4br4OCvn-kV16q1Wna0tMAW4f--sTszIozNyRRgqdyPg0BcKsw_psNMvi_AarYBCIFA_opxIZ_GnzMo38DxjRBmQpEtw')
const features = ref([
  { icon: '🛠️', title: '标准工具组', desc: '分区分色抹布，拒绝交叉污染' },
  { icon: '👤', title: '实名认证师傅', desc: '5年+经验，100%持证上岗' }
])

// 底部状态
const isFavorited = ref(false)
const cartCount = ref(2)

// 交互方法
const goBack = () => {
  uni.navigateBack()
}
const onShare = () => {
  uni.showToast({ title: '分享功能', icon: 'none' })
}
const selectSpec = () => {
  uni.showToast({ title: '选择规格', icon: 'none' })
}
const selectAddress = () => {
  uni.showToast({ title: '选择地址', icon: 'none' })
}
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  uni.showToast({ title: isFavorited.value ? '已收藏' : '已取消收藏', icon: 'none' })
}
const contactService = () => {
  uni.showToast({ title: '联系客服', icon: 'none' })
}
const goToCart = () => {
  uni.showToast({ title: '打开购物车', icon: 'none' })
}
const addToCart = () => {
  cartCount.value++
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}
const buyNow = () => {
  uni.showToast({ title: '立即购买', icon: 'none' })
}
</script>

<style lang="scss" scoped>
/* 颜色变量（与原设计系统一致） */
$primary: #ff851b;
$primary-dark: #ee7805;
$surface: #f7f6f5;
$surface-lowest: #ffffff;
$surface-container: #e8e8e7;
$on-surface: #2e2f2f;
$on-surface-variant: #5b5c5b;
$outline-variant: #adadac;

.service-detail-page {
  min-height: 100vh;
  background-color: $surface;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* 顶部导航栏 */
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 20px;
}

.navbar-left, .navbar-right {
  width: 48px;
}

.navbar-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: $primary;
}

.nav-btn {
  background: $surface-container;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;

  .icon {
    font-size: 22px;
    color: $on-surface;
  }

  &:active {
    transform: scale(0.95);
  }
}

.navbar-divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.05);
}

/* 主内容区 */
.main-content {
  padding-top: 64px;
  padding-bottom: 100px;
}

/* 轮播图 */
.hero-banner {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: $surface-container;
//   z-index: 999;
  margin-bottom:20px;
}

.banner-swiper {
  width: 100%;
  height: 100%;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.banner-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  padding: 4px 12px;
  border-radius: 40px;
  color: white;
  font-size: 12px;
  font-weight: 500;
}

/* 信息卡片 */
.info-card {
    // position: absolute;
//   bottom: -20px; 
  background: $surface-lowest;
  border-radius: 24px;
  margin: -24px 20px 0;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(255, 133, 27, 0.06);
}

.price-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 2px;

  .currency {
    font-size: 18px;
    font-weight: 700;
    color: $primary;
  }

  .price {
    font-size: 40px;
    font-weight: 800;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: $primary;
    line-height: 1;
  }
}

.stats-box {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .stats-row {
    display: flex;
    gap: 12px;

    .stat {
      font-size: 14px;
      font-weight: 600;
      color: $on-surface;
    }
  }

  .original-price {
    font-size: 14px;
    color: $on-surface-variant;
    text-decoration: line-through;
  }
}

.service-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: $on-surface;
  line-height: 1.2;
  margin-bottom: 12px;
}

.service-desc {
  font-size: 14px;
  color: $on-surface-variant;
  line-height: 1.5;
  margin-bottom: 24px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid $surface-container;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: rgba(255, 133, 27, 0.1);
  padding: 6px 12px;
  border-radius: 40px;

  .tag-icon {
    font-size: 16px;
  }

  .tag-text {
    font-size: 12px;
    font-weight: 500;
    color: $primary;
  }
}

/* 选择器 */
.selectors {
  margin: 16px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.selector-btn {
  width: 100%;
  background: $surface-lowest;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  text-align: left;

  &:active {
    transform: scale(0.98);
  }
}

.selector-label {
  width: 48px;
  font-size: 14px;
  font-weight: 500;
  color: $on-surface-variant;
}

.selector-value {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: $on-surface;
}

.address-info {
  flex: 1;
  display: flex;
  flex-direction: column;

  .address-line {
    font-size: 14px;
    font-weight: 600;
    color: $on-surface;
  }

  .delivery-tip {
    font-size: 11px;
    font-weight: 700;
    color: $primary;
    margin-top: 4px;
  }
}

.arrow {
  font-size: 24px;
  color: $outline-variant;
}

/* 服务亮点 */
.highlights {
  margin: 32px 20px 0;
}

.section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.highlight-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.highlight-card {
  background: $surface-lowest;
  border-radius: 20px;
  padding: 20px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}

.hero-card {
  grid-column: span 2;
  padding: 0;
  min-height: 180px;
  justify-content: flex-end;
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  color: white;

  .hero-title {
    font-size: 18px;
    font-weight: 700;
    display: block;
    margin-bottom: 6px;
  }

  .hero-desc {
    font-size: 12px;
    opacity: 0.8;
  }
}

.feature-icon {
  width: 48px;
  height: 48px;
  background-color: rgba(255, 133, 27, 0.1);
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 12px;
}

.feature-text {
  .feature-title {
    font-size: 14px;
    font-weight: 700;
    display: block;
    margin-bottom: 4px;
  }

  .feature-desc {
    font-size: 11px;
    color: $on-surface-variant;
    line-height: 1.3;
  }
}

.bottom-placeholder {
  height: 48px;
}

/* 底部操作栏 */
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px 24px 0 0;
  padding: 12px 20px;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
}

.action-icons {
  display: flex;
  align-items: center;
  gap: 2px;
}

.action-btn {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 1px;
  position: relative;


  .icon {
    // padding:1px;
    position:absolute;
    margin:-10px;
    font-size: 24px;
  }
  

  .label {
    // padding:0px;
    // position:absolute;
    padding:25px 5px 2px 2px;
    // margin:20px;
    font-size: 10px;
    margin-top: 0px;
    color: $on-surface-variant;
  }

  &:active {
    transform: scale(0.95);
  }
}
.action-btn::after {
  border: none;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  background: $primary;
  color: white;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  height: 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.cta-buttons {
  flex: 1;
  display: flex;
  gap: 12px;
}

.cta-btn {
  flex: 1;
  height: 48px;
  border-radius: 48px;
  font-size: 14px;
  font-weight: 700;
  border: none;

  &:active {
    transform: scale(0.96);
  }
}

.add-cart {
  background-color: rgba(255, 133, 27, 0.1);
  color: $primary;
  border: 1px solid rgba(255, 133, 27, 0.3);
}

.buy-now {
  background: linear-gradient(135deg, $primary, $primary-dark);
  color: white;
  box-shadow: 0 8px 20px rgba(255, 133, 27, 0.3);
}
</style>