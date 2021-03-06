form = layui.form;
form.verify({

    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    newpwd: function(value) {
        if (value === $("[name = oldPwd]").val()) {
            return "新旧密码不能一致"
        }
    },
    repwd: function(value) {
        if (value !== $("[name=newPwd]").val()) {
            return "两次密码不一样"
        }
    }

})

var layer = layui.layer;
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/my/updatepwd",
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("更新密码失败")
            }
            layer.msg("更新密码成功")
            $('.layui-form')[0].reset();
        }
    })
})