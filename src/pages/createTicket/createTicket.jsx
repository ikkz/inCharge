import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './createTicket.css'
import { AtInput, AtInputNumber, AtButton, AtList, AtListItem } from 'taro-ui'
import * as api from '../../utils/api';
import * as util from '../../utils/util';

export default class Createticket extends Component {

  config = {
    navigationBarTitleText: '添加折扣券'
  }

  state = {
    Name: '',
    Begin: Date.now(),
    End: Date.now(),
    Products: [],
    Type: undefined,
    Percent: 90,
    Original: 100,
    Reduce: 10,
    GetType: undefined,
    Count: 0,
    Level: 0
  }

  types = ['打折', '满减']
  getTypes = ['二维码', '等级发放']

  // 0 text, 1 date, 2 number
  changeField = (field, type) => {
    return (value) => {
      let newState = {};
      switch (type) {
        case 1:
          newState[field] = Date.parse(value.detail.value);
          break;
        case 2:
          newState[field] = parseInt(value);
          break;
        default:
          newState[field] = value;
          break;
      }
      this.setState(newState);
    };
  }

  selectProduct = () => {
    Taro.navigateTo({
      url: `/pages/products/products?fn=getProduct&param={"OwnerID":${Taro.getStorageSync('store')},"InShelf":true}&select=true`,
      events: {
        acceptSelects: (selects) => {
          this.setState({
            Products: selects.map((v) => v.ID)
          });
        }
      }
    });
  }

  onTypeSelect = (e) => {
    this.setState({
      Type: parseInt(e.detail.value)
    });
  }

  onGetTypeSelect = (e) => {
    this.setState({
      GetType: parseInt(e.detail.value)
    });
  }

  submit = async () => {
    const toast = (text) => {
      Taro.showToast({
        title: text,
        icon: 'none'
      });
    }

    if (!(this.state.Name && this.state.Name.length !== 0)) {
      toast('请填写名称');
      return;
    }
    if (!(this.state.Begin)) {
      toast('请填写有效期始');
      return;
    }
    if (!(this.state.End)) {
      toast('请填写有效期末');
      return;
    }
    if (!(this.state.Products.length !== 0)) {
      toast('请选择优惠商品');
      return;
    }
    if (this.state.Type === undefined) {
      toast('请选择优惠券类型');
      return;
    }
    if (this.state.GetType === undefined) {
      toast('请选择领取方式');
      return;
    }
    if ((this.state.Type === 0 && this.state.Percent === 0) ||
      (this.state.Type === 1 && (this.state.Original === 0 || this.state.Reduce === 0)) ||
      (this.state.GetType === 0 && this.state.Count === 0)) {
      toast('请输入必须的值');
      return;
    }
    const params = {
      Name: this.state.Name,
      Begin: this.state.Begin,
      End: this.state.End,
      Products: this.state.Products,
      Type: this.state.Type,
      Percent: this.state.Percent,
      Original: this.state.Original,
      Reduce: this.state.Reduce,
      GetType: this.state.GetType,
      Count: this.state.Count,
      Level: this.state.Level,
      StoreID: parseInt(Taro.getStorageSync('store'))
    };
    try {
      Taro.showLoading({
        title: '提交中'
      });
      let response = await api.createTicket(params);
      if (response.code === api.errors.Ok) {
        Taro.hideLoading();
        Taro.showToast({
          title: '操作成功'
        });
        Taro.navigateBack();
      } else {
        toast('操作失败，请重试');
      }
    } catch (error) {
      console.log(error);
    } finally {
      Taro.hideLoading();
    }
  }

  render() {
    return (
      <View className='createTicket'>
        <AtInput title='名称' type='text' onChange={this.changeField("Name")} value={this.state.Name} />
        <AtInput title="有效期始" type="text" value={util.tsToDate(this.state.Begin)}>
          <Picker mode='date' value={util.tsToDate(this.state.Begin)}
            onChange={this.changeField('Begin', 1)}>
            <AtButton>选择日期</AtButton>
          </Picker>
        </AtInput>
        <AtInput title="有效期末" type="text" value={util.tsToDate(this.state.End)}>
          <Picker mode='date' value={util.tsToDate(this.state.End)}
            onChange={this.changeField('End', 1)}>
            <AtButton>选择日期</AtButton>
          </Picker>
        </AtInput>
        <View style="padding:15px">
          <AtButton onClick={this.selectProduct}>
            {`选择优惠商品 已选 ${this.state.Products.length} 件`}
          </AtButton>
        </View>
        <AtList>
          <Picker mode='selector' range={this.types}
            onChange={this.onTypeSelect}>
            <AtListItem title="优惠类型" extraText={this.state.Type !== undefined ?
              this.types[this.state.Type] : "暂未选择"} />
          </Picker>
        </AtList>
        {
          this.state.Type === undefined ? <View /> :
            (this.state.Type === 0 ?
              <AtInput title='折扣(%)' type='number' onChange={this.changeField("Percent", 2)} value={this.state.Percent} /> :
              <View style="display:flex;align-items:center;padding:10px">
                <View>满</View>
                <View style="flex:1;padding:5px;text-align:center">
                  <AtInputNumber min={1} max={Number.MAX_VALUE} value={this.state.Original}
                    onChange={this.changeField("Original", 2)} />
                </View>
                <View style="padding:2px"> 减 </View>
                <View style="flex:1;padding:5px;text-align:center">
                  <AtInputNumber min={1} max={this.state.Original} value={this.state.Reduce}
                    onChange={this.changeField("Reduce", 2)} />
                </View>
              </View>)
        }
        <AtList>
          <Picker mode='selector' range={this.getTypes}
            onChange={this.onGetTypeSelect}>
            <AtListItem title="领取方式" extraText={this.state.GetType !== undefined ?
              this.getTypes[this.state.GetType] : "暂未选择"} />
          </Picker>
        </AtList>
        {
          this.state.GetType === undefined ? <View /> :
            (this.state.GetType === 0 ?
              <AtInput title='数量' type='number' onChange={this.changeField("Count", 2)} value={this.state.Count} /> :
              <AtInput title='最低等级' type='number' onChange={this.changeField("Level", 2)} value={this.state.Level} />)
        }

        <View style="padding:15px">
          <AtButton type='primary' onClick={this.submit}>
            提交
          </AtButton>
        </View>
      </View>
    )
  }
}
