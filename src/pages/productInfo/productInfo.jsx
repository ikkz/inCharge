import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './productInfo.css'
import '../../app.css';

import * as api from '../../utils/api';
import * as util from '../../utils/util';
import { AtInput, AtButton } from 'taro-ui';

export default class ProductInfo extends Component {

  id = 0;
  state = {
    product: {
      ShelfTime: Date.now(),
      ExpTime: Date.now()
    },
    disabled: true
  }

  componentWillMount() {
    if (this.$router.params.id) {
      this.id = parseInt(this.$router.params.id)
    }
    if (this.$router.params.disabled) {
      this.setState({
        disabled: this.$router.params.disabled !== "false"
      });
    }
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    this.fetch();
  }

  componentDidHide() { }

  fetch = async () => {
    if (this.id !== 0) {
      Taro.showLoading({
        title: '加载中'
      });
      try {
        let response = await api.getProduct({
          id: this.id
        });
        if (response.code === api.errors.Ok) {
          if (response.data.length !== 0) {
            this.setState({
              product: response.data[0]
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        Taro.hideLoading();
      }
    }
  }

  config = {
    navigationBarTitleText: '产品信息'
  }

  changeField = (field, isDate) => {
    return (value) => {
      let product = {
        ...this.state.product
      };
      product[field] = isDate ? Date.parse(value.detail.value) : value;
      this.setState({
        product
      });
    };
  }

  submit = async () => {
    if (
      util.isNull(this.state.product.Cost) ||
      util.isNull(this.state.product.Price) ||
      util.isNull(this.state.product.Classification) ||
      util.isNull(this.state.product.ShelfRest) ||
      util.isNull(this.state.product.ShelfTime) ||
      util.isNull(this.state.product.ShelfAddress) ||
      util.isNull(this.state.product.Code) ||
      util.isNull(this.state.product.ExpTime)
    ) {
      Taro.showToast({
        title: '部分信息不全，请重新填写'
      });
      return;
    }
    Taro.showLoading({
      title: '提交中'
    });
    try {
      let response = await api.updateProduct({
        Cost: parseFloat(this.state.product.Cost),
        Price: parseFloat(this.state.product.Price),
        Classification: this.state.product.Classification,
        ShelfRest: parseInt(this.state.product.ShelfRest),
        ShelfTime: this.state.product.ShelfTime,
        ShelfAddress: parseInt(this.state.product.ShelfAddress),
        Code: this.state.product.Code,
        ExpTime: this.state.product.ExpTime,
      });
      if (response.code !== api.errors.Ok) {
        console.error(response);
      }
    } catch (error) {
      console.error(response);
    } finally {
      Taro.hideLoading();
    }
  }

  render() {
    return (
      <View className='productInfo'>
        <AtInput disabled={this.state.disabled} title='成本' type='digit' onChange={this.changeField("Cost")} value={this.state.product.Cost} />
        <AtInput disabled={this.state.disabled} title='价格' type='digit' onChange={this.changeField("Price")} value={this.state.product.Price} />
        <AtInput disabled={this.state.disabled} title='分类' type='text' onChange={this.changeField("Classification")} value={this.state.product.Classification} />

        <AtInput disabled={this.state.disabled} title='余量' type='number' onChange={this.changeField("ShelfRest")} value={this.state.product.ShelfRest} />
        <AtInput disabled={this.state.disabled} title="上架时间" type="text" value={util.tsToDate(this.state.product.ShelfTime)}>
          <Picker disabled={this.state.disabled} mode='date' value={util.tsToDate(this.state.product.ShelfTime)}
            onChange={this.changeField('ShelfTime', true)}>
            <AtButton disabled={this.state.disabled}>选择日期</AtButton>
          </Picker>
        </AtInput>

        <AtInput disabled={this.state.disabled} title='货架位置' type='number' onChange={this.changeField("ShelfAddress")} value={this.state.product.ShelfAddress} />

        <AtInput disabled={this.state.disabled} title='商品编码' type='text' onChange={this.changeField("Code")} value={this.state.product.Code} />
        <AtInput disabled={this.state.disabled} title="过期日期" type="text" value={util.tsToDate(this.state.product.ExpTime)}>
          <Picker disabled={this.state.disabled} mode='date' value={util.tsToDate(this.state.product.ExpTime)}
            onChange={this.changeField('ExpTime', true)}>
            <AtButton disabled={this.state.disabled}>选择日期</AtButton>
          </Picker>
        </AtInput>
        <View className="btn-view">
          <AtButton disabled={this.state.disabled} onClick={this.submit}>
            确定
        </AtButton>
        </View>
      </View>
    )
  }
}
