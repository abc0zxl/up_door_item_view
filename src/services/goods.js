import { http } from "@/utils/http"


// 首页的轮播图
export const getgoodsListAPI = (obj) => {
    return http({
        method:'POST',
        url:'/client/service/goodslist',
        data:{
            ...obj
        }
    })
}

export const getgoodsDetailAPI = (params) => {
    return http({
        method:'GET',
        url:'/client/service/goods?goodsId='+params.goodsId,
        // data:{
        //     goodsId:123
        //     // ...params
        // }
    })
}

export const getgoodsSkuAPI = (params) => {
    return http({
        method:'GET',
        url:'/client/service/SkuInfo?goodsid='+params,
    })
}


export const getServiceAPI = (params) => {
    return http({
        method:'GET',
        url:'/client/service/goodsService?serviceId='+params,
    })
}