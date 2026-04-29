<script setup>
import { ref } from 'vue'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
import { useMemberStore } from '@/stores/modules/member'
import { addAddressAPI } from '@/services/user'
// 地图装饰图片（使用原 HTML 中的图片）
const mapImage = ref('https://lh3.googleusercontent.com/aida-public/AB6AXuAvTPx8UbFJEsPoijNxrmPWzmeY1vChWuuqVIm_ZJJd0n_zlQlyAiaBC2X1jmGIZ2RnrocGHGp9QDuWQhUc2SzRgM1fUfcpBkLaAsdkUGds3yFkKj98pNcO-4neRQ91tcMDV2mVlYNiEtmn1x58v7u_-cb8ZT55htxFXW-OLfqLyWT2_q9LjThELxVI5LBDWcPSlmM7W2_OId4QNHqb75htblxznI0jFH-xTFlBKl66VFeZdcQR0IdGmgz_w--zUZCPFjpoGpv1TA')

// 表单数据（示例默认值，实际应从上一页传入）
const userStore = useMemberStore()
const formData = ref({
  userId:userStore.profile.userId,
  contactName: '',
  contactPhone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
  isDefault: 1
})
// 响应式数据
const visible = ref(false)
const maskCloseAble = ref(true)
const addressInfo = ref({})
const str = ref()
const defaultValue = ref('420103')   // 或 ref(['河北省','唐山市','丰南区'])
const column = ref(3)


const createAddressAPI = async () => {

}
// 方法
const open = () => {
  visible.value = true
}

const confirm = (val) => {
  // console.log(val)
  // str.value = JSON.stringify(val)
  formData.value.province = val.provinceName
  formData.value.city = val.cityName
  formData.value.district = val.areaName
  addressInfo.value = val
  console.log("addressInfo.value", addressInfo.value)
  str.value = val.name
  visible.value = false
}

const cancel = () => {
  visible.value = false
}

// 分享生命周期
onShareAppMessage((res) => {
  if (res.from === 'button') {
    console.log(res.target)
  }
  return {
    title: 'data-cityPicker省市区地址选择器！',
    path: '/pages/cityPicker/cityPicker'
  }
})

onShareTimeline((res) => {
  if (res.from === 'button') {
    console.log(res.target)
  }
  return {
    title: 'data-cityPicker省市区地址选择器！'
  }
})
// 返回上一页
const handleBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.showToast({
        title: '无法返回',
        icon: 'none'
      })
    }
  })
}

// 删除地址
const handleDelete = () => {
  uni.showModal({
    title: '提示',
    content: '确定要删除该地址吗？',
    confirmColor: '#FF851B',
    success: (res) => {
      if (res.confirm) {
        // 实际开发中调用删除接口
        uni.showToast({
          title: '地址已删除',
          icon: 'success',
          success: () => {
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          }
        })
      }
    }
  })
}

// 选择地区（调用地图选择或省市区选择器）
const handleChooseRegion = () => {
  // 方法1：使用 uni.chooseLocation 获取位置（需要用户授权）
  // 方法2：使用 picker 组件实现省市区三级联动，为简化演示，这里使用 uni.chooseLocation
  uni.chooseLocation({
    success: (res) => {
      if (res.address) {
        // 将返回的地址信息简化为地区文本（实际可做更精细处理）
        formData.value.region = res.address
      }
    },
    fail: (err) => {
      if (err.errMsg.indexOf('cancel') === -1) {
        uni.showToast({
          title: '定位失败',
          icon: 'none'
        })
      }
    }
  })
}

// 默认地址开关变化
const handleDefaultChange = (e) => {
  formData.value.isDefault = e.detail.value ? 1 : 0
}
const onRegionChange = (e) => {
  const region = e.detail.value.map(item => item.text).join('')
  formData.value.region = region
}

// 保存地址
const handleSave = async () => {
  // 简单表单校验
  if (!formData.value.contactName.trim()) {
    uni.showToast({
      title: '请填写联系人',
      icon: 'none'
    })
    return
  }
  const phoneReg = /^1[3-9]\d{9}$/
  if (!phoneReg.test(formData.value.contactPhone)) {
    uni.showToast({
      title: '手机号格式不正确',
      icon: 'none'
    })
    return
  }
  if (!formData.value.province || !formData.value.city || !formData.value.district) {
    uni.showToast({
      title: '请选择所在地区',
      icon: 'none'
    })
    return
  }
  if (!formData.value.detailAddress.trim()) {
    uni.showToast({
      title: '请填写详细地址',
      icon: 'none'
    })
    return
  }

  // 实际开发中调用保存接口
  uni.showLoading({
    title: '保存中...',
    mask: true
  })

  try {
    const res = await addAddressAPI(formData.value)
    console.log("返回的消息：",res)
    
    uni.hideLoading() // 隐藏loading
    
    if(res.code === 200){
      console.log("返回的消息：",res.msg)
      uni.showToast({
        title: '添加成功',
        icon: 'success',
        success: () => {
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        }
      })
    } else {
      // 处理其他状态码
      uni.showToast({
        title: res.msg || '保存失败',
        icon: 'none'
      })
    }
  } catch (error) {
    uni.hideLoading() // 隐藏loading
    console.error('保存地址失败:', error)
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    })
  }
  // setTimeout(() => {
  //   uni.hideLoading()
  //   uni.showToast({
  //     title: '保存成功',
  //     icon: 'success',
  //     success: () => {
  //       setTimeout(() => {
  //         uni.navigateBack()
  //       }, 1500)
  //     }
  //   })
  // }, 500)
}
</script>

