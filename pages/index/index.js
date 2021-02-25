//index.js
//获取应用实例
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
const app = getApp()

Page({
  data: {
    username:'',
    password:'',
    input:true,
    rows:15,
    page:1,
    saveData:[],
    search:[],
    his:[],
    history:[],
    value:'',
    // uniId:'',
    // colId:'',
    // buiId:'',
    // floId:'',
    labID:'',
    userData:[],
    isset:false,
    bottom:false,
    showRight: true,
    staffData:[],
    active:0,
    //right
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
  grid1:function(){
    
    if(this.data.isset){
      wx.navigateTo({
        url:  '/pages/LabSettingDetail/index?labID=' + this.data.labID,
      })
    }else{
      Toast.fail('请在右上角配置实验室索引')
    }
  },
  grid2:function(){
    if(this.data.isset){
      wx.navigateTo({
        url: "/pages/Person/index?labID=" + this.data.labID,
      })
    }else{
      Toast.fail('请在右上角配置实验室索引')
    }
  },
  grid3:function(){
    if(this.data.isset){
      wx.navigateTo({
        url: "/pages/AccessControl/index?labID=" + this.data.labID,
      })
    }else{
      Toast.fail('请在右上角配置实验室索引')
    }
  },
  grid4:function(){
    if(this.data.isset){
      wx.navigateTo({
        url: "/pages/SearchDetail/index?labID=" + this.data.labID,
      })
    }else{
      Toast.fail('请在右上角配置实验室索引')
    }
  },
  grid5:function(){
    if(this.data.isset){
      wx.navigateTo({
        url: "/pages/LabEquipment/index?labID=" + this.data.labID,
      })
    }else{
      Toast.fail('请在右上角配置实验室索引')
    }
  },
  grid6:function(){
    Dialog.confirm({
      title: '登录',
      message: '是否退出登录?',
    })
      .then(() => {
        // on confirm
        wx.setStorage({
          key: 'key',
          data: [
          ],
          success(res) {
              console.log(res)
           }
      })
        wx.reLaunch({
          url: '/pages/Login/index',
        })
      })
      .catch(() => {
        // on cancel
      });
    
  },
  
  changeTab:function(e){
    this.setData({
      active:e.detail,
    })
  },
  history:function(e){
    var that = this
    this.setData({
      search:this.data.history[e.currentTarget.id],
      showRight:false,
    })
    wx.nextTick(()=>{
      this.setData({
      labID:that.data.search.labID
      })
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":that.data.rows,
            "page":1,
            "ID":that.data.labID
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          that.setData({
              saveData:res.data.rows,
              bottom:false,
              if:true,
              
          })
          console.log('data',that.data.saveData[0].Name)
          wx.setNavigationBarTitle({title: that.data.saveData[0].Name})
          console.log('save',that.data.saveData) 
        }
      })
    })
    
    Notify({ type: 'success', message: '成功更改配置项!' });
  },
  delate:function(e){
    this.data.history.splice(e.currentTarget.id, 1)
    this.setData({
      history:this.data.history
    })
    wx.setStorage({
      key: 'history',
      data:this.data.history,
      success(res) {
       wx.getStorage({
        key: 'history',
        success(res) {
        }
       })
       }
    })
  },
  set:function(e){
    var that = this
     this.setData({
      showRight:false,
      value:'',
      isset:true,
    })
    var history = this.data.history
    wx.setNavigationBarTitle({title: this.data.userData[e.currentTarget.id].Name})
    history.push({
      uniID:this.data.userData[e.currentTarget.id].UniversityID,
      colID:this.data.userData[e.currentTarget.id].CollegeID,
      buiID:this.data.userData[e.currentTarget.id].BuildingID,
      floID:this.data.userData[e.currentTarget.id].FloorID,
      labID:this.data.userData[e.currentTarget.id].ID,
      flo:this.data.userData[e.currentTarget.id].FloorNum,
      lab:this.data.userData[e.currentTarget.id].RoomNum,
      name:this.data.userData[e.currentTarget.id].Name})
    wx.setStorage({
      key: 'history',
      data:that.data.history,
      success(res) {
       wx.getStorage({
        key: 'history',
        success(res) {
          that.setData({
            history:res.data,
          })
          wx.nextTick(()=>{
            var result = [];
            var obj = {};
            that.data.history.forEach((item,index)=>{
              if (!obj[that.data.history[index].labID]) {
                result.push(that.data.history[index]);
                obj[that.data.history[index].labID] = true;
              }
            })
            wx.setStorage({
              key: 'history',
              data:result,
              success(res) {
               wx.getStorage({
                key: 'history',
                success(res) {
                  that.setData({
                    history:res.data,
                  })
                }
               })
               }
            })
          })
        }
       })
       }
    })
    wx.setStorage({
      key: 'search',
      data: {
        uniID:this.data.userData[e.currentTarget.id].UniversityID,
        colID:this.data.userData[e.currentTarget.id].CollegeID,
        buiID:this.data.userData[e.currentTarget.id].BuildingID,
        floID:this.data.userData[e.currentTarget.id].FloorID,
        labID:this.data.userData[e.currentTarget.id].ID,
        name:this.data.userData[e.currentTarget.id].Name
        },
      success(res) {
       wx.getStorage({
        key: 'search',
        success(res) {
          that.setData({
            search:res.data,
            labID:that.data.search.labID
          })
        }
       })
       }
    })
    wx.getStorage({
      key: 'history',
      success(res) {
        that.setData({
          history:res.data,
        })
      },
     })
     wx.getStorage({
      key: 'search',
      success(res) {
        that.setData({
          search:res.data,
        })
      },
     })
     this.setData({
      isset:true,
     })
     Notify({ type: 'success', message: '成功更改配置项!' });
     this.clear()
  },
  onChange:function(e){
    this.setData({
      value:e.detail
    })
  },
  clear:function(){
    this.setData({
      userData:[],
      input:true
    })
  },
  onSearch:function(){
    if(this.data.value == ""){
      this.setData({
        userData:[],
        input:true
      })
    }else{
      this.setData({
        input:false
      })
      wx.request({
        url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
        method:'post',
        data: {
            "rows":this.data.rows,
            'status':1,
            "page":1,
            "Name":this.data.value
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success :(res)=> {
          this.setData({
              userData:res.data.rows,
              bottom:false,
              if:true,
          })
        }
      })
    }
  },
  showPopup() {
    this.setData({ showRight: true });
  },
  onClose() {
    this.setData({ showRight: false });
  },
  //right
  //right
  //right
  //right
  //right
  //right
  uni:function(){
    this.setData({
      show:true
    })
 },
 col:function(){
   if(this.data.colData!="请先选择学校"){
    if(this.data.colData!="未查询到数据"){
      this.setData({
        show1:true
      })
     }
 }
},
 bui:function(){
  if(this.data.buiData!="请先选择学院"){
    if(this.data.buiData!="未查询到数据"){
      this.setData({
        show2:true
      })
     }
  }
},
flo:function(){
  if(this.data.floData!="请先选择大楼"){
    if(this.data.floData!="未查询到数据"){
      this.setData({
        show3:true
      })
     }
  }
},
lab:function(){
  if(this.data.labData!="请先选择楼层"){
    if(this.data.labData!="未查询到数据"){
      this.setData({
        show4:true
      })
     }
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
         colList:colList,
         buiList:[],
         floList:[],
         labList:[]
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
         buiList:buiList,
         floList:[],
         labList:[],
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
             floList:floList,
             labList:[]
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
  var that = this
   this.setData({
     labID:this.data.treeData[this.data.uniIndex].children[this.data.colIndex].children[this.data.buiIndex].children[this.data.floIndex].children[this.data.labIndex].id,
   })
   console.log(this.data.labID)
   wx.request({
    url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
    method:'post',
    data: {
        "rows":this.data.rows,
        "page":1,
        "ID":this.data.labID
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success :(res)=> {
      this.setData({
          saveData:res.data.rows,
          bottom:false,
          if:true,
      })
      var history = that.data.history
      wx.setNavigationBarTitle({title: that.data.saveData[0].Name})
   history.push({
    uniID:that.data.saveData[0].UniversityID,
    colID:that.data.saveData[0].CollegeID,
    buiID:that.data.saveData[0].BuildingID,
    floID:that.data.saveData[0].FloorID,
    labID:that.data.saveData[0].ID,
    flo:that.data.saveData[0].FloorNum,
    lab:that.data.saveData[0].RoomNum,
    name:that.data.saveData[0].Name})
    wx.setStorage({
      key: 'history',
      data:that.data.history,
      success(res) {
       wx.getStorage({
        key: 'history',
        success(res) {
          that.setData({
            history:res.data,
          })
          wx.nextTick(()=>{
            var result = [];
            var obj = {};
            that.data.history.forEach((item,index)=>{
              if (!obj[that.data.history[index].labID]) {
                result.push(that.data.history[index]);
                obj[that.data.history[index].labID] = true;
              }
            })
            wx.setStorage({
              key: 'history',
              data:result,
              success(res) {
               wx.getStorage({
                key: 'history',
                success(res) {
                  that.setData({
                    history:res.data,
                  })
                }
               })
               }
            })
          })
        }
       })
       }
    })
   wx.setStorage({
    key: 'search',
    data: {
      uniID:that.data.saveData[0].UniversityID,
      colID:that.data.saveData[0].CollegeID,
      buiID:that.data.saveData[0].BuildingID,
      floID:that.data.saveData[0].FloorID,
      labID:that.data.saveData[0].ID,
      },
    success(res) {
     wx.getStorage({
      key: 'search',
      success(res) {
        that.setData({
          search:res.data
        })
      }
     })
     }
  })
  
   wx.getStorage({
    key: 'search',
    success(res) {
      that.setData({
        search:res.data,
      })
    },
   })
    }
  })
   
   Notify({ type: 'success', message: '成功更改配置项!' });
   this.setData({
     showRight:false,
     isset:true,
   })
 },
  onLoad: function (option) {
   console.log('option',)
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
   if(Object.keys(option).length==0){
    var that = this
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
     wx.hideHomeButton()
     wx.getStorage({
      key: 'history',
      success(res) {
        that.setData({
          history:res.data,
          isset:true,
          showRight:false
        })
        console.log(res.data)
      },
      fail(res){
        that.setData({
          isset:false,
          showRight:true
        })
      }
     })
     wx.getStorage({
      key: 'search',
      success(res) {
        that.setData({
          search:res.data,
        })
        console.log(res.data)
        wx.nextTick(()=>{
          that.setData({
            labID:that.data.search.labID
          })
          wx.nextTick(()=>{
            wx.request({
              url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
              method:'post',
              data: {
                  "rows":that.data.rows,
                  "page":1,
                  "ID":that.data.labID
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success :(res)=> {
                that.setData({
                    saveData:res.data.rows,
                    bottom:false,
                    if:true,
                    
                })
                console.log('data',that.data.saveData[0].Name)
                wx.setNavigationBarTitle({title: that.data.saveData[0].Name})
                console.log('save',that.data.saveData) 
              }
            })
          })
        })
      }
     })
     
   
     wx.getStorage({
      key: 'key',
      success(res) {
        that.setData({
          username:res.data[0],
          password:res.data[1]
        })
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
   }else{
    var lab = option.labID
    this.setData({
        labID:lab,
        isset:true
    })
    wx.request({
      url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
      method:'post',
      data: {
          "rows":this.data.rows,
          "page":1,
          "ID":this.data.labID
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success :(res)=> {
        wx.setNavigationBarTitle({title: res.data.rows[0].Name})
   }})
  }
},
  onShow:function(){
    
   
  }
  ,
})
