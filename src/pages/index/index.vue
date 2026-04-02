<script setup>
import SangSwiper from '@/components/SangSwiper.vue';
import { ref, onMounted } from 'vue';
import { getHomeBannerAPI } from '@/services/home';

const bannerList = ref([])

const getHomeBannerData = async () => {
  try {
    const res = await getHomeBannerAPI()
    console.log("轮播数据", res)
    bannerList.value = res.data || []
    console.log(bannerList.value)
  } catch (e) {
    console.error("请求失败", e)
  }
}

// 页面加载执行（必须加！）
onMounted(() => {
  getHomeBannerData()
})
</script> 

<template>

    <SangSwiper :list="bannerList" />

</template>

<style scoped>
.scroll-view {
  height: 100vh;
}
</style>