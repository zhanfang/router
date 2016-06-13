import Router from '../index.js'
import './index.less'

const router = new Router({
  container: '#container',
  enterTimeout: 300,
  leaveTimeout: 300
})

// 主页
const home = {
  url: '/',
  className: 'home',
  render: function () {
    return "<h1>123</h1>"
  }
}

// 测试页面1
const test1 = {
  url: '/test1',
  className: 'test1',
  render: function () {
    return document.getElementById('test1').innerHTML
  },
  bind: function () {
    document.getElementById('h2').addEventListener('click', function (e) {
      alert('123');
    });
  }
}
router.push(home).push(test1).setDefault('/').init()
