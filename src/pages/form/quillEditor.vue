<template>
  <div class="editor-box">
    <div>
      <el-card>
        <div>
          <el-input
            style="margin: 10px 0;"
            v-model="inputValue"
            placeholder="请输入标题">
          </el-input>
        </div>
        <div>
          <quill-editor
            class="editor"
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
          >
          </quill-editor>
        </div>
      </el-card>
      <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
// 局部挂载 - 样式和组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import Quill from "quill";
// 图片拖拽模块
import { ImageDrop } from 'quill-image-drop-module'
// 改变图片大小模块
import ImageResize from 'quill-image-resize-module'
// 注册
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

// 鼠标触摸提示
const titleConfig=[
  {Choice:'.ql-bold',title:'加粗'},
  {Choice:'.ql-italic',title:'斜体'},
  {Choice:'.ql-underline',title:'下划线'},
  {Choice:'.ql-header',title:'段落格式'},
  {Choice:'.ql-strike',title:'删除线'},
  {Choice:'.ql-blockquote',title:'块引用'},
  {Choice:'.ql-code',title:'插入代码'},
  {Choice:'.ql-code-block',title:'插入代码段'},
  {Choice:'.ql-font',title:'字体'},
  {Choice:'.ql-size',title:'字体大小'},
  {Choice:'.ql-list[value="ordered"]',title:'编号列表'},
  {Choice:'.ql-list[value="bullet"]',title:'项目列表'},
  {Choice:'.ql-direction',title:'文本方向'},
  {Choice:'.ql-header[value="1"]',title:'h1'},
  {Choice:'.ql-header[value="2"]',title:'h2'},
  {Choice:'.ql-align',title:'对齐方式'},
  {Choice:'.ql-color',title:'字体颜色'},
  {Choice:'.ql-background',title:'背景颜色'},
  {Choice:'.ql-image',title:'图像'},
  {Choice:'.ql-video',title:'视频'},
  {Choice:'.ql-link',title:'添加链接'},
  {Choice:'.ql-formula',title:'插入公式'},
  {Choice:'.ql-clean',title:'清除字体格式'},
  {Choice:'.ql-script[value="sub"]',title:'下标'},
  {Choice:'.ql-script[value="super"]',title:'上标'},
  {Choice:'.ql-indent[value="-1"]',title:'向左缩进'},
  {Choice:'.ql-indent[value="+1"]',title:'向右缩进'},
  {Choice:'.ql-header .ql-picker-label',title:'标题大小'},
  {Choice:'.ql-header .ql-picker-item[data-value="1"]',title:'标题一'},
  {Choice:'.ql-header .ql-picker-item[data-value="2"]',title:'标题二'},
  {Choice:'.ql-header .ql-picker-item[data-value="3"]',title:'标题三'},
  {Choice:'.ql-header .ql-picker-item[data-value="4"]',title:'标题四'},
  {Choice:'.ql-header .ql-picker-item[data-value="5"]',title:'标题五'},
  {Choice:'.ql-header .ql-picker-item[data-value="6"]',title:'标题六'},
  {Choice:'.ql-header .ql-picker-item:last-child',title:'标准'},
  {Choice:'.ql-size .ql-picker-item[data-value="small"]',title:'小号'},
  {Choice:'.ql-size .ql-picker-item[data-value="large"]',title:'大号'},
  {Choice:'.ql-size .ql-picker-item[data-value="huge"]',title:'超大号'},
  {Choice:'.ql-size .ql-picker-item:nth-child(2)',title:'标准'},
  {Choice:'.ql-align .ql-picker-item:first-child',title:'居左对齐'},
  {Choice:'.ql-align .ql-picker-item[data-value="center"]',title:'居中对齐'},
  {Choice:'.ql-align .ql-picker-item[data-value="right"]',title:'居右对齐'},
  {Choice:'.ql-align .ql-picker-item[data-value="justify"]',title:'两端对齐'}
];

export default {
  name: 'editor',
  components: {quillEditor},
  data () {
    return {
      inputValue: '',
      content: '',
      editorOption:{
        theme: "snow",  //主题
        placeholder: "请输入正文", // 暂时不知道作用
        modules: { // 模块
          imageDrop: true, // 实现可以拖拽
          imageResize: { // 实现大小控制
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          },
//          syntax: true,
          toolbar: [ // 工具栏的配置 - 有多少配置多少
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
            ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
            [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
            [{ script: "sub" }, { script: "super" }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
            [{ indent: "-1" }, { indent: "+1" }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
            [{ direction: "rtl" }], // 文本方向-----[{'direction': 'rtl'}]
            [{ size: ["small", false, "large", "huge"] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
            [{ font: [] }], // 字体种类-----[{ font: [] }]
            [{ align: [] }], // 对齐方式-----[{ align: [] }]
            ["clean"], // 清除文本格式-----['clean']
            ["image", "video"] // 链接、图片、视频-----['link', 'image', 'video']
          ],
        },

      },
    }
  },
  computed: {
    editor() { // 获取quill dom节点
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    document.getElementsByClassName('ql-editor')[0].dataset.placeholder=''
    for(let item of titleConfig){
      let tip = document.querySelector('.quill-editor '+ item.Choice)
      if (!tip) continue
      // setAttribute() 方法添加指定的属性，并为其赋指定的值。

      tip.setAttribute('title',item.title)
    }
  },
  methods: {
    //失去焦点事件
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    //获得焦点事件
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    // 准备富文本编辑器
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    //内容改变事件
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
}
</script>

<!--因为我们是在组件内写的样式 所以要删除 style lang=‘scss’
scoped 中的 scoped,使样式全局生效-->
<style lang='scss'>
  .editor-box {
    width: 1100px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -550px;
  }

  /*editor width和height配置*/
  .editor {
    /*width: 1200px;*/
    /*line-height: normal !important;*/
    height: 400px;
    margin-bottom: 10px;
  }
  /*下面的是汉化配置css*/
  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0;
    content: "保存";
    padding-right: 0;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }
</style>