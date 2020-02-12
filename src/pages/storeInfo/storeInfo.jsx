import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui'
import * as api from '../../utils/api';
import * as util from '../../utils/util';

export default class StoreInfo extends Component {
  config = {
    navigationBarTitleText: '修改店铺',
    enablePullDownRefresh: true
  }

  state = {
    id: 0,
    Name: "",
    FullName: "",
    Type: "",
    Address: "",
    Cert: "",
    RegTime: "",
    disabled: true
  }

  componentDidMount() {
    if (this.$router.params.id) {
      this.setState({
        id: this.$router.params.id
      });
      Taro.startPullDownRefresh();
    }
    console.log(this.$router.params);
    if (this.$router.params.disabled) {
      this.setState({
        disabled: this.$router.params.disabled === "true"
      });
    }
  }

  onPullDownRefresh = async () => {
    if (this.state.id) {
      let response = await api.getStoreInfo({
        id: this.state.id
      });
      if (response.code == api.errors.Ok) {
        this.setState({
          ...response.data
        });
      }
      Taro.stopPullDownRefresh();
    }
  }

  onStateChange = (field) => {
    return (value) => {
      let newState = {};
      newState[field] = value;
      this.setState(newState);
    }
  }

  onRegChange = (event) => {
    this.setState({
      RegTime: event.detail.value
    });
  }

  onSubmit = async () => {
    let { id,
      Name,
      FullName,
      Type,
      Address,
      Cert,
      RegTime, } = this.state;
    if (util.isNull(Name) || util.isNull(FullName) || util.isNull(Type)
      || util.isNull(Address) || util.isNull(Cert) || util.isNull(RegTime)) {
      Taro.showModal({
        content: "信息填写有误，请修改"
      });
      return;
    } else {
      Taro.showLoading({
        title: '提交中'
      });
      let data = {
        Name: Name,
        FullName: FullName,
        Type: Type,
        Address: Address,
        Cert: Cert,
        RegTime: RegTime,
      };
      if (util.isNull(id)) {
        data = {
          id: parseInt(id),
          ...data
        };
      }
      let app = Taro.getApp();
      if (app.userInfo) {
        data = {
          BossID: app.userInfo.ID,
          ...data
        };
      }
      let response = await api.updateStoreInfo(data);
      Taro.hideLoading();
      if (response.code == api.errors.Ok) {
        Taro.navigateBack();
      } else {
        Taro.showModal({
          content: "失败"
        });
      }
    }
  }

  render() {
    return (
      <View>
        <AtForm>
          <AtInput disabled={this.state.disabled} title="门店简称" type="text" value={this.state.Name} onChange={this.onStateChange('Name')} />
          <AtInput disabled={this.state.disabled} title="门店全称" type="text" value={this.state.FullName} onChange={this.onStateChange('FullName')} />
          <AtInput disabled={this.state.disabled} title="经营业态" type="text" value={this.state.Type} onChange={this.onStateChange('Type')} />
          <AtInput disabled={this.state.disabled} title="门店地址" type="text" value={this.state.Address} onChange={this.onStateChange('Address')} />
          <AtInput disabled={this.state.disabled} title="工商认证" type="text" value={this.state.Cert} onChange={this.onStateChange('Cert')} />
          <AtCalendar disabled={this.state.disabled} onSelectDate={this.onRegChange} />
          <AtInput disabled={this.state.disabled} title="注册时间" type="text" value={this.state.RegTime}>
            <Picker disabled={this.state.disabled} mode='date' value={this.state.RegTime} onChange={this.onRegChange}>
              <AtButton disabled={this.state.disabled}>选择日期</AtButton>
            </Picker>
          </AtInput>

        </AtForm>
        <View className="btn-view">
          <AtButton disabled={this.state.disabled} onClick={this.onSubmit} type='primary'>提交</AtButton>
        </View>
      </View >
    )
  }
}
