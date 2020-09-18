  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
      // 1.2 配置选项
  const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
  }
  var layer = layui.layer;
  // 1.3 创建裁剪区域
  $image.cropper(options)
  $("#btnchoose").on('click', function() {
      $("#file").click();
  })
  $("#file").on("change", function(e) {
      // 获取用户选择的文件
      var filelist = e.target.files;
      if (filelist.length <= 0) {
          return layer.msg("请选择一张图片");
      }
      //   拿到用户选择的文件
      var file = e.target.files[0];
      //   将文件转换为路径
      var newImgURL = URL.createObjectURL(file);
      //   重新初始化裁剪区域展示最新的照片
      $image
          .cropper('destroy') // 销毁旧的裁剪区域
          .attr('src', newImgURL) // 重新设置图片路径
          .cropper(options) // 重新初始化裁剪区域
  })

  //按钮点击把图像上传到服务器上，并且刷新我们的页面
  $("#btnUPload").on('click', function() {
      var dataURL = $image
          .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
              width: 100,
              height: 100,
          })
          .toDataURL('image/png')
      $.ajax({
          type: "POST",
          url: "/my/update/avatar",
          data: {
              avatar: dataURL,
          },
          success: function(res) {
              if (res.status !== 0) {
                  return layer.msg("更新头像失败");
              }
              console.log(res);
              layer.msg("更新头像成功");
              window.parent.getUserInfo();
          }
      })
  })