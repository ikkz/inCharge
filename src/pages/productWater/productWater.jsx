import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./productWater.css";
import { AtInput, AtButton } from "taro-ui";

export default class Productwater extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "商品流水"
  };

  render() {
    return (
      <View className="productWater">
        <View style="display:flex;align-items:center;padding:10px">
          <View style="flex:1;padding:5px;text-align:center">
            <AtInput value={new Date().toLocaleDateString()} />
          </View>
          <View style="padding:2px"> - </View>
          <View style="flex:1;padding:5px;text-align:center">
            <AtInput value={new Date().toLocaleDateString()} />
          </View>
          <AtButton>筛选</AtButton>
          <AtButton type="secondary">搜索</AtButton>
        </View>
        <View className="at-row at-row__align--center">
          <View className="at-col">
            <SummaryCard value={32} name="销售笔数" />
          </View>
          <View className="at-col">
            <SummaryCard value={0} name="退货笔数" />
          </View>
        </View>
        <View className="at-row at-row__align--center">
          <View className="at-col">
            <SummaryCard value={428} name="收款合计" />
          </View>
          <View className="at-col">
            <SummaryCard valotue={0} name="退款合计" />
          </View>
        </View>
      </View>
    );
  }
}
