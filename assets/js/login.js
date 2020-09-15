$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwd = $(".reg-box [name = password]").val();
                if (value !== pwd) {
                    return "两次密码不一致";
                }

            }
        })
        // 注册表单提起ajax请求
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            }
            $.ajax({
                type: 'POST',
                url: '/api/reguser',
                data: data,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('注册失败');
                    }
                    layer.msg(res.message);
                    $("#link_login").click();

                }
            })
        })
        // 登录表单发起ajax请求
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败");
                }
                layer.msg("登录成功");
                localStorage.setItem('token', res.token);
                location.href = "./index.html"
            }
        })
    })




})