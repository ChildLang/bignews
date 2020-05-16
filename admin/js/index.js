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
        success:function(reg){
            console.log(reg);
            $(".sider span i").html(reg.data.nickname);
            $('.sider .user_info img').attr('src',reg.data.userPic);
            $('.user_center_link img').attr('src',reg.data.userPic);
        }
    })
})