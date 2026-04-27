<template>
  <view class="container">
    <button class="open-btn" @click="openBaidu">跳转到浏览器打开百度</button>
    <button class="open-btn alipay-btn" @click="testAlipayHTML">测试支付宝HTML表单</button>
    <button class="open-btn webview-btn" @click="testAlipayInWebview">在应用内打开支付宝</button>
    <button class="open-btn direct-alipay-btn" @click="openAlipayDirectly">直接跳转到支付宝</button>
  </view>
</template>

<script setup>
const openBaidu = () => {
  // 直接使用系统浏览器打开百度
  // #ifdef APP-PLUS
  plus.runtime.openURL('https://www.baidu.com')
  // #endif
  
  // #ifdef H5
  window.open('https://www.baidu.com', '_blank')
  // #endif
}

const openAlipayDirectly = () => {
  // 直接跳转到支付宝APP（沙箱环境）
  // 支付宝沙箱APP的URL Scheme
  const alipaySandboxScheme = 'alipays://platformapi/startapp?appId=2019051064522000'
  
  // 支付宝正式版APP的URL Scheme
  const alipayOfficialScheme = 'alipay://platformapi/startapp?appId=20000067'
  
  // 支付宝网页版（备用方案）
  const alipayWebUrl = 'https://mclient.alipay.com/home/index.htm'
  
  // #ifdef APP-PLUS
  // 先尝试打开支付宝沙箱APP
  plus.runtime.openURL(alipaySandboxScheme, 
    function(res) {
      console.log('成功打开支付宝沙箱APP')
    }, 
    function(err) {
      console.log('无法打开支付宝沙箱APP，尝试打开正式版')
      // 如果沙箱打不开，尝试正式版
      plus.runtime.openURL(alipayOfficialScheme,
        function(res) {
          console.log('成功打开支付宝正式APP')
        },
        function(err) {
          console.log('无法打开支付宝APP，跳转到网页版')
          // 如果APP都打不开，跳转到网页版
          plus.runtime.openURL(alipayWebUrl)
        }
      )
    }
  )
  // #endif
  
  // #ifdef H5
  // H5端无法直接打开APP，跳转到支付宝网页版
  window.open(alipayWebUrl, '_blank')
  // #endif
}

const testAlipayHTML = () => {
  // 测试支付宝HTML表单在浏览器中打开
  const alipayHTML = `
<form name="punchout_form" method="post" action="https://openapi-sandbox.dl.alipaydev.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=PtQZdV2brYRdsRt4e%2FSjobvZfSNMOG69i%2Bob%2FDGFAImQJrddwr9upFT6%2BmMxiEbGVCvk15JPQWeebY%2Ft6Ajnpyy9funeZ%2B%2Ba7FmFGgEZryfGS2kC64uHft27TKSG4czphW6Hw8Z8Xvu1tyIIEg5LSCLXY3wt9GcweifyKx3zkguaYTwwItwMd3zJSqOLhbYAxR7xMd1Rla9W2vzXBVOCc1uYdLA1eqeVN0%2FUFRgcNMa%2Fwdaxm5ju4R4QHvP8zA%2BqDaIa4%2FC5gwtPvk0%2FdPuQlVrLeRULY1VEd2EdSdnuQ%2F1f%2FzybMNI7ma70TZpMp6xapNM0OvcG2CCwSqJGuDNOew%3D%3D&return_url=https%3A%2F%2F2c4136ed.r11.cpolar.top%2Fapi%2Fv1%2Fclient%2Fnormal%2FPhonetoSuccessB&notify_url=https%3A%2F%2F2c4136ed.r11.cpolar.top%2Fapi%2Fv1%2Fclient%2Fnormal%2FPhonetoSuccessA&version=1.0&app_id=9021000161688889&sign_type=RSA2&timestamp=2026-04-26+01%3A37%3A30&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=JSON">
<input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;2026042601371289&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_WAY&quot;,&quot;subject&quot;:&quot;全屋深度保洁-小户型套餐&quot;,&quot;total_amount&quot;:&quot;199.00&quot;}">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();<\/script>
  `
  
  // 创建临时HTML文件并打开
  const htmlContent = `${alipayHTML}`
  
  // 在浏览器中打开
  // #ifdef APP-PLUS
  plus.runtime.openURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent))
  // #endif
  
  // #ifdef H5
  const newWindow = window.open('', '_blank')
  newWindow.document.write(htmlContent)
  newWindow.document.close()
  // #endif
}

const testAlipayInWebview = () => {
  // 在应用内webview中打开支付宝
  const alipayHTML = `
<form name="punchout_form" method="post" action="https://openapi-sandbox.dl.alipaydev.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=PtQZdV2brYRdsRt4e%2FSjobvZfSNMOG69i%2Bob%2FDGFAImQJrddwr9upFT6%2BmMxiEbGVCvk15JPQWeebY%2Ft6Ajnpyy9funeZ%2B%2Ba7FmFGgEZryfGS2kC64uHft27TKSG4czphW6Hw8Z8Xvu1tyIIEg5LSCLXY3wt9GcweifyKx3zkguaYTwwItwMd3zJSqOLhbYAxR7xMd1Rla9W2vzXBVOCc1uYdLA1eqeVN0%2FUFRgcNMa%2Fwdaxm5ju4R4QHvP8zA%2BqDaIa4%2FC5gwtPvk0%2FdPuQlVrLeRULY1VEd2EdSdnuQ%2F1f%2FzybMNI7ma70TZpMp6xapNM0OvcG2CCwSqJGuDNOew%3D%3D&return_url=https%3A%2F%2F2c4136ed.r11.cpolar.top%2Fapi%2Fv1%2Fclient%2Fnormal%2FPhonetoSuccessB&notify_url=https%3A%2F%2F2c4136ed.r11.cpolar.top%2Fapi%2Fv1%2Fclient%2Fnormal%2FPhonetoSuccessA&version=1.0&app_id=9021000161688889&sign_type=RSA2&timestamp=2026-04-26+01%3A37%3A30&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=JSON">
<input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;2026042601371289&quot;,&quot;product_code&quot;:&quot;QUICK_WAP_WAY&quot;,&quot;subject&quot;:&quot;全屋深度保洁-小户型套餐&quot;,&quot;total_amount&quot;:&quot;199.00&quot;}">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();<\/script>
  `
  
  // 编码HTML内容
  const encodedHtml = encodeURIComponent(alipayHTML)
  
  // 跳转到现有的webview页面
  uni.navigateTo({
    url: `/pagesMember/payment/webview?formHtml=${encodedHtml}`
  })
}
</script>

<style scoped>
.container {
  padding: 100rpx 40rpx;
}

.open-btn {
  width: 100%;
  height: 80rpx;
  background-color: #007AFF;
  color: white;
  border-radius: 10rpx;
  font-size: 32rpx;
  margin-bottom: 20rpx;
}

.alipay-btn {
  background-color: #1677FF;
}

.webview-btn {
  background-color: #52C41A;
}

.direct-alipay-btn {
  background-color: #1677FF;
  border: 2rpx solid #0958d9;
}
</style>