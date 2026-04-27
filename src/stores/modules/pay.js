import { defineStore } from 'pinia'
import { ref } from 'vue'


// export const LoginResult = {
//   /** 用户ID */
//   id: '',
//   /** 头像  */
//   avatar: '',
//   /** 账户名  */
//   account: '',
//   /** 昵称 */
//   nickname: '',
//   /** 手机号 */
//   mobile: '',
//   /** 登录凭证 */
//   token: ''
// }

// 定义 Store
export const usePayStore = defineStore(
  'pay',
  () => {
    const profile = ref()
    const setProfile = (val) => {
      profile.value = val
    }
    const clearProfile = () => {
      profile.value = undefined
    }
    // return出去的是三个方法
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    // persist: true,
    //这个是固定的写法，用来配置持久化的
    persist:{
      storage:{
        getItem(key){
          return uni.getStorageSync(key)
      },
      setItem(key,value){
        uni.setStorageSync(key,value)
    },
  }
  }
}
)
