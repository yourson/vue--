import Mock from 'mockjs';

const rankData = Mock.mock(RegExp('/api/rank'+".*"), "get",dataRull)
// 数据
const data =Mock.mock({
  code: 'OK',
  message: '成功',
  data: [
    { name: 'A', 'value|1-250': 250},
    { name: 'B', 'value|1-250': 250},
    { name: 'C', 'value|1-250': 250},
    { name: 'D', 'value|1-250': 250},
    { name: 'E', 'value|1-250': 250},
    { name: 'F', 'value|1-250': 250},
    { name: 'G', 'value|1-250': 250},
    { name: 'H', 'value|1-250': 250},
    { name: 'I', 'value|1-250': 250},
    { name: 'J', 'value|1-250': 250},
    { name: 'K', 'value|1-250': 250},
    { name: 'L', 'value|1-250': 250},
    { name: 'M', 'value|1-250': 250},
    { name: 'N', 'value|1-250': 250},
    { name: 'O', 'value|1-250': 250},
    { name: 'P', 'value|1-250': 250},
    { name: 'Q', 'value|1-250': 250},
    { name: 'R', 'value|1-250': 250},
    { name: 'S', 'value|1-250': 250},
    { name: 'T', 'value|1-250': 250},
    { name: 'U', 'value|1-250': 250},
  ]
});



function dataRull() {
  return data
}

export default rankData;
