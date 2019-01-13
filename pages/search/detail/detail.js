// pages/search/detail/detail.js
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var word = options.content
    var that = this;
    if(word){
      wx.request({
        url: 'https://api.shanbay.com/bdc/search/?word=' + word,
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res)
          var msg = res.data.msg
          if (msg === 'SUCCESS') {
            that.setData({
              content: res.data.data.content,
              audioUrl: res.data.data.audio || res.data.data.us_audio || res.data.data.uk_audio,
              pron: res.data.data.pron.replace(/\s+/g, ""),
              definition: res.data.data.definition
            });
            innerAudioContext.src = that.data.audioUrl
          } else {
            wx.showModal({
              title: '提示',
              content: '对不起，查询不到该词信息',
              showCancel: false,
              success: function (res) {
                wx.navigateBack({
                  delta: 2
                })
              }
            });
          }
        },

        fail: function () {
          wx.showModal({
            title: '提示',
            content: '对不起，网络异常，查询失败！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        },
        complete: function () {
        }
      })
    }else {
      wx.showModal({
        title: '提示',
        content: '输入内容为空，请确认！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
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

  read: function () {
    if (this.data.audioUrl) {
      console.log(this.data.audioUrl)
      innerAudioContext.play()
    }
  }
})