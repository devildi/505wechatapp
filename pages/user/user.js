// pages/user/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    severBase: app.globalData.severBase,
    user: null,
    department: '',
    phoneNum: '',
    address: '',
    url: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this
    //console.log(this.data.user)
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.getUserInfo({
          success: function (res) {
            var url = res.userInfo.avatarUrl
            console.log(url)
            //this.globalData.user = url
            that.setData({
              user: user,
              department: user.department,
              phoneNum: user.phoneNum,
              address: user.address,
              url: url
            })
          }
        }) 
      }
    } catch (e) {
      // Do something when catch error
    }
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
  
  },

  bindinputdepartment: function (e) {
    this.setData({
      department: e.detail.value
    })
  },

  bindinputphoneNum: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  bindinputaddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  change: function(){
    const that= this
    console.log(this.data.phoneNum, this.data.department, this.data.address)
    if (!this.data.phoneNum || !this.data.department || !this.data.address) {
      return wx.showToast({
        title: '您有未填的空！',
        icon: 'failure'
      })
    }

    if (this.data.phoneNum === this.data.user.phoneNum && this.data.department === this.data.user.department && this.data.address === this.data.user.address){
      return wx.showToast({
        title: '已保存',
        icon: 'failure'
      })
    }

    wx.request({
      url: that.data.severBase + '/api/user/update/',
      method: 'POST', 
      data: {
        phoneNum: this.data.phoneNum,
        address: this.data.address,
        department: this.data.department,
        user: this.data.user
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.user){
          wx.setStorageSync('user', res.data.user)
          wx.showToast({
            title: '修改成功',
            icon: 'failure'
          })
        }
      }
    })
  }
})