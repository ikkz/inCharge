import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import StorePreview from '../../components/storePreview';
import './index.css';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '选择店铺',
    enablePullDownRefresh: true
  }

  state = {
    currentTab: 0,
    bossStores: [],
    stores: []
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
          Taro.redirectTo({
            url: `/pages/userInfo/userInfo?id=${response.data.ID}&disabled=false`,
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
      url: '/pages/storeInfo/storeInfo?disabled=false',
    });
  }

  componentDidShow() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh() {
    (async () => {
      while (await this.shouldLogin()) {
        await this.login();
      }
      let response = await api.getStoreByBoss();
      if (response.code === api.errors.Ok) {
        let bossStores = response.data.filter((value) => {
          if (value.BossID === Taro.getApp().userInfo.ID) {
            return value;
          }
        });
        this.setState({
          stores: response.data,
          bossStores
        });
      }
      Taro.stopPullDownRefresh();
    })();
  }

  onStoreClick = (id) => {
    Taro.switchTab({
      url: `/pages/storeSummary/storeSummary?id=${id}`
    });
  }

  render() {
    return (
      <AtTabs current={this.state.currentTab}
        tabList={[{ title: '我是老板' }, { title: '我是员工' }]}
        onClick={this.handleTabClick}>
        <AtTabsPane current={this.state.currentTab} index={0}>
          {this.state.bossStores.map((value) => {
            return <View key={value.ID} className="store-preview">
              <StorePreview {...value} onClick={() => this.onStoreClick(value.ID)} />
            </View>;
          })}
          <View className="btn-view">
            <AtButton onClick={this.onCreateStoreClick} type='primary'> 注册商铺 </AtButton>
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.currentTab} index={1}>
          {this.state.stores.map((value) => {
            return <View key={value.ID} className="store-preview">
              <StorePreview {...value} onClick={() => this.onStoreClick(value.ID)} />
            </View>;
          })}
        </AtTabsPane>
      </AtTabs>
    )
  }
}
