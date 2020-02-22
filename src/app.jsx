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
      'pages/msg/msg',
      'pages/warehouse/warehouse',
      'pages/data/data',

      'pages/products/products',
      'pages/productInfo/productInfo',
      'pages/productTransfer/productTransfer',
      'pages/warehouseLog/warehouseLog',
      'pages/vips/vips',
      'pages/filter/filter',
      'pages/tickets/tickets',
      'pages/createTicket/createTicket',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '享售',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/storeSummary/storeSummary',
        text: '商铺',
        iconPath: './assets/store.png',
        selectedIconPath: './assets/store.png'
      }, {
        pagePath: 'pages/msg/msg',
        text: '消息',
        iconPath: './assets/message.png',
        selectedIconPath: './assets/message.png'
      }, {
        pagePath: 'pages/warehouse/warehouse',
        text: '仓库',
        iconPath: './assets/warehouse.png',
        selectedIconPath: './assets/warehouse.png'
      }, {
        pagePath: 'pages/data/data',
        text: '数据',
        iconPath: './assets/data.png',
        selectedIconPath: './assets/data.png'
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
