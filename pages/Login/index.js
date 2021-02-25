// pages/Login/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

    /**
     * 页面的初始数据
     */
    data: {
       username:'',
       password:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onChange:function(value){
       this.setData({
          username:value.detail
       })
       console.log(this.data.username)
    },
    onChange1:function(value){
        this.setData({
           password:value.detail
        })
        console.log(this.data.password)
     },
     submit:function(){
         var that = this
         if(this.data.username ==""){
            Toast('请输入用户名');
         }else if(this.data.password == ""){
            Toast('请输入密码');
         }else{
            wx.setStorage({
               key: 'key',
               data: [
                   that.data.username,
                   that.data.password,
               ],
               success(res) {
                   console.log(res)
                }
           })
                        Toast.success('登录成功');
                        setTimeout(()=>{
                            wx.reLaunch({
                             url: '/pages/Home/index'
                           })
                        },1000)
                    }
     },
    onLoad: function (options) {
        wx.hideHomeButton()
        
        if(options.username){
            this.setData({
                username: options.username,
            })
        }
       
      console.log(options)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})