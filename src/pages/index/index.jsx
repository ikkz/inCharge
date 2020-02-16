import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import * as util from '../../utils/util';
import * as api from '../../utils/api';
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui';
import StorePreview from '../../components/storePreview';
import './index.css';

export default class Index extends Component {
  config = {
    navigationBarTitleText: '选择店铺'
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
      try {
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
      } catch (error) {
        console.error(error);
      }
      return false;
    }
  }

  login = async () => {
    try {
      let result = await Taro.login();
      const token = await api.login({
        code: result.code
      });
      Taro.setStorageSync('token', token);
    } catch (error) {
      console.error(error);
    }
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
    this.refresh();
  }

  refresh = async () => {
    Taro.showLoading({
      title: '加载店铺'
    });
    try {
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
    } catch (error) {
      console.log(error);
    } finally {
      Taro.hideLoading();
    }
  }

  onStoreClick = (v) => {
    Taro.setStorageSync('store', v.ID);
    Taro.getApp().store = v;
    Taro.switchTab({
      url: `/pages/storeSummary/storeSummary`
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
              <StorePreview {...value} onClick={() => this.onStoreClick(value)} />
            </View>;
          })}
          <View className="btn-view">
            <AtButton onClick={this.onCreateStoreClick} type='primary'> 注册商铺 </AtButton>
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.currentTab} index={1}>
          {this.state.stores.map((value) => {
            return <View key={value.ID} className="store-preview">
              <StorePreview {...value} onClick={() => this.onStoreClick(value)} />
            </View>;
          })}
        </AtTabsPane>
      </AtTabs>
    )
  }
}
