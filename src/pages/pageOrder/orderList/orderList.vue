
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
import { getOrderListAPI } from '@/services/order'


// 获取系统状态栏高度 (uni-app 全局)
const statusBarHeight = ref(20) // 默认值
const ordersData = ref([])
const activeTab = ref('all')
// #ifdef APP-PLUS || H5
try {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 20
} catch(e) {}
// #endif



// 标签页配置
const tabs = [
  { label: '全部', value: 'all' },
  { label: '待付款', value: 'CreateOrder' },
  { label: '待服务', value: 'Paid' },
  { label: '已完成', value: 'completed' },
  { label: '退款/售后', value: 'refund' }
]
// 订单状态映射
const getOrderStatusText = (status) => {
  const statusMap = {
    'CreateOrder': '待付款',
    'Paid': '待服务',
    'completed': '已完成',
    'refund': '退款/售后'
  }
  return statusMap[status] || '未知状态'
}
const orderListParams = {
  userId : useMemberStore().profile.userId,
  pageNum : 1,
  pageSize : 100
}

const selectType = defineProps({
  type: {
    type: String,
    default: 'all'
  }
})



// ---------- 模拟订单数据 ----------

const getOrderList = async () => {
  console.log("开始获取订单列表")
  const res = await getOrderListAPI(orderListParams)
  if(res.code === 200){
    ordersData.value = res.data.list
    console.log("获取到的订单列表",ordersData.value)
      activeTab.value = selectType.type
  }
}

onMounted(() => {
  getOrderList()
})



