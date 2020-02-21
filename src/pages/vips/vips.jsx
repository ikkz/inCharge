import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './vips.css'
import * as api from '../../utils/api';
import { AtList, AtListItem } from 'taro-ui';

export default class Vips extends Component {

  config = {
    navigationBarTitleText: '会员列表',
    enablePullDownRefresh: true
  }

  state = {
    vips: []
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh = async () => {
    try {
      let response = await api.getVip({
        StoreID: parseInt(Taro.getStorageSync('store'))
      });
      if (response.code === api.errors.Ok) {
        this.setState({
          vips: response.data
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      Taro.stopPullDownRefresh();
    }
  }

  render() {
    return (
      <View className='vips'>
        <AtList>
          {
            this.state.vips.map((v) => {
              return <AtListItem key={v.ID} title={v.Name}
                note={`${v.Phone} 积分:${v.Points} 余额:${v.Money}`}
                extraText={`会员号: ${v.ID}`} />;
            })
          }
        </AtList>
      </View>
    )
  }
}
