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

  createWarehouse = async () => {
    try {
      Taro.showLoading({
        title: '创建中...'
      });
      let response = await api.createWarehouse({
        StoreID: parseInt(Taro.getStorageSync('store'))
      });
      if (response.code === api.errors.Ok) {
        Taro.hideLoading();
        Taro.showToast({
          title: `成功创建 ${response.data.ID} 号仓库`,
          icon: 'none'
        });
        Taro.startPullDownRefresh();
      }
    } catch (error) {
      Taro.hideLoading();
      console.error(error);
    }
  }

  render() {
    return (
      <View className='warehouse'>
        <AtList>
          <Picker mode='selector' range={this.state.warehouses.map((value) => `${value.ID} 号仓库`)}
            onChange={this.selectWarehouse}>
            <AtListItem title='切换仓库' />
          </Picker>
          <AtListItem title='新建仓库' arrow='right' onClick={this.createWarehouse} />
          {
            this.state.id ?
              <View>
                <AtListItem title='出入库' arrow='right'
                  onClick={util.makeNavigate('/pages/productTransfer/productTransfer')} />
                <AtListItem title='仓库商品概览' arrow='right'
                  onClick={util.makeNavigate(`/pages/products/products?fn=getProduct&param={"OwnerID":${this.state.id},"InShelf":false}`)} />
                <AtListItem title='仓库商品搜索' arrow='right'
                  onClick={util.makeNavigate(`/pages/products/products?fn=getProduct&param={"OwnerID":${this.state.id},"InShelf":false}`)} />
                <AtListItem title='仓库商品筛选' arrow='right'
                  onClick={util.makeNavigate(`/pages/filter/filter?param={"OwnerID":${this.state.id},"InShelf":false}`)} />
                <AtListItem title='库存流水' arrow='right'
                  onClick={util.makeNavigate(`/pages/warehouseLog/warehouseLog?id=${this.state.id}`)} />
              </View> : <View />
          }
        </AtList>
      </View >
    )
  }
}
