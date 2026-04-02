<script setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
  // 登录成功后，跳转到首页

  const usertoken = ref('')
const memberToken=()=>{
    if (!usertoken.value) {
    uni.showToast({ title: '请输入token', icon: 'none' })
    return
  }
  //保存会员信息
   const memberStore=useMemberStore()
   memberStore.setProfile({
    id: 1,
    nickname: '测试用户',
    token: usertoken.value
  })
  //将res.result的属性解开到和memberStore一致
  //  memberStore.setProfile.token(res.result)

   uni.showToast({title:'登录成功',icon:'success'})
  //设置超时
   setTimeout(()=>{
    uni.navigateTo({ url: '/pages/index/index' })
    //此时跳转的页面不是tobar，所以会报错
    // uni.switchTab({url:'/pages/index/index'})
    // uni.navigateBack()
  },1000)
  console.log(memberStore.profile)
}
const handleLogin=()=>{

      if (!this.phone || !this.pwd) {
        uni.showToast({ title: '请输入手机号和密码', icon: 'none' })
        return
      }
      // 这里可以加你的登录接口请求
      uni.showToast({ title: '登录成功', icon: 'success' })
    }

const toForget=()=>{
      uni.showToast({ title: '跳转到忘记密码页', icon: 'none' })
    }
const toRegister=()=>{
      uni.showToast({ title: '跳转到注册页', icon: 'none' })
    }
const onGetphonenumberSimple=async()=>{
  // const res=await postLoginWxMinAPI('13800000000')
  const res = usertoken
  //保存会员信息
  const memberStore=useMemberStore()
  //将res.result的属性解开到和memberStore一致
  memberStore.setProfile(res.result)

  uni.showToast({title:'登录成功',icon:'success'})
  //设置超时
  setTimeout(()=>{
    //  uni.switchTab({url:'/pages/index/index'})
    uni.navigateBack()
  },1000)
  //跳转首页
  // console.log(memberStore.profile)\
}
</script>

<template>
  <view class="login-page">
    <!-- 背景 -->
    <view class="bg-wrap"></view>

    <!-- 登录卡片 -->
    <view class="login-card">
      <text class="title">登录</text>

      <!-- 手机号输入 -->
      <view class="input-item">
        <text class="icon">👤</text>
        <input type="number" v-model="phone" placeholder="请输入手机号码" maxlength="11" />
      </view>

      <!-- 密码输入 -->
      <view class="input-item">
        <text class="icon">🔒</text>
        <input :type="pwdShow ? 'text' : 'password'" v-model="pwd" placeholder="请输入密码" />
      </view>

      <!-- 测试输入token -->
      <view class="input-item">
        <text class="icon">👤</text>
        <input type="text" v-model="usertoken" placeholder="请输入token" />
      </view>

      <text class="forgot-pwd" @click="toForget">忘记密码</text>

      <!-- 登录按钮 -->
      <button class="login-btn" @click="handleLogin">登录</button>
      <button class="login-btn" @click="memberToken">存储token</button>

    </view>

    <!-- 注册入口 -->
    <view class="register-entry" @click="toRegister">
      <text>注册新账号</text>
    </view>
  </view>
</template>

<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.bg-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f0f5 0%, #eef4f9 100%);
}
/* 模拟底部波浪 */
.bg-wrap::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200rpx;
  background: #ffe0e6;
  border-radius: 50% 50% 0 0;
  opacity: 0.6;
}

.login-card {
  position: relative;
  z-index: 1;
  width: 80%;
  margin: 300rpx auto 0;
  background: #fff;
  border-radius: 20rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.1);
}
.title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #ff719f;
  margin-bottom: 60rpx;
}
.input-item {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  border-radius: 50rpx;
  padding: 0 30rpx;
  margin-bottom: 30rpx;
}
.icon {
  font-size: 32rpx;
  color: #ff719f;
  margin-right: 20rpx;
}
.input-item input {
  flex: 1;
  height: 90rpx;
  font-size: 28rpx;
  color: #333;
}
.forgot-pwd {
  display: block;
  text-align: right;
  font-size: 26rpx;
  color: #aaa;
  margin: 10rpx 0 40rpx;
}
.login-btn {
  width: 100%;
  height: 90rpx;
  border-radius: 50rpx;
  background: linear-gradient(90deg, #ff9090 0%, #ff719f 100%);
  color: #fff;
  font-size: 32rpx;
  border: none;
}

.register-entry {
  position: relative;
  z-index: 1;
  width: 80%;
  margin: 0 auto;
  background: #fff;
  border-radius: 0 0 20rpx 20rpx;
  text-align: center;
  padding: 30rpx 0;
  margin-top: -10rpx;
  color: #aaa;
  font-size: 28rpx;
}
</style>