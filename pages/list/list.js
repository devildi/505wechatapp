// pages/list/list.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    severBase: app.globalData.severBase,
    user: null,
    orders: [],
    totalOrders: 0,
    page: 1,
    done: false,
    loading: false
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
        this._fetch(1)
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
    //console.log('show')
    if (this.data.orders.length > 0) {
      this.setData({
        page: 1
      })
      this._fetch(1)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log('hide')
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
    this._fetch(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.totalOrders > this.data.orders.length) {
      this._fetch(this.data.page)
    } else if (this.data.page != 1) {
      this.setData({
        page: 1
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  switchDetial: function (e) {
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.id)
    if (e.currentTarget.dataset.userid === this.data.user._id) {
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.id
      })
    }
  },

  _fetch(page) {
    const that = this
    let opage = page
    //console.log(page)
    wx.request({
      url: this.data.severBase + '/api/orderlist/',
      data: {
        id: 1,
        page: opage
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data)
        let arr = null
        if (opage === 1) {
          arr = []
          arr = arr.slice().concat(res.data.orders)
        } else {
          arr = that.data.orders.slice().concat(res.data.orders)
        }
        //arr = arr.slice().concat(res.data.orders)
        let page = that.data.page + 1
        let done = res.data.ordersTotal.length > arr.length ? false : true
        //console.log(arr)
        arr.map((row, index) => {
          
          let arr1 = row.meta.createAt
          let arr2 = arr1.match(/\d{4}-\d{2}-\d{2}/g).toString()
          let arr3 = arr1.match(/\d{2}:\d{2}:\d{2}/g).toString()
          let arr4 = arr3.match(/\d\d/).toString()
          let arr5 = parseInt(arr4) + 8
          let arr6 = arr3.replace(/\d\d/, arr5.toString())
          let arr7 = arr2 + '/' + arr6
          row.createAt = arr7
          //console.log(row)
        })

        //console.log(arr)
        that.setData({
          orders: arr,
          page: page,
          totalOrders: res.data.ordersTotal.length,
          done: done
        })
      }
    })
  }
})