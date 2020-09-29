// 定义加载文章分类的方法
var layer = layui.layer;
var form = layui.form;
initCate();
initEditor();

function initCate() {
    $.ajax({
        type: "get",
        url: "/my/article/cates",
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取文章分类列表失败");
            }
            // 用模板字符串去渲染
            var htmlStr = template("tpl-cate", res);
            $("[name=cate_id]").html(htmlStr);
            form.render();
        }

    })
}
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
    // 选择封面按钮点击选择文件
$("#select-fengmian").on("click", function() {
        console.log(123);
        $("#files").click();
    })
    // 将选择的图片设置到裁剪区域中;
$("#files").on("change", function(e) {
        var file = e.target.files;
        if (file.length <= 0) {
            return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(file[0])
            // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 先设默认状态为state为已发布
var state = "已发布";
$("#chaogao").on("click", function() {
        state = "草稿";
    })
    // 提交发表文章的数据
$("#form-pub").on('submit', function(e) {

        e.preventDefault();
        var fd = new FormData($(this)[0]);
        // 将文章的发布状态，存到fd中
        fd.append("state", state);
        //  将设置的图片转化为文件
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求
                publish(fd);
            })
    })
    // 请求发布文章

function publish(fd) {
    $.ajax({
        type: "POST",
        url: "/my/article/add",
        data: fd,
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status !== 0) {
                layer.msg("文章发表失败")
            }
            location.href = "../../../article/art_list.html"
        }
    })
}