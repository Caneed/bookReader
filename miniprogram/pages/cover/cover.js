// pages/cover/cover.js
const db = getApp().globalData.db
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        author: '',
        name: '',
        desc: '',
        dir: [],
        url: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '图书详情'
        }).then(res => {}, reason => {})
        let book = JSON.parse(options.book)
        this.setData({
            author: book.author,
            name: book.name,
            desc: book.desc,
            dir: book.dir.split('\n'),
            url: book.fileID
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

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
    onTap(ev) {
        if (ev.currentTarget.dataset.index == 1) {
            this.setData({
                show: true
            })
        } else if (ev.currentTarget.dataset.index == 2) {
            this.setData({
                show: false
            })
        }
    },
    // 加入书桌
    onAddDesk() {
        db.collection('myBooks').where({
            name: _.eq(this.data.name),
            author: _.eq(this.data.author)
        }).get().then(res => {
            if (res.data.length == 0) {
                db.collection('books')
                    .where({
                        name: _.eq(this.data.name),
                        author: _.eq(this.data.author)
                    })
                    .get().then(result => {
                        db.collection('myBooks')
                            .add({
                                data: {
                                    _id: result.data[0]._id,
                                    name: result.data[0].name,
                                    author: result.data[0].author,
                                    category: result.data[0].category,
                                    desc: result.data[0].desc,
                                    dir: result.data[0].dir,
                                    fileID: result.data[0].fileID,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                },
                            }).then(res => {
                                wx.showToast({
                                    title: '添加成功',
                                    icon: 'success',
                                    duration: 500
                                  })
                            },reason=>{console.log(reason)})
                    })
            } else {
                wx.showToast({
                    title: '此书已添加',
                    icon: 'error',
                    duration: 500
                })
            }
        }, reason => {
            console.log(reason)
        })
    }
})