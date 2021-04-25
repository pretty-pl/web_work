$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box #pwd').val();
            if (value !== pwd) {
                return "两次输入的密码不一致"
            }
        }
    });
    // 注册功能发起post请求
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('.reg-box [name="username"]').val(),
            password: $('.reg-box [name="password"]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功，请登录");
            $('#link_login').click();
        })
    });

    // 登录功能发起post请求
    $('#form_login').submit(function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg("登录成功");
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

})