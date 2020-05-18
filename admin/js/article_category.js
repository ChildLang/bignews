$(function(){
    // 刷新页面即发送请求，获取数据渲染页面
    $.ajax({
        type:'get',
        url:BigNew.category_list,
        headers:{
            'Authorization':window.localStorage.getItem('token')
        },
        success:function(res){
            // console.log(res);
            var htmlStr = template('list',res);
            $('tbody').html(htmlStr);
            window.data = res.data;
        }
    })

    // 点击新增分类按钮弹出添加模态框
    $('#xinzengfenlei').on('click',function(){
        $('#exampleModal').modal('show');
        $('#exampleModalLabel').text('新增分类');
        $('#list_form').get(0).reset();
    })
    // 点击编辑按钮弹出编辑模态框
    $('tbody').on('click','.text-center .btn-info',function(){
        $('#exampleModal').modal('show');
        $('#exampleModalLabel').text('编辑此分类');
        var index = $(this).data('index');
        $.each(data[index],function(index,val){
            $('.modal-body #recipient-'+index).val(val);
        })
        // $('.modal-body #recipient-id').val(data[index].id);
        // $('.modal-body #recipient-name').val(data[index].name);
        // $('.modal-body #recipient-slug').val(data[index].slug);
    })
    // 点击模态框确认按钮，发送ajax请求
    $('.modal-footer .btn-primaryadd').on('click',function(){
        // 判断id文本框是否为空，
        // 不为空则发送编辑请求
        // 为空则发送新增请求
        var id = $('.modal-body #recipient-id').val();
        $.ajax({
            type:'post',
            url:id?BigNew.category_edit:BigNew.category_add,
            headers:{
                'Authorization':window.localStorage.getItem('token')
            },
            data:$('#list_form').serialize(),
            beforeSend:function(){
                var flag = false;
                $('.form-group input').each(function(index,val){
                    if(!$.trim($(this).val())){
                        flag = true;
                    }
                })
                if(flag){
                    alert('内容不能为空');
                    return false;
                }
            },
            success:function(res){
                if(res.code == 200 || res.code == 201){
                    window.location.reload();
                }
            }
        })
    })
    // 删除数据
    // 1.1给删除按钮添加单击事件
    // 1.2点击删除按钮获取当前id，发送请求删除数据
    $('tbody').on('click','.btn-danger',function(){
        // console.log(123);
        $('.delmodal').modal('show');
        window.id = $(this).data('id');
        // console.log(id);
    })
    $('.modal-footer .btn-primarydel').on('click',function(){
        $.ajax({
            type:'post',
            url:BigNew.category_delete,
            headers:{
                'Authorization':window.localStorage.getItem('token')
            },
            data:{
                id:id
            },
            success:function(res){
                if(res.code==204){
                $('.delmodal').modal('hide');
                window.location.reload();
                }
            }
        })
    })
})