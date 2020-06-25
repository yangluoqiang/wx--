var postsData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // collected:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })
    var postscollected = wx.getStorageSync('posts_collected');
    if (postscollected) {
      var postcollected = postscollected[postId];
      this.setData({
        collected: postcollected
      })
    } else {
      var postscollected = {};
      postscollected[postId] = false;
      wx.setStorageSync('posts_collected', postscollected)
    }
  },
  oncollectionTap: function (event) {
    var postscollected = wx.getStorageSync('posts_collected');
    var postcollected = postscollected[this.data.currentPostId];

    postcollected = !postcollected;
    postscollected[this.data.currentPostId]=postcollected;
    wx.setStorageSync('posts_collected', postscollected)
    this.setData({
      collected: postcollected  
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