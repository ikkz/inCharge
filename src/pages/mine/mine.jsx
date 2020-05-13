import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./mine.css";
import { AtList, AtListItem } from "taro-ui";
import { makeNavigate } from "../../utils/util";

export default class Mine extends Component {
  componentWillMount() {
    Taro.setNavigationBarTitle({
      title: Taro.getApp().userInfo.Name
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "设置"
  };

  render() {
    return (
      <View className="mine">
        <AtList>
          <AtListItem
            title="店铺管理"
            arrow="right"
            onClick={makeNavigate(`/pages/index/index`)}
          />
          <AtListItem
            title="店员管理"
            arrow="right"
            onClick={makeNavigate(`/pages/seller/seller`)}
          />
          <AtListItem
            title="门店信息"
            arrow="right"
            onClick={makeNavigate(
              `/pages/storeInfo/storeInfo?id=${Taro.getStorageSync(
                "store"
              )}&disabled=true`
            )}
          />
        </AtList>
      </View>
    );
  }
}
