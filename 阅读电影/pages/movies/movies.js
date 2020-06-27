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
    this.GetReQuest(inTheatersUrl,'inTheaters');
    this.GetReQuest(comingSoonUrl,'comingSoon');
    this.GetReQuest(Top250Url,'Top250');
  },

  //独立请求函数
  GetReQuest: function (url,settedKey) {
    var that = this;
    wx.request({
      url: url,
      header: {
        'Content-Type': 'aaa'
      },
      method: 'GET',
      success: (res) => {
        // console.log(res)
        that.GetSuccess(res,settedKey)
      },

    })
  },
  //请求成功服务器返回的数据success
  GetSuccess: function (res,settedKey) {
    var Data = res.data.subjects;
    console.log(Data)
    var movies = [];
    for (var key in Data) {
      var index = Data[key];
      var title = index.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        title: title,
        average: index.rating.average,
        coverageurl: index.images.large,
        movieId: index.id
      }
      movies.push(temp)
    }
    //动态属性赋值
    var readyData={};
    readyData[settedKey]={
      movies:movies
    }
    this.setData(readyData);
  }

})










// var app=getApp();
// Page({
//   data: {

//   },
//   onLoad: function (options) {
//     var inTheatersUrl=
//     app.globalData.doubanBase+"/todayVideo";    //每日视频
//     var comingSoonUrl=
//     app.globalData.doubanBase+"/todayVideo";     //视频大纲
//     var Top250Url=
//     app.globalData.doubanBase+"/videoHomeTab";     //视频分类
//     var Top250Url=
//     app.globalData.doubanBase+"/getJoke";     //搞笑段子
//   wx.request({
//     url: inTheatersUrl,

//     header: {
//       'Content-Type':'aaa'
//     },
//     method: 'GET',
//     // responseType: responseType,
//     // timeout: 0,
//     success: (res) => {
//       var data=res.data.result[1].data.header;

//       console.log(data)
//   this.setData({
//     movies:data
//   })

//     },

//   })
//   },


// })