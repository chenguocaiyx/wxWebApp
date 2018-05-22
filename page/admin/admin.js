Page({
    data:{
        id: 0,
        button:[
            {
                name:"精选管理"
            },
            {
                name: " 推荐管理"
            },
            {
                name: "热门管理"
            },
            {
                name: "投稿管理"
            },
            {
                name: "分类管理"
            }
             
        ]
    },
    admin: function(event){
        console.log(event.currentTarget.id)
        var id = event.currentTarget.id;
        wx.navigateTo({
            url: '/page/admindetail/admindetail?id='+id,
        })
    },
    back: function (event) {
        wx.switchTab({
            url: '/page/mine/mine',
        })
    }
})