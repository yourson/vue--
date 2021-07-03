import axios from 'axios';
import qs from 'qs'; // 格式整理的库

import { Message,Loading } from 'element-ui';

const loading={ //loading加载对象
  loadingInstance: null,
  //打开加载
  open(){
    if(this.loadingInstance===null){ // 如果实例 为空，则创建
      this.loadingInstance=Loading.service({
        text:'加载中...', //加载图标下的文字
        spinner: 'el-icon-loading', //加载图标
        background:'rgba(0, 0, 0, 0.8)', //背景色
        customClass:'loading' //自定义样式的类名
      })
    }
  },
  //关闭加载
  close(){
    // 不为空时, 则关闭加载窗口
    if(this.loadingInstance !== null) {
      this.loadingInstance.close()
    }
    this.loadingInstance = null
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5000, // 超时时间
  withCredentials: true, // 跨域是否允许携带凭证 - 默认是false
})

// 设置请求传递数据的格式 --- 主要是post请求 --- xxx=xxx&&xxx=xxx
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法  ---  对发送的请求参数进行格式改变
// qs 是第三方库   xxx=xxx&xxx=xxx;
axios.defaults.transformRequest = data => qs.stringify(data);

// 环境变量区分接口的默认地址
//switch (process.env.NODE_ENV) {
//  case "production":
//    axios.defaults.baseURL = "http://localhost:8080"
//    break;
//  case "test":
//    axios.defaults.baseURL = "http://127.0.1:4000"
//    break;
//  default:
//    axios.defaults.baseURL ='http://localhost:8080';
//}

// 请求拦截器  - 配置token和加载动画
instance.interceptors.request.use(
  config => {
    // 携带token
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token
    }
    loading.open()
    return config;
  },
  error => {
    loading.close()
    Message.error('请求超时!');
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    loading.close()
    // 请求成功
    return response.data
  },
  error => {
    loading.close()
    let { response } = error; // 获取失败的信息提示
    if (response) {
      switch (response.status) {
        case 400:
          console.log('错误请求');
          break;
        case 401:
          console.log('未授权，请重新登录');
          break;
        case 403:
          console.log('拒绝访问 一般是token过期');
          localStorage.removeItem('token');
          // 跳转到登录页
          break;
        case 404:
          console.log('请求错误,未找到该资源');
          break;
        case 405:
          console.log('请求方法未允许');
          break;
        case 408:
          console.log('请求超时');
          break;
        case 500:
          console.log('服务器端出错');
          break;
        case 501:
          console.log('网络未实现');
          break;
        case 502:
          console.log('网络错误');
          break;
        case 503:
          console.log('服务不可用');
          break;
        case 504:
          console.log('网络超时');
          break;
        case 505:
          console.log('http版本不支持该请求');
          break;
        default:
          console.log(`连接错误${error.response.status}`)
      }
    } else {
      if (!window.navigator.onLine) {
        // 断网处理：可以跳转到断网页面 然后在断网页做个按钮刷新用this.$router.go(-1)返回之前页面
        return
      }
      return Promise.reject(error)
    }
  }
)

// 封装promise get - post
export const  get = (url,params={}) => {
  return new Promise((resolve, reject) => {
    instance.get(url,{params}).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url,data).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

