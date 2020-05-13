import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import "./data.css";
import { AtInput, AtButton } from "taro-ui";
import SummaryCard from "../../components/summaryCard";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";

const reports = ["本日报告", "本周报告", "本月报告", "本季报告", "本年报告"];

export default class Data extends Component {
  componentWillMount() {}

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
                <View style={{ flex: "1", padding: "5px 2px" }} key={v}>
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
              <Picker
                mode="selector"
                range={reports}
                onChange={() => {
                  Taro.showLoading({
                    title: "生成报告中..."
                  });
                  setTimeout(() => {
                    Taro.hideLoading();
                    Taro.showToast({
                      title: "已生成报告，请进入“我的消息”查看",
                      icon: "none"
                    });
                  }, 2000);
                }}
              >
                <AtButton type="primary">经营报告</AtButton>
              </Picker>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
