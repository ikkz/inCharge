import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import 'taro-ui/dist/style/index.scss'
import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/index/index',
      'pages/userInfo/userInfo',
      'pages/storeInfo/storeInfo',

      'pages/storeSummary/storeSummary',
      'pages/setting/setting',
      'pages/warehouse/warehouse',
      'pages/data/data',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/storeSummary/storeSummary',
        text: '商铺'
      }, {
        pagePath: 'pages/setting/setting',
        text: '设置'
      }, {
        pagePath: 'pages/warehouse/warehouse',
        text: '仓库'
      }, {
        pagePath: 'pages/data/data',
        text: '数据'
      }]
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
