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
//暴露的是一个获取会员信息的方法
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref()
    // 保存会员信息，登录时使用
    const setProfile = (val) => {
      profile.value = val
    }
    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }
    // return出去的是三个方法
    return {
        // 会员信息
      profile,
        // 保存会员信息，登录时使用
      setProfile,
        // 清理会员信息，退出时使用
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
