$.ajax({
    type:'get',
    url:'/slides',
    success:function(res){
        var html = template('slidesTpl',{data:res});
        $('#slidesBox').html(html);
    }
});
$('#file').on('change',function(){
    // 获取当前文件的数据（二进制数据）
    var fd = new FormData();
    // this.files[0]原生js 具体情况具体对待
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        porcessData:false,
        contentType:false,
        success:function(res){
            // console.log(res)
            $('#hiddenImage').val(res[0].avatar)
        }
    })
});
$('#slidesForm').on('submit',function(){
    $.ajax({
        type:'post',
        url:'/slides',
        data:$(this).serialize(),
        success:function(res){
            location.reload()
        }
    })
    return false;
});

// 删除功能
$('#slidesBox').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:`/slides/${id}`,
        success:function(res){
            location.reload()
        }
    })
})