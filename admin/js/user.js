$(function(){
// console.log(123);
// console.log(window.localStorage.getItem('token'));
$.ajax({
    type:'get',
    url:BigNew.user_detail,
    headers:{
        'Authorization':window.localStorage.getItem('token')
    },
    success:function(res){
        console.log(res);
        $.each(res.data,function(key,value){
            // console.log(key,value);
            $('#form .'+key).val(value);
        })
        $('#form .user_pic').attr('src',res.data.userPic);
    }
})
})