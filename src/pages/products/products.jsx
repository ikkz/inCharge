import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './products.css'
import '../../app.css'
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import { AtInput, AtButton, AtCheckbox, AtDivider, AtSearchBar } from 'taro-ui';
import ProductPreview from '../../components/productPreview';

export default class Products extends Component {
  config = {
    navigationBarTitleText: '商品列表',
    enablePullDownRefresh: true
  }

  state = {
    products: [],
    options: [],
    selectedList: [],
    searchText: ''
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
      url: `/pages/productInfo/productInfo?id=${id}&disabled=false&update=true`
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

  onSearchChange = (value) => {
    this.setState({
      searchText: value
    });
    this.onSelectChange([]);
  }

  scanSearch = async () => {
    try {
      let code = await util.getScanCode();
      this.onSearchChange(code);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View className='products'>
        {
          this.select ? <View /> :
            <AtSearchBar showActionButton
              value={this.state.searchText}
              onChange={this.onSearchChange}
              placeholder="输入名称/拼音/条码"
              actionName="扫描条码" onActionClick={this.scanSearch}
            />
        }
        {
          this.state.products.length === 0 ?
            <AtDivider content="没有商品可以显示" />
            :
            this.select ?
              <AtCheckbox options={this.state.options} selectedList={this.state.selectedList}
                onChange={this.onSelectChange} /> :
              this.state.products.filter((v) => {
                if (this.state.searchText.length == 0) {
                  return v;
                }
                for (const text of [v.Name, v.Pinyin, v.Code]) {
                  if (text.indexOf(this.state.searchText) >= 0) {
                    return v;
                  }
                }
              }).map((value) => {
                return <View key={value.ID}
                  style="padding:5px">
                  <ProductPreview {...value} onClick={() => this.onProductClick(value.ID)} />
                </View>
              })

        }
      </View>
    )
  }
}