// const ordersData = ref([
//   {
//     id: 1,
//     orderNo: '82749201934',
//     title: '专业深度保洁 - 3小时',
//     description: '包含厨房去油、卫浴除霉、全屋除尘',
//     price: '299.00',
//     status: 'pending_payment',
//     statusText: '待付款',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJRCBsLkRkckGh0YyTG23MOpxmlpW93Yvtb9J6NV3ZXzAHHXyYMlmScOQpYAsFpD50ltl4LmOBeh3jSDhf661Axz4LWNXeW8bwMVr5iI3tOsX_2Sq4GnKuWmsGhc7suvcYILsZiS8L10hU3UG6BTZHnCT8McqGBhQfCO6lqq8RgzQvtdvmMl2f7H8L7OQ3-izDTpaR4oz48gJD2mPUiLapsD6VMdQC-euX7Jr-lAFyizBZuKzMgYcv5WADz1aeyWqlmtMmWgx9KA'
//   },
//   {
//     id: 2,
//     orderNo: '82749201882',
//     title: '空调清洗维护 (挂机)',
//     description: '预约时间：2023-11-20 14:00',
//     price: '158.00',
//     status: 'pending_service',
//     statusText: '待服务',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbuNXz67uijj--aXdnBeE88Ia18lnUbLcKVVCdMOZtqzIKjRlj6GMSeqdJbJNe_oNJjvYNH0MonVbXaJk17AVt_C7VHrDFZlk15EgtytkGh_Y3hIWkpmb5Qu6iDgE60LvKSsG0YoDK-g1ZrNYMz4mIVI_fp3GGVUeK69RUiGSy8IYN0RBnYre9uHzU9JcTmP3wgTsIBvWoaCsovS-MoRLXKZe5NgnCgDTH5bTmHJGoKI5al9hYvHnxqCgsUoLwJ36-h0LAddO_Gw'
//   },
//   {
//     id: 3,
//     orderNo: '82749199521',
//     title: '厨房疏通服务',
//     description: '服务师傅：李师傅 (已实名认证)',
//     price: '88.00',
//     status: 'completed',
//     statusText: '已完成',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANVmEk-949SUg6SyLBKQrkE-8LP-fDo8lTBhU0GSQJuiv_qSFfWnD2k_FJqpHcQVMuIlsJeyviPukHEUx4FGNEN1dT0K5EFOTgn4YtiEdyQX-f1neCqdn02rFXlygMRP3C_uppbo2zy6liJ-LUx9_3i0V5jSlqroeEWwczmhqCfqhYUIgyVD-eiwhe826FqGE-loLe7Oa7k8Xzy6NaJrwBvERdmATHLMvb1pxyWPr4DsWkK4-FN05jdKcSTkDX44K5z-zLFDfk_g'
//   },
//   {
//     id: 4,
//     orderNo: '82749199123',
//     title: '全屋甲醛检测',
//     description: '专业仪器检测，出具报告',
//     price: '399.00',
//     status: 'pending_payment',
//     statusText: '待付款',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJRCBsLkRkckGh0YyTG23MOpxmlpW93Yvtb9J6NV3ZXzAHHXyYMlmScOQpYAsFpD50ltl4LmOBeh3jSDhf661Axz4LWNXeW8bwMVr5iI3tOsX_2Sq4GnKuWmsGhc7suvcYILsZiS8L10hU3UG6BTZHnCT8McqGBhQfCO6lqq8RgzQvtdvmMl2f7H8L7OQ3-izDTpaR4oz48gJD2mPUiLapsD6VMdQC-euX7Jr-lAFyizBZuKzMgYcv5WADz1aeyWqlmtMmWgx9KA'
//   },
//   {
//     id: 5,
//     orderNo: '82749198234',
//     title: '冰箱深度清洗',
//     description: '高温蒸汽杀菌消毒',
//     price: '129.00',
//     status: 'pending_service',
//     statusText: '待服务',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbuNXz67uijj--aXdnBeE88Ia18lnUbLcKVVCdMOZtqzIKjRlj6GMSeqdJbJNe_oNJjvYNH0MonVbXaJk17AVt_C7VHrDFZlk15EgtytkGh_Y3hIWkpmb5Qu6iDgE60LvKSsG0YoDK-g1ZrNYMz4mIVI_fp3GGVUeK69RUiGSy8IYN0RBnYre9uHzU9JcTmP3wgTsIBvWoaCsovS-MoRLXKZe5NgnCgDTH5bTmHJGoKI5al9hYvHnxqCgsUoLwJ36-h0LAddO_Gw'
//   },
//   {
//     id: 6,
//     orderNo: '82749197888',
//     title: '油烟机拆洗',
//     description: '深度拆洗，除油除垢',
//     price: '189.00',
//     status: 'completed',
//     statusText: '已完成',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANVmEk-949SUg6SyLBKQrkE-8LP-fDo8lTBhU0GSQJuiv_qSFfWnD2k_FJqpHcQVMuIlsJeyviPukHEUx4FGNEN1dT0K5EFOTgn4YtiEdyQX-f1neCqdn02rFXlygMRP3C_uppbo2zy6liJ-LUx9_3i0V5jSlqroeEWwczmhqCfqhYUIgyVD-eiwhe826FqGE-loLe7Oa7k8Xzy6NaJrwBvERdmATHLMvb1pxyWPr4DsWkK4-FN05jdKcSTkDX44K5z-zLFDfk_g'
//   },
//   {
//     id: 7,
//     orderNo: '82749196999',
//     title: '水管漏水维修',
//     description: '上门检修，更换配件',
//     price: '99.00',
//     status: 'refund',
//     statusText: '退款中',
//     imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANVmEk-949SUg6SyLBKQrkE-8LP-fDo8lTBhU0GSQJuiv_qSFfWnD2k_FJqpHcQVMuIlsJeyviPukHEUx4FGNEN1dT0K5EFOTgn4YtiEdyQX-f1neCqdn02rFXlygMRP3C_uppbo2zy6liJ-LUx9_3i0V5jSlqroeEWwczmhqCfqhYUIgyVD-eiwhe826FqGE-loLe7Oa7k8Xzy6NaJrwBvERdmATHLMvb1pxyWPr4DsWkK4-FN05jdKcSTkDX44K5z-zLFDfk_g'
//   }
// ])

// 根据当前tab过滤订单
const filteredOrders = computed(() => {
  if (activeTab.value === 'all') {
    return ordersData.value
  }
  return ordersData.value.filter(order => order.orderStatus === activeTab.value)
})

// 切换标签页
const switchTab = (tabValue) => {
  console.log("获取的tabValue：",tabValue)
  activeTab.value = tabValue
  console.log("获取的activeTab：",activeTab.value)
  // 可选: 埋点或保持滚动位置
  // uni.vibrateShort({ type: 'light' }) // 轻微震动反馈
}

// 获取状态样式类名
const getStatusClass = (status) => {
  switch(status) {
    case 'CreateOrder': return 'status-pending-payment'
    case 'Paid': return 'status-pending-service'
    case 'completed': return 'status-completed'
    case 'refund': return 'status-refund'
    default: return ''
  }
}

