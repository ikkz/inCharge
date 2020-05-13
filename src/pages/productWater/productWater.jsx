import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./productWater.css";
import { AtInput, AtButton, AtList, AtListItem } from "taro-ui";
import SummaryCard from "../../components/summaryCard";

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
          <AtButton
            type="primary"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/waterFilter/waterFilter"
              });
            }}
          >
            筛选
          </AtButton>
          <AtButton>搜索</AtButton>
        </View>
        <View className="at-row at-row__align--center">
          <View className="at-col">
            <SummaryCard value={32} name="销售笔数" />
          </View>
          <View className="at-col">
            <SummaryCard value={1} name="退货笔数" />
          </View>
        </View>
        <View className="at-row at-row__align--center">
          <View className="at-col">
            <SummaryCard value={428} name="收款合计" />
          </View>
          <View className="at-col">
            <SummaryCard value={5} name="退款合计" />
          </View>
        </View>

        <AtList>
          {[
            "2020/5/13-13:34:52 1 金典纯牛奶 1 5*1",
            "2020/5/13-14:51:39 1 金典纯牛奶 1 5*1 已退货"
          ].map(v => {
            const [time, vip, name, id, price, status] = v.split(" ");
            return (
              <AtListItem
                title={`${time} 会员号：${vip}`}
                note={`${name} 编号：${id} 单价/数量：${price}`}
                extraText={status}
                arrow="right"
                key={v}
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/sellDetail/sellDetail"
                  });
                }}
              />
            );
          })}
        </AtList>
      </View>
    );
  }
}
