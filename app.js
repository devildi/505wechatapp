App({
  onLaunch: function () {
    // try {
    //   var user = wx.getStorageSync('user')
    //   if (user) {
    //     this.globalData.user = user
    //   }
    // } catch (e) {
    //   // Do something when catch error
    // }
    wx.getUserInfo({
      success: function (res) {
        var url = res.userInfo.avatarUrl
        console.log(url)
        //this.globalData.user = url
      }
    })
  },
  globalData: {
    user: null,
    userInfo: null,
    imgURL: "https://res.cloudinary.com/dnfhsjz8u/image/upload/v1489974989/logo_wnfbdo.jpg",
    severBase: 'http://127.0.0.1:1234'
  }
})