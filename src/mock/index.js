import Mock from 'mockjs';

import '@/mock/login' // 登陆页面的数据
import '@/mock/baseTable' // 基本表格数据
import '@/mock/sideMenuMock' // 登陆页面的数据
import '@/mock/upload' // 登陆页面的数据


import '@/mock/hotMock' // 登陆页面的数据
import '@/mock/mapMock' // 登陆页面的数据
import '@/mock/rankMock' // 登陆页面的数据
import '@/mock/sellerMock' // 登陆页面的数据
import '@/mock/stockMock' // 登陆页面的数据
import '@/mock/trendMock' // 登陆页面的数据


// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});



