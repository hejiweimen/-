getUserInfo();
// 获取用户的基本信息发起ajax请求
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",

        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取用户的信息失败");
            }
            // 渲染用户的头像
            renderAvatar(res.data);

        }

    })
}
// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }

}
// 退出的模块的解决
$('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token');
        location.href = "./login.html";
        // 2. 重新跳转到登录页面

        // 关闭 confirm 询问框
        layer.close(index)
    })
})