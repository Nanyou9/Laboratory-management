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
          activeNames:0,
          userData:[],
          bottom:true,
          site:'',
          rows:15,
          page:1,
          color:['#da5000','#4dc700','#c70000'],
          color1:['#da5000','#aeb103','#b17b03','#b15303','#b12b03','#b10303'],
          AlarmStatus:['异常','正常','报警'],
          SafeLevel:['异常','安全','普通危险','中度危险','高度危险','特别危险'],
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
    onChange(event){
      console.log(event)
      this.setData({
        activeNames:event.detail.index
      })
    },
    onLoad: function (options) {
      this.setData({
        bottom:true
      })
        var detail = JSON.parse(options.detailData)
        this.setData({
          detailData:detail,
         })
         console.log(this.data.detailData)
         wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_SafeMonitorLog/GetPageSafeMonitorLogListByRoom', //仅为示例，并非真实的接口地址
          method:'post',
          data: {
              "rows":this.data.rows,
              "page":this.data.page,
              "EquipmentID":this.data.detailData.ID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
            this.setData({
              bottom:false
            })
            this.setData({
                userData:res.data.rows,
            })
          }
        })
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
      console.log(this.data.latitude,this.data.longitude)
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
      wx.showNavigationBarLoading()
      this.setData({
        bottom:true
      })
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_SafeMonitorLog/GetPageSafeMonitorLogListByRoom', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            "page":1,
            "EquipmentID":this.data.detailData.ID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          this.setData({
            bottom:false
          })
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh();
          this.setData({
              userData:res.data.rows,
              page:1,
          })
        }
      })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      this.setData({
        bottom:true
      })
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_SafeMonitorLog/GetPageSafeMonitorLogListByRoom', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            "page":this.data.page + 1,
            "EquipmentID":this.data.detailData.ID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          
          if(res.data.rows!=[]){
            this.setData({
                userData:this.data.userData.concat(res.data.rows),
            })
          }else{
            this.setData({
              bottom:false
            })
          }
        }
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})