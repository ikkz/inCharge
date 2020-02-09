import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import * as util from '../../utils/util';
import * as api from '../../utils/api';

export default class Index extends Component {
  config = {
    navigationBarTitleText: 'Welcome'
  }

  shouldLogin = async () => {
    const token = Taro.getStorageSync('token');
    if ((!token) || token.length === 0) {
      return true;
    } else {
      let response = await api.getUserInfo();
      if (response.code === api.errors.Unauthorized) {
        return true;
      } else if (response.code === api.errors.Ok) {
        Taro.getApp().userInfo = response.data;
        if (response.data.ID && (
          util.isNull(response.data.Name) ||
          util.isNull(response.data.Sex) ||
          util.isNull(response.data.Nation) ||
          util.isNull(response.data.Politic) ||
          util.isNull(response.data.Phone)
        )) {
          Taro.navigateTo({
            url: `/pages/userInfo/userInfo?id=${response.data.ID}`,
          });
        }
      }
      return false;
    }
  }

  login = async () => {
    let result = await Taro.login();
    const token = await api.login({
      code: result.code
    });
    Taro.setStorageSync('token', token);
  }

  componentWillMount() { }

  componentDidMount() {
    (async () => {
      while (await this.shouldLogin()) {
        await this.login();
      }
    })();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
      </View>
    )
  }
}
