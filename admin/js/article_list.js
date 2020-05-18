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
                $('.table-striped tbody').html(htmlStr);
                loadPagination(res.data.totalPage);
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

    // 分页组件
    function loadPagination(totalPages, visiblePages) {
        //(1)先销毁上一次的分页数据
        $('#pagination').twbsPagination('destroy');
        //(2)加载分页插件
        $('#pagination').twbsPagination({
            totalPages: totalPages,
            visiblePages: visiblePages||6,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                //如果点击的页数与当前页数不一致，则发送ajax请求
                getArticleList({
                    key:$('#articleKey').val(),
                    type:$('#selCategory').val(),
                    state:$('#selStatus').val(),
                    page:page,
                    perpage:7
                })
            }
        });
    };
})
