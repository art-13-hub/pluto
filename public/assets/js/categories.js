$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // 将服务器端返回的数据和HTML模板进行拼接 #categoriesTpl写了#报错
        var html = template('categoriesTpl', { data: res });
        console.log(res)
        // 将拼接好的内容放到页面中
        $('#categoryBox').html(html);
    }
});

// 实现表单添加分类功能
$('#addCategory').on('submit', function () {
    // 发送请求添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $(this).serialize(),
        success: function () {
            // 刷新页面 得到新数据·
            location.reload();
        }
    });
    // 阻止表单默认提交
    return false;
});

// 实现编辑功能
$('#categoryBox').on('click','.edit',function(){
    // 获取要修改的分类数据
    var id = $(this).attr('data-id');
    // 发送ajax获取服务端参数
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(res){
            var html = template('modifyCategoriesTpl',res);
            $('#modifyBox').html(html);
        }
    })
})
// $('#categoryBox').on('click', '.edit', function () {
//     // 获取要修改的分类数据id
//     var id = $(this).attr('data-id');
//     $.ajax({
//         type: 'get',
//         url: '/categories/' + id,
//         success: function (res) {
//             var id = $(this).attr('data-id');
//             $.ajax({
//                 type: 'get',
//                 url: '/categories/' + id,
//                 success: function (res) {
//                     var html = template('modifyCategoriesTpl', res);
//                     $('#modifyBox').html(html);
//                 }
//             })
//         }
//     })
// });
// // 提交表单事件 （事件委托）
$('#modifyBox').on('submit', '#modifyCategory', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function () {
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
})
