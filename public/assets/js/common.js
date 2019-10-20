$('#logout').on('click', function () {
    // 确认退出
    var bool = confirm('确定要退出吗？');
    if (bool) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html';
            }
        })
    }
});

$.ajax({
    type:'get',
    url:`/users/${userId}`,
    success:function(res){
        $('.profile .name').text(res,nickname);
        $('.profile img.avatar').attr('src',res.avatar)
    }
})