// 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (res) {
        var html = template('postsTpl', res);
        // console.log(html);
        $('#postsBox').html(html);
        // var page = template('pageTpl', res);
        // $('.pagination').html(page);
    }
});
// 处理日期事件格式
function dateFormat(date){
     date = new Date(date);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}
// 分页功能
function changePage(pageNum) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: pageNum
        },
        success: function (res) {
            var html = template('postsTpl', res);
            // console.log(html);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    })
}

//筛选
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var html = template('categoryTpl',{data:res});
        $('#categoryBOx').html(html);
    }
})