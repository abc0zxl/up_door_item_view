<script setup>
import { ref,onMounted } from 'vue'
import { onLoad,onShow, onReady, onHide, onUnload } from '@dcloudio/uni-app'
import { getOrderDetailAPI,getShopInfoByIdAPI,payOrderPhoneAPI } from '@/services/order'
import { getAddressById } from '@/services/user'
import { useMemberStore } from '@/stores/modules/member'
import { usePayStore } from '@/stores/modules/pay'


//获取传递过来的订单号
const orderParam = defineProps({
  storeOrderId: {
    type: Number,
    default: 0
  }
})
const orderDetail = ref({})
const merchantInfo = ref({})//商家信息
const addressInfo = ref({})//地址信息
const userInfo = useMemberStore() //获取会员信息
const PayParams = ref({})//中转参数

const payResult = ref({})
const PayPageParams = usePayStore()
const flag1 = ref(true)
const flag2 = ref(true)
const flag3 = ref(true)
const flag4 = ref(true)
// 获取订单详情
const getOrderDetail = async () => {
  console.log("获取过来的订单号是",orderParam.storeOrderId)
  const res = await getOrderDetailAPI({orderId:orderParam.storeOrderId})
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
onMounted( async () => {
  await getOrderDetail()
  await getShopInfo()
  await getAddressInfo()
  await preparePayParam()
})

// 改成函数，调用时才拿最新的 orderDetail
const getPayParams = () => {
  return {
    id: orderParam.storeOrderId,
    orderNo: orderDetail.value.orderNo,
    userId: orderDetail.value.userId,
    shopId: orderDetail.value.shopId,
    goodsId: orderDetail.value.goodsId,
    goodsName: orderDetail.value.goodsName,
    token: userInfo.profile.token
  }
}

const preparePayParam = async () => {
  PayParams.value = getPayParams()
  console.log("获取得到的参数是",PayParams.value)
}
// 商家信息
// const merchantInfo = ref({
//   avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPr2b0qh2WuqDyI-zHYpsFiAl-gLlpomorWVFcFRcFlpYD4t9zC6NNInUI7fmUSnOnzNqkzfl9LwTsJ9A2Pha1hYEHvqBE2HDTWmx0otrWRZGjWdcsyqsu1NHFidBUowfE_a227_QU3KHQZY3E9wUn1FZj7_9r4WSaIvU-3LafyPEKWgYkv6VKy1jzL5dCTXsejfpMVeuue-CDxoocSw4oy5FKpR_uf_4nSM7YqSzSrnsjh8v6untBaDPvWOOavWYT2PI1NkN2bg',
//   name: '上门帮·专业家政',
//   phone: '400-888-9999',
//   address: '朝阳区建国路88号华贸中心写字楼'
// })

// 地址信息
// const addressInfo = ref({
//   name: '李晓华',
//   phoneMask: '138 **** 5678',
//   fullAddress: '北京市朝阳区三里屯街道幸福二村 4号楼 2单元 1201室'
// })

// 服务信息
// const serviceInfo = ref({
//   image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-7i6RfXw-o1BfJrGfPNsfO19zLO8izgy7uNb9r-UP01lNIPyp3mXLR6rvR2012Awn-Xx3mczkSgK-vMemNrNnMzCh2jo6NBP21Wz5HkiDCXKjgyxuYo0hHnqs-CT8EdUpU-6FxRQdU8kqrTPJGaRsTYXJiBh9vOoE3UIyCcs6bnbI4SjsbM8oqDBbwED9Ace-y5TSNA6enZEDc9nAKfJLdccFWfOulhcJJLLuN8TfA8XS0msEJHuDBOseHmHxNrO-__QT3zgwqA',
//   name: '深度保洁服务 (3小时)',
//   tag: '日常清洁 · 全屋除尘',
//   orderNo: 'SH202310240089',
//   serviceTime: '2023-10-25 14:00 - 17:00',
//   originalPrice: '350.00',
//   finalPrice: '299'
// })

// 备注信息
const remark = ref('')

// 支付方式: 'wechat' 或 'alipay'
const selectedPayMethod = ref('wechat')

// 总金额
// const totalAmount = ref('299.00')

// 返回上一页
const handleBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.showToast({
        title: '暂无上一页',
        icon: 'none'
      })
    }
  })
}

// 切换地址
const handleSwitchAddress = () => {
  uni.showToast({
    title: '地址选择功能开发中',
    icon: 'none'
  })
}

