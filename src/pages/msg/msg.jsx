import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./msg.css";
import { AtList, AtListItem } from "taro-ui";
import { makeNavigate } from "../../utils/util";

export default class Msg extends Component {
  config = {
    navigationBarTitleText: "消息"
  };

  makeNavigate = type => {
    return () => {
      Taro.navigateTo({
        url: `/pages/msgList/msgList?type=${type}`
      });
    };
  };

  render() {
    return (
      <View className="msg">
        <AtList>
          <AtListItem
            arrow="right"
            title="仓库消息"
            note="商品出库入库"
            onClick={this.makeNavigate(1)}
          />
          <AtListItem
            arrow="right"
            title="表单消息"
            note="接受传过来的表单"
            onClick={makeNavigate(`/pages/helper/helper?mkey=table`)}
          />
          <AtListItem
            arrow="right"
            title="数据消息"
            note="每日接受数据账单结算"
            onClick={this.makeNavigate(3)}
          />
          <AtListItem
            arrow="right"
            title="商店消息"
            note="商品上架，商品过期"
            onClick={this.makeNavigate(4)}
          />
          <AtListItem
            arrow="right"
            title="系统消息"
            onClick={makeNavigate(`/pages/helper/helper?mkey=report`)}
          />
        </AtList>
      </View>
    );
  }
}
