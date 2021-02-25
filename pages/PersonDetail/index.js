// pages/ProblemReportEdit/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
          detailData:[],
          activeNames: ['0'],
          site:'',
     
          index: 0,
          multiArray: [],
          _event:[],
          columns: [],
          Reason:'',
          userid:'',
          Reason:'',
          disabled:false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var detail = JSON.parse(options.detailData)
        this.setData({
          detailData:detail,
         })
         console.log(this.data.detailData)
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