// 联系商家 (拨打电话)
const handleCallMerchant = () => {
  uni.makePhoneCall({
    phoneNumber: merchantInfo.value.phone,
    fail: () => {
      uni.showToast({
        title: '拨号失败',
        icon: 'none'
      })
    }
  })
}

// 更多支付方式
const handleMorePayMethods = () => {
  uni.showToast({
    title: '更多支付方式即将上线',
    icon: 'none'
  })
}

// 选择支付方式
const handleSelectPayMethod = (method) => {
  selectedPayMethod.value = method
}

// 立即支付
const handlePay =  ()  =>  {
  const methodName = selectedPayMethod.value === 'wechat' ? '微信支付' : '支付宝'
  uni.showModal({
    title: '确认支付',
    content: `使用${methodName}支付 ¥${orderDetail.value.totalAmount}\n备注：${remark.value || '无'}`,
    confirmText: '去支付',
    success: async (res)  => {
      if (res.confirm) {
        uni.showToast({
          title: `调用${methodName}支付 (演示)`,
          icon: 'none'
        }
      )
      console.log("开始支付,传过去的参数是",PayParams.value)
      const result =  await payOrderPhoneAPI(PayParams.value);
      console.log("支付后返回信息1是",result)

      payResult.value = result.data
      console.log("支付后返回信息2是",payResult.value)

      // 保存支付结果到 store

      PayPageParams.setProfile({
        payHtml: encodeURIComponent(payResult.value)
      })
      console.log("保存到store的结果是",PayPageParams.profile.payHtml)
      // 显示跳转提示
        uni.showToast({
          title: '即将跳转到支付页面',
          icon: 'none',
          duration: 1000
        })
        
        // 延迟跳转，让提示显示完整
        setTimeout(() => {
			userInfo.setProfile({
				orderId:orderDetail.value.id
			})
          // 触发跳转到新的webview3支付页面
          uni.navigateTo({ 
            url: '/pagesMember/payment/webview2'
          })
		  
        }, 1200)
		
        // 实际开发中，此处调用支付接口，用于唤起微信支付或者支付宝支付
        // 例如： uni.requestPayment({ ... })
      }
    }
  })
}

// uniapp页面生命周期
onLoad((options) => {
  console.log('🔵 [orderPay] onLoad - 页面首次加载，参数:', options)
  // 可以在这里处理页面初始化逻辑
  flag1.value = !flag1.value
})

onShow( async () => {
  console.log('🟢 [orderPay] onShow - 页面显示（包括返回时触发）')
  console.log('🟢 [orderPay] 当前时间:', new Date().toLocaleString())
  
  // 检查支付状态（从支付页面返回时）
  // checkPaymentStatus()
  
  uni.showToast({
    title: '支付成功',
    icon: 'none'
  })
  flag2.value = !flag2.value
  console.log("开始查询订单状态",userInfo.profile.orderId)
  const getOrder = await getOrderDetailAPI({orderId:userInfo.profile.orderId})
  orderDetail.value = getOrder.data
  console.log("订单内容是:",getOrder.data)
  if(orderDetail.value!=undefined)
  {
	  console.log("再次查询订单状态:",orderDetail.value.orderStatus)
    uni.navigateTo({
    url: '/pages/pageOrder/orderDetail/orderDetail'
  })
  }

})

onHide(() => {
  console.log('🟡 [orderPay] onHide - 页面隐藏（跳转到支付页面时触发）')
  console.log('🟡 [orderPay] 隐藏时间:', new Date().toLocaleString())
  flag3.value = !flag3.value
})

onReady(() => {
  console.log('🔵 [orderPay] onReady - 页面初次渲染完成')
})

onUnload(() => {
  console.log('🔴 [orderPay] onUnload - 页面卸载')
  flag4.value = !flag4.value
  // 清理资源
})

