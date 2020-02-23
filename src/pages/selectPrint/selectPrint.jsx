import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './selectPrint.css'
import { AtCheckbox, AtButton } from 'taro-ui';
import * as api from '../../utils/api';

export default class Selectprint extends Component {
  config = {
    navigationBarTitleText: '选择打印预览'
  }
  id = 0;
  state = {
    options: [],
    checkedList: []
  }

  componentWillMount() {
    if (this.$router.params.id) {
      this.id = parseInt(this.$router.params.id)
    }
  }

  componentDidMount = async () => {
    if (!this.id) {
      return;
    }
    try {
      Taro.showLoading({
        title: '加载数据中'
      });
      let response = await api.getWarehouseLogs({
        StoreID: this.id
      })
      if (response.code === api.errors.Ok) {
        response.data.forEach((v, index) => {
          response.data[index].Detail = JSON.parse(v.Snapshot);
        });
        let options = response.data.reverse().map((v) => {
          return ({
            value: v.ID,
            label: v.Detail.ActionDetail.Name,
            desc: `${(new Date(v.CreatedAt)).toLocaleString()} 单号${v.ID} 操作员: ${v.Detail.ClerkInfo.Name}`
          });
        });
        this.setState({
          options
        });
      }
      Taro.hideLoading();
    } catch (error) {
      console.error(error);
      Taro.hideLoading();
    }
  }

  handleChange = (value) => {
    this.setState({
      checkedList: value
    })
  }

  submit = async () => {
    if (this.state.checkedList.length === 0) {
      Taro.showToast({
        title: '请至少选择一项',
        icon: 'none'
      });
      return;
    }
    try {
      Taro.showLoading({
        title: '上传中'
      });
      let response = await api.printWarehouseLogs({
        ids: this.state.checkedList.map((v) => parseInt(v))
      });
      if (response.code === api.errors.Ok) {
        Taro.hideLoading();
        await Taro.showToast({
          title: '提交成功，稍候到消息中查看预览',
          icon: 'none'
        });
        Taro.navigateBack();
      } else {
        Taro.hideLoading();
      }
    } catch (error) {
      Taro.hideLoading();
    }
  }

  render() {
    return (
      <View className='selectPrint'>
        <View style="padding:15px">
          <AtButton type='primary' onClick={this.submit}>提交打印预览</AtButton>
        </View>
        <AtCheckbox options={this.state.options}
          selectedList={this.state.checkedList}
          onChange={this.handleChange} />
      </View>
    )
  }
}
