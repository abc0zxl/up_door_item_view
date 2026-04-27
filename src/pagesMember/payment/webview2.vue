<template>
  <view class="container">
    <web-view 
      :src="localHtmlPath" 
      @message="handleMessage"
      @onPostMessage="handlePostMessage"
      v-if="localHtmlPath">
    </web-view>
    <view v-else class="loading-container">
      <text class="loading-text">支付页面加载中...</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePayStore } from '@/stores/modules/pay'

const localHtmlPath = ref('')
const payStore = usePayStore()
let titleObserver = null

// 写入本地文件或生成 Blob URL
const saveAndLoadHtml = (htmlContent) => {
  // #ifdef APP-PLUS
  const systemPath = plus.io.convertLocalFileSystemURL('_doc/')
  const fileName = `alipay_${Date.now()}.html`
  const filePath = systemPath + fileName

  plus.io.resolveLocalFileSystemURL(
    systemPath,
    (entry) => {
      entry.getFile(
        fileName,
        { create: true },
        (fileEntry) => {
          fileEntry.createWriter(
            (writer) => {
              writer.onwriteend = () => {
                // 写入完成，生成本地路径
                localHtmlPath.value = `_doc/${fileName}`
                console.log('APP 环境支付页路径：', localHtmlPath.value)
              }
              writer.write(htmlContent)
            },
            (e) => console.error('创建写入器失败', e)
          )
        },
        (e) => console.error('获取文件失败', e)
      )
    },
    (e) => console.error('访问_doc目录失败', e)
  )
  // #endif
  
  // #ifdef H5
  // H5 环境下使用 Blob URL 加载 HTML 内容
  try {
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const blobUrl = URL.createObjectURL(blob)
    localHtmlPath.value = blobUrl
    console.log('H5 环境支付页 URL：', blobUrl)
    
    // 添加加载完成提示
    setTimeout(() => {
      uni.showToast({
        title: '支付页面加载完成',
        icon: 'success',
        duration: 1500
      })
    }, 500)
  } catch (error) {
    console.error('H5 环境创建 Blob URL 失败：', error)
    uni.showModal({
      title: '提示',
      content: '支付页面加载失败，请稍后重试',
      showCancel: false
    })
  }
  // #endif
}

// 设置标题监听（H5 环境支付成功检测）
const setupTitleObserver = () => {
  let lastTitle = ''
  
  titleObserver = setInterval(() => {
    const currentTitle = document.title
    if (currentTitle !== lastTitle) {
      lastTitle = currentTitle
      console.log('页面标题变化:', currentTitle)
      
      // 监听支付成功信号
      if (currentTitle.startsWith('PAYMENT_SUCCESS:')) {
        const orderNo = currentTitle.replace('PAYMENT_SUCCESS:', '')
        console.log('检测到支付成功，订单号:', orderNo)
        handlePaymentSuccess(orderNo)
      }
    }
  }, 500)
}

// 处理支付成功
const handlePaymentSuccess = (orderNo) => {
  console.log('支付成功处理，订单号:', orderNo)
  
  uni.showToast({
    title: '支付成功',
    icon: 'success',
    duration: 2000
  })
  
  // 延迟跳转到订单详情页
  setTimeout(() => {
    uni.redirectTo({
      url: `/pages/pageOrder/orderDetail/orderDetail?out_trade_no=${orderNo}`
    })
  }, 1500)
}

const htmlLoad = () => {
  const rawHtml = payStore.profile.payHtml
  if (!rawHtml) {
    console.error('支付 HTML 内容为空')
    uni.showToast({
      title: '支付信息加载失败',
      icon: 'error'
    })
    return
  }

  try {
    // 原流程中使用了 decodeURIComponent，注意如果后端已经编码过则无需重复
    const decoded = decodeURIComponent(rawHtml)
    console.log('解码后的HTML 长度：', decoded.length)

    // 写入文件并加载
    saveAndLoadHtml(decoded)
  } catch (error) {
    console.error('HTML 解码失败：', error)
    // 直接使用原始 HTML
    saveAndLoadHtml(rawHtml)
  }
}

// 监听 web-view 发来的消息
const handleMessage = (evt) => {
  console.log('收到webview消息:', JSON.stringify(evt.detail))
  const dataList = evt.detail.data
  if (!dataList || !Array.isArray(dataList)) return
  
  dataList.forEach((item) => {
    if (item && item.type === 'paySuccess') {
      console.log('收到支付成功通知，订单号：', item.out_trade_no)
      handlePaymentSuccess(item.out_trade_no)
    }
  })
}

// 处理 postMessage（兼容不同版本）
const handlePostMessage = (evt) => {
  handleMessage(evt)
}

onMounted(() => {
  console.log('WebView 页面挂载，开始加载支付页面')
  setupTitleObserver()
  htmlLoad()
})

onUnmounted(() => {
  console.log('WebView 页面卸载')
  if (titleObserver) {
    clearInterval(titleObserver)
  }
  
  // H5 环境下清理 Blob URL
  // #ifdef H5
  if (localHtmlPath.value && localHtmlPath.value.startsWith('blob:')) {
    URL.revokeObjectURL(localHtmlPath.value)
  }
  // #endif
})
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f8f8f8;
}

.loading-text {
  font-size: 16px;
  color: #666;
}
</style>