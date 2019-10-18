// $.ajax({
//     type: 'get',
//     url: '/users',
//     success: function (res) {
//         // template模板
//         var html = template('usersTpl', { data: res });
//         $('#tb').html(html);
//     }
// });
// 发送ajax
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        var html = template('usersTpl', { data: res });
        $('#tb').html(html);
    }
})
// 添加用户功能
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            //  重新加载页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    return false;
});
// 上传头像功能
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 固定写法
        // jQuery默认我们传的是一个对象，他会帮我们转换成key=value&key=value的形式 但是我们现在数据文件上传multipart/form-data 需要数据分开传
        processData: false,
        // jQuery默认会添加一行代码改变他的type类型 xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')但是我们不需要 因为formData已经帮我们做过了
        contentType: false,
        success: function (res) {
            // console.log(res);
            // 图片预览 给用户看的
            $('#preview').attr('src', res[0].avatar);
            // 上传到数据库的
            $('#hiddenImg').val(res[0].avatar);
        },
        error: function () {
            alert('头像上传失败')
        }
    })
});
// 用户编辑功能 
$('#tb').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            var html = template('modifyTpl', res);
            // console.log(html);
            $('#modifyBox').html(html);
        }
    })
});
// 提交表单 修改用户
$('#modifyBox').on('submit', '#modifyForm', function () {
    // var formData = $(this).serialize(); 这是用来获取用户输入的内容
    var id = $(this).attr('data-id');
    // 发送请求修改用户 信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: $(this).serialize(),
        success: function () {
            // 修改成功后刷新页面
            location.reload();
        }
    })
    // 阻止表单默认提交
    return false;
})
// 事件委托 删除用户功能
$('#tb').on('click', '.del', function () {
    if (confirm('确定要删除?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});
// 实现批量删除功能
$('#checkAll').on('change', function () {
    var bool = $(this).prop('checked');
    // console.log(bool)
    //找到tbody下面的所有选中框
    var checkList = $('#tb input[type="checkbox"]');
    checkList.prop('checked', bool);
    if (bool == true) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
});

// // 全选效果的切换
$('#tb').on('change', 'input[type="checkbox"]', function () {
    //只有当tbody中所有的checkbox的数量和所有打钩的checkbox数量一样 说明就是全选中
    if ($('#tb input[type="checkbox"]').length == $('#tb input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    if ($('#tb input[type="checkbox"]:checked').length > 0) {
        $('#deleteAll').show();
    } else {
        $('#deleteAll').hide();
    }
});

// 批量删除确定
$('#deleteAll').on('click', function () {
    if (confirm('确定要删除吗？')) {
        var checkList = $('#tb input[type="checkbox"]:checked');
        var str = "";
        checkList.each(function (index, item) {
            str += $(item).attr('data-id') + '-'
        })
        // str用来收集所有的id ，用  -  拼在一起 substr 用来截取字符串最后面的 -
        str = str.substr(0, str.length - 1)
        $.ajax({
            type: 'delete',
            url: '/users/'+str,
            success: function () {
                location.reload();
            }
        })
    }
});
