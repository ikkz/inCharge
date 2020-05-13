import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./data.css";
import { AtInput, AtButton } from "taro-ui";
import SummaryCard from "../../components/summaryCard";

export default class Data extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "数据"
  };

  render() {
    return (
      <View className="data">
        <View style="display:flex;align-items:center;padding:10px">
          <View style="flex:1;padding:5px;text-align:center">
            <AtInput value={new Date().toLocaleDateString()} />
          </View>
          <View style="padding:2px"> - </View>
          <View style="flex:1;padding:5px;text-align:center">
            <AtInput value={new Date().toLocaleDateString()} />
          </View>
          <AtButton>今日实时</AtButton>
        </View>
        <View className="at-row at-row__align--center">
          <View className="at-col">
            <SummaryCard value={32} name="销量" />
          </View>
          <View className="at-col">
            <SummaryCard value={428} name="销售额" />
          </View>
          <View className="at-col">
            <SummaryCard value={159} name="毛利润" />
          </View>
        </View>

        <View
          style={{
            padding: "16px"
          }}
        >
          <View style={{ fontWeight: "bold" }}>参考单位</View>
          <View
            style={{
              display: "flex"
            }}
          >
            {["日", "周", "月", "季", "年"].map(v => {
              return (
                <View style={{ flex: "1", padding: "5px 2px" }}>
                  <AtButton key={v} type={v === "日" ? "primary" : undefined}>
                    {v}
                  </AtButton>
                </View>
              );
            })}
          </View>
          <View style={{ display: "flex" }}>
            <View
              style={{
                flex: "1",
                padding: "10px 5px"
              }}
            >
              <AtButton
                type="primary"
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/productWater/productWater"
                  });
                }}
              >
                商品流水
              </AtButton>
            </View>
            <View
              style={{
                flex: "1",
                padding: "10px 5px"
              }}
            >
              <AtButton type="primary">经营报告</AtButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
