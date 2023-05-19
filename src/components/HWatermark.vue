<!--
 * @Author: 雷宇航
 * @Date: 2023-03-17 18:24:46
 * @LastEditTime: 2023-03-22 10:42:53
 * @LastEditors: 雷宇航
 * @Description:
 * @FilePath: \myTestProject\myproject\src\components\HWatermark.vue
-->
<template>
  <div>
    <input type="file" ref="fileInput" multiple @change="onFileChange" />
    <button @click="addWatermark">添加水印</button>
    <br />
    <img
      v-for="(item, index) in imageUrlList1"
      ref="imageCon"
      :key="index"
      :src="item"
    />
  </div>
</template>

<script>
// import watermark from "watermarkjs";

export default {
  data() {
    return {
      imageUrlList: [],
      imageUrlList1: [],
      imageList: [],
    };
  },
  methods: {
    onFileChange(event) {
      let imageFileList = event.target.files;
      for (let i = 0; i < imageFileList.length; i++) {
        this.imageUrlList1.push(URL.createObjectURL(imageFileList[i]));
      }
      Promise.all(this.getFileInfo(imageFileList)).then((res) => {
        this.imageList = res;
      });
    },
    getFileInfo(fileList) {
      return Array.from(fileList).map((item) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              resolve(img);
            };
            img.onerror = reject;
            img.src = reader.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(item);
        });
      });
    },
    addWatermark() {
      let imageList = this.imageList;
      // let imageCon = this.$refs.imageCon; //获取图片
      // console.log(imageList, imageCon, "imageCon");
      let imgResult = [];

      for (let k = 0; k < imageList.length; k++) {
        let content = "我就是一个水印我就是一个水印我就是一个水印我就是一个水印我就是一个水印我就是一个水印";
        let canvas = document.createElement("canvas"); //创建canvas容器
        console.log(imageList[k].width, imageList[k].height, "widthheight");
        canvas.width = imageList[k].width; //设置canvas容器宽度
        canvas.height = imageList[k].height; //设置canvas容器高度
        let ctx = canvas.getContext("2d"); //获取2d画笔
        //在canvas画布上绘制图片 ctx.drawImage(图片, x位置, y位置,  图像宽度, 图像高度);
        let height = imageList[k].width * 0.08; //两个水印之间的垂直高度
        let width = imageList[k].width * 0.08; //两个水印之间的水平高度
        let fontSize = imageList[k].width * 0.02; //水印字体大小
        ctx.drawImage(
          imageList[k],
          0,
          0,
          imageList[k].width,
          imageList[k].height,
        );

        //设置文本画笔样式
        ctx.textAlign = "left"; //设置文本对齐方式
        ctx.textBaseline = "top"; //设置文本基线
        ctx.font = `${fontSize}px Microsoft Yahei`; //设置文本字体属性
        ctx.fillStyle = "rgba(255, 255, 255,0.4)"; //设置文本字体颜色

        //在canvas画布上绘制文字 ctx.fillText(文字内容, x位置, y位置, 文本最大宽度)
        ctx.rotate((17 * Math.PI) / 180); //文本旋转角度设置
        ctx.translate(-imageList[k].width * 0.5, -imageList[k].height * 0.2);
        let i = 0,
          j = 0,
          waterMarkerWidth = content.split("").length * fontSize;
        for (i = 0; i < imageList[k].width / waterMarkerWidth; i++) {
          for (j = 0; j < imageList[k].height / (height - 20); j++) {
            if (j == 0) {
              ctx.fillText(
                content,
                i * (waterMarkerWidth + width),
                -height,
                imageList[k].width
              );
            }
            ctx.fillText(
              content,
              i * (waterMarkerWidth + width),
              j * height,
              imageList[k].width
            );
          }
        }
        //把canvas转base64输出
        imgResult.push(canvas.toDataURL("image/png"));
        console.log(imgResult[k], "imgResult[k]");
        console.log(this.dataURLtoFile(imgResult[k], "图片.png"));
      }

      this.imageUrlList1 = imgResult;
      this.$forceUpdate();
      // var image = new Image();
      // imageCon.setAttribute('crossOrigin', 'anonymous');//跨域
      // imageCon.setAttribute('useCORS', true);//跨域
      // image.setAttribute('crossOrigin', 'anonymous');//跨域
      // image.setAttribute('useCORS', true);//跨域
      // watermark by local path
      // watermark(['img/photo.jpg', 'img/logo.png'])
      //   .image(watermark.image.lowerRight(0.5))
      //   .then(img => document.getElementById('container').appendChild(img));

      // load a url and file object
      // const upload = document.querySelector("input[type=file]").files[0];
      // watermark([this.imageFile, "img/logo.png"])
      //   .image(watermark.image.lowerLeft(0.5))
      //   .then((img) => {
      //     console.log(img, "img");
      //     document.getElementById("container").appendChild(img);
      //   });

      // watermark from remote source
      // const options = {
      //   init(img) {
      //     img.crossOrigin = 'anonymous'
      //   }
      // };
      // watermark(['http://host.com/photo.jpg', 'http://host.com/logo.png'], options)
      //   .image(watermark.image.lowerRight(0.5))
      //   .then(img => document.getElementById('container').appendChild(img));
      // if (!this.imageFile) return;
      // const options = {
      //   init(img) {
      //     img.crossOrigin = "anonymous";
      //   },
      // };

      // // const watermarkText = "Design by MyWebsite";

      // watermark([this.imageFile], options)
      //   .image(watermark.image.lowerRight(0.5))
      //   .then((img) => {
      //     // 注意：此处的files是一个数组，因为我们传入了一个文件数组
      //     // const file = files[0];
      //     // this.imageUrl = URL.createObjectURL(file);
      //     // this.imageFile = file;
      //     console.log(img, "img");
      //     this.imageFile = img.src;
      //   });
      // 创建 canvas 元素和画布对象
      // const canvas = document.createElement("canvas");
      // const ctx = canvas.getContext("2d");

      // // 加载原始图片
      // const img = new Image();
      // img.src = this.imageUrl;
      // img.onload = function () {
      //   // 设置画布大小等于图片大小
      //   canvas.width = img.width;
      //   canvas.height = img.height;

      //   // 在画布上绘制原始图片
      //   ctx.drawImage(img, 0, 0);

      //   // 绘制水印文本
      //   const text = "Sample Watermark";
      //   ctx.font = "bold 20px Arial";
      //   ctx.fillStyle = "rgba(255, 255, 255, .5)";
      //   ctx.textAlign = "center";
      //   ctx.textBaseline = "middle";
      //   ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      //   // 将带有水印的图像输出为 data URL 字符串
      //   const watermarkedImage = canvas.toDataURL();
      //   console.log(watermarkedImage);
      //   this.imageUrl1 = watermarkedImage;
      // };
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
};
</script>
<style>
#container {
  width: 500px;
  height: 500px;
}
</style>
