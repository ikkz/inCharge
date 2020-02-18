import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './productTransfer.css'
import { AtList, AtListItem, AtButton, AtInputNumber, AtDivider } from 'taro-ui'
import * as api from '../../utils/api';
import * as util from '../../utils/util';

export default class ProductTransfer extends Component {
  config = {
    navigationBarTitleText: '出入库'
  }

  actions = ['采购入库', '退货入库', '生产入库', '销售出库', '退货出库', '领料出库', '仓库调拨']
  owners = [
    [0, 1],
    [2, 1],
    [0, 1],
    [1, 2],
    [1, 0],
    [1, 0],
    [1, 1],
  ]

  getOwnerType = (dest) => {
    if (this.state.Action >= 0 && this.state.Action <= 6 && (dest === 0 || dest === 1)) {
      return this.owners[this.state.Action][dest];
    } else {
      return 0;
    }
  }

  getRange = (dest) => {
    switch (this.getOwnerType(dest)) {
      case 1:
        return this.state.warehouses.map((v) => `${v.ID} 号仓库`);
      case 2:
        return this.state.stores.map((v) => `${v.ID} 号商店: ${v.Name}`);
      default:
        return [];
    }
  }

  getSelectName = (dest) => {
    let id = (dest === 0 ? this.state.OwnerFrom : this.state.OwnerTo);
    switch (this.getOwnerType(dest)) {
      case 1:
        return id ? `${id} 号仓库` : '暂未选择';
      case 2:
        return id ? `${id} 号商店` : '暂未选择';
      default:
        return '暂未选择';
    }
  }

  state = {
    Action: undefined,
    OwnerFrom: 0,
    OwnerTo: 0,
    NewProducts: [],

    warehouses: [],
    stores: [],
    selectedProducts: []
  }

  componentDidMount = async () => {
    try {
      Taro.showLoading({
        title: '加载数据中...'
      });
      let stores = [], warehouses = [];
      let response = await api.getStoreByBoss({
        id: Taro.getApp().store.BossID
      });
      if (response.code === api.errors.Ok) {
        stores = response.data;
      }
      response = await api.getWarehouses({
        StoreID: parseInt(Taro.getStorageSync('store'))
      });
      if (response.code === api.errors.Ok) {
        warehouses = response.data;
      }
      this.setState({
        stores,
        warehouses
      });
    } catch (error) {
      console.error(error);
    } finally {
      Taro.hideLoading();
    }
  }

  onActionSelect = (e) => {
    let index = e.detail.value;
    this.setState({
      Action: parseInt(index),
      OwnerFrom: 0,
      OwnerTo: 0,
      NewProducts: [],
      selectedProducts: []
    });
  }

  onOwnerFromSelect = (e) => {
    let OwnerFrom;
    let ownerType = this.getOwnerType(0);
    if (ownerType === 1) {
      OwnerFrom = this.state.warehouses[e.detail.value].ID;
    } else if (ownerType === 2) {
      OwnerFrom = this.state.stores[e.detail.value].ID;
    } else {
      OwnerFrom = 0;
      Taro.showToast({
        title: '该功能无需选择',
        icon: 'none'
      });
    }
    this.setState({
      OwnerFrom
    });
  }

  onOwnerToSelect = (e) => {
    let OwnerTo = 0;
    let ownerType = this.getOwnerType(1);
    if (ownerType === 1) {
      OwnerTo = this.state.warehouses[e.detail.value].ID;
    } else if (ownerType === 2) {
      OwnerTo = this.state.stores[e.detail.value].ID;
    } else {
      OwnerTo = 0;
      Taro.showToast({
        title: '该功能无需选择',
        icon: 'none'
      });
    }
    this.setState({
      OwnerTo
    });
  }
  onClickAddProduct = () => {
    let ownerType = this.getOwnerType(0);
    if (ownerType === 0) {
      return;
    }
    Taro.navigateTo({
      url: `/pages/products/products?fn=getProduct&param={"OwnerID":${this.state.OwnerFrom},"InShelf":${ownerType === 2}}&select=true`,
      events: {
        acceptSelects: (selects) => {
          this.setState({
            selectedProducts: selects
          });
        }
      }
    });
  }

