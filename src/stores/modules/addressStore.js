import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddress = defineStore('address',
//     {
//     state:()=>({
//         selectedAddress:0,
//     }),
//     getters:{
//         getAddressId(state){
//             return state.selectedAddress
//         }
//     },
//     actions:{
//         changeSelectedAddress(val){
//             this.selectedAddress=val
//         }
//     }

// }
 () => {
  const selectedAddress = ref()
  const changeSelectedAddress=(val)=>{
    selectedAddress.value=val
  }
  return{
    selectedAddress,
    changeSelectedAddress,
  }
  }

)