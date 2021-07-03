import Mock from 'mockjs';

const  Random = Mock.Random;
const trendData = Mock.mock(RegExp('/api/trend'+".*"), "get",dataRull)

// 数据类型：地区销量趋势、商家、商品

// 数据
const data =Mock.mock({
  code: 'OK',
  message: '成功',
  data: {
    area: {
      title: '地区销量趋势',base: 310,unit: '万',data: [
        {name: '北京',"data|12": [() => Random.integer(0, 200)]},
        {name: '上海',"data|12": [() => Random.integer(0, 200)]},
        {name: '深圳',"data|12": [() => Random.integer(0, 200)]},
        {name: '广州',"data|12": [() => Random.integer(0, 200)]},
        {name: '重庆',"data|12": [() => Random.integer(0, 200)]},
      ]
    },
    seller: {
      title: '商家销量趋势',base: 120,unit: '万',data: [
        {name: '北京',"data|12": [() => Random.integer(0, 200)]},
        {name: '上海',"data|12": [() => Random.integer(0, 200)]},
        {name: '深圳',"data|12": [() => Random.integer(0, 200)]},
        {name: '广州',"data|12": [() => Random.integer(0, 200)]},
        {name: '重庆',"data|12": [() => Random.integer(0, 200)]},
      ]
    },
    sales: {
      title: '商品销量趋势',base:50,unit: '万',data: [
        {name: '北京',"data|12": [() => Random.integer(0, 200)]},
        {name: '上海',"data|12": [() => Random.integer(0, 200)]},
        {name: '深圳',"data|12": [() => Random.integer(0, 200)]},
        {name: '广州',"data|12": [() => Random.integer(0, 200)]},
        {name: '重庆',"data|12": [() => Random.integer(0, 200)]},
      ]
    },
    common: {
      month: ['一月','二月','三月','四月','五月','六月','七月','八月',
        '九月','十月','十一月','十二月',]
    },
    type: [
      { key: 'area', text: '地区销量趋势' },
      { key: 'seller', text: '商家销量趋势' },
      { key: 'sales', text: '商品销量趋势' },
    ]
  }
});


function dataRull() {
  return data
}

export default trendData;
