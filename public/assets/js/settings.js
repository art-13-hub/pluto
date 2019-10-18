$('#logo').on('click',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/settings',
        
    })
})