$(function(){
    // 刷新页面即发送请求，获取数据渲染页面
    $.ajax({
        type:'get',
        url:BigNew.category_list,
        headers:{
            'Authorization':window.localStorage.getItem('token')
        },
        success:function(res){
            console.log(res);
            var htmlStr = template('list',res);
            $('tbody').html(htmlStr);
        }
    })

    // 点击
})
