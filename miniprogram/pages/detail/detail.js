// pages/detail/detail.js
const db = getApp().globalData.db
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        show: true,
        desc: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            show: true,
            desc: ''
        })
        wx.setNavigationBarTitle({
            title: '搜索结果',
        }).then(res => {}, reason => {})
        this.setData({
            books: JSON.parse(options.books),
        })
        if (options.desc != undefined) {
            this.setData({
                show: false,
                desc: options.desc
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    // 点击跳入详情
    onBlurItem(ev) {
        db.collection('books')
            .where({
                name: _.eq(ev.currentTarget.dataset.name),
                author: _.eq(ev.currentTarget.dataset.author)
            }).get()
            .then(res => {
                wx.navigateTo({
                    url: `../cover/cover?book=${JSON.stringify(res.data[0])}`,
                })
            }, reason => {
                console.log(reason)
            })

    }
})