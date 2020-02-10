import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './storeSummary.css';
import * as api from '../../utils/api';
import * as util from '../../utils/util';
import { AtAvatar, AtButton, AtGrid, AtList, AtListItem, AtTabBar } from 'taro-ui';
import SummaryCard from '../../components/summaryCard';

export default class StoreSummary extends Component {
  id = 0;
  state = {
    storeInfo: {

    }
  }


  componentDidShow() {
    if (this.id === 0 && this.$router.params.id) {
      this.id = this.$router.params.id
    }
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh() {
    (async () => {
      let response = await api.getStoreInfo({
        id: parseInt(this.id)
      });
      if (response.code === api.errors.Ok) {
        this.setState({
          storeInfo: response.data
        });
      }
      Taro.stopPullDownRefresh();
    })();
  }


  config = {
    navigationBarTitleText: '商铺概览',
    enablePullDownRefresh: true
  }

  render() {
    return (
      <View>
        <View className='at-row at-row__align--center'>
          <View className='at-col at-col-1 at-col--auto' style={{
            padding: '10px'
          }}>
            <AtAvatar size='normal' circle={true} text='商店' />
          </View>
          <View className='at-col' style={{
            padding: '10px'
          }}>
            <Text style={{
              display: 'block'
            }}>{util.value(this.state.storeInfo.Name, '店铺名称')}</Text>
            <Text style={{
              display: 'block',
              color: 'gray'
            }}>{util.value(this.state.storeInfo.FullName, '店铺全称')}</Text>
          </View>
          <View className='at-col at-col-1 at-col--auto' style={{
            padding: '10px'
          }}>
            <AtButton size='small' circle={true}>
              设置
            </AtButton>
          </View>
        </View>

        <View className='at-row at-row__align--center'>
          <View className='at-col' >
            <SummaryCard value={1} name='客流量' />
          </View>
          <View className='at-col' >
            <SummaryCard value={2} name='营业额' />
          </View>
          <View className='at-col' >
            <SummaryCard value={3} name='毛利润' />
          </View>
        </View>

        <AtList>
          <AtListItem title='在售商品概览' arrow='right' />
          <AtListItem title='会员管理' arrow='right' />
          <AtListItem title='商券代金' arrow='right' />
          <AtListItem title='商品折扣' arrow='right' />
          <AtListItem title='商品仓库' arrow='right' />
          <AtListItem title='辅助功能' arrow='right' />
        </AtList>
        <AtTabBar
          fixed
          tabList={[
            { title: '商店', iconType: 'shopping-bag' },
            { title: '消息', iconType: 'message' },
            { title: '数据', iconType: 'analytics' },
            { title: '表单', iconType: 'menu' },
          ]}
        />
      </View>
    )
  }
}
