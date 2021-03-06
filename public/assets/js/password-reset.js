// 当修改密码表单发生提交行为时
$('#modifyForm').on('submit', function () {
    // 获取用户在表单中输入的 内容
    var formData = $(this).serialize();
    // 调用接口 实现密码修改功能
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
            //密码修改成功 跳转登录页面 
            location.href = 'login.html';
        }
    })
    // 阻止表单的默认提交的行为
    return false;
})