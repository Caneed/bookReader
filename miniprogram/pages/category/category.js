const db = getApp().globalData.db
const _ = db.command
let timer
let queryArr = []
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cateArr: [],
        searching: true,
        searchVal: '',
        searchArr: [],
        desc:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.queryArr = []
        wx.setNavigationBarTitle({
            title: '分类',
        }).then(res => {}, reason => {})
        this.onRenderCategory();
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
        this.setData({
            searching: true
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
    onUnload() {},

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
    // 类别列表的渲染
    onRenderCategory() {
        db.collection('category').
        get().
        then(res => {
            this.setData({
                cateArr: res.data
            })
        }, reason => {})
    },
    // 搜索框点击事件
    onReadyForSearch() {
        this.setData({
            searching: false
        })
    },
    // 取消搜索
    onCancelSearch() {
        this.setData({
            searching: true
        })
    },
    // 输入框根据关键字检索并在下拉框中出现
    onInputRes() {
        queryArr = []
        if (this.data.searchVal.trim() === '') return
        clearTimeout(timer)
        timer = setTimeout(() => {
            db.collection('books').where(_.or([{
                name: new RegExp(`^[\\s\\S]*${this.data.searchVal}[\\s\\S]*$`)
            }, {
                author: new RegExp(`^[\\s\\S]*${this.data.searchVal}[\\s\\S]*$`)
            }])).get().then(res => {
                this.setData({
                    searchArr: res.data
                })
                queryArr = this.data.searchArr
            }, reason => {
                console.log(reason)
            })
        }, 500)
    },
    // 输入框失去焦点事件
    onBindBlur(ev) {
        this.setData({
            searchVal: '',
            searchArr: ''
        })
    },
    // 点击某一条索引进行具体搜索的跳转
    onQueryColumn(ev) {
        db.collection('books')
            .where({
                name: _.eq(ev.currentTarget.dataset.name),
                author: _.eq(ev.currentTarget.dataset.author)
            }).get().then(res => {
                queryArr = res.data
                wx.navigateTo({
                    url: `../detail/detail?books=${JSON.stringify(queryArr)}`,
                })
            })
    },
    // 确认进行搜索
    onSearchConfirm() {
        wx.navigateTo({
            url: `../detail/detail?books=${JSON.stringify(queryArr)}`,
        })
    },
    // 点击某一类别进行跳转查询
    onQueryByCate(ev) {
        this.setData({
            desc:''
        })
        db.collection('category').where({
                name: _.eq(ev.currentTarget.dataset.cate)
            }).field({
                desc: true,})
            .get().then(res=>{this.setData({
                desc:res.data[0].desc
            })})
        db.collection('books')
            .where({
                category: _.eq(ev.currentTarget.dataset.cate)
            }).get().then(res => {
                queryArr = res.data
                wx.navigateTo({
                    url: `../detail/detail?books=${JSON.stringify(queryArr)}&desc=${this.data.desc}`,
                })
            })
    }
})