<template>
  <view class="edit-address-page">
    <!-- 自定义导航栏 -->
    <!-- <view class="custom-navbar">
      <view class="navbar-content">
        <view class="back-btn" hover-class="back-btn-hover" @tap="handleBack">
          <text class="icon-text">←</text>
        </view>
        <text class="navbar-title">编辑地址</text>
        <view class="delete-btn" @tap="handleDelete">
          <text class="delete-text">删除</text>
        </view>
      </view>
      <view class="navbar-divider"></view>
    </view> -->

    <!-- 主内容区域（滚动） -->
    <scroll-view class="main-scroll" scroll-y enhanced :show-scrollbar="false">
      <!-- 头部文案 -->
      <view class="header-section">
        <text class="header-title">完善您的<text class="header-highlight">服务地址</text></text>
        <text class="header-desc">请提供准确的地址，以便我们的服务人员准时到达。</text>
      </view>

      <!-- 表单区域 -->
      <view class="form-container">
        <!-- 联系人信息组 -->
        <view class="form-group">
          <view class="input-item">
            <text class="input-label">联系人</text>
            <view class="input-field">
              <text class="field-icon">👤</text>
              <input
                class="field-input"
                type="text"
                v-model="formData.contactName"
                placeholder="收货人姓名"
                placeholder-class="input-placeholder"
              />
            </view>
          </view>
          <view class="input-item">
            <text class="input-label">手机号码</text>
            <view class="input-field">
              <text class="field-icon">📱</text>
              <input
                class="field-input"
                type="number"
                v-model="formData.contactPhone"
                placeholder="请输入手机号"
                placeholder-class="input-placeholder"
                maxlength="11"
              />
            </view>
          </view>
        </view>

        <!-- 地址信息组 -->
        <view class="form-group">
          <view class="input-item">
            <text class="input-label">所在地区</text>
            <!-- <view class="input-field region-field" @tap="handleChooseRegion">
              <text class="field-icon">📍</text>
              <text class="region-text">{{ formData.region || '请选择省市区' }}</text>
              <text class="arrow-icon">›</text>
            </view> -->
              <!-- <uni-data-picker  placeholder="请选择省市区"  @change="onRegionChange"></uni-data-picker> -->
  <view>
    <view>
      <button class="input-field region-field" @tap="open">{{ str || '请选择省市区' }}</button>
    </view>
    <cityPicker
      :column="column"
      :default-value="defaultValue"
      :mask-close-able="maskCloseAble"
      @confirm="confirm"
      @cancel="cancel"
      :visible="visible"
    />
  </view>
          </view>
          <view class="input-item">
            <text class="input-label">详细地址</text>
            <view class="input-field textarea-field">
              <text class="field-icon">🏠</text>
              <textarea
                class="field-textarea"
                v-model="formData.detailAddress"
                placeholder="街道、楼牌号等详细信息"
                placeholder-class="input-placeholder"
                :auto-height="true"
                maxlength="200"
              />
            </view>
          </view>
        </view>

        <!-- 默认地址开关 -->
        <view class="switch-item">
          <view class="switch-left">
            <view class="switch-icon-bg">
              <text class="switch-icon">✓</text>
            </view>
            <view class="switch-texts">
              <text class="switch-title">设为默认地址</text>
              <text class="switch-desc">下单时将优先使用该地址</text>
            </view>
          </view>
          <switch
            :checked="formData.isDefault"
            color="#FF851B"
            @change="handleDefaultChange"
          />
        </view>
      </view>

      <!-- 地图装饰卡片 -->
      <view class="map-card">
        <image
          class="map-image"
          :src="mapImage"
          mode="aspectFill"
        ></image>
        <view class="map-overlay"></view>
        <view class="map-location-tag">
          <text class="location-icon">📍</text>
          <text class="location-text">智能定位校准中</text>
        </view>
      </view>

      <!-- 底部占位，防止内容被固定按钮遮挡 -->
      <view class="bottom-placeholder"></view>
    </scroll-view>

    <!-- 底部固定保存按钮 -->
    <view class="fixed-footer">
      <button class="save-btn" hover-class="save-btn-hover" @tap="handleSave">
        <text class="save-btn-text">保存并使用地址</text>
      </button>
    </view>
  </view>
