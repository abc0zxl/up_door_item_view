
<script setup>
import { ref,onMounted,watch,computed } from 'vue'
import { onShow, onReady, onHide, onUnload } from '@dcloudio/uni-app'
import { getAddressById } from '@/services/user'
import { getOrderConfirmAPI,createOrderAPI } from '@/services/order'
import { useAddress } from '@/stores/modules/addressStore'
import { useMemberStore } from '@/stores/modules/member'



const serviceInfo = ref({})  //订单信息，商家信息，服务信息
const addressInfo = ref({})  //地址信息
const storeOrderId = ref({})  //订单id
const userInfo = useMemberStore() //获取会员信息
const flag = ref(true)
// const addressId = ref({})
// const changeAddressId = {
//   addressId
// }  //修改地址id，这个不影响
// const DefaultAddressFlag = ref(true)  //启用默认地址
const addressParam = {
  userId: 10001,
  defaultAddressId: 20017
}
// const addressStore = useAddress()
//识别地址id
// const getAddressId = computed(() => {
//   return addressStore.selectedAddress || addressParam.userId
// })
//会自动更新
const addressStore = useAddress()
const addressId2 = ref({}) //用于监听地址id变化
const addressId = computed(() => {
  console.log("computed到addressStore发生变化",addressStore.selectedAddress)
  const id = addressStore.selectedAddress || addressParam.defaultAddressId
  addressId2.value = id
  return id
})
// console.log("查看pinia内容",useAddress().selectedAddress)
//   console.log("更新到id",addressId.value)
//直接用watch监听上面的id
watch(() => addressStore.selectedAddress, (newVal) => {
  console.log("=== Pinia 变化监听 ===")
  console.log("新的 selectedAddress:", newVal)
  console.log("类型:", typeof newVal)
}, {immediate: true})
//监听地址id变化，获取地址信息
watch(() => addressStore.selectedAddress, async (newId) => {
      console.log("开始查询地址",newId)

  if(!newId) 
  newId = addressParam.defaultAddressId
  try{

    const res = await getAddressById({addressId:newId})
    addressInfo.value = res.data
    console.log("获得地址",addressInfo.value)
  }catch(err){
    console.log("获取地址失败",err)
  }
},{immediate: true}
)

//刷新地址信息
const getAddressInfo = computed(() => {
  return addressInfo.value
})
// const getAddressInfo = computed(() => {
//   addressId.value = addressStore.selectedAddress || addressParam.userId
//   const res = getAddressByUserAPI(addressId.value)
//   addressInfo.value = res.data
//   console.log("获得地址",addressInfo.value)
//   return addressInfo.value
// })

const getOrderParam = {
  goodsId: 100001,
  quantity: 2,
  appointmentTime: "2026-04-18 17:12",
  skuId: 200001,
    token: userInfo.profile.token,
  }


// 封装一个格式化当前时间的函数
function formatCurrentDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份从0开始，+1后补0
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  // 格式：yyyy-MM-dd HH:mm
  return `${year}-${month}-${day} ${hours}:${minutes}`
  // 如果后端要求到秒，改成下面这行：
  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const getOrderComfirmInfo = async () => {
  console.log("开始发送参数",getOrderParam)
  const res= await getOrderConfirmAPI(getOrderParam)
  serviceInfo.value = res.data
    console.log("获取订单确认信息",serviceInfo.value)

}

// const getAddressInfo = async () => {
//   const res = await getAddressByUserAPI(addressParam)

//   // if(DefaultAddressFlag.value)
//   addressInfo.value = res.data

//   // console.log("是否启用默认地址",DefaultAddressFlag.value)
//   console.log(addressInfo.value)
// }

onMounted(() => {
  getOrderComfirmInfo()
  // getAddressInfo()
}
)


// 地址信息
// const addressInfo = ref({
//   name: '张先生',
//   phoneMask: '138 **** 8888',
//   detail: '上海市静安区南京西路1266号\n恒隆广场写字楼1期 2503室'
// })