  onClickNewProduct = () => {
    Taro.navigateTo({
      url: '/pages/productInfo/productInfo?disabled=false',
      events: {
        acceptProductInfo: (pi) => {
          let NewProducts = [... this.state.NewProducts, pi];
          this.setState({
            NewProducts
          });
        }
      }
    });
  }

  onCountChange = (index, value) => {
    let selectedProducts = this.state.selectedProducts;
    selectedProducts[index].Count = value;
    this.setState({
      selectedProducts
    });
  }

  submit = async () => {
    if (util.isNull(this.state.OwnerTo)) {
      Taro.showToast({
        title: '请填写缺失信息',
        icon: 'none'
      });
      return;
    }
    try {
      Taro.showLoading({
        title: '提交中'
      });
      let Products = {};
      this.state.selectedProducts.forEach((value) => {
        Products[value.ID] = parseInt(value.Count);
      });
      let response = await api.tranferProduct({
        Action: this.state.Action,
        OwnerFrom: this.state.OwnerFrom,
        OwnerTo: this.state.OwnerTo,
        Products: Products,
        NewProducts: this.state.NewProducts
      });
      Taro.hideLoading();
      if (response.code === api.errors.Ok) {
        await Taro.showToast({
          title: '提交成功'
        });
        Taro.navigateBack();
      } else {
        await Taro.showToast({
          title: '提交失败',
          icon: 'none'
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View className='productTransfer'>
        <AtList>
          <Picker mode='selector' range={this.actions}
            onChange={this.onActionSelect}>
            <AtListItem title="功能" extraText={this.state.Action !== undefined ?
              this.actions[this.state.Action] : "暂未选择"} />
          </Picker>
        </AtList>
        <View style="display:flex;padding:10px;">
          <View style="flex:1">
            <Picker mode='selector' range={this.getRange(0)}
              onChange={this.onOwnerFromSelect}>
              <AtButton>
                {this.getSelectName(0)}
              </AtButton>
            </Picker>
          </View>
          <Text style="padding:10px">
            =>
          </Text>
          <View style="flex:1">
            <Picker mode='selector' range={this.getRange(1)}
              onChange={this.onOwnerToSelect}>
              <AtButton>{this.getSelectName(1)}</AtButton>
            </Picker>
          </View>
        </View>
        <View style="padding:10px;">
          {
            this.getOwnerType(0) === 0 ?
              <View /> :
              <View style="padding-top:5px;padding-bottom:5px;">
                <AtButton onClick={this.onClickAddProduct}>选择商品</AtButton>
                <AtList>
                  {
                    this.state.selectedProducts.map((value, index) => {
                      return <View style="display:flex;align-items:center" key={value.Code} >
                        <View style="flex:1">
                          <AtListItem title={value.Name} extraText={`${value.Rest} 个`}
                            note={`分类：${value.Classification} 编码：${value.Code}`} />
                        </View>
                        <AtInputNumber min={0} max={value.Rest} step={1} value={value.Count || 0}
                          onChange={(v) => this.onCountChange(index, v)} />
                      </View>
                    })
                  }
                </AtList>
              </View>
          }

          {
            this.state.Action === 0 || this.state.Action === 2 ?
              <View style="padding-top:5px;padding-bottom:5px;">
                <AtButton onClick={this.onClickNewProduct}>新增商品</AtButton>
                <AtList>
                  {
                    this.state.NewProducts.map((value) => {
                      return <AtListItem key={value.Code} title={value.Name} extraText={`${value.Rest} 个`}
                        note={`分类：${value.Classification} 编码：${value.Code}`} />
                    })
                  }
                </AtList>
              </View> :
              <View />
          }

          <AtButton type='primary' onClick={this.submit}>提交操作</AtButton>
        </View>
      </View>
    )
  }
}
