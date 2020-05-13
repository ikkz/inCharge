import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./seller.css";
import { AtList, AtListItem } from "taro-ui";
import { makeNavigate } from "../../utils/util";

export default class Seller extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页"
  };

  render() {
    const userInfo = Taro.getApp().userInfo;
    const id = userInfo ? userInfo.ID : 0;
    return (
      <View className="seller">
        <AtList>
          <AtListItem
            title="艾志奇"
            note="联系方式：12345678900 性别：男"
            arrow="right"
            onClick={makeNavigate(
              `/pages/userInfo/userInfo?id=${id}&disabled=true`
            )}
          />
          <AtListItem
            title="艾志奇"
            note="联系方式：00987654321 性别：男"
            arrow="right"
            onClick={makeNavigate(
              `/pages/userInfo/userInfo?id=${id}&disabled=true`
            )}
          />
        </AtList>
      </View>
    );
  }
}
