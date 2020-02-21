import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './createTicket.css'

export default class Createticket extends Component {

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
      <View className='createTicket'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
