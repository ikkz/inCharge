import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './admins.css'

export default class Admins extends Component {

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
      <View className='admins'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
