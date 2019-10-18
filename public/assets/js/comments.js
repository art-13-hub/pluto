$.ajax({
    type:'get',
    url:'/comments',
    success:function(res){
        var html = template('commentsTpl',res);
        $('#commentsBox').html(html);
        // 分页渲染
        var page = template('pageTpl',res);
        $('.pagination').html(html);
    }
});

// 驳回批准功能
$('#commentsBox').on('click','.status',function(){
    var id = $(this).parent().attr('data-id');
    var status = $(this).parent().attr('data-status');
    // console.log(id,status);
    $.ajax({
        type:'put',
        url:`/comments/${id}`,
        data:{
            state:status==1?0:1
        },
        success:function(res){
            // 刷新页面
            location.reload()
        }
    })
});
// 删除功能
$('#commentsBox').on('click','.delete',function(){
    if(confirm('小老几确定要删除吗?')){
        var id = $(this).parent().attr('data-id');
        $.ajax({
            type:'delete',
            url:`/comments/${id}`,
            success:function(){
                location.reload()
            }
        })
    }
})