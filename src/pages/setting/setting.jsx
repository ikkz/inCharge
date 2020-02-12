import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './setting.css'

export default class Setting extends Component {

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
      <View className='setting'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
