import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import StorePreview from '../../components/storePreview';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '选择店铺',
    enablePullDownRefresh: true
  }

  state = {
    currentTab: 0,
    bossStores: []
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

  handleTabClick = (value) => {
    this.setState({
      currentTab: value
    });
  }

  onCreateStoreClick = () => {
    Taro.navigateTo({
      url: '/pages/storeInfo/storeInfo',
    });
  }

  componentDidMount() {
    (async () => {
      while (await this.shouldLogin()) {
        await this.login();
      }
    })();
  }

  componentDidShow() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh() {
    (async () => {
      let response = await api.getStoreByBoss();
      if (response.code === api.errors.Ok) {
        this.setState({
          bossStores: response.data
        });
      }
      Taro.stopPullDownRefresh();
    })();
  }

  render() {
    return (
      <AtTabs current={this.state.currentTab}
        tabList={[{ title: '我是老板' }, { title: '我是员工' }]}
        onClick={this.handleTabClick}>
        <AtTabsPane current={this.state.currentTab} index={0}>
          {this.state.bossStores.map((value) => {
            return <StorePreview {...value} key={value.ID} />;
          })}
          <AtButton onClick={this.onCreateStoreClick}> 注册商铺 </AtButton>
        </AtTabsPane>
        <AtTabsPane current={this.state.currentTab} index={1}>

        </AtTabsPane>
      </AtTabs>
    )
  }
}
