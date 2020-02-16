import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './warehouse.css'

import * as api from '../../utils/api';
import * as util from '../../utils/util';
import { AtList, AtListItem, AtButton } from 'taro-ui';

export default class Warehouse extends Component {
  config = {
    navigationBarTitleText: '请选择一个仓库',
    enablePullDownRefresh: true
  }

  state = {
    id: 0,
    warehouses: [],
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
    let id = this.state.warehouses[e.detail.value].ID;
    if (id) {
      this.setState({
        id
      });
      Taro.setNavigationBarTitle({
        title: `${id} 号仓库`
      });
    }
  }

  render() {
    return (
      <View className='warehouse'>
        <View style="display:flex">
          <View style="flex:1;padding:10px">
            <Picker mode='selector' range={this.state.warehouses.map((value) => value.ID)}
              onChange={this.selectWarehouse}>
              <AtButton>切换仓库</AtButton>
            </Picker>
          </View>
          <View style="flex:1;padding:10px">
            <AtButton>新建仓库</AtButton>
          </View>
          <View style="flex:1;padding:10px">
            <AtButton onClick={util.makeNavigate('/pages/productTransfer/productTransfer')}>出入库</AtButton>
          </View>
        </View>
        <AtList>
          <AtListItem title='仓库商品概览' arrow='right'
            onClick={util.makeNavigate(`/pages/products/products?fn=getProduct&param={"OwnerID":${this.state.id},"InShelf":false}`)} />
          <AtListItem title='库存流水' arrow='right'
            onClick={util.makeNavigate(`/pages/warehouseLog/warehouseLog?id=${this.state.id}`)} />
        </AtList>
      </View >
    )
  }
}
