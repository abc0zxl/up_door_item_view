import { http } from '@/utils/http'

export const addCartAPI = (param) => {
    return http({
        method:'POST',
        url:'/client/cart/AddCart',
        data:
        {
            ...param
        }
    })
}

export const getCartListAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/cart/GetList',
        data:{
            ...params
        }
    })
}