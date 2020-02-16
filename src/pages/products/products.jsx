import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './products.css'
import '../../app.css'
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import { AtInput, AtButton, AtCheckbox } from 'taro-ui';
import ProductPreview from '../../components/productPreview';

export default class Products extends Component {
  config = {
    navigationBarTitleText: '商品列表',
    enablePullDownRefresh: true
  }

  state = {
    products: [],
    options: [],
    selectedList: []
  }

  fn = '';
  params = {};
  select = false;

  componentWillMount() {
    if (this.$router.params.fn) {
      this.fn = this.$router.params.fn;
    }
    if (this.$router.params.param) {
      this.params = JSON.parse(this.$router.params.param);
    }
    if (this.$router.params.select) {
      this.select = this.$router.params.select === "true";
    }
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh = async () => {
    try {
      let apiFn = api[this.fn];
      if (apiFn) {
        let response = await apiFn(this.params);
        if (response.code === api.errors.Ok) {
          let options = [];
          if (this.select) {
            options = response.data.map((v) => ({
              value: v.ID,
              label: v.Name,
              desc: `分类：${v.Classification} 编码：${v.Code}`
            }));
          }
          this.setState({
            products: response.data,
            options
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      Taro.stopPullDownRefresh();
    }
  }

  onProductClick = (id) => {
    Taro.navigateTo({
      url: `/pages/productInfo/productInfo?id=${id}`
    });
  }

  onSelectChange = (value) => {
    this.setState({
      selectedList: value
    });
    const eventChannel = this.$scope.getOpenerEventChannel();
    eventChannel.emit('acceptSelects', this.state.products.filter((v) => {
      if (value.findIndex((id) => parseInt(id) === v.ID) >= 0) {
        return v;
      }
    }));
  }

  render() {
    return (
      <View className='products'>
        {this.select ?
          <AtCheckbox options={this.state.options} selectedList={this.state.selectedList}
            onChange={this.onSelectChange} /> :
          this.state.products.map((value) => {
            return <View key={value.ID}
              style="padding:5px">
              <ProductPreview {...value} onClick={() => this.onProductClick(value.ID)} />
            </View>
          })}
      </View>
    )
  }
}
