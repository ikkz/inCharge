import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './warehouse.css'

export default class Warehouse extends Component {

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
      <View className='warehouse'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
