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