// ---------- 按钮交互 (业务逻辑) ----------
const onMenuTap = () => {
  uni.showToast({ title: '菜单功能开发中', icon: 'none' })
}

const onProfileTap = () => {
  uni.navigateTo({ url: '/pages/profile/profile' })
}

const cancelOrder = (order) => {
  uni.showModal({
    title: '提示',
    content: `确认取消订单 ${order.orderNo} 吗？`,
    success: (res) => {
      if (res.confirm) {
        // 实际开发中调用API删除订单，此处模拟移除
        const index = ordersData.value.findIndex(o => o.id === order.id)
        if (index !== -1) ordersData.value.splice(index, 1)
        uni.showToast({ title: '订单已取消', icon: 'success' })
      }
    }
  })
}

const goToPay = (order) => {
  uni.showToast({ title: `支付订单 ¥${order.price}`, icon: 'none' })
  // 跳转支付页面
  // uni.navigateTo({ url: `/pages/pay/pay?orderId=${order.id}` })
}

const modifyTime = (order) => {
  uni.showToast({ title: '修改预约时间', icon: 'none' })
  // 可打开日期时间选择器
}

const contactWorker = (order) => {
  uni.showActionSheet({
    itemList: ['拨打电话 138****1234', '在线聊天'],
    success: (res) => {
      if (res.tapIndex === 0) {
        uni.makePhoneCall({ phoneNumber: '13812341234' })
      } else {
        uni.showToast({ title: '聊天功能开发中', icon: 'none' })
      }
    }
  })
}

const applyAfterSale = (order) => {
  uni.navigateTo({ url: `/pages/after-sale/after-sale?orderId=${order.id}` })
}

const buyAgain = (order) => {
  uni.showToast({ title: `再次购买 ${order.title}`, icon: 'none' })
}

const submitReview = (order) => {
  uni.navigateTo({ url: `/pages/review/review?orderId=${order.id}` })
}

const viewRefundProgress = (order) => {
  uni.showToast({ title: '退款进度查询', icon: 'none' })
}

const contactService = (order) => {
  uni.makePhoneCall({ phoneNumber: '400-888-6666' })
}

const viewOrderDetail = (order) => {
  // uni.navigateTo({ url: `/pages/pageOrder/orderDetail/orderDetail?id=${order.id}` })
  console.log("触发跳转订单详情")
  uni.navigateTo({ url: '/pages/pageOrder/orderDetail/orderDetail' })
}

// 底部导航跳转 (模拟)
const navigateTo = (target) => {
  if (target === 'home') {
    uni.switchTab({ url: '/pages/index/index' })
  } else if (target === 'message') {
    uni.showToast({ title: '消息中心开发中', icon: 'none' })
  } else if (target === 'profile') {
    uni.navigateTo({ url: '/pages/profile/profile' })
  }
}
</script>

