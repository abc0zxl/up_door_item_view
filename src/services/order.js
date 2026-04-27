import { http } from '@/utils/http'

export const getOrderConfirmAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/order/confirm',
        data:{
            ...params
        }
    })
}

export const createOrderAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/order/addOrder',
        data:{
            ...params
        }
    })
}

export const getOrderDetailAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/order/getOrderById',
        data:{
            ...params
        }
    })
}

export const getShopInfoByIdAPI = (shopId) => {
    return http({
        method:'Get',
        url:'/client/order/getShopById?shopId='+shopId,
    })
}


export const payOrderPhoneAPI = (order) => {
    return http({
        method:"post",
        url:'/client/normal/phonePay',
        data:{
            ...order
        },
          success: (res) => {
    // 1. 先打印完整响应，看后端到底返回了什么
    console.log('完整响应：', res.data);
    
    // 2. 取出业务数据（假设后端返回格式为 {code, message, data}）
    const result = res.data;
    if (result.code === 200) {
      let payData = result.data;   // 这就是 PayUtil.PhoneSendRequestAlibaba 返回的字符串
      console.log('支付参数：', payData);
      
      // 如果 payData 是 HTML 表单，可能需要提取 action URL 或用 web-view 加载
      // 如果 payData 是支付链接，可以直接使用
    } else {
      console.error('支付接口异常：', result.message);
    }
  },
  fail: (err) => {
    console.error('请求失败：', err);
  }
    })
}