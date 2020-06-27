var util=require('../../utils/util.js');

var app = getApp();
Page({
  data: {
    inTheaters:{},
    comingSoon:{},
    Top250:{}
  },
  onLoad: function (options) {
    var apikey= "&apikey=0b2bdeda43b5688921839c8ecb20399b";
    var inTheatersUrl =
      app.globalData.doubanBase +"/v2/movie/in_theaters?start=0&count=3"+apikey; //正在热映

    var comingSoonUrl =
      app.globalData.doubanBase+ "/v2/movie/coming_soon?start=0&count=3"+apikey; //即将上映

    var Top250Url =
      app.globalData.doubanBase + "/v2/movie/top250?start=0&count=3"+apikey; //Top250
      
    var GetJokeUrl =
      app.globalData.doubanBase + "/v2/movie/search?q=神秘巨星&start=0&count=10"+apikey; //电影搜索
    //请求拼接好的内容
    this.GetReQuest(inTheatersUrl,'inTheaters','正在热映');
    this.GetReQuest(comingSoonUrl,'comingSoon','即将上映');
    this.GetReQuest(Top250Url,'Top250','豆瓣Top250');
  },

  //独立请求函数
  GetReQuest: function (url,settedKey,categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      header: {
        'Content-Type': 'aaa'
      },
      method: 'GET',
      success: (res) => {
     
        that.GetSuccess(res,settedKey,categoryTitle)
      },

    })
  },
  //请求成功服务器返回的数据success
  GetSuccess: function (res, settedKey,categoryTitle) {
    var Data = res.data.subjects;
    
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
    var readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categoryTitle:categoryTitle
    }
    this.setData(readyData);
  },
//跳转更多
onMoreTap:function(event){

  var category=event.currentTarget.dataset.category;
  wx.navigateTo({
    url: 'more-movie/more-movie?category='+category,
  })
}
})