</script>
<template>
  <view class="order-confirm-page">
    <!-- 自定义导航栏 (隐藏原生导航栏需在pages.json中配置 "navigationStyle": "custom") -->
    <!-- <view class="custom-navbar">
      <view class="navbar-content">
        <view class="back-btn" hover-class="back-btn-hover" @tap="handleBack">
          <text class="icon-text">←</text>
        </view>
        <text class="navbar-title">确认订单</text>
        <view class="placeholder"></view>
      </view>
    </view> -->

    <!-- 主内容区域 - 页面滚动 -->
    <scroll-view class="main-scroll" scroll-y enhanced :show-scrollbar="false">

      <view v-if = "flag1" >
        onshow触发成功
      </view>
            <view v-if = "flag2" >
        onLoad触发成功
      </view>
                  <view v-if = "flag3" >
        onunload触发成功
      </view>
                  <view v-if = "flag4" >
        onhide触发成功
      </view>
      <!-- 商家信息卡片 -->
      <view class="info-card merchant-card">
        <view class="merchant-avatar">
          <image class="avatar-img" :src="merchantInfo.shopLogo" mode="aspectFill"></image>
        </view>
        <view class="merchant-details">
          <view class="merchant-name-row">
            <text class="merchant-name">{{ merchantInfo.shopName }}</text>
            <text class="verified-icon">✓</text>
          </view>
          <view class="contact-row" @tap="handleCallMerchant">
            <text class="contact-icon">📞</text>
            <text class="contact-text">{{ merchantInfo.ownerPhone }}</text>
          </view>
          <view class="address-row">
            <text class="address-icon">📍</text>
            <text class="address-text">{{ merchantInfo.province }} {{ merchantInfo.city }} {{ merchantInfo.district }} {{ merchantInfo.detail_address }}</text>
          </view>
        </view>
      </view>

      <!-- 服务地址卡片 -->
      <view class="info-card address-card">
        <view class="address-header">
          <view class="title-icon">
            <text class="section-icon">🏠</text>
            <text class="section-title">服务地址</text>
          </view>
          <view class="switch-btn" @tap="handleSwitchAddress">
            <text class="switch-text">切换地址</text>
            <text class="arrow-icon">›</text>
          </view>
        </view>
        <view class="address-body">
          <view class="user-name-row">
            <text class="user-name">{{ addressInfo.contactName }}</text>
            <text class="user-phone">{{ addressInfo.contactPhone }}</text>
          </view>
          <text class="full-address">{{ addressInfo.province }}  {{ addressInfo.city }} {{ addressInfo.district }} {{ addressInfo.detailAddress }}</text>
        </view>
      </view>

      <!-- 服务信息卡片 -->
      <view class="info-card service-card">
        <view class="service-header">
          <image class="service-img" :src="orderDetail.coverImage" mode="aspectFill"></image>
          <view class="service-intro">
            <text class="service-name">{{ orderDetail.goodsName }}</text>
            <view class="service-tag">{{ orderDetail.skuName }}</view>
            <text class="service-order-no">订单编号：{{ orderDetail.orderNo }}</text>
          </view>
        </view>
        <view class="service-details">
          <view class="detail-item">
            <text class="detail-label">预约时间</text>
            <text class="detail-value">{{ orderDetail.appointmentTime }}</text>
          </view>
          <view class="detail-item">
            <text class="detail-label">订单原价</text>
            <text class="detail-value origin-price">¥{{ orderDetail.totalAmount }}</text>
          </view>
          <view class="detail-item final-price-row">
            <text class="detail-label final-label">实付金额</text>
            <view class="final-price">
              <text class="currency-symbol">¥</text>
              <text class="price-number">{{ orderDetail.totalAmount }}</text>
              <text class="decimal">.00</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 备注信息卡片 -->
      <view class="info-card remark-card">
        <text class="remark-title">备注信息</text>
        <view class="remark-input-area">
          <textarea
            class="remark-textarea"
            v-model="remark"
            placeholder="如有特殊需求请告知，例如：家里有猫、请带专业除螨仪等..."
            placeholder-class="remark-placeholder"
            :maxlength="200"
          />
        </view>
      </view>

      <!-- 底部占位 (防止内容被固定栏遮挡) -->
      <view class="bottom-placeholder"></view>
    </scroll-view>

    <!-- 底部固定支付栏 -->
    <view class="fixed-footer">
      <view class="payment-section">
        <view class="payment-header">
          <text class="payment-label">支付方式</text>
          <view class="more-methods" @tap="handleMorePayMethods">
            <text class="more-text">更多方式</text>
            <text class="more-arrow">⌵</text>
          </view>
        </view>
        <view class="payment-options">
          <!-- 微信支付 -->
          <view
            class="pay-method"
            :class="{ 'pay-method-active': selectedPayMethod === 'wechat' }"
            @tap="handleSelectPayMethod('wechat')"
          >
            <image class="pay-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2rIgxe5XHfAY5mFgKCCL27ZGdRVFLQdKciliGXxhMyapDgBPvQRO4SOXWZiho4oftcgbmyMimSrY-0B3acPNa6xn0pEqPkqFU-LtWXkj9bcgacbFpTpIQNSLJmyLyYdf9x0qYW2fu65Zq5XXrWrfognV1vi3OlcoYPtNUpYWhrKHNj6pnPfY8EgpkLOnT3Q3bKEavPLOrcFwt2FaejQM2HMmBLEzVrLvOhWhgTgRaJkzfXfXNf1T6IGZ2vtEcBXO9MSxK_EovTg" mode="aspectFit"></image>
            <text class="pay-name">微信支付</text>
          </view>
          <!-- 支付宝 -->
          <view
            class="pay-method"
            :class="{ 'pay-method-active': selectedPayMethod === 'alipay' }"
            @tap="handleSelectPayMethod('alipay')"
          >
            <image class="pay-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnkcUl990KVMLi8XSIQCNevTmBiUjWF8FKIJBwRuId9_79or1pXArfXOj8zbRIA997nmlAjpBkWlMiYclX41EriSZQw1aENR5xvwvXQtMQkyR8zrb8P1WCfxjcCuq0LAsOtDFIlbt4FZIUNNlvf9EOTljawWDomOAyJx2xnnAhCrWM7sd7MfDKA1fiOXdeqr24C_esXnnK4sq1oyQbGdK-97rjnEnoytw4DJvpVPScU01caqNH2jKB-kGbnsxd1DPaPHb7H9USfQ" mode="aspectFit"></image>
            <text class="pay-name">支付宝</text>
          </view>
        </view>
        <view class="pay-action-bar">
          <view class="total-amount">
            <text class="total-label">合计待支付</text>
            <text class="total-price">¥ {{ orderDetail.totalAmount }}</text>
          </view>
          <view class="confirm-pay-btn" hover-class="pay-btn-hover" @tap="handlePay">
            <text class="pay-btn-text">立即支付</text>
          </view>
        </view>
      </view>
      <!-- 安全区占位 -->
      <view class="safe-area-placeholder"></view>
    </view>
  </view>
