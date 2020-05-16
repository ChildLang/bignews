$(function(){
    /* 
    1.一刷新页面就提交请求，获取当前用户的用户名和头像图片渲染页面
    2.未登录则跳转到登录页面
    */
    // console.log(window.localStorage.getItem('token'));
    $.ajax({
        type:'get',
        url:'http://localhost:8080/api/v1/admin/user/info',
        headers:{
            'Authorization':window.localStorage.getItem('token')
        },
        beforeSend:function(){
            if(!window.localStorage.getItem('token')){
                alert('请先登录');
                window.location.href = './login.html';
                return ;
            }
        },
        success:function(reg){
            console.log(reg);
            $(".sider span i").html(reg.data.nickname);
            $('.sider .user_info img').attr('src',reg.data.userPic);
            $('.user_center_link img').attr('src',reg.data.userPic);
        }
    })

    /* 退出功能 
    1.给退出按钮添加点击事件，
    点击按钮后跳转到登录页面，
    清空本地存储的token，
    */
    $('.user_center_link .logout').on('click',function(){
        window.localStorage.removeItem('token');
        window.location.href = './login.html';
    })
})