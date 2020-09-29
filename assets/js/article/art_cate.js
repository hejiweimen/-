function initArtCateList() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function(res) {
            // 调用模板引擎进行渲染
            var htmlStr = template("tpl-table", res);
            $("tbody").html(htmlStr);

        }
    })
}
initArtCateList();
var layer = layui.layer;
var index = null;
$("#add").on('click', function() {
    index = layer.open({
        type: 1,
        title: '在线调试',
        content: $("#tpl-add").html(),
        area: ['500px', '250px']
    });
})

// 为表单指定提交事件
$("body").on("submit", "#fenlei-add", function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $("#fenlei-add").serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("文章类别增加失败")
            }
            layer.msg("文章类别增加成功")
            initArtCateList();
            layer.close(index);
        }

    })
})
var form = layui.form
var index1 = null
    // 绑定编辑的点击事件
$("tbody").on("click", "#form-edit", function() {
        var id = $(this).attr("data-index")
        console.log(id);
        index1 = layer.open({
            type: 1,
            title: '修改文章的分类',
            content: $("#dialog-edit").html(),
            area: ['500px', '250px']
        });
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val("form-edits", res.data)
            }

        })



    })
    // 编辑的表单的提交事件
$("body").on("submit", "#form-edits", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新分类信息失败！")
                }
                layer.msg("更新分类信息成功！")
                initArtCateList();
                layer.close(index1);

            }
        })
    })
    // 用户的删除功能
$("tbody").on("click", "#form-dele", function() {
    var id = $(this).attr("data-index");
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, function(index) {
        $.ajax({
            type: "GET",
            url: "/my/article/deletecate/" + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("删除文章分类失败!")
                }
                layer.msg("删除文章分类成功!");
                initArtCateList();
            }


        })

        layer.close(index);
    });
})