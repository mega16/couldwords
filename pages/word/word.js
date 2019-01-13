// pages/word/word.js
const list = require('../../data/word-list.js')
const vocList = require('../../data/vocabulary.js')
const innerAudioContext = wx.createInnerAudioContext()
 // "pages/word/word",
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    pron: null,
    definition: null,
    audioUrl: null,
    worldListMax: 999,
    vocListMax: 12346
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idx = Math.floor(Math.random() * this.data.worldListMax) + 1
    var word = list.wordList[idx]

    this.setData({
      content: word.content,
      pron: word.pron,
      definition: word.definition,
      audioUrl: null
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
    this.setData({
      showNot: true
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

  show: function () {
    this.setData({
      showNot: true
    })
  },

  next: function () {
    this.setData({
      showNot: false
    })

    //从vocabulary.js中选取下一个单词
    var idx = Math.floor(Math.random() * this.data.vocListMax) + 1
    this.setData({
      content: vocList.wordList[idx],
    })

    var that = this;
    wx.request({
      url: 'https://api.shanbay.com/bdc/search/?word=' + that.data.content,
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          content: res.data.data.content,
          audioUrl: res.data.data.audio || res.data.data.us_audio || res.data.data.uk_audio,
          pron: res.data.data.pron.replace(/\s+/g, ""),
          definition: res.data.data.definition
        })
        innerAudioContext.src = that.data.audioUrl
      },
      fail: function () { },
      complete: function () { }
    })
  },

  read: function () {
    if (this.data.audioUrl) {
      console.log(this.data.audioUrl)
      innerAudioContext.play()
    }
  }
})