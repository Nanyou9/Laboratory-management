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
          labID:'',
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
        var lab = options.labID
        this.setData({
          labID:lab
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      var that = this
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":1,
            "page":1,
            "ID":that.data.labID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          that.setData({
              detailData:res.data.rows[0],
          })
        }})
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