$('#logo').on('click', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/settings',

    })
});

// 表单提交添加logo
$('#settingsForm').on('submit', function () {
    $.ajax({
        type: 'post',
        url: '/settings',
        data: $(this).serialize(),
        success: function () {
            location.reload()
        }
    })
});

// 发送ajax 获取网站设置信息
$.ajax({
    type: 'get',
    url: 'settings',
    success: function (res) {
        // console.log(res)
        // 将logo地址存下隐藏域中
        $('#hiddenLogo').val(res.val);
        // 将logo显示出来
        $('#preview').attr('src', res.logo);
        //将网站标题显示在页面中
        $('input[name="title"]').val(res.title);
        // 将是否开启评论功能显示在页面中
        $('input[name="comment"]').prop('checked', res.comment);
        // 将评论是否经过人工审核显示在页面中
        $('input[name="review"]').prop('checked', res.review);
    }
})