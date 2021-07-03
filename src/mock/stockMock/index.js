import Mock from 'mockjs';

const stockData = Mock.mock(RegExp('/api/stock'+".*"), "get",dataRull)
// 数据
const data =Mock.mock({
  code: 'OK',
  message: '成功',
  data: [
    {name: 'oppo', stock: 2133, sales: 1233},
    {name: '华为', stock: 3445, sales: 1233},
    {name: '苹果', stock: 2133, sales: 1233},
    {name: 'vivo', stock: 2133, sales: 1233},
    {name: 'oppo', stock: 2133, sales: 1233},
    {name: 'oppo', stock: 2133, sales: 1233},
    {name: 'oppo', stock: 2133, sales: 1233},
    {name: 'oppo', stock: 2133, sales: 1233},
    {name: 'oppo', stock: 2133, sales: 1233},
    {name: 'oppo', stock: 2133, sales: 1233},

  ]
});

function dataRull() {
  return data
}

export default stockData;
