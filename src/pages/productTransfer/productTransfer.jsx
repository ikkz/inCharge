import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './productTransfer.css'
import { AtList, AtListItem, AtButton, AtInputNumber } from 'taro-ui'
import * as api from '../../utils/api';
import * as util from '../../utils/util';

export default class ProductTransfer extends Component {
  config = {
    navigationBarTitleText: '出入库'
  }

  actions = ['出库', '入库', '调拨']

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
    if (this.state.Action !== 0 && this.state.Action !== 2) {
      Taro.showToast({
        title: '该功能无需选择',
        icon: 'none'
      });
      return;
    }
    this.setState({
      OwnerFrom: this.state.warehouses[e.detail.value].ID
    });
  }

  onOwnerToSelect = (e) => {
    let OwnerTo = 0;
    if (this.state.Action === 1 || this.state.Action === 2) {
      OwnerTo = this.state.warehouses[e.detail.value].ID;
    } else if (this.state.Action === 0) {
      OwnerTo = this.state.stores[e.detail.value].ID;
    } else {
      Taro.showToast({
        title: '该功能无需选择',
        icon: 'none'
      });
      return;
    }
    this.setState({
      OwnerTo
    });
  }
  onClickAddProduct = () => {
    Taro.navigateTo({
      url: `/pages/products/products?fn=getProduct&param={"OwnerID":${this.state.OwnerFrom},"InShelf":false}&select=true`,
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
            <Picker mode='selector' range={this.state.warehouses.map((v) => `${v.ID} 号仓库`)}
              onChange={this.onOwnerFromSelect}>
              <AtButton>
                {this.state.OwnerFrom !== 0 ?
                  `${this.state.OwnerFrom} 号仓库` : "暂未选择"}
              </AtButton>
            </Picker>
          </View>
          <Text style="padding:10px">
            =>
          </Text>
          <View style="flex:1">
            <Picker mode='selector' range={this.state.Action == 0 ?
              this.state.stores.map((v) => `${v.ID} 号商店: ${v.Name}`) :
              this.state.warehouses.map((v) => `${v.ID} 号仓库`)}
              onChange={this.onOwnerToSelect}>
              <AtButton>{this.state.OwnerTo !== 0 ?
                `${this.state.OwnerTo} 号${this.state.Action === 0 ? "商店" : "仓库"}` : "暂未选择"}</AtButton>
            </Picker>
          </View>
        </View>
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
        <AtButton onClick={this.onClickNewProduct}>新增商品</AtButton>
        <AtList>
          {
            this.state.NewProducts.map((value) => {
              return <AtListItem key={value.Code} title={value.Name} extraText={`${value.Rest} 个`}
                note={`分类：${value.Classification} 编码：${value.Code}`} />
            })
          }
        </AtList>

        <AtButton onClick={this.submit}>提交操作</AtButton>
      </View>
    )
  }
}
