$(function() {
    var form = layui.form;
    form.verify({
            nickname: function(value) {
                if (value > 6) {
                    return "输入的昵称必须在1~6位之间"
                }
            }
        })
        // 获取用户的基本信息
    function user_info() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户的信息失败");
                }
                console.log(res.data);
                // 快速填充表单的值
                form.val("formUserInfo", res.data);
            }
        })
    }
    user_info();
    // 重置功能
    $("#btnReset").on('click', function(e) {
            e.preventDefault();
            user_info();
        })
        // 提交修改功能
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改用户的信息失败");
                }
                layer.msg("修改用户的信息成功");
                window.parent.getUserInfo();
            }

        })
    })







})