import { http } from "@/utils/http"


// 首页的轮播图
export const getHomeBannerAPI = () => {
    return http({
        method:'GET',
        url:'/client/Banners'
    })
}