// 商家信息
// const merchantInfo = ref({
//   avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBogs00Qi9KsxkqkQFoucqPW9KQWtmNaw5ggWWA71l9yVFP4CxzTKVTMYKI2sDcSRsRC5sA5GsP5k3SErRU1x9mKnllBmapUrqEZhRaa74Py948VeX9NXTjmsX2m6ZiGs5oAR2bXfOUrRuGKNfFoULjm-l6lDFcAjS7pBMbU3qF8V_muyJvYB_Jqii_qrtUnPFZQLD_B0tmSNDyQ7jPo7XE-xfhnqh_7HeOeCLidvKBnDrxqDb-o_qhmjqBT8hRGD-LgNhjtLMxVA',
//   name: '悦享家政上海旗舰店',
//   address: '上海市黄浦区中山东一路18号'
// })

// 服务信息
// const serviceInfo = ref({
//   image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcIJFdaX_e33pz31k6GpJ3OvJQm1SkKNpR_rjElyCda12sv_F6mUILbZsWfowZUPyzKzwkXWN-NcT357KzFpPr99xf5Haa-UH5Nmoqv7zOmEsQnxIwtqJIxY4-Knr1i6rVbC9s0fzGT6uVxyoMUIXG1zeKLsSBRIkLV2wmuW6jTSe5xPdkWUig2M06dIGXt0fxLJnIHZFVKrCY6Zyc88-emTLGSDDqEPgExDVEOnwhpKqbw37H0I3thPDFkrY03-p8lxQe_R_qjQ',
//   name: '全屋深度保洁 4小时',
//   description: '专业深度除尘除菌',
//   category: '家庭保洁 / 深度保洁',
//   serviceTime: '2024年05月20日 14:00',
//   orderNo: 'SH202405208892',
//   totalPrice: '299'
// })

//合并了商家和服务，最终要赋值的变量
// const serviceInfo = ref({
//   avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBogs00Qi9KsxkqkQFoucqPW9KQWtmNaw5ggWWA71l9yVFP4CxzTKVTMYKI2sDcSRsRC5sA5GsP5k3SErRU1x9mKnllBmapUrqEZhRaa74Py948VeX9NXTjmsX2m6ZiGs5oAR2bXfOUrRuGKNfFoULjm-l6lDFcAjS7pBMbU3qF8V_muyJvYB_Jqii_qrtUnPFZQLD_B0tmSNDyQ7jPo7XE-xfhnqh_7HeOeCLidvKBnDrxqDb-o_qhmjqBT8hRGD-LgNhjtLMxVA',
//   name: '悦享家政上海旗舰店',
//   address: '上海市黄浦区中山东一路18号',
//   image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcIJFdaX_e33pz31k6GpJ3OvJQm1SkKNpR_rjElyCda12sv_F6mUILbZsWfowZUPyzKzwkXWN-NcT357KzFpPr99xf5Haa-UH5Nmoqv7zOmEsQnxIwtqJIxY4-Knr1i6rVbC9s0fzGT6uVxyoMUIXG1zeKLsSBRIkLV2wmuW6jTSe5xPdkWUig2M06dIGXt0fxLJnIHZFVKrCY6Zyc88-emTLGSDDqEPgExDVEOnwhpKqbw37H0I3thPDFkrY03-p8lxQe_R_qjQ',
//   name: '全屋深度保洁 4小时',
//   description: '专业深度除尘除菌',
//   category: '家庭保洁 / 深度保洁',
//   serviceTime: '2024年05月20日 14:00',
//   orderNo: 'SH202405208892',
//   totalPrice: '299'
// })

// 用户信息
// const userInfo = ref({
//   name: '预订人姓名',
//   phoneMask: '138 **** 8888'
// })
// addressId
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

// 修改地址
const handleModifyAddress = () => {
//   uni.showToast({
//     title: '地址修改功能开发中',
//     icon: 'none'
//   })
  uni.navigateTo({ 
    url: '/pagesMember/address/address?userId='+addressParam.userId,
   })
}

