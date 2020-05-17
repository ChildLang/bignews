$(function () {
    // console.log(123);
    // console.log(window.localStorage.getItem('token'));
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        headers: {
            'Authorization': window.localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            $.each(res.data, function (key, value) {
                // console.log(key,value);
                $('#form .' + key).val(value);
            })
            $('#form .user_pic').attr('src', res.data.userPic);
        }
    })

    // 上传图片 预览
    $('#exampleInputFile').on('change', function () {
        var file = this.files[0]
        var url = URL.createObjectURL(file);
        $('.user_pic').attr('src', url);
    })
    //给提交按钮注册点击事件，
    // 获取修改后的数据，
    // 发送请求
    $('#form').on('submit', function (e) {
        e.preventDefault();
        var data = new FormData(this);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    $.ajax({
                        type: 'get',
                        url: BigNew.user_info,
                        headers: {
                            'Authorization': window.localStorage.getItem('token')
                        },
                        success: function (res) {
                            // console.log(res);
                            parent.$(".sider span i").html(res.data.nickname);
                            parent.$('.sider .user_info img').attr('src', res.data.userPic);
                            parent.$('.user_center_link img').attr('src', res.data.userPic);
                        }
                    })
                }
            },
        })
    })
})