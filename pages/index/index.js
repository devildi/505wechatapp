// index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Url: app.globalData.imgURL,
    severBase: app.globalData.severBase,
    user: null,
    userName: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        wx.switchTab({
          url: '/pages/submit/submit'
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

  bindinputUser: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  bindinputCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  log: function (e) {
    if (!this.data.userName || !this.data.code) {
      return wx.showToast({
        title: '您有未填的空！',
        icon: 'failure'
      })
    }
    //network request
    wx.request({
      url: this.data.severBase + '/api/u/login/',
      method: 'POST',
      data: {
        employeeID: this.data.userName,
        code: this.data.code
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.user) {
          wx.setStorage({
            key: "user",
            data: res.data.user
          })
          wx.switchTab({
            url: '/pages/submit/submit'
          })
        } else {
          wx.showToast({
            title: '请先注册！',
            icon: 'failure'
          })
        }
      }
    })
  },

  log2: function(){
    wx.switchTab({
      url: '/pages/submit/submit'
    })
  }
})