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
    function getArticleList(myPage,callback){
        $.ajax({
            type:'get',
            url:BigNew.article_query,
            headers:{
                'Authorization':window.localStorage.getItem('token')
            },
            data:{
                key:$('#articleKey').val(),
                type:$('#selCategory').val(),
                state:$('#selStatus').val(),
                page:myPage||1,
                perpage:3
            },
            success:function(res){
                console.log(res);
                if(res.code == 200){
                    var htmlStr = template('articleList',res.data);
                    $('.table-striped tbody').html(htmlStr);


                    if(callback != null&&res.data.data.length != 0){
                        $('#pagination').show().next().hide();
                        callback(res);}
                    // }else if(res.data.totalPage == 0){
                    //     $('#pagination').hide().next().show();
                    // }

                    if(res.data.totalPage!=0&&res.data.data.length == 0){
                        pages -=1;
                        $('#pagination').twbsPagination('changeTotalPages',res.data.totalPage,pages);
                    }
                }
                
            }
        })
    }

    /* 文章列表页面需要提交三次类似的请求，
    1次页面加载完成之后|提交请求获取数据|加载分页器
    2次点击筛选按钮时  |提交请求获取数据|更新分页器总页数
    3次点击分页器按钮  |提交请求获取数据| */

    // 1次页面加载完成之后|提交请求获取数据|加载分页器
    getArticleList(1,loadpagination);
    // 2次点击筛选按钮时  |提交请求获取数据|更新分页器总页数
    $('#btnSearch').on('click',function(e){
        e.preventDefault();
        getArticleList(1,function(res){
            $('#pagination').twbsPagination('changeTotalPages',res.data.totalPage,1);
        })
    })
    // // 分页组件
    function loadpagination(res, visiblePages) {
        //(2)加载分页插件
        $('#pagination').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: visiblePages||6,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
                    getArticleList(page);
                    window.pages = page;
            }
        });
    };


    // 删除功能
    // 1.1点击删除按钮，获取id，弹出模态框
    // 1.2点击确认按钮，发送请求
    // 1.3重新渲染数据
    $('tbody').on('click','.btn-danger',function(){
        // console.log(123);
        window.id = $(this).data('id');
        $('.delmodal').modal('show');
    })
    $('.btn-primarydel').on('click',function(){
        $.ajax({
            type:'post',
            url:BigNew.article_delete,
            data:{
                id:id
            },
            headers:{
                'Authorization':window.localStorage.getItem('token')
            },
            success:function(res){
                if(res.code ==204){
                    getArticleList(pages,function(res){
                        $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, pages)
                    })
                }
                $('.delmodal').modal('hide');

            }
        })
    })

    // 编辑功能
    // 1.1给编辑按钮注册事件，
    // 1.2点击带参跳转到编辑页面
})
