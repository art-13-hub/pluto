// 轮播图功能
$.ajax({
    type:'get',
    url:'/sildes',
    success:function(res){
        var html = template('slidesTpl',{data:res});
        $('.swiper-wrapper').html(html);
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination'
            },
          });    
    }
})