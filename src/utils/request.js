
import Taro from '@tarojs/taro'
export default function({url,method='post',data}) {
  return new Promise((resolve,reject)=>{
    Taro.request({
      url,
      data,
      method,
      success: function (res) {
        resolve(res.data)
      },
      fail:function(res) {
        reject(res)
      }
    })
  })

}
