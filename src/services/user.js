import { http } from '@/utils/http'

export const getAddressByUserAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/order/getDefaultAddress',
        data:{
            ...params
        }
    })
}


export const getAddressListByUserAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/order/getAddressList',
        data:{
            ...params
        }
    })
}


export const getDefaultAddressIdByuserIdAPI = (params) => {
    return http({
        method:'POST',
        url:'/client/order/getDefaultAddressIdByuserId',
        data:{
            ...params
        }
    })
}

export const getAddressById = (params) => {
    return http({
        method:'POST',
        url:'/client/order/getAddressById',
        data:{
            ...params
        }
    })
}

