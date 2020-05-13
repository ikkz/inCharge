import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker, Image } from "@tarojs/components";
import "./data.css";
import { AtInput, AtButton } from "taro-ui";
import SummaryCard from "../../components/summaryCard";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import { addMsg } from "../../utils/util";

const reports = ["本日报告", "本周报告", "本月报告", "本季报告", "本年报告"];
const tables = {
  周: "http://static.dzytql.cn/ic/zhou.png",
  月: "http://static.dzytql.cn/ic/yue.png",
  季: "http://static.dzytql.cn/ic/ji.png"
};

export default class Data extends Component {
  componentWillMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "数据"
  };

  state = {
    table: "周"
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

        <Image
          mode="aspectFit"
          src={tables[this.state.table || "周"]}
          style={{
            width: "100%"
          }}
        />
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
            {Object.keys(tables).map(v => (
              <View style={{ flex: "1", padding: "5px 2px" }} key={v}>
                <AtButton
                  key={v}
                  type={v === this.state.table ? "primary" : undefined}
                  onClick={() => {
                    Taro.showLoading({
                      title: "生成中..."
                    });
                    setTimeout(() => {
                      Taro.hideLoading();
                      this.setState({ table: v });
                    }, 1000);
                  }}
                >
                  {v}
                </AtButton>
              </View>
            ))}
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
                onChange={e => {
                  Taro.showLoading({
                    title: "生成报告中..."
                  });
                  console.log(e.detail);
                  setTimeout(() => {
                    Taro.hideLoading();
                    addMsg("report", `收到了新的报告！`);
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