</template>



<style scoped>
/* 页面整体 */
.order-confirm-page {
  width: 100%;
  min-height: 100vh;
  background-color: #F7F6F5;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 自定义导航栏 (需配合 pages.json 中 navigationStyle: "custom") */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(247, 246, 245, 0.9);
  backdrop-filter: blur(20px);
  z-index: 100;
  padding-top: var(--status-bar-height, 0px);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112rpx;
  padding: 0 32rpx;
}

.back-btn {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: opacity 0.2s;
}

.back-btn-hover {
  opacity: 0.6;
  background-color: rgba(0, 0, 0, 0.05);
}

.navbar-title {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 36rpx;
  font-weight: 700;
  color: #924700;
  letter-spacing: -0.5rpx;
}

.placeholder {
  width: 72rpx;
}

/* 主滚动区域 */
.main-scroll {
  flex: 1;
  /* margin-top: 112rpx; */
  padding: 0 32rpx;
  box-sizing: border-box;
}

/* 通用卡片样式 */
.info-card {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.02);
}

/* 商家卡片 */
.merchant-card {
  display: flex;
  gap: 24rpx;
  background-color: #F1F1F0;
}

.merchant-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #DCDDDC;
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.merchant-details {
  flex: 1;
}

.merchant-name-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.merchant-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #2E2F2F;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.verified-icon {
  width: 36rpx;
  height: 36rpx;
  background-color: #FF851B;
  color: #FFFFFF;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: bold;
  text-align: center;
  line-height: 1;
}

.contact-row, .address-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 12rpx;
}

.contact-icon, .address-icon {
  font-size: 28rpx;
  color: #5B5C5B;
}

.contact-text, .address-text {
  font-size: 26rpx;
  color: #5B5C5B;
}

.contact-row:active {
  opacity: 0.7;
}

/* 地址卡片 */
.address-card {
  background-color: #FFFFFF;
  box-shadow: 0 -4rpx 24rpx rgba(255, 133, 27, 0.04);
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.title-icon {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.section-icon {
  font-size: 32rpx;
  color: #924700;
}

.section-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #924700;
}

.switch-btn {
  display: flex;
  align-items: center;
  gap: 4rpx;
  padding: 8rpx 0;
}

.switch-text {
  font-size: 26rpx;
  font-weight: 600;
  color: #FF851B;
}

.arrow-icon {
  font-size: 32rpx;
  color: #FF851B;
}

.address-body {
  margin-top: 8rpx;
}

.user-name-row {
  display: flex;
  align-items: baseline;
  gap: 20rpx;
  margin-bottom: 16rpx;
}

.user-name {
  font-size: 38rpx;
  font-weight: 800;
  color: #2E2F2F;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.user-phone {
  font-size: 26rpx;
  color: #5B5C5B;
}

.full-address {
  font-size: 30rpx;
  line-height: 1.5;
  color: #2E2F2F;
}

/* 服务卡片 */
.service-header {
  display: flex;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.service-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 24rpx;
  flex-shrink: 0;
  background-color: #E8E8E7;
}

.service-intro {
  flex: 1;
}

.service-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #2E2F2F;
  display: block;
  margin-bottom: 12rpx;
}

