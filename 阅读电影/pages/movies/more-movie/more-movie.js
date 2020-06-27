var util = require('../../../utils/util.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category
    //不同页面加载不同的内容
    var apikey = "&apikey=0b2bdeda43b5688921839c8ecb20399b";
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl =
          app.globalData.doubanBase + "/v2/movie/in_theaters?" + apikey; //正在热映

        break;
      case "即将上映":
        dataUrl =
          app.globalData.doubanBase + "/v2/movie/coming_soon?" + apikey; //即将上映
        break;
      case "豆瓣Top250":
        dataUrl =
          app.globalData.doubanBase + "/v2/movie/top250?" + apikey; //Top250
        break;
    }
    util.http(dataUrl, this.GetSuccess)
  },
  //获取所有电影
  GetSuccess: function (res) {
    var Data = res.subjects;
    console.log(res)
    var movies = [];
    for (var key in Data) {
      var index = Data[key];
      var title = index.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.StartArry(index.rating.stars),
        title: title,
        average: index.rating.average,
        coverageUrl: index.images.large,
        movieId: index.id
      }
      movies.push(temp)
      
    }

  
    this.setData({
      movies:movies 
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function (res) {

      }
    })
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