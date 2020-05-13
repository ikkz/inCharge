import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './filter.css'
import Range from '../../components/range'
import { AtButton } from 'taro-ui'
import { makeNavigate } from '../../utils/util'

export default class Filter extends Component {
  config = {
    navigationBarTitleText: '商品筛选'
  }

  state = {
    Rest: {},
    Cost: {},
    Price: {},
    Address: {},
  }

  makeProps = (field, name) => {
    return {
      name: name,
      value: this.state[field],
      onChange: (value) => {
        let newState = {};
        newState[field] = value;
        this.setState(newState);
      }
    };
  }

  onQuery = () => {
    let param = JSON.stringify({
      ...JSON.parse(this.$router.params.param),
      Rest: this.state.Rest,
      Cost: this.state.Cost,
      Price: this.state.Price,
      Address: this.state.Address,
    });
    console.log(param);
    Taro.navigateTo({
      url: `/pages/products/products?fn=filterProduct&param=${param}`
    });
  }

  render() {
    return (
      <View className='filter'>
        <Range {... this.makeProps('Rest', '剩余数量')} />
        <Range {... this.makeProps('Cost', '成本价格')} />
        <Range {... this.makeProps('Price', '销售价格')} />
        <Range {... this.makeProps('Address', '仓库位置')} />

        <View style="padding:15px">
          <AtButton type='primary' onClick={this.onQuery}>查询</AtButton>
        </View>
      </View>
    )
  }
}