.service-tag {
  display: inline-block;
  background-color: rgba(255, 133, 27, 0.1);
  color: #924700;
  font-size: 22rpx;
  font-weight: 600;
  padding: 6rpx 20rpx;
  border-radius: 40rpx;
  margin-bottom: 16rpx;
}

.service-order-no {
  font-size: 24rpx;
  color: #5B5C5B;
  display: block;
}

.service-details {
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  padding-top: 24rpx;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.detail-label {
  font-size: 28rpx;
  color: #5B5C5B;
}

.detail-value {
  font-size: 28rpx;
  font-weight: 500;
  color: #2E2F2F;
}

.origin-price {
  text-decoration: line-through;
  color: #ADADAC;
}

.final-price-row {
  margin-bottom: 0;
  margin-top: 8rpx;
  align-items: flex-end;
}

.final-label {
  font-size: 32rpx;
  font-weight: 700;
  color: #2E2F2F;
}

.final-price {
  display: flex;
  align-items: baseline;
}

.currency-symbol {
  font-size: 32rpx;
  font-weight: 800;
  color: #FF851B;
}

.price-number {
  font-size: 64rpx;
  font-weight: 800;
  color: #FF851B;
  line-height: 1;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.decimal {
  font-size: 32rpx;
  font-weight: 800;
  color: #FF851B;
}

/* 备注卡片 */
.remark-card {
  padding-bottom: 32rpx;
}

.remark-title {
  font-size: 32rpx;
  font-weight: 700;
  color: #2E2F2F;
  display: block;
  margin-bottom: 24rpx;
}

.remark-input-area {
  background-color: #F1F1F0;
  border-radius: 24rpx;
  padding: 20rpx;
}

.remark-textarea {
  width: 100%;
  min-height: 160rpx;
  font-size: 28rpx;
  color: #2E2F2F;
  background: transparent;
  line-height: 1.5;
}

.remark-placeholder {
  color: #ADADAC;
}

/* 底部占位 */
.bottom-placeholder {
  height: 400rpx;
}

/* 固定底部支付栏 */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 -12rpx 32rpx rgba(255, 133, 27, 0.08);
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
}

.payment-section {
  padding: 24rpx 32rpx 16rpx;
}

.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 0 8rpx;
}

.payment-label {
  font-size: 26rpx;
  color: #5B5C5B;
}

.more-methods {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.more-text {
  font-size: 24rpx;
  color: #FF851B;
}

.more-arrow {
  font-size: 28rpx;
  color: #FF851B;
}

.payment-options {
  display: flex;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.pay-method {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 24rpx 0;
  border-radius: 32rpx;
  background-color: #E8E8E7;
  transition: all 0.2s;
}

.pay-method-active {
  background-color: rgba(255, 133, 27, 0.08);
  border: 2rpx solid #FF851B;
}

.pay-icon {
  width: 40rpx;
  height: 40rpx;
}

.pay-name {
  font-size: 30rpx;
  font-weight: 700;
  color: #2E2F2F;
}

.pay-method-active .pay-name {
  color: #924700;
}

.pay-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FF851B;
  border-radius: 9999rpx;
  padding: 12rpx 12rpx 12rpx 32rpx;
  margin-top: 8rpx;
}

.total-amount {
  display: flex;
  flex-direction: column;
}

.total-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.total-price {
  font-size: 44rpx;
  font-weight: 800;
  color: #FFFFFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.confirm-pay-btn {
  background-color: #FFFFFF;
  padding: 20rpx 56rpx;
  border-radius: 9999rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
}

.pay-btn-hover {
  transform: scale(0.96);
  opacity: 0.9;
}

.pay-btn-text {
  font-size: 32rpx;
  font-weight: 800;
  color: #FF851B;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.safe-area-placeholder {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  background-color: transparent;
}

/* 点击态 */
.switch-btn:active,
.more-methods:active,
.pay-method:active {
  opacity: 0.7;
}
</style>