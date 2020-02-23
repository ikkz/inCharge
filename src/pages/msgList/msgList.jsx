import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './msgList.css'
import * as api from '../../utils/api';
import MsgItem from '../../components/msgItem';

export default class Msglist extends Component {

  config = {
    navigationBarTitleText: '消息列表'
  }
  type = 0;

  state = {
    list: []
  }

  componentWillMount() {
    if (this.$router.params.type) {
      this.type = parseInt(this.$router.params.type)
    }
  }

  componentDidMount = async () => {
    Taro.showLoading({
      title: '加载中'
    });
    try {
      let response = await api.getAdminMsg({
        StoreID: parseInt(Taro.getStorageSync('store')),
        Type: this.type
      });
      if (response.code === api.errors.Ok) {
        this.setState({
          list: response.data.reverse()
        });
      }
      Taro.hideLoading();
    } catch (error) {
      Taro.hideLoading();
    }
  }

  render() {
    return (
      <View className='msgList'>
        {
          this.state.list.map((v) => <MsgItem msg={v} />)
        }
      </View>
    )
  }
}
