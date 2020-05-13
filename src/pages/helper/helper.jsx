import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./helper.css";
import { AtList, AtListItem } from "taro-ui";

export default class Helper extends Component {
  state = {
    msgs: []
  };

  componentWillMount() {}

  componentDidMount() {
    if (this.$router.params.mkey) {
      this.setState({
        msgs: Taro.getStorageSync(this.$router.params.mkey) || []
      });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "消息列表"
  };

  render() {
    return (
      <View className="helper">
        <AtList>
          {this.state.msgs.map(v => (
            <AtListItem key={v.time} title={v.content} note={v.time} />
          ))}
        </AtList> 
      </View>
    );
  }
}
