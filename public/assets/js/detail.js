var id = getUrlParams('id');
$.ajax({
    type: 'get',
    url: `/posts/${id}`,
    success: function (res) {
        // console.log(res)
        var html = template('detailTpl', res);
        $('.article').html(html)
    }
})

// 点赞功能
$('.article').on('click', '.like', function () {
    $.ajax({
        type: 'post',
        url: `/posts/fabulous/${id}`,
        success: function () {
            alert('还敢点赞?')
        }
    })
})