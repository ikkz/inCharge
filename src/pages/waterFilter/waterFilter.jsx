import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./waterFilter.css";
import { AtButton } from "taro-ui";

const options = [
  ["收款方式", ["现金", "微信", "支付宝", "银行卡", "购物卡"]],
  ["交易类型", ["销售", "退货"]],
  ["商品分类", ["服装", "果蔬", "美妆", "饮料"]]
];

export default class Waterfilter extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页"
  };

  state = {};

  render() {
    return (
      <View
        className="waterFilter"
        style={{
          padding: "16px"
        }}
      >
        {options.map(item => {
          const [name, items] = item;
          return (
            <View key={name}>
              <View
                style={{
                  padding: "12px 0",
                  fontStyle: "bold"
                }}
              >
                {name}
              </View>
              <View className="filter">
                {items.map(v => (
                  <View
                    style={{
                      padding: "3px",
                      flex: "1"
                    }}
                    key={v}
                  >
                    <AtButton
                      key={v}
                      type={this.state[name] == v ? "primary" : undefined}
                      onClick={() => {
                        let newState = {};
                        newState[name] = v;
                        this.setState(newState);
                      }}
                      customStyle="width:90px"
                    >
                      {v}
                    </AtButton>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
        <View
          style={{
            display: "flex",
            paddingTop: "16px"
          }}
        >
          <View style={{ flex: "1", paddingRight: "3px" }}>
            <AtButton>重置</AtButton>
          </View>
          <View style={{ flex: "1", paddingLeft: "3px" }}>
            <AtButton type="primary">确定</AtButton>
          </View>
        </View>
      </View>
    );
  }
}
