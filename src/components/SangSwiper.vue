<script setup>
import { ref } from 'vue'

const activeIndex = ref(0)


// 接收外部传递的banner列表
const props=defineProps({
    list:{
        type: Array,
        default: ()=>[]
    }
})

const onChange=(ev)=>{
  // console.log(ev.detail?.current);
  activeIndex.value=ev.deta?.current||0
  console.log(activeIndex.value)
}


console.log(props)
</script>
<template>
  <view class="carousel">
    <swiper 
    :circular="true" 
    :autoplay="false" 
    :interval="3000"
    @change="onChange"
    >

      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image
            mode="aspectFill"
            class="image"
            :src="item.imageUrl"
          ></image>
        </navigator>
      </swiper-item>
<!-- 
      <swiper-item>
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image
            mode="aspectFill"
            class="image"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_2.jpg"
          ></image>
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image
            mode="aspectFill"
            class="image"
            src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/slider_3.jpg"
          ></image>
        </navigator>
      </swiper-item> -->
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list.length"
        :key="item"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
@use '../components/styles/XtxSwiper.scss'
</style>