<template>
  <view class="orders-page">
    <!-- 自定义状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- 顶部导航栏 -->
    <!-- <view class="top-navbar">
      <view class="navbar-content">
        <view class="navbar-left" @tap="onMenuTap">
          <text class="icon-menu">☰</text>
        </view>
        <text class="navbar-title">我的订单</text>
        <view class="navbar-right" @tap="onProfileTap">
          <image 
            class="avatar" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4gt0PByV10gD2Zym-UeTbJbsDxdEeiWGgnSsuvM0ksylYVzAYOLTFOlYPPd4nHzu1zO2x9iqSxXXouK5qPKoaNjEsBz1RjaeIlPuvb34tnzBj3nDVqvtRuhLJ_o0_LV6v1Gkr6tciG27Ul8W-2PBLICQvVADqswbpcw0NIFipuPeYKlk7EkrhGaT8mIMfb4l3Dy9ky0J5tGuQ_xOWzJ2thuhGu8HAWFnHHInQJG-BF451Ri_6MDJcQxDnh2WTcTuAQtSiVuR2_w"
            mode="aspectFill"
          />
        </view>
      </view>
      <view class="navbar-divider"></view>
    </view> -->

    <!-- 标签页导航 (横向滚动) -->
    <view class="tabs-container">
      <scroll-view scroll-x class="tabs-scroll" :show-scrollbar="false">
        <view class="tabs-wrapper">
          <view
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab-item"
            :class="{ 'tab-item-active': activeTab === tab.value }"
            @tap="switchTab(tab.value)"
          >
            <text class="tab-text">{{ tab.label }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 订单列表 -->
    <view class="orders-list">
      <view v-if="filteredOrders.length === 0" class="empty-state">
        <text class="empty-icon">📦</text>
        <text class="empty-text">暂无相关订单</text>
      </view>
      
      <view
        v-for="order in filteredOrders"
        :key="order.orderId"
        class="order-card"
      >
        <!-- 卡片头部 -->
        <view class="card-header">
          <text class="order-number">订单编号: {{ order.orderNo }}</text>
          <text class="order-status" :class="getStatusClass(order.orderStatus)">
 {{ getOrderStatusText(order.orderStatus) }}
          </text>
        </view>
        
        <!-- 服务内容区域 -->
        <view class="service-info" @tap="viewOrderDetail(order)">
          <view class="service-image">Name
            <image :src="order.coverImage" mode="aspectFill" lazy-load />
          </view>
          <view class="service-details">
            <text class="service-title">{{ order.goodsName }}</text>
            <text class="service-desc">{{ order.shopName }}</text>
            <view class="price-wrapper">
              <text class="price-symbol">¥</text>
              <text class="price-number">{{ order.payAmount }}</text>
            </view>
          </view>
        </view>
        
        <!-- 底部操作按钮组 (根据订单状态展示不同按钮) -->
        <view class="card-actions">
          <!-- 待付款按钮组 -->
          <template v-if="order.status === 'pending_payment'">
            <button class="btn-outline" @tap.stop="cancelOrder(order)">取消订单</button>
            <button class="btn-primary" @tap.stop="goToPay(order)">去付款</button>
          </template>
          
          <!-- 待服务按钮组 -->
          <template v-else-if="order.status === 'pending_service'">
            <button class="btn-outline" @tap.stop="modifyTime(order)">修改时间</button>
            <button class="btn-secondary" @tap.stop="contactWorker(order)">
              <text class="btn-icon">📞</text>
              <text>联系师傅</text>
            </button>
          </template>
          
          <!-- 已完成按钮组 -->
          <template v-else-if="order.status === 'completed'">
            <button class="btn-outline" @tap.stop="applyAfterSale(order)">申请售后</button>
            <button class="btn-outline-secondary" @tap.stop="buyAgain(order)">再次购买</button>
            <button class="btn-secondary" @tap.stop="submitReview(order)">去评价</button>
          </template>
          
          <!-- 退款/售后按钮组 -->
          <template v-else-if="order.status === 'refund'">
            <button class="btn-outline" @tap.stop="viewRefundProgress(order)">查看进度</button>
            <button class="btn-secondary" @tap.stop="contactService(order)">联系客服</button>
          </template>
        </view>
      </view>
    </view>


  </view>
</template>


<style lang="scss" scoped>
// 全局颜色变量 (沿用原设计风格)
$primary: #FF851B;
$primary-dark: #924700;
$secondary: #0058bb;
$surface: #F7F6F5;
$surface-low: #F1F1F0;
$card-bg: #FFFFFF;
$text-primary: #2E2F2F;
$text-secondary: #5B5C5B;
$border-color: #E2E2E1;
$status-pending-payment: #FF851B;
$status-pending-service: #0058bb;
$status-completed: #767776;
$status-refund: #b02500;

.orders-page {
  min-height: 100vh;
  background-color: $surface;
  display: flex;
  flex-direction: column;
}

// 状态栏占位
.status-bar {
  width: 100%;
  background-color: transparent;
}

// 自定义导航栏
.top-navbar {
  background-color: rgba($surface, 0.8);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24rpx;
    height: 100rpx;
  }
  
  .navbar-left, .navbar-right {
    width: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .icon-menu {
    font-size: 48rpx;
    color: $primary-dark;
    font-weight: 600;
  }
  
  .avatar {
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    background-color: $surface-low;
    overflow: hidden;
  }
  
  .navbar-title {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system;
    font-weight: 800;
    font-size: 40rpx;
    letter-spacing: -0.5rpx;
    color: $primary-dark;
  }
  
  .navbar-divider {
    height: 2rpx;
    background-color: $border-color;
    width: 100%;
  }
}

// 标签页区域
.tabs-container {
  position: sticky;
  top: 0rpx;
  
  background-color: $surface;
  z-index: 40;
  padding: 16rpx 0;
  
  .tabs-scroll {
    white-space: nowrap;
    width: 100%;
  }
  
  .tabs-wrapper {
    display: inline-flex;
    padding: 0 24rpx;
    gap: 16rpx;
  }
  
  .tab-item {
    display: inline-block;
    padding: 20rpx 40rpx;
    border-radius: 100rpx;
    background-color: $card-bg;
    // transition: all 0.2s ease;
    
    .tab-text {
      font-size: 28rpx;
      font-weight: 500;
      color: $text-secondary;
    }
  }
  
  .tab-item-active {
    background-color: $primary;
    box-shadow: 0 8px 24px rgba($primary, 0.25);
    .tab-text {
      color: white;
      font-weight: 700;
    }
  }
}

// 订单列表
.orders-list {
  flex: 1;
  padding: 0 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  .empty-icon {
    font-size: 100rpx;
    opacity: 0.5;
  }
  .empty-text {
    font-size: 28rpx;
    color: $text-secondary;
    margin-top: 24rpx;
  }
}

.order-card {
  background-color: $card-bg;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba($border-color, 0.5);
  transition: all 0.2s;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    
    .order-number {
      font-size: 26rpx;
      font-weight: 500;
      color: $text-secondary;
    }
    
    .order-status {
      font-size: 26rpx;
      font-weight: 700;
      padding: 6rpx 12rpx;
      border-radius: 40rpx;
    }
    
    .status-pending-payment {
      color: $status-pending-payment;
      background-color: rgba($primary, 0.1);
    }
    .status-pending-service {
      color: $status-pending-service;
      background-color: rgba($secondary, 0.1);
    }
    .status-completed {
      color: $status-completed;
      background-color: rgba(118, 119, 118, 0.1);
    }
    .status-refund {
      color: $status-refund;
      background-color: rgba(176, 37, 0, 0.1);
    }
  }
  
  .service-info {
    display: flex;
    gap: 24rpx;
    margin-bottom: 32rpx;
    
    .service-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 24rpx;
      overflow: hidden;
      background-color: $surface-low;
      flex-shrink: 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
    
    .service-details {
      flex: 1;
      .service-title {
        font-size: 34rpx;
        font-weight: 800;
        color: $text-primary;
        margin-bottom: 8rpx;
        display: block;
      }
      .service-desc {
        font-size: 26rpx;
        color: $text-secondary;
        line-height: 1.4;
        display: block;
        margin-bottom: 12rpx;
      }
      .price-wrapper {
        display: flex;
        align-items: baseline;
        gap: 4rpx;
        .price-symbol {
          font-size: 24rpx;
          font-weight: 700;
          color: $text-primary;
        }
        .price-number {
          font-size: 44rpx;
          font-weight: 800;
          letter-spacing: -1rpx;
          color: $text-primary;
        }
      }
    }
  }
  
  .card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 20rpx;
    padding-top: 24rpx;
    border-top: 1px solid rgba($border-color, 0.6);
    
    button {
      margin: 0;
      padding: 16rpx 32rpx;
      font-size: 26rpx;
      font-weight: 600;
      border-radius: 100rpx;
      background: transparent;
      line-height: 1.2;
      display: inline-flex;
      align-items: center;
      gap: 8rpx;
      
      &::after {
        border: none;
      }
    }
    
    .btn-outline {
      background-color: $surface-low;
      color: $text-secondary;
      border: none;
    }
    .btn-primary {
      background: linear-gradient(135deg, $primary, $primary-dark);
      color: white;
      font-weight: 800;
      box-shadow: 0 12px 24px rgba($primary, 0.2);
    }
    .btn-secondary {
      background-color: rgba($primary, 0.1);
      color: $primary-dark;
      font-weight: 700;
    }
    .btn-outline-secondary {
      background-color: transparent;
      border: 1px solid rgba($primary-dark, 0.3);
      color: $primary-dark;
    }
    .btn-icon {
      font-size: 28rpx;
    }
  }
}

// 底部导航栏
.bottom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba($card-bg, 0.96);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16rpx 32rpx 32rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  border-top: 1px solid rgba($border-color, 0.6);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.02);
  
  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;
    opacity: 0.6;
    transition: all 0.2s;
    
    .tabbar-icon {
      font-size: 44rpx;
    }
    .tabbar-label {
      font-size: 22rpx;
      font-weight: 500;
    }
  }
  
  .tabbar-item-active {
    opacity: 1;
    color: $primary-dark;
    font-weight: 700;
    transform: translateY(-4rpx);
  }
}
</style>