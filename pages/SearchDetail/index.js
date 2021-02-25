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
          active: 0,
          rows:15,
          labID:'',
          alarm:[],
          Equipment:[],
          bottom:true,
          tapequiment:true,
          page:1,
          page1:2,
          ready:false,
          page2:2,
          site:'',
          color1:['green','red'],
          status1:["正常","报警"],
          color:['','green','red'],
          status:['',"正常","报警"],
          index: 0,
          EquipmentData:[],
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
    equipment:function(event){
      this.setData({
        active:2,
        tapequiment:false,
        EquipmentData:this.data.Equipment[event.currentTarget.id]
      })
      console.log(event)
    },
    onChange(event) {
     console.log(event)
     this.setData({
      active:event.detail.index,
     })
     if(this.data.active == 1){
       console.log(123)
      this.setData({
        bottom:false
      })
      setTimeout(()=>{
        this.setData({
         bottom:true
        },2000)
      })
     }else{
       this.setData({
        bottom:false
       })
     }
     
    },
    report:function(event){
      console.log(event)
      var that = this
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_Equipments/GetPageEquipmentListByParam', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":1,
            "page":1,
            "ID":event.currentTarget.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
         var detailData = res.data.rows[0]
         console.log(detailData)
         var detail = JSON.stringify(detailData)
           wx.navigateTo({
             url: '/pages/EquipmentDetail/index?detailData=' + detail
           })
        }})
    },
    onLoad: function (options) {
        var lab = JSON.parse(options.labID)
        this.setData({
          labID:lab,
         })
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
         wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_Equipments/GetPageEquipmentListByParam', //仅为示例，并非真实的接口地址
          method:'post',
          data: {
              "rows":this.data.rows,
              "page":1,
              "RoomID":this.data.labID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
            this.setData({
                Equipment:res.data.rows,
            })
           
          }
        })
        wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_SafeMonitorLog/GetPageSafeMonitorLogListByParam', //仅为示例，并非真实的接口地址
          method:'post',
          data: {
              "rows":this.data.rows,
              "page":1,
              "RoomID":this.data.detailData.ID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
            this.setData({
                alarm:res.data.rows,
                bottom:false,
                ready:true,
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
      this.setData({
        bottom:false
      })
      if(this.data.active ==1){
        wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_Equipments/GetPageEquipmentListByParam', //仅为示例，并非真实的接口地址
          method:'post',
          data: {
              "rows":this.data.rows,
              "page":this.data.page1,
              "RoomID":this.data.detailData.ID
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
            if(res.data.rows.length!=0){
              console.log(321)
              console.log(res.data)
              this.setData({
                  Equipment:this.data.Equipment.concat(res.data.rows),
                  page1:this.data.page1+1
              })
            }else{
                  this.setData({
                    bottom:true
                  })
            }
          }
        })
      }else{
        wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_SafeMonitorLog/GetPageSafeMonitorLogListByParam', //仅为示例，并非真实的接口地址
          method:'post',
          data: {
              "rows":this.data.rows,
              'status':1,
              "page":this.data.page2
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
            if(res.data.rows!=[]){
              console.log(123)
              this.setData({
                  alarm:this.data.alarm.concat(res.data.rows),
                  page2:this.data.page2+1,
                  bottom:false,
              })
            }else{
                  
            }
          }
          
        })
        setTimeout(()=>{
          this.setData({
              bottom:false,
              if:true,
          })
        },2000)
      }
      
      
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})