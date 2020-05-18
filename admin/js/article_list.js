$(function(){
    // 发送请求，获取所有分类名称
    $.ajax({
        type:'get',
        url:BigNew.category_list,
        headers:{
            'Authorization':window.localStorage.getItem('token')
        },
        success:function(res){
            // console.log(res);
            var htmlStr = template('classList',res);
            $('#selCategory').html(htmlStr)
        }
    })

    // 封装请求获取文章的函数
    function getArticleList(obj){
        $.ajax({
            type:'get',
            url:BigNew.article_query,
            headers:{
                'Authorization':window.localStorage.getItem('token')
            },
            data:obj,
            success:function(res){
                // console.log(res);
                var htmlStr = template('articleList',res.data);
                $('.table-striped tbody').html(htmlStr)
            }
        })
    }
    getArticleList({
        key:$('#articleKey').val(),
        type:$('#selCategory').val(),
        state:$('#selStatus').val(),
        page:1,
        perpage:7
    })

    // 给筛选按钮注册单击事件
    $('#btnSearch').on('click',function(e){
        e.preventDefault();
        getArticleList({
            key:$('#articleKey').val(),
            type:$('#selCategory').val(),
            state:$('#selStatus').val(),
            page:1,
            perpage:7
        })
        // console.log($('#articleKey').val());
        // console.log($('#selCategory').val());
        // console.log($('#selStatus').val());
    })
})


// author: "管理员"
// category: "爱生活"
// categoryId: 1
// content: "见智对美团点评的“分部估值法”持有保留意见，两种估值方法得到截然相反的估值结果，本质上是对外卖业务的价值评估分歧。"
// cover: "http://localhost/https://wpimg.wallstcn.com/9778718c-e680-4cef-88ad-9b62f21043a8.jpg"
// date: "2019-05-28"
// id: 220
// read: 533
// state: "已发布"
// title: "借美团点评发布最佳财报之际，我们讨论一下估值分歧 | 见智研究团队"