var q = {
    // 默认从第几页显示数据
    pagenum: 1,
    pagesize: 2,
    cate_id: '', //文章分类的ID
    state: '', //文章的发布状态
}
var layer = layui.layer;
var form = layui.form;
template.defaults.imports.filterName = function(date) {
    var time = new Date(date);
    var y = quzero(time.getFullYear());
    var m = quzero(time.getMonth() + 1);
    var d = quzero(time.getDate());
    var h = quzero(time.getHours());
    var mm = quzero(time.getMinutes());
    var s = quzero(time.getSeconds());
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s

}

function quzero(n) {
    if (n < 10) {
        return "0" + n
    } else {
        return n;
    }

}

function initTable() {
    $.ajax({
        type: "GET",
        url: "/my/article/list",
        data: q,
        success: function(res) {
            if (res.status !== 0) {
                layer.msg("获取文章列表失败");
            }

            var htmlstr = template("tpl-table", res);
            $("tbody").html(htmlstr);
            // 调用渲染分页的方法
            renderPage(res.total);

        }
    })
}
initTable();

function initCate() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取分类数据失败！');
            }
            var htmlStr = template("tpl-cate", res);
            console.log(htmlStr);
            $("[name=cate_id]").html(htmlStr);
            form.render();
        }
    })
}
initCate();
// 筛选按钮提交表单
$("#form-search").on("submit", function(e) {
    e.preventDefault();
    q.cate_id = $("[name=cate_id]").val();
    q.state = $("[name=state]").val();
    initTable();

})
var laypage = layui.laypage;
// 定义渲染分页的方法
function renderPage(total) {

    laypage.render({
        elem: "pageBox",
        count: total,
        limit: q.pagesize,
        curr: q.pagenum,
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        jump: function(obj, first) {
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            // 解决了死循环
            if (!first) {
                initTable();
            }

        }
    })

}
var layer = layui.layer;
// 删除列表的方法
$("tbody").on("click", ".btn-delete", function() {
    var len = $(".btn-delete").length;
    console.log(len);
    var id = $(this).attr("data-index");
    layer.confirm('是否删除', { icon: 3, title: '提示' }, function(index) {

        $.ajax({
            type: "GET",
            url: "/my/article/delete/" + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("删除文章失败");
                }
                layer.msg("删除文章成功");
                if (len === 1) {
                    if (q.pagenum === 1) {
                        q.pagenum = 1
                    } else {
                        q.pagenum = q.pagenum - 1;
                    }
                    console.log(q.pagenum);
                }

                // 查看一下删除按钮的个数（长度）;
                initTable();
            }
        })

        layer.close(index);
    });
})