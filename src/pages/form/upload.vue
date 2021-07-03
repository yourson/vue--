<template>
    <div>
      <div>upload</div>
      <div class="container">
        <div class="plugins-tips">
          Element UI自带上传组件。
          访问地址：<a style="color: blue;" href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a>
        </div>
        <!--drag: 是否启用拖拽上传-->
        <!--action：必选参数，上传的地址-->
        <!--multiple：是否支持多文件-->
        <!--auto-upload: 是否在选取文件后立即进行上传-->
        <!--:limit: 最大允许上传个数,确实会提醒！-->
        <!--:on-exceed: 文件超出个数限制时的钩子-->
        <!--auto-upload：选取文件是否立即上传-->
        <!--http-request：覆盖默认上传行为-->
        <!--on-change：文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。-->
        <el-card>
          <div slot="header">
            文件上传
          </div>
          <el-upload
            class="upload-dom"
            drag
            :limit="3"
            :on-exceed="handleExceed"
            action="none"
            multiple
            :http-request="uploadSectionFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-card>
      </div>
      <div class="form-upload">
        <div class="content-title">
          表单文件和图片上传 --- 获取的是七牛云Token进行文件上传
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="活动名称：" prop="name">
            <el-input v-model="ruleForm.name" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="上传图片：" ref="uploadElement" prop="imageUrl">
            <!--:show-file-list="false"：是否显示已上传文件列表-->
            <!--name：上传的文件字段名-->
            <!--before-upload：上传文件之前的钩子，参数为上传的文件，文件大小和类型限制，-->
            <!--若返回 false 或者返回 Promise 且被 reject，则停止上传。-->
            <!--on-change：文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。-->
            <!--auto-upload：是否在选取文件后立即进行上传。-->
            <!--data：上传时附带的额外参数。-->
            <el-upload
              :class = "{disabled:isMax}"
              name="上传的图片"
              ref="upload"
              action="#"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :on-remove="handleDel"
              :limit="2"
              :on-exceed="handleFormExceed"
              :data="ruleForm"
              list-type="picture-card"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt="上传图片"
                >
                <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">
              立即上传
            </el-button>
          </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
</template>

<script>
export default {
  name: "upload",
  data () {
    return {
      formData: {
        username: '张三',
        id: 1
      }, // 测试文件上传提供参数
      isCover: false, // 是否覆盖已经上传的文件,默认false
      isMax: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ruleForm: { // form数据
        name: '商品',
        imageUrl: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
        ],
        imageUrl: [
          {required: true, message: '请上传图片', trigger: 'blur'},
        ],
      }
    }
  },
  methods: {
    // 文件上传超过个数触发
    handleExceed (files,fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length}
      个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    async uploadSectionFile (param) { // 在这里发送ajax请求
      let fileObj = param.file
      // 对文件进行限定 - 支持的文件格式如下
      let fileTypes =["text/plain","application/msword"];
      let isIncludes = fileTypes.includes(fileObj.type)
      let fileMaxSize = fileObj.size / 1024 / 1024 < 8; // 文件大小 最大8M
      if (!isIncludes) {
        this.$message.error('上传的文件格式不正确')
        return
      }
      if (!fileMaxSize) {
        this.$message.error('上传的文件太大了')
        return
      }
      let fd = new FormData() // 初始化一个form表单，里面可以放input
      this.isCover = false // 默认不需要覆盖
      fd.append('file', fileObj) // 这里的file是函数内部参数
      fd.append('name',this.formData.username) // 用户名
      fd.append('id',this.formData.id)
      fd.append('isCover', this.isCover)
      let res = await this.$http.post('/api/upload',fd)
      // 上传之后可能文件存在或者上传失败情况
      let { status, msg } = res
      if (status === 1) {
        this.$message.success(msg)
        param.onSuccess(status)
      } else if (status === 0){
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.isCover = true
          fd.set('isCover', this.isCover)
          let res = await this.$http.post('/api/upload',fd)
          let { status, msg } = res
          if (status === 1) this.$message.success(msg);
        }).catch(() => {
          this.$message.info('取消上传！');
        });
      }
    },

    // -------------------分界线--------------------------------

    // beforeUpload 和 :auto-upload="false" 一起用回失效
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用。
    handleChange (file, fileList) {
      // fileList：上传文件的总数量 --- 是一个数据
      if(fileList.length >= 2){
        this.isMax = true
      }
    },
    // 文件移除
    handleDel (file, fileList) {
      if(fileList.length < 2){
        this.isMax = false
      }
    },
    // 表单图片上传个数超出
    handleFormExceed () {
      this.$message.error('只能上传一张图片!');
    },
    // 立即上传
    submitForm () {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          that.$refs.upload.submit() // 提交数据
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  .plugins-tips {
    background: yellowgreen;
    padding: 20px 10px;
    margin-bottom: 20px;
  }
  .disabled {
    display: none;
  }
  .form-upload {
    /*修改文件上传边框的大小*/
    /*/deep/ .el-upload--picture-card{*/
      /*width: 100px;*/
      /*height: 100px;*/
    /*}*/
    /*/deep/ .el-upload{*/
      /*width: 100px;*/
      /*height: 100px;*/
      /*line-height: 100px;*/
    /*}*/
    /*/deep/ .el-upload-list--picture-card .el-upload-list__item{*/
      /*width: 100px;*/
      /*height: 100px;*/
      /*line-height: 100px;*/
    /*}*/
    /*/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail{*/
      /*width: 100px;*/
      /*height: 100px;*/
      /*line-height: 100px;*/
    /*}*/
    /*/deep/ .avatar{*/
      /*width: 100px;*/
      /*height: 100px;*/
    /*}*/
  }

</style>
