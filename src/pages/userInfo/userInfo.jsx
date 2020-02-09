import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { AtForm, AtInput, AtRadio, AtButton } from 'taro-ui'
import * as api from '../../utils/api';
import * as util from '../../utils/util';

export default class UserInfo extends Component {
  config = {
    navigationBarTitleText: '查看/修改用户信息',
    enablePullDownRefresh: true
  }

  state = {
    id: 0,
    Name: "",
    Sex: "",
    Nation: "",
    Politic: "",
    Phone: ""
  }

  componentDidMount() {
    if (this.$router.params.id) {
      this.setState({
        id: this.$router.params.id
      });
      Taro.startPullDownRefresh();
    }
  }

  onPullDownRefresh = async () => {
    if (this.state.id) {
      let response = await api.getUserInfo({
        id: this.state.id
      });
      if (response.code == api.errors.Ok) {
        this.setState({
          ...response.data
        });
        Taro.stopPullDownRefresh();
      }
    }
  }

  onNameChange = (value) => {
    this.setState({
      Name: value
    });
  }

  onSexChange = (value) => {
    this.setState({
      Sex: value
    });
  }

  onNationChange = (value) => {
    this.setState({
      Nation: value
    });
  }

  onPoliticChange = (value) => {
    this.setState({
      Politic: value
    });
  }

  onPhoneChange = (value) => {
    this.setState({
      Phone: value
    });
  }

  onSubmit = async () => {
    let { id, Name, Sex, Nation, Politic, Phone } = this.state;
    if (util.isNull(Name) || util.isNull(Sex) || util.isNull(Nation)
      || util.isNull(Politic) || util.isNull(Phone) || Phone.length !== 11) {
      Taro.showModal({
        content: "信息填写有误，请修改"
      });
      return;
    } else {
      let response = await api.updateUserInfo({
        id: parseInt(id),
        Name: Name,
        Sex: Sex,
        Nation: Nation,
        Politic: Politic,
        Phone: Phone,
      });
      if (response.code == api.errors.Ok) {
        Taro.navigateBack();
      } else {
        Taro.showModal({
          content: "信息修改失败"
        });
      }
    }
  }

  render() {
    return (
      <View>
        <AtForm>
          <AtInput title="姓名" type="text" value={this.state.Name} onChange={this.onNameChange} />
          <AtRadio value={this.state.Sex} onClick={this.onSexChange}
            options={[
              { label: '男', value: '男' },
              { label: '女', value: '女' }
            ]} />
          <AtInput title="民族" type="text" value={this.state.Nation} onChange={this.onNationChange} />
          <AtInput title="政治面貌" type="text" value={this.state.Politic} onChange={this.onPoliticChange} />
          <AtInput title="电话号码" type="phone" value={this.state.Phone} onChange={this.onPhoneChange} />
        </AtForm>
        <AtButton onClick={this.onSubmit}>提交</AtButton>
      </View>
    )
  }
}
