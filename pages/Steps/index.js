// pages/Steps/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current : 0,
    treeData:[],
    save:false,
    uniData:"点击右侧选择学校",
    colData:"请先选择学校",
    buiData:"请先选择学院",
    floData:"请先选择大楼",
    labData:"请先选择楼层",
    show:false,
    show1:false,
    show2:false,
    show3:false,
    show4:false,
    uniList:[],
    colList:[],
    buiList:[],
    floList:[],
    labList:[],
    uniIndex:'',
    colIndex:'',
    buiIndex:'',
    floIndex:'',
    labIndex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  uni:function(){
     this.setData({
       show:true
     })
  },
  col:function(){
    if(this.data.colData!="请先选择学校" || this.data.colData!="未查询到数据"){
    this.setData({
      show1:true
    })
  }
 },
  bui:function(){
    if(this.data.colData!="请先选择学院" || this.data.buiData!="未查询到数据"){
   this.setData({
     show2:true
   })
  }
 },
 flo:function(){
  if(this.data.floData!="请先选择大楼" || this.data.floData!="未查询到数据"){
   this.setData({
     show3:true
   })
  }
 },
 lab:function(){
  if(this.data.labData!="请先选择楼层" || this.data.labData!="未查询到数据"){
   this.setData({
     show4:true
   })
  }
 },
  close(){
    this.setData({
      show:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
    })
  },
  confirmUni(event){
    var colList = []
    if(this.data.treeData[event.detail.index].children==null){
      this.setData({
        show:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
        current:0,
        uniData:event.detail.value,
        colData:"未查询到数据",
        buiData:"请先选择学院",
        floData:"请先选择大楼",
        labData:"请先选择楼层",
      })
    }else{
      this.data.treeData[event.detail.index].children.forEach((item)=>{
        colList.push(item.text)
        this.setData({
          colList:colList
        })
     })
  this.setData({
    show:false,
    show1:true,
    current:1,
    uniIndex:event.detail.index,
    uniData:event.detail.value,
    colData:"请先选择学校",
    buiData:"请先选择学院",
    floData:"请先选择大楼",
    labData:"请先选择楼层",
  })
    }
    
  },
  confirmCol(event){
    var buiList = []
    if(this.data.treeData[this.data.uniIndex].children[event.detail.index].children==null){
      this.setData({
        show:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
        current:1,
        colData:event.detail.value,
        buiData:"未查询到数据",
        floData:"请先选择大楼",
        labData:"请先选择楼层",
      })
    }else{
      this.data.treeData[this.data.uniIndex].children[event.detail.index].children.forEach((item)=>{
        buiList.push(item.text)
        this.setData({
          buiList:buiList
        })
         })
      this.setData({
        show:false,
        show1:false,
        show2:true,
        current:2,
        colIndex:event.detail.index,
        colData:event.detail.value,
        buiData:"请先选择学院",
        floData:"请先选择大楼",
        labData:"请先选择楼层",
      })
    }
    
  },
  confirmBui(event){
    var floList = []
    if(this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[event.detail.index].children==null){
      this.setData({
        show:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
        current:2,
        buiData:event.detail.value,
        floData:"未查询到数据",
        labData:"请先选择楼层",
      })
    }else{
      this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[event.detail.index].children.forEach((item)=>{
        floList.push(item.text)
            this.setData({
              floList:floList
            })
         })
      this.setData({
        show:false,
        show1:false,
        show2:false,
        show3:true,
        current:3,
        buiIndex:event.detail.index,
        buiData:event.detail.value,
        floData:"请先选择大楼",
        labData:"请先选择楼层",
      })
    }
   
  },
  confirmFlo(event){

    var labList = []
    if(this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[this.data.buiIndex].children[event.detail.index].children==null){
      this.setData({
        show:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
        current:3,
        floData:event.detail.value,
        labData:"未查询到数据",
      })
    }else{
      this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[this.data.buiIndex].children[event.detail.index].children.forEach((item)=>{
        labList.push(item.text)
            this.setData({
              labList:labList
            })
         })
      this.setData({
        show:false,
        show1:false,
        show2:false,
        show3:false,
        show4:true,
        current:4,
        floIndex:event.detail.index,
        floData:event.detail.value,
        labData:"请先选择楼层",
      })
    }
   
  },
  confirmLab(event){
    this.setData({
      show:false,
      show1:false,
      show2:false,
      show3:false,
      show4:false,
      current:5,
      save:true,
      labIndex:event.detail.index,
      labData:event.detail.value
    })
  },
  save:function(){
    this.setData({
      uniId:this.data.treeData[this.data.uniIndex].id,
      colId:this.data.treeData[this.data.uniIndex].children[this.data.colIndex].id,
      buiId:this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[this.data.buiIndex].id,
      floId:this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[this.data.buiIndex].children[this.data.floIndex].id,
      labId:this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[this.data.buiIndex].children[this.data.floIndex].children[this.data.labIndex].id,
    })
    wx.setStorage({
      key: 'search',
      data: [
          {uniID:this.data.uniId},
          {colID:this.data.colId},
          {buiID:this.data.buiId},
          {floID:this.data.floId},
          {labID:this.data.labId}
      ],
      success(res) {
        Notify({ type: 'success', message: '保存设置成功' });
        setTimeout(()=>{
          wx.reLaunch({
            url: '/pages/Home/index',
          })
        },2000)
       }
    
  })
  },
  onLoad: function (options) {
      wx.request({ 
        url: 'https://swuse.huantengkj.com/api/HTSL_Room/TreeDate',
        method:'post',
        data:"",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
        this.setData({
          treeData:res.data
        })
        var  uniList = [] 
        this.data.treeData.forEach((item)=>{
           uniList.push(item.text)
           this.setData({
             uniList:uniList
           })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})