var postsData = require('../../../data/posts-data.js')
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
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
    if(app.globalData.g_isPlayingMusic){
      this.setData({
        isPlayingMusic: true
      })
    }
    // 监听音乐状态
    this.onBackgroundAudioPlay()

  },
  // 封装监听音乐状态
  onBackgroundAudioPlay:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () 
    {
      that.setData({
        isPlayingMusic: true
     })
    });
    wx.onBackgroundAudioPause(function () 
    {
      that.setData({
        isPlayingMusic: false
     })
    });
  },
  //点击跟换缓存状态
  oncollectionTap: function (event) {
    // this.getCollectedSync()
    this.getCollectedAsy()

  },
  //异步
  getCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postscollected = res.data;
        var postcollected = postscollected[that.data.currentPostId];
        postcollected = !postcollected;
        postscollected[that.data.currentPostId] = postcollected;
        that.showModal(postcollected, postscollected)
      }
    })
  },
  getCollectedSync: function () {
    var that = this;
    var postscollected = wx.getStorageSync('posts_collected');
    var postcollected = postscollected[that.data.currentPostId];

    postcollected = !postcollected;
    postscollected[that.data.currentPostId] = postcollected;
    that.showModal(postcollected, postscollected)
  },
  showToast: function () {
    wx.setStorageSync('posts_collected', postscollected)
    that.setData({
      collected: postcollected
    })

    wx.showToast({
      title: postcollected ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: 'loading'
    })

  },
  showModal: function (postcollected, postscollected) {
    var taht = this;
    wx.showModal({
      cancelColor: '#333',
      title: '收藏',
      content: postcollected ? '收藏该文章？' : '取消收藏',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res) 
      {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postscollected)
          taht.setData({
            collected: postcollected
          })
        }
      }
    })
  },
  onshareTap: function (event) {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在无法实现' + res.cancel + '用户是否取消'
        })

      }
    })
  },
  // 音乐播放
  onMusicTap: function (evwnt) {
    var currentPostId = [this.data.currentPostId];
    var postData = postsData.postList[currentPostId].music;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic=false
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.url,
        title: postData.title,
        coverImgUrl: postData.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic=true
    }
    //监听音乐暂停

    // wx.pauseBackgroundAudio({
    //   success: (res) => {

    //   },
    // })
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