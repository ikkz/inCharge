import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './tickets.css'
import * as api from '../../utils/api';
import * as util from '../../utils/util';
import { AtList, AtListItem, AtButton } from 'taro-ui';

export default class Tickets extends Component {
  config = {
    navigationBarTitleText: '商品优惠',
    enablePullDownRefresh: true
  }

  state = {
    tickets: []
  }

  componentDidShow() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh = async () => {
    try {
      let response = await api.getTickets({
        StoreID: parseInt(Taro.getStorageSync('store'))
      });
      if (response.code === api.errors.Ok) {
        this.setState({
          tickets: response.data
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      Taro.stopPullDownRefresh();
    }
  }

  createTicket = () => {
    Taro.navigateTo({
      url: '/pages/createTicket/createTicket'
    });
  }

  render() {
    return (
      <View className='tickets'>
        <View style="padding:15px">
          <AtButton type='primary' onClick={this.createTicket}>
            添加折扣券
          </AtButton>
        </View>
        <AtList>
          {
            this.state.tickets.map((v) => {
              return <AtListItem key={v.ID} arrow='right'
                title={v.Name + ' - ' + (v.Type ? `满 ${v.Original} 减 ${v.Reduce}` : `${v.Percent} 折`)}
                note={`${util.tsToDate(v.Begin)} - ${util.tsToDate(v.End)}`}
                extraText={v.GetType ? `${v.Level} 级以上用户` : `限领 ${v.Count} 张`} />
            })
          }
        </AtList>
      </View>
    )
  }
}
