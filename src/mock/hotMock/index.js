import Mock from 'mockjs';

const rankData = Mock.mock(RegExp('/api/hot'+".*"), "get",dataRull)
// 数据
const data =Mock.mock({
  code: 'OK',
  message: '成功',
  data: [
    {name: '女装',children: [
        {name:'裙装',value: 56202,children: [{name: 'xx',value: 23234}]},
        {name:'女士上衣',value: 30213,children: [{name: 'xx',value: 23234}]},
        {name:'外套',value: 32412,children: [{name: 'xx',value: 23234}]},
      ]},
    {name: '手机数码',children: [
        {name:'华为',value: 56202,children: [{name: 'xx',value: 23234}]},
        {name:'苹果',value: 34242,children: [{name: 'xx',value: 23234}]},
        {name:'oppo',value: 76565,children: [{name: 'xx',value: 23234}]},
      ]},
    {name: '美妆护肤',children: [
        {name:'大宝',value: 56202,children: [{name: 'xx',value: 23234}]},
        {name:'洗手霜',value: 23432,children: [{name: 'xx',value: 23234}]},
        {name:'洗面奶',value: 67545,children: [{name: 'xx',value: 23234}]},
      ]}
  ]
});



function dataRull() {
  return data
}

export default rankData;
