$(function(){
    /* 1.给登录按钮注册点击事件
        2.获取文本框的数据
        3.判断数据是否为空
        4.数据正常是发送请求
        5.请求成功跳到主页面
    */

    // 1.给登录按钮注册点击事件
    $('.login_form').on('submit',function(e){
        e.preventDefault();
        // console.log(123);
        $.ajax({
            type:'post',
            url:BigNew.user_login,
            data:$(this).serialize(),
            beforeSend:function(){
                var flag = false;
                // 2.获取文本框的数据
                $('.login_form input[name]').each(function(index,ele){
                    // 3.判断数据是否为空
                    if(!$.trim($(ele).val())){
                        flag = true;
                    }
                })
                if(flag){
                    // alert('用户名或密码不能为空！');
                    $('#myModal').modal('show');
                    $('.modal-body p').text('用户名或密码不能为空！');
                    return false;
                }
            },
            success:function(reg){
                $('#myModal').modal('show');
                $('.modal-body p').text(reg.msg);
                if(reg.code == 200){
                    $('#myModal').on('hidden.bs.modal', function (e) {
                    window.localStorage.setItem('token',reg.token)
                    window.location.href = './index.html';
                    })
                }
            }
        })
    })
})