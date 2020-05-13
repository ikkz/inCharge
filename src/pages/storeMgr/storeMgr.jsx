import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './storeMgr.css'

export default class Storemgr extends Component {

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
      <View className='storeMgr'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
