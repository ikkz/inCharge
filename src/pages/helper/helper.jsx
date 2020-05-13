import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './helper.css'

export default class Helper extends Component {

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
      <View className='helper'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
