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