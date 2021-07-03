import Mock from 'mockjs';

let sellerData = Mock.mock(RegExp('/api/seller'+".*"), "get",dataRull)


const data = [];

for (let i = 1;i <= 15; i++) {
  data.push({
    name: '商家'+i,
    value: Math.floor(Math.random() * 200)
  })
}


function dataRull() {
  return data
}



export default sellerData;