// 联系商家
const handleCallMerchant = () => {
  uni.makePhoneCall({
    phoneNumber: '400-882-8899', // 示例号码，实际可替换为商家电话
    fail: () => {
      uni.showToast({
        title: '拨号失败',
        icon: 'none'
      })
    }
  })
}

// 编辑用户信息
// const handleEditUser = () => {
//   uni.showToast({
//     title: '编辑个人信息',
//     icon: 'none'
//   })
// }

// 确认支付
const handlePay = () => {
  uni.showModal({
    title: '确认支付',
    content: `订单金额：¥${serviceInfo.value.totalAmount}`,
    confirmText: '去支付',
    success: async (res) => {

      if (res.confirm) {
        const orderParam = {
  orderNo: serviceInfo.value.orderNo,
  orderStatus:"CreateOrder",
  goodsId: getOrderParam.goodsId,
  quantity: serviceInfo.value.quantity,
  appointmentTime: getOrderParam.appointmentTime,
  skuId: serviceInfo.value.skuId,
  addressId:addressId.value,
  registerTime: formatCurrentDateTime(),
    token: userInfo.profile.token,
    }
        // uni.showToast({
        //   title: '支付功能演示',
        //   icon: 'none'
        // })
        try{

          console.log("请求参数是",orderParam)
          console.log("开始查询订单状态")
          const res = await createOrderAPI(orderParam)
          console.log("创建订单后端返回结构",res)
          if( res.code == 200){
            storeOrderId.value.orderId = res.data.orderId
          }else{
          storeOrderId.value.orderId = ""
          }
          console.log("订单存储的id是",storeOrderId.value.orderId)

          if( res.code == 409 ){
            uni.showToast({
              title: '订单重复，请勿重复下单',
              icon: 'none'
            })
          }else if( res.code == 200 ){
            uni.showToast({
              title: '下单成功，去支付',
              icon: 'success'
            })
              uni.navigateTo({ url: '/pages/pageOrder/orderPay/orderPay?storeOrderId='+ storeOrderId.value.orderId })

          }else{
            uni.showToast({
              title: '下单失败',
              icon: 'none'
            })
          }
        }catch(err){
          console.error('下单接口异常：', err)
          uni.showToast({
            title: '下单失败',
            icon: 'none'
          })
        }
        // 实际支付逻辑可在此调用支付接口
      }
    }
  })
}




onShow(() => {
  console.log('🟢 [orderPay] onShow - 页面显示（包括返回时触发）')
  console.log('🟢 [orderPay] 当前时间:', new Date().toLocaleString())
  
  // 检查支付状态（从支付页面返回时）
  // checkPaymentStatus()
  
  uni.showToast({
    title: '支付成功',
    icon: 'none'
  })
  flag.value = !flag.value
})

onHide(() => {
  console.log('🟡 [orderPay] onHide - 页面隐藏（跳转到支付页面时触发）')
  console.log('🟡 [orderPay] 隐藏时间:', new Date().toLocaleString())
})

onReady(() => {
  console.log('🔵 [orderPay] onReady - 页面初次渲染完成')
})

onUnload(() => {
  console.log('🔴 [orderPay] onUnload - 页面卸载')
  // 清理资源
})
</script>

<template>
  <view class="order-confirm-page">
    <!-- 自定义导航栏 -->
    <!-- <view class="custom-navbar">
      <view class="navbar-content">
        <view class="back-btn" @tap="handleBack">
          <text class="icon-text">←</text>
        </view>
        <text class="navbar-title">确认订单</text>
        <view class="placeholder"></view>
      </view>
    </view> -->

    <!-- 主内容区域 -->
    <scroll-view class="main-content" scroll-y enhanced :show-scrollbar="false">
      <view v-if="flag" class = "aaa">
        safsafasfasfasdfa
      </view>
      <!-- 地址信息卡片 -->
      <view class="info-card address-card">
        <view class="address-info">
          <view class="user-info-row">
            <text class="user-name">{{ addressInfo.contactName }}</text>
            <text class="user-phone">{{ addressInfo.contactPhone }}</text>
          </view>
          <text class="address-detail">{{ addressInfo.province }} {{ addressInfo.city }} {{ addressInfo.district }} {{ addressInfo.address }}</text>
        </view>
        <view class="modify-btn" @tap="handleModifyAddress">
          <text class="modify-text">修改地址</text>
          <text class="icon-text small">›</text>
        </view>
      </view>

      <!-- 商家信息卡片 -->
      <view class="info-card merchant-card">
        <view class="merchant-info">
          <image class="merchant-avatar" :src="serviceInfo.shopLogo" mode="aspectFill"></image>
          <view class="merchant-details">
            <text class="merchant-name">{{ serviceInfo.shopName }}</text>
            <text class="merchant-address">{{ serviceInfo.province }} {{ serviceInfo.city }} {{ serviceInfo.district }} {{ serviceInfo.address }}</text>
          </view>
          <view class="call-btn" @tap="handleCallMerchant">
            <text class="icon-text">📞</text>
          </view>
        </view>
      </view>

      <!-- 服务信息卡片 -->
      <view class="info-card service-card">
        <view class="service-header">
          <image class="service-img" :src="serviceInfo.coverImage" mode="aspectFill"></image>
          <view class="service-intro">
            <text class="service-name">{{ serviceInfo.goodsName }}</text>
            <text class="service-desc">{{ serviceInfo.goodsDescription }}</text>
          </view>
        </view>
        <view class="service-details">
          <view class="detail-row">
            <text class="detail-label">服务类别</text>
            <text class="detail-value">{{ serviceInfo.categoryName }}/{{ serviceInfo.serviceName }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">服务类型</text>
            <text class="detail-value">{{ serviceInfo.skuName }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">服务时间</text>
            <text class="detail-value">{{ serviceInfo.appointmentTime }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">订单编号</text>
            <text class="detail-value">{{ serviceInfo.orderNo }}</text>
          </view>
        </view>
        <view class="price-row">
          <text class="price-label">订单总计</text>
          <view class="price-value">
            <text class="currency">¥</text>
            <text class="price-number">{{ serviceInfo.totalAmount }}</text>
          </view>
        </view>
      </view>

      <!-- 用户信息卡片 -->
      <!-- <view class="info-card user-card">
        <view class="user-avatar">
          <text class="icon-text large">👤</text>
        </view>
        <view class="user-details">
          <view class="user-name-tag">
            <text class="booker-name">{{ userInfo.name }}</text>
            <text class="self-tag">本人</text>
          </view>
          <text class="user-phone-mask">{{ userInfo.phoneMask }}</text>
        </view>
        <view class="edit-btn" @tap="handleEditUser">
          <text class="icon-text">✎</text>
        </view>
      </view> -->

      <!-- 底部占位，防止内容被固定按钮遮挡 -->
      <view class="bottom-placeholder"></view>
    </scroll-view>

    <!-- 底部固定按钮 -->
    <view class="fixed-footer">
      <button class="confirm-btn" @tap="handlePay">
        <text class="btn-text">确认信息，去支付</text>
        <text class="icon-text">→</text>
      </button>
    </view>
  </view>
</template>


<style scoped>
/* 页面整体样式 */
.order-confirm-page {
  width: 100%;
  min-height: 100vh;
  background-color: #F7F6F5;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 自定义导航栏 */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(247, 246, 245, 0.8);
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
  position: relative;
}

.back-btn, .placeholder {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:active {
  opacity: 0.6;
}

.navbar-title {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 36rpx;
  font-weight: 700;
  color: #924700;
  letter-spacing: -0.5rpx;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  /* margin-top: 112rpx; */
  padding: 32rpx 32rpx 0;
  box-sizing: border-box;
}

/* 公用卡片样式 */
.info-card {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.03);
}

/* 地址卡片 */
.address-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.address-info {
  flex: 1;
}

.user-info-row {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
  flex-wrap: wrap;
  margin-bottom: 8rpx;
}

.user-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #2E2F2F;
}

.user-phone {
  font-size: 26rpx;
  color: #5B5C5B;
}

.address-detail {
  font-size: 26rpx;
  color: #5B5C5B;
  line-height: 1.5;
  white-space: pre-line;
}

.modify-btn {
  display: flex;
  align-items: center;
  gap: 4rpx;
  padding: 8rpx 0;
}

.modify-btn:active {
  opacity: 0.7;
}

.modify-text {
  font-size: 26rpx;
  font-weight: 600;
  color: #924700;
}

/* 商家卡片 */
.merchant-card {
  background-color: #FDF9F4;
}

.merchant-info {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.merchant-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  border: 2rpx solid rgba(238, 120, 5, 0.2);
  flex-shrink: 0;
}

.merchant-details {
  flex: 1;
}

.merchant-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #2E2F2F;
  display: block;
  margin-bottom: 8rpx;
}

.merchant-address {
  font-size: 24rpx;
  color: #5B5C5B;
}

.call-btn {
  width: 72rpx;
  height: 72rpx;
  background-color: rgba(255, 133, 27, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.call-btn:active {
  transform: scale(0.95);
  background-color: rgba(255, 133, 27, 0.2);
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
}

.service-intro {
  flex: 1;
}

.service-name {
  font-size: 32rpx;
  font-weight: 700;
  line-height: 1.3;
  color: #2E2F2F;
  display: block;
  margin-bottom: 8rpx;
}

.service-desc {
  font-size: 26rpx;
  color: #5B5C5B;
}

.service-details {
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  padding-top: 24rpx;
  margin-bottom: 24rpx;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.detail-label {
  font-size: 26rpx;
  color: #5B5C5B;
}

.detail-value {
  font-size: 26rpx;
  font-weight: 500;
  color: #2E2F2F;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  padding-top: 32rpx;
}

.price-label {
  font-size: 26rpx;
  color: #5B5C5B;
}

.price-value {
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 32rpx;
  font-weight: 800;
  color: #FF851B;
  margin-right: 4rpx;
}

.price-number {
  font-size: 56rpx;
  font-weight: 800;
  color: #FF851B;
  line-height: 1;
}

/* 用户卡片 */
.user-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.user-avatar {
  width: 96rpx;
  height: 96rpx;
  background-color: #E8E8E7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
}

.user-name-tag {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 8rpx;
  flex-wrap: wrap;
}

.booker-name {
  font-size: 32rpx;
  font-weight: 700;
  color: #2E2F2F;
}

.self-tag {
  font-size: 22rpx;
  background-color: rgba(255, 133, 27, 0.1);
  color: #924700;
  padding: 4rpx 16rpx;
  border-radius: 40rpx;
  font-weight: 500;
}

.user-phone-mask {
  font-size: 26rpx;
  color: #5B5C5B;
}

.edit-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.edit-btn:active {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 底部占位 */
.bottom-placeholder {
  height: 180rpx;
}

/* 固定底部按钮 */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  padding: 24rpx 32rpx 48rpx;
  z-index: 100;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.02);
}

.confirm-btn {
  width: 100%;
  height: 112rpx;
  background: linear-gradient(135deg, #FF851B 0%, #803D00 100%);
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  border: none;
  box-shadow: 0 16rpx 40rpx rgba(255, 133, 27, 0.25);
}

.confirm-btn::after {
  border: none;
}

.confirm-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.btn-text {
  font-size: 34rpx;
  font-weight: 700;
  color: #FFFFFF;
}

/* 图标文本通用样式 */
.icon-text {
  font-size: 40rpx;
  font-weight: normal;
  color: inherit;
  line-height: 1;
}

.icon-text.small {
  font-size: 32rpx;
}

.icon-text.large {
  font-size: 56rpx;
}

/* 按钮点击优化 */
button {
  background: transparent;
  padding: 0;
  margin: 0;
  line-height: 1;
}

button:after {
  border: none;
}

/* 安全区域适配 */
.fixed-footer {
  padding-bottom: calc(48rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

.custom-navbar {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
</style>