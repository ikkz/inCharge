import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './products.css'
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import { AtInput, AtButton } from 'taro-ui';

export default class Products extends Component {
  config = {
    navigationBarTitleText: '在售商品'
  }


  id = 0;

  state = {
    products: []
  }

  componentWillMount() {
    const storeId = Taro.getStorageSync('store');
    if (!util.isNull(storeId)) {
      this.id = parseInt(storeId);
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = async () => {
    try {
      Taro.showLoading({
        title: '加载商品中'
      });
      let response = api.getProduct();
      if (response.code === api.errors.Ok) {
        this.setState({
          products: response.data
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      Taro.hideLoading();
    }
  }

  onCreateProduct = () => {
    Taro.navigateTo({
      url: '/pages/productInfo/productInfo?disabled=false'
    });
  }

  render() {
    return (
      <View className='products'>
        <AtButton onClick={this.onCreateProduct}>创建商品</AtButton>
      </View>
    )
  }
}
