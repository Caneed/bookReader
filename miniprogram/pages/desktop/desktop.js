// pages/desktop/desktop.js
const db = getApp().globalData.db
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        data: [],
        edit: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarTitle({
            title: '书桌',
        }).then(res => {
            //   console.log(res)
        }, reason => {
            //   console.log(reason)
        })

        db.collection('myBooks').get().then(res => {
            this.setData({
                data: res.data
            })
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
        this.onLoad()
        this.setData({
            show: true,
            edit: false
        })
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
    // 长按显示
    onEdit(ev) {
        this.setData({
            show: false
        })
    },
    unEdit(ev) {
        this.setData({
            show: true,
            edit: false
        })
    },
    manage(ev) {
        this.setData({
            edit: true
        })
    },
    delete(ev){
        console.log(ev)
        wx.showModal({
          title: '提示',
          content:'确定删除吗？',
          showCancel:true,
          cancelColor:'#f00',
        }).then(res=>{
            if(res.confirm==true){
                db.collection('myBooks').where({
                    name:_.eq(ev.currentTarget.dataset.name),
                    author:_.eq(ev.currentTarget.dataset.author)
                  }).remove().then(res=>{
                      wx.showToast({
                        title: '删除成功！',
                        icon:'success'
                      })
                      this.onLoad()
                  })
            }else{
                wx.showToast({
                  title: '已取消删除',
                  icon:'error'
                })
                this.onLoad()
            }
        },reason=>{
            console.log(reason)
        })
    }
})