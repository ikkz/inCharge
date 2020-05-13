import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './report.css'

export default class Report extends Component {

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
      <View className='report'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
