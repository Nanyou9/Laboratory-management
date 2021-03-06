// pages/ProblemReport/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
    data: {
      userData:[],
      rows:15,
      page:2,
      if:true,
      show:false,
      refresh:"正在刷新",
      bottom:true,
      status:'',
      GRID_DrawingMode:'BMAP_DRAWING_POLYGON',
      color:'',
      value:'',
      detailData:[]
    },
    onChange:function(e){
            this.setData({
              value:e.detail
            })
    },
    choose:function(){
      this.setData({
        show:true
      })
    },
    onClose:function(){
      this.setData({
        show:false
      })
    },
    detail:function(e){
      this.setData({
        detailData:this.data.userData[e.currentTarget.id]
      })
      var detail = JSON.stringify(this.data.detailData)
      wx.navigateTo({
        url: '/pages/PersonDetail/index?detailData=' + detail
      })
    },
    onSearch:function(){
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_RoomUsersBind/GetPageRoomUsersBindListByParam', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            "RoomID":this.data.labID,
            "page":1,
            "RealName":this.data.value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          this.setData({
              userData:res.data.rows,
              bottom:false,
          })
        }
      })
    },
   
  
    frushData: function () {
        wx.request({
            url: 'https://swuse.huantengkj.com/api/HTSL_RoomUsersBind/GetPageRoomUsersBindListByParam', //仅为示例，并非真实的接口地址
            method:'post',
            data: {
                "rows":this.data.rows,
                "RoomID":this.data.labID,
                "page":1
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
      this.frushData()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
     
      this.frushData()
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
     
        this.frushData()
        setTimeout(()=>{
            this.setData({
                if:false,
                page:2,
                refresh:"刷新成功",})
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh();
        },2000)
        this.setData({
            bottom:true
        })
       

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
       wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_UserInfo/GetPageUserInfoListByParam', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            'status':1,
            "page":this.data.page
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          
          if(res.data.rows.length!=0){
            this.setData({
                userData:this.data.userData.concat(res.data.rows),
                page:this.data.page+1
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
      
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})