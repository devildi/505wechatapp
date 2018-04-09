// pages/submit/submit.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    severBase: app.globalData.severBase,
    user: null,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var user = wx.getStorageSync('user')
      if (user) {
        this.setData({
          user: user
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
    this.setData({
      content: ''
    })
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

  bindinput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  submit: function () {
    let that = this
    if (!this.data.content) {
      return wx.showToast({
        title: '您有未填的空！',
        icon: 'failure'
      })
    }
    //network
    wx.showModal({
      title: '警告',
      content: '如需要重装系统，请自行备份数据！',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.severBase + '/api/order/post/',
            method: 'POST',
            data: {
              request: that.data.content,
              user: that.data.user
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.success) {
                wx.switchTab({
                  url: '/pages/list/list'
                })
              }
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  }
})