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
      university:"",
      college:"",
      building:"",
      floor:"",
      universityData:[],
      collegeData:[],
      buildingData:[],
      tapuni:false,
      tapcol:false,
      tapbui:false,
      floorData:[],
      treeData:[],
      loadcol:false,
      buildingDataNull:false,
      collegeDataNull:false,
      floorDataNull:false,
      refresh:"正在刷新",
      bottom:true,
      GRID_DrawingMode:'BMAP_DRAWING_POLYGON',
      value:'',
      detailData:[],
      color:['green','red'],
      status:["正常","报警"],
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
        url: '/pages/SearchDetail/index?detailData=' + detail
      })
    },
    onSearch:function(){
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
    },
   
  
    frushData: function () {
        wx.request({
            url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
            method:'post',
            data: {
                "rows":this.data.rows,
             
            'status':1,
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
      Search:function(){
        wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
          method:'post',
          data: {
              "rows":this.data.rows,
              'status':1,
              "page":1,
              "Name":this.data.value,
              "UniversityID":this.data.university,
              "CollegeID":this.data.college,
              "BuildingID":this.data.building,
              "FloorID:":this.data.floor
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
      },
      uni(event){
        console.log(event)
        this.setData({
          collegeData:this.data.treeData[event.currentTarget.id].children,
          buildingData:[],
          university:this.data.treeData[event.currentTarget.id].id,
          college:'',
          building:'',
          floor:'',
          tapuni:true,
          tapcol:false,
          tapbui:false,
          loadcol:true,
          floorData:[],
        })
       this.Search()
  
        setTimeout(()=>{
            this.setData({
              loadcol:false
            })
            
            if(this.data.collegeData==null||this.data.collegeData.length==0){
              this.setData({
                collegeDataNull:false,
                buildingDataNull:false,
                floorDataNull:false,
              })
            }else{
              this.setData({
                collegeDataNull:true
              })
            }
            console.log(this.data.collegeData,this.data.collegeDataNull)
         },400)
      },
      col(event){
        console.log(event.currentTarget.id)
        this.setData({
          buildingData:this.data.collegeData[event.currentTarget.id].children,
          college:this.data.collegeData[event.currentTarget.id].id,
          building:'',
          floor:'',
          floorData:[],
          tapcol:true,
          loadcol:true,
          tapbui:false,
        })
        this.Search()
        setTimeout(()=>{
          this.setData({
            loadcol:false,
          })
          if(this.data.buildingData==null){
            this.setData({
              buildingDataNull:false
            })
          }else{
            if(this.data.buildingData.length==0){
              this.setData({
                buildingDataNull:false
              })
            }else{
              this.setData({
                buildingDataNull:true
              })
            }
          }
          console.log(this.data.buildingData,this.data.buildingDataNull)
        },400)
       console.log(this.data.college)
      },
      bui(event){
        console.log(event.currentTarget.id)
        this.setData({
          floorData:this.data.buildingData[event.currentTarget.id].children,
          building:this.data.buildingData[event.currentTarget.id].id,
          floor:'',
          tapbui:true
        })
       this.Search()
        if(this.data.floorData==null){
          this.setData({
            floorDataNull:false
          })
        }else{
          if(this.data.floorData.length==0){
            this.setData({
              floorDataNull:false
            })
          }else{
            this.setData({
              floorDataNull:true
            })
          }
        }
        console.log(this.data.building,this.data.buildingData)
      },
      flo(event){
        this.setData({
          floor:this.data.floorData[event.currentTarget.id].id,
          loadcol:true,
        })
        this.Search()
        setTimeout(()=>{
           this.setData({
              loadcol:false,
              show:false,
           })
        },500)
        console.log(this.data.floor,this.data.building,this.data.college,this.data.university)
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.frushData()
        wx.request({
          url: 'https://swuse.huantengkj.com/api/HTSL_Room/TreeDate',
          method:'post',
          data:"",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success :(res)=> {
          console.log(res.data)
          this.setData({
            treeData:res.data
          })
          this.setData({
            universityData:this.data.treeData[0],
          })
          if(this.data.collegeData==null){
            this.setData({
              collegeDataNull:false,
              buildingDataNull:false,
              floorDataNull:false,
            })
          }else{
            this.setData({
              collegeDataNull:true,
              buildingDataNull:true,
              floorDataNull:true,
            })
          }
          if(this.data.buildingData == null || this.data.buildingData.length == 0){
            this.setData({
              buildingDataNull:false,
              floorDataNull:false,
            })
          }
          console.log(this.data.buildingDataNull)
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
        url: 'https://swuse.huantengkj.com/api/HTSL_Room/GetPageRoomListByParam', //仅为示例，并非真实的接口地址
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
          
          if(res.data.rows!=[]){
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