import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './warehouse.css'

import * as api from '../../utils/api';
import { AtList, AtListItem } from 'taro-ui';

export default class Warehouse extends Component {
  config = {
    navigationBarTitleText: '仓库',
    enablePullDownRefresh: true
  }

  state = {
    id: undefined,
    warehouses: [],
    products
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh = async () => {
    try {
      let response = await api.getWarehouses({
        StoreID: parseInt(Taro.getStorageSync('store'))
      });
      if (response.code === api.errors.Ok) {
        this.setState({
          warehouses: response.data
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      Taro.stopPullDownRefresh();
    }
  }

  selectWarehouse = (e) => {
    this.setState({
      id: this.state.warehouses[e.detail.value].ID
    });
  }

  render() {
    return (
      <View className='warehouse'>
        <Picker mode='selector' range={this.state.warehouses.map((value) => value.ID)}
          onChange={this.selectWarehouse}>
          <AtListItem title={`${this.state.id} 号仓库`} />
        </Picker>
      </View >
    )
  }
}
