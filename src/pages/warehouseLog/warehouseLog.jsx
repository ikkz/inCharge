import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './warehouseLog.css'

export default class Warehouselog extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='warehouseLog'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
