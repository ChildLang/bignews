$(function () {
    var str = location.search.slice(1) // 从索引为1的位置开始截取到最后
    var id = utils.convertToObj(str).id;
    console.log(id);
    $.ajax({
        type: 'get',
        url: BigNew.article_search,
        headers:{
            'Authorization':window.localStorage.getItem('token')
        },
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);
            // 将数据渲染到页面上
            if (res.code == 200) {
                $('#form input[name=title]').val(res.data.title)
                $('#form .article_cover').attr('src', res.data.cover)
                $('#form select[name="categoryId"]').val(res.data.categoryId)
                $('#form input[name=date]').val(res.data.date)
                $('#form textarea[name=content]').val(res.data.content)
            }
        }
    })
})