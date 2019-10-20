// 获取分类id
function getUrlParams(key) {
    var str = location.search.substr(1);
    var arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
        var arr1 = arr[i].split('=');
        if (arr1[0] == key) {
            return arr1[1]
        }
    }
}
// console.log(getUrlParams('categoryid'))
var categoryId = getUrlParams('categoryid');
// 发送ajax 获取数据
$.ajax({
    type: 'get',
    url: `/posts/category/${categoryId}`,
    success: function (res) {
        var html = template('listTpl', { data: res });
        $('#listBox').html(html);
        $('.new h3').text(res[0].category.title);
    }
})