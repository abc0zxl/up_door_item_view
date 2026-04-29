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


export const GetNumberAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/cart/GetNumber',
        data:{
            ...params
        }
    })
}

export const AddFavoriteAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/cart/Favorite',
        data:{
            ...params
        }
    })
}