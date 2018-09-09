import Mock from 'mockjs';
Mock.mock(/\.json/,{
  'list|1-10': [{
      'id|+1': 1
  }]
})