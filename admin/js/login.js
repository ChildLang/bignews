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
            url:'http://localhost:8080/api/v1/admin/user/login',
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
                    alert('用户名或密码不能为空！');
                    return false;
                }
            },
            success:function(reg){
                if(reg.code == 200){
                    alert('登录成功');
                    window.location.href = './index.html';
                }else{
                    alert(reg.msg);
                }
            }
        })
    })
})