import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./sellDetail.css";
import { AtList, AtListItem } from "taro-ui";

export default class Selldetail extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "销售详情"
  };

  render() {
    return (
      <View className="sellDetail">
        <AtList>
          <AtListItem title="销售编号" extraText="10002" />
          <AtListItem title="会员号" extraText="1" />
          <AtListItem title="结算柜台" extraText="1" />
          <AtListItem title="结算方式" extraText="现金" />
          <AtListItem title="收银员编号" extraText="1" />
          <AtListItem title="分类" extraText="饮料" />
          <AtListItem title="原价" extraText="5" />
          <AtListItem title="折扣（%）" extraText="100" />
          <AtListItem title="折后价" extraText="100" />
          <AtListItem title="商品编码" extraText="1" />
        </AtList>
      </View>
    );
  }
}
