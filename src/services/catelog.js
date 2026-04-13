import {http} from '@/utils/http'

export const getCategoryListAPI = (params) => {
    return http({
        method:'GET',
        url:'/client/service/list',
        //body参数
        data:{
            ...params
        }
    })
}

// export const getGoodsListAPI = (params) => {
//     return http({
//         method:'GET',
//         url:'client/service/goodslist',
//         data:{
//             ...params
//         }
//     })
// }
