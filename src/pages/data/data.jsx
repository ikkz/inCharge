import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './data.css'

export default class Data extends Component {

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
      <View className='data'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
