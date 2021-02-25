//index.js
//获取应用实例
import Toast from '@vant/weapp/toast/toast';
const app = getApp()

Page({
  data: {
    username:'',
    password:'',
    home:'home',
    me:'me',
    staffData:[]
  },
 
  
  onLoad: function (option) {
    var that = this
     console.log(option)
     wx.hideHomeButton()
     wx.getStorage({
      key: 'key',
      success(res) {
        that.setData({
          username:res.data[0],
          password:res.data[1]
        })
        console.log(res)
      },
      // fail(res) {
      //   if(that.data.password==''||that.data.username==''){
      //     Toast.loading({
      //       message: '登录失效或未登录...',
      //       forbidClick: true,
      //     });
      //      setTimeout(()=>{
      //        Toast.clear
      //        wx.reLaunch({
      //          url: '/pages/Login/index'
      //        })
      //    },2000)
      //   }
      // }
    })
  },
  
})
