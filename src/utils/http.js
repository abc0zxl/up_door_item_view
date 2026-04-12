
//添加拦截器
//拦截request，uploadfile文件上传请求

import { useMemberStore } from "@/stores/modules/member"

/*
1.非http开头拼接地址
2.添加超时
3.添加小程序端请求头
4.添加token请求头标识

*/

//基础地址
const baseURL = 'http://localhost:8080/api/v1'


//添加拦截器
const httpInterceptor = {
    // 这个options是uni.request的参数
    // invoke的作用是在请求发送之前执行
    // options:UniApp.RequestOptions
    invoke(options){
            console.log('拦截器被创建了')
    if(!options.url.startsWith('http')){
        options.url = baseURL + options.url
    }
    options.timeout=10000
    console.log(options)
    //添加小程序端请求头
    options.header={
        ...options.header,
        // 小程序端请求头标识
        'source-client':'miniapp',
    }
    // const memberStore=useMemberStore()
    // const token=memberStore.profile?.token
    // // const token=123321
    // if(token)
    // {
    //     //如果有token，添加到请求头中
    //     // 这里不报错的原因是options是js对象，不是ts接口
    //     options.header.Authorization = token
    // }
    // console.log('请求被拦截了,是http这里',options)

}}
// 添加拦截器   
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)




// interface Data<T>{
//     code:string
//     msg:string
//     result:T
// }


const http=(options)=>{
    return new Promise((resolve,reject)=>{
        uni.request({
            ...options,
            success(res){
                //状态码200-299表示成功,这个是axios的处理方式
                if(res.statusCode >= 200 && res.statusCode < 300){
                //类型断言
                // as Data<t>的作用是告诉ts，这个res.data是Data<T>类型
                resolve(res.data)
                }else if(res.statusCode === 401){
                    //token过期处理
                    const memberStore=useMemberStore()
                    //清理用户数据的原因是
                    //1.用户可能在其他设备登录了
                    //2.用户可能修改了密码  
                    //4.用户可能修改了密码
                    memberStore.clearProfile()
                    //跳转到登录页面
                    uni.navigateTo({url:'/pages/login/login'})
                    reject(res)
                }else{
                    uni.showToast({
                        //提示后台返回的错误信息，进行友好提示
                        icon:'none',
                        title:(res.data).msg || '请求失败'
                    })
                }
            },
            fail(err){
                uni.showToast({
                    icon:'loading',
                    title:'网络错误'
                })
                reject(err)
            },
        })
    })
}

export {http}