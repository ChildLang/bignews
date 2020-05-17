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
    // 点击新增分类按钮弹出编辑模态框
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
    $('.modal-footer .btn-primary').on('click',function(){
        // 判断id文本框是否为空，
        // 不为空则发送编辑请求
        // 为空则发送新增请求
        if($('.modal-body #recipient-id').val()){
            // 编辑内容
            $.ajax({
                type:'post',
                url:BigNew.category_edit,
                headers:{
                    'Authorization':window.localStorage.getItem('token')
                },
                data:$('#list_form').serialize(),
                beforeSend:function(){
                    var flag = false;
                    $('#list_form input').each(function(index,val){
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
                    console.log(res);
                    if(res.code ==200){
                        window.location.reload();
                    }
                }
            })
        }else{
            // 新增内容
            
            $.ajax({
                type:'post',
                url:BigNew.category_add,
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
                    if(res.code ==201){
                        window.location.reload();
                    }
                }
            })
        }
    })
})