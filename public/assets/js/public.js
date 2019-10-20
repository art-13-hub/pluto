// 随即推荐
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (res) {
        var tpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
        {{/each}}
        `
        var html = template.render(tpl, { data: res });
        $('.random').html(html)
    }
});

// 获取评论数据
// $.ajax({
//     type:'get',
//     url:'/comments/lasted',
//     success:function(res){
//         var tpl = `
//         {{each data}}
//         <li>
//         <a href="javascript:;">
//           <div class="avatar">
//             <img src="uploads/{{$value.author.avatar}}" alt="">
//           </div>
//           <div class="txt">
//             <p>
//               <span>{{$value.author.nickName}}</span>{{$value.}}说:
//             </p>
//             <p>挺会玩的</p>
//           </div>
//         </a>
//       </li>
//         {{/each}}
//         `
//         var html = template.render(tpl,{data:res});
//         $('.discuz').html(html);
//     }
// });

// 分类功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var tpl = `
        {{each data}}
        <li><a href="list.html?categoryid={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
        var html = template.render(tpl, { data: res });
        $('.header .nav').html(html);
    }
})
// 插入点

// 实现搜索功能
$('.search form').on('submit',function(){
  var key = $(this).find('.keys').val().trim();
  location.href = 'search.html?key='+key;
  return false;
})