</template>


<style scoped>
/* 页面整体 */
.edit-address-page {
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
}

.back-btn-hover {
  background-color: #E8E8E7;
}

.icon-text {
  font-size: 48rpx;
  color: #924700;
  font-weight: normal;
  line-height: 1;
}

.navbar-title {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 36rpx;
  font-weight: 700;
  color: #924700;
  letter-spacing: -0.5rpx;
}

.delete-btn {
  padding: 12rpx 16rpx;
}

.delete-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #5B5C5B;
}

.delete-btn:active {
  opacity: 0.6;
}

.navbar-divider {
  height: 2rpx;
  background-color: #E8E8E7;
}

/* 主滚动区域 */
.main-scroll {
  flex: 1;
  /* margin-top: 112rpx; */
  padding: 0 32rpx;
  box-sizing: border-box;
}

/* 头部文案 */
.header-section {
  margin: 32rpx 0 48rpx 0;
}

.header-title {
  font-size: 56rpx;
  font-weight: 800;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #2E2F2F;
  line-height: 1.3;
  display: block;
  margin-bottom: 16rpx;
}

.header-highlight {
  color: #FF851B;
}

.header-desc {
  font-size: 26rpx;
  color: #5B5C5B;
}

/* 表单容器 */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 40rpx;
}

.form-group {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.input-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.input-label {
  font-size: 26rpx;
  font-weight: 700;
  color: #2E2F2F;
  margin-left: 8rpx;
}

.input-field {
  display: flex;
  align-items: center;
  background-color: #F1F1F0;
  border-radius: 24rpx;
  padding: 24rpx 24rpx;
  transition: all 0.2s;
}

.input-field:focus-within {
  background-color: #FFFFFF;
  box-shadow: 0 12rpx 32rpx rgba(255, 133, 27, 0.08);
}

.field-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
  color: #EE7805;
}

.field-input {
  flex: 1;
  background: transparent;
  font-size: 30rpx;
  color: #2E2F2F;
}

.input-placeholder {
  color: #ADADAC;
}

.region-field {
  justify-content: space-between;
    font-size: 30rpx;
  color: #848585;
}

.region-text {
  flex: 1;
  font-size: 30rpx;
  color: #2c2d2d;
}

.arrow-icon {
  font-size: 40rpx;
  color: #ADADAC;
}

.textarea-field {
  align-items: flex-start;
}

.field-textarea {
  flex: 1;
  background: transparent;
  font-size: 30rpx;
  color: #2E2F2F;
  min-height: 120rpx;
}

/* 默认地址开关 */
.switch-item {
  background-color: #FFFFFF;
  border-radius: 32rpx;
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.switch-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.switch-icon-bg {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255, 133, 27, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch-icon {
  font-size: 40rpx;
  color: #FF851B;
}

.switch-texts {
  display: flex;
  flex-direction: column;
}

.switch-title {
  font-size: 30rpx;
  font-weight: 700;
  color: #2E2F2F;
}

.switch-desc {
  font-size: 24rpx;
  color: #5B5C5B;
}

/* 地图装饰卡片 */
.map-card {
  position: relative;
  width: 100%;
  height: 320rpx;
  border-radius: 32rpx;
  overflow: hidden;
  margin: 16rpx 0 48rpx;
  filter: grayscale(0.2);
  opacity: 0.9;
}

.map-image {
  width: 100%;
  height: 100%;
}

.map-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(247, 246, 245, 0.8), transparent);
}

.map-location-tag {
  position: absolute;
  bottom: 24rpx;
  left: 24rpx;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 9999rpx;
  padding: 12rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  border: 1rpx solid rgba(255, 133, 27, 0.1);
}

.location-icon {
  font-size: 28rpx;
  color: #FF851B;
}

.location-text {
  font-size: 22rpx;
  font-weight: 700;
  color: #2E2F2F;
  letter-spacing: 0.5rpx;
}

/* 底部占位 */
.bottom-placeholder {
  height: 200rpx;
}

/* 固定底部按钮 */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(247, 246, 245, 0.6);
  backdrop-filter: blur(20px);
  padding: 24rpx 32rpx calc(24rpx + constant(safe-area-inset-bottom));
  padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
  z-index: 100;
}

.save-btn {
  width: 100%;
  background: linear-gradient(135deg, #FF851B 0%, #803D00 100%);
  border-radius: 9999rpx;
  height: 112rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 12rpx 32rpx rgba(255, 133, 27, 0.2);
}

.save-btn::after {
  border: none;
}

.save-btn-hover {
  transform: scale(0.98);
  opacity: 0.95;
}

.save-btn-text {
  font-size: 34rpx;
  font-weight: 800;
  color: #FFFFFF;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* 其他辅助 */
button {
  background: transparent;
  padding: 0;
  margin: 0;
  line-height: 1;
}
</style>