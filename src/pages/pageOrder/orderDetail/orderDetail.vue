<script setup>
import { ref, onMounted } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
import { getOrderDetailAPI,getShopInfoByIdAPI,payOrderPhoneAPI } from '@/services/order'
import { getgoodsSkuAPI,getgoodsDetailAPI} from '@/services/goods'
import { getAddressById } from '@/services/user'
import { onBackPress } from '@dcloudio/uni-app'

// 获取状态栏高度
const statusBarHeight = ref(20)
const memberStore = useMemberStore()
const orderDetail = ref({}) // 订单详情
const merchantInfo = ref({}) // 商家信息
const addressInfo = ref({}) // 地址信息
const goodsInfo = ref({}) // 商品信息
const skuInfo = ref({}) // 商品规格信息
const serviceInfo = ref({}) // 商品服务信息


try {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 20
} catch(e) {}

// 返回上一页
const handleBack = () => {
  uni.navigateBack({
    delta: 1,
    fail: () => {
      uni.switchTab({ url: '/pages/index/index' })
    }
  })
}

const getOrderDetail = async () => {
  console.log("获取过来的订单号是",memberStore.profile.orderId)
  const res = await getOrderDetailAPI({orderId:memberStore.profile.orderId})
  // const res = await getOrderDetailAPI(orderParam)
  console.log("获取订单详情",res.data)
  orderDetail.value = res.data
  console.log("订单详情",orderDetail.value)
}

const getShopInfo = async () => {
  console.log("传入参数是",orderDetail.value.shopId)
  const res = await getShopInfoByIdAPI(orderDetail.value.shopId)
  console.log("获取商家信息",res.data)
  merchantInfo.value = res.data
  console.log("商家信息",merchantInfo.value)
}

const getAddressInfo = async () => {
  console.log("传入参数是",orderDetail.value.addressId)
 const res = await getAddressById({addressId:orderDetail.value.addressId})
  console.log("获取地址信息",res.data)
  addressInfo.value = res.data
  console.log("地址信息",addressInfo.value)
}

const getSkuInfo = async () => {
  console.log("传入参数是",orderDetail.value.skuId)
  const res = await getgoodsSkuAPI(orderDetail.value.skuId)
  console.log("获取商品信息",res.data)
  skuInfo.value = res.data
  console.log("商品信息",goodsInfo.value)
}


const getGoodsInfo = async () => {
  console.log("传入参数是",orderDetail.value.goodsId)
  const res = await getgoodsDetailAPI(orderDetail.value.goodsId)
  console.log("获取商品信息",res.data)
  goodsInfo.value = res.data
  console.log("商品信息",goodsInfo.value)
}

const getGoodsServiceInfo = async () => {
  console.log("传入参数是",goodsInfo.value.serviceId)
  const res = await getServiceAPI(goodsInfo.value.serviceId)
  console.log("获取商品服务信息",res.data)
  serviceInfo.value = res.data
  console.log("商品服务信息",serviceInfo.value)
}
onMounted( async () => {
  await getOrderDetail()
  await getShopInfo()
  await getAddressInfo()
  await getSkuInfo()
  await getGoodsInfo()
  await getGoodsServiceInfo()
})


const orderStatusMap = {
  'CreateOrder': { text: '待支付', color: '#FF9800', icon: '⏳', subtitle: '请支付订单' },
  'Paid': { text: '支付完成', color: '#4CAF50', icon: '✅', subtitle: '待工作人员接单' },
  // 可以继续添加其他状态
  // 'cancel': { text: '已取消', color: '#F44336', icon: '❌' },
  // 'complete': { text: '已完成', color: '#2196F3', icon: '🎉' }
}

// 获取状态显示信息
const getOrderStatusInfo = (status) => {
  return orderStatusMap[status] || { text: '未知状态', color: '#9E9E9E', icon: '❓' }
}


// 跳转个人中心
const goToProfile = () => {
  uni.navigateTo({ url: '/pages/profile/profile' })
}

onBackPress((options) => {
  console.log('系统返回键被按下', options)
  
  // 阻止默认返回行为
  // 显示选择对话框
  uni.showModal({
    title: '提示',
    content: '确定要返回首页吗？',
    confirmText: '返回首页',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        // 用户选择返回首页
        uni.switchTab({
          url: '/pages/index/index'
        })
      }
      // 如果用户选择取消，什么都不做，保持当前页面
    }
  })
  
  // 返回true表示拦截默认返回行为
  return true
})
// 复制订单号
const copyOrderNo = () => {
  uni.setClipboardData({
    data: 'SH202405199827',
    success: () => {
      uni.showToast({ title: '订单号已复制', icon: 'success' })
    }
  })
}

// 取消订单
const cancelOrder = () => {
  uni.showModal({
    title: '提示',
    content: '确认取消该订单吗？取消后金额将原路退回。',
    confirmColor: '#924700',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '订单已取消', icon: 'none' })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    }
  })
}

// 联系商家
const contactMerchant = () => {
  uni.showActionSheet({
    itemList: ['拨打电话 400-882-6688', '在线咨询'],
    success: (res) => {
      if (res.tapIndex === 0) {
        uni.makePhoneCall({ phoneNumber: '4008826688' })
      } else {
        uni.showToast({ title: '聊天功能开发中', icon: 'none' })
      }
    }
  })
}

// 查看商家详情
const viewMerchant = () => {
  uni.showToast({ title: '商家主页开发中', icon: 'none' })
}
</script>

<template>
  <view class="pay-success-page">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <view class="navbar-left" hover-class="nav-hover" @tap="handleBack">
          <text class="nav-icon">←</text>
        </view>
        <text class="navbar-title">订单详情</text>
        <view class="navbar-right" hover-class="nav-hover" @tap="goToProfile">
          <image class="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQTYhIfYL6tLRwzMHyhwRnuEqqWYBoHcsevs_0moy3H_aHpiFU1iun7ymx8kiRVrqaTkUT5AJGxbYIgq1GHGJSHGx5T-jTdzenF4B-QGByV4ei9ofQZcliNNQK4x5aIHqnmiln_WvtJheTDx1LEM_gnPmzLKbA8RJwnF4KA2kAg6StjhIklZZGGBmx6cdxQX4fMSroZ-5mBbSMARx2EBkNgDCYKGE9s7iev92wsneSbU5uy7l4oV2DH3uRZiybnMpng_xxsosuQ" mode="aspectFill" />
        </view>
      </view>
      <view class="navbar-divider"></view>
    </view> -->

    <!-- 成功状态区域 -->
    <view class="success-header">
      <view class="success-icon-wrapper">
        <text class="success-icon">{{ getOrderStatusInfo(orderDetail.orderStatus).icon }}</text>
      </view>
      <text class="success-title">{{ getOrderStatusInfo(orderDetail.orderStatus).text }}</text>
      <text class="success-subtitle">{{ getOrderStatusInfo(orderDetail.orderStatus).subtitle }}</text>
    </view>

    <!-- 滚动内容区 -->
    <scroll-view class="main-scroll" scroll-y :show-scrollbar="false">
      <view class="content-wrapper">
        <!-- 商家信息卡片 -->
        <view class="card merchant-card" hover-class="card-hover" @tap="viewMerchant">
          <view class="merchant-info">
            <image class="merchant-logo" :src="merchantInfo.shopLogo" mode="aspectFill" />
            <view class="merchant-details">
              <text class="merchant-name">{{ merchantInfo.shopName }}</text>
              <view class="rating-wrap">
                <text class="star-icon">★</text>
                <text class="rating-score">{{ merchantInfo.rating }}</text>
                <text class="rating-divider">|</text>
                <text class="service-count">服务过 {{ merchantInfo.totalOrders }}+ 次</text>
              </view>
            </view>
            <text class="arrow-icon">›</text>
          </view>
        </view>

        <!-- 用户地址卡片 -->
        <view class="card address-card">
          <view class="address-content">
            <text class="location-icon">📍</text>
            <view class="address-info">
              <text class="user-name">{{ addressInfo.contactName }} <text class="user-phone">{{ addressInfo.contactPhone }}</text></text>
              <text class="address-detail">{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.addressDetail}}</text>
            </view>
          </view>
        </view>

        <!-- 服务详情卡片 -->
        <view class="card service-card">
          <view class="service-header">
            <view>
              <text class="service-badge">{{serviceInfo.serviceName}}</text>
              <text class="service-title">{{ goodsInfo.goodsName }}</text>
            </view>
            <view class="price-box">
              <text class="price-label">实付金额</text>
              <text class="price-value">¥{{ orderDetail.payAmount }}</text>
            </view>
          </view>

          <view class="service-details-list">
            <view class="detail-item">
              <text class="detail-label">服务类别</text>
              <text class="detail-value">{{ skuInfo.skuName }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">预约时间</text>
              <text class="detail-value highlight">2024-05-20 (周一) 14:00</text>
            </view>
            <view class="divider"></view>
            <view class="detail-item">
              <text class="detail-label">订单编号</text>
              <view class="order-no-wrap">
                <text class="order-no">{{ orderDetail.orderNo }}</text>
                <text class="copy-icon" hover-class="copy-hover" @tap.stop="copyOrderNo">📋</text>
              </view>
            </view>
            <view class="detail-item">
              <text class="detail-label">下单时间</text>
              <text class="detail-value">{{ orderDetail.createTime }}</text>
            </view>
          </view>

          <!-- 地图装饰区域 -->
          <view class="map-decoration">
            <image class="map-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDH6ihYG0tPE-uNUcD9jI6nmDWDRVOrNshPxfSqLptkBqCVRdi08l8zDHpZOZfdTCLk8AyndmnU-mj2DUsBcogZuIVd8dvWsmylqGZETRvGf5Y-mdEtqSTrroayAHIyEa4x5OK-z94Ty-gyMvPrZg60bYEZKDNIHGXwj-JUdvNQIodf-gRN83OyhSCQ1e6c8CGB_GVw6U4qqVVqRnf7Ie72mdgIE76vP2WqlzgByLTjD_5cQCLf6-r8yizJG1hNINZMR3HymhwcjQ" mode="aspectFill" />
            <view class="map-gradient"></view>
          </view>
        </view>

        <!-- 服务要求备注卡片 -->
        <view class="card remark-card">
          <view class="remark-header">
            <text class="remark-icon">📝</text>
            <text class="remark-title">服务要求与备注</text>
          </view>
          <view class="remark-content">
            <text class="remark-text">家里有宠物，请保洁人员进入时注意不要开着门。客厅地毯需要额外重点清理。请自带全套清洁工具。</text>
          </view>
        </view>

        <view class="bottom-placeholder"></view>
      </view>
    </scroll-view>

    <!-- 底部固定按钮栏 -->
    <view class="bottom-actions">
      <button class="btn-outline" hover-class="btn-hover" @tap="cancelOrder">
        <text class="btn-icon">✕</text>
        <text>取消订单</text>
      </button>
      <button class="btn-primary" hover-class="btn-hover" @tap="contactMerchant">
        <text class="btn-icon">💬</text>
        <text>联系商家</text>
      </button>
    </view>
  </view>
</template>



<style lang="scss" scoped>
// 颜色变量
$primary: #FF851B;
$primary-dark: #924700;
$surface: #F7F6F5;
$card-bg: #FFFFFF;
$text-primary: #2E2F2F;
$text-secondary: #5B5C5B;
$border-light: #E2E2E1;
$success-bg: #ECFDF5;
$success-icon: #10B981;

.pay-success-page {
  min-height: 100vh;
  background-color: $surface;
  display: flex;
  flex-direction: column;
}

.status-bar {
  width: 100%;
  background-color: transparent;
}

// 顶部导航栏
.top-navbar {
  background-color: rgba($surface, 0.96);
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx;
    height: 10rpx;
  }
  
  .navbar-left, .navbar-right {
    width: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .nav-icon {
    font-size: 48rpx;
    color: $primary-dark;
  }
  
  .nav-hover {
    opacity: 0.7;
  }
  
  .avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    background-color: #F1F1F0;
    overflow: hidden;
    border: 2px solid white;
  }
  
  .navbar-title {
    font-weight: 800;
    font-size: 40rpx;
    letter-spacing: -0.5rpx;
    color: $primary-dark;
    font-family: system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif;
  }
  
  .navbar-divider {
    height: 2rpx;
    background-color: $border-light;
    width: 100%;
  }
}

// 成功区域
.success-header {
  padding: 60rpx 32rpx 48rpx;
  text-align: center;
  
  .success-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 160rpx;
    height: 160rpx;
    background-color: $success-bg;
    border-radius: 50%;
    margin-bottom: 24rpx;
    
    .success-icon {
      font-size: 100rpx;
      color: $success-icon;
      font-weight: bold;
    }
  }
  
  .success-title {
    display: block;
    font-size: 56rpx;
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 12rpx;
    font-family: system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif;
  }
  
  .success-subtitle {
    font-size: 28rpx;
    font-weight: 500;
    color: $text-secondary;
  }
}

.main-scroll {
  flex: 1;
  width: 100%;
}

.content-wrapper {
  padding: 0 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

// 通用卡片
.card {
  background-color: $card-bg;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(146, 71, 0, 0.05);
}

.card-hover {
  background-color: #f5f5f5;
}

// 商家卡片
.merchant-card .merchant-info {
  display: flex;
  align-items: center;
  gap: 24rpx;
  
  .merchant-logo {
    width: 128rpx;
    height: 128rpx;
    border-radius: 24rpx;
    background-color: #F1F1F0;
  }
  
  .merchant-details {
    flex: 1;
    
    .merchant-name {
      font-size: 32rpx;
      font-weight: 800;
      color: $text-primary;
      display: block;
      margin-bottom: 8rpx;
    }
    
    .rating-wrap {
      display: flex;
      align-items: center;
      gap: 8rpx;
      flex-wrap: wrap;
      
      .star-icon {
        font-size: 32rpx;
        color: #F5BF26;
      }
      .rating-score {
        font-size: 26rpx;
        font-weight: 700;
        color: #745700;
      }
      .rating-divider {
        color: $border-light;
        font-size: 24rpx;
      }
      .service-count {
        font-size: 24rpx;
        color: $text-secondary;
      }
    }
  }
  
  .arrow-icon {
    color: $text-secondary;
    font-size: 40rpx;
  }
}

// 地址卡片
.address-card .address-content {
  display: flex;
  gap: 20rpx;
  
  .location-icon {
    font-size: 44rpx;
    margin-top: 6rpx;
  }
  
  .address-info {
    flex: 1;
    
    .user-name {
      font-size: 32rpx;
      font-weight: 800;
      color: $text-primary;
      display: block;
      margin-bottom: 8rpx;
      
      .user-phone {
        font-weight: 500;
        font-size: 28rpx;
        color: $text-secondary;
        margin-left: 16rpx;
      }
    }
    
    .address-detail {
      font-size: 26rpx;
      line-height: 1.4;
      color: $text-secondary;
    }
  }
}

// 服务卡片
.service-card {
  padding-bottom: 0;
  overflow: hidden;
  
  .service-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32rpx;
    
    .service-badge {
      display: inline-block;
      background-color: rgba($primary, 0.1);
      color: $primary-dark;
      font-size: 22rpx;
      font-weight: 800;
      padding: 8rpx 20rpx;
      border-radius: 40rpx;
      margin-bottom: 16rpx;
    }
    
    .service-title {
      display: block;
      font-size: 36rpx;
      font-weight: 800;
      color: $text-primary;
      line-height: 1.3;
    }
    
    .price-box {
      text-align: right;
      
      .price-label {
        font-size: 22rpx;
        color: $text-secondary;
        display: block;
        margin-bottom: 6rpx;
      }
      
      .price-value {
        font-size: 48rpx;
        font-weight: 800;
        color: $primary-dark;
      }
    }
  }
  
  .service-details-list {
    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .detail-label {
        font-size: 26rpx;
        color: $text-secondary;
      }
      
      .detail-value {
        font-size: 26rpx;
        font-weight: 600;
        color: $text-primary;
        
        &.highlight {
          color: $primary-dark;
          font-weight: 700;
        }
      }
      
      .order-no-wrap {
        display: flex;
        align-items: center;
        gap: 12rpx;
        
        .order-no {
          font-size: 26rpx;
          font-family: monospace;
          color: $text-primary;
        }
        
        .copy-icon {
          font-size: 36rpx;
          padding: 8rpx;
          border-radius: 16rpx;
        }
        .copy-hover {
          background-color: rgba($primary, 0.1);
        }
      }
    }
    
    .divider {
      height: 2rpx;
      background-color: $border-light;
      margin: 24rpx 0;
    }
  }
  
  .map-decoration {
    position: relative;
    width: 100%;
    height: 240rpx;
    margin-top: 32rpx;
    overflow: hidden;
    
    .map-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .map-gradient {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80rpx;
      background: linear-gradient(to top, $card-bg, transparent);
    }
  }
}

// 备注卡片
.remark-card {
  .remark-header {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 20rpx;
    
    .remark-icon {
      font-size: 36rpx;
    }
    
    .remark-title {
      font-size: 30rpx;
      font-weight: 800;
      color: $text-primary;
    }
  }
  
  .remark-content {
    background-color: $surface;
    border-radius: 24rpx;
    padding: 24rpx;
    
    .remark-text {
      font-size: 26rpx;
      line-height: 1.5;
      color: $text-secondary;
    }
  }
}

.bottom-placeholder {
  height: 140rpx;
}

// 底部按钮栏
.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.96);
  padding: 20rpx 32rpx 40rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  gap: 24rpx;
  border-top: 1px solid rgba($border-light, 0.6);
  z-index: 100;
  
  button {
    margin: 0;
    padding: 0;
    border-radius: 80rpx;
    height: 112rpx;
    font-size: 28rpx;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    background: none;
    line-height: 1;
    
    &::after {
      border: none;
    }
  }
  
  .btn-outline {
    flex: 1;
    background-color: #F1F1F0;
    color: $text-primary;
  }
  
  .btn-primary {
    flex: 1.5;
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: white;
    box-shadow: 0 12rpx 32rpx rgba($primary, 0.2);
  }
  
  .btn-hover {
    opacity: 0.85;
    transform: scale(0.97);
  }
  
  .btn-icon {
    font-size: 36rpx;
  }
}
</style>