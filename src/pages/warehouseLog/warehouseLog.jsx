import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './warehouseLog.css'
import * as api from '../../utils/api';
import SummaryCard from '../../components/summaryCard';
import { AtList, AtListItem } from 'taro-ui';

export default class Warehouselog extends Component {
  config = {
    navigationBarTitleText: '流水记录',
    enablePullDownRefresh: true
  }
  id = 0;

  state = {
    logs: [],
    inCount: 0,
    outCount: 0,
    tranferCount: 0
  }

  componentWillMount() {
    if (this.$router.params.id) {
      this.id = parseInt(this.$router.params.id)
    }
  }

  componentDidMount() {
    Taro.startPullDownRefresh();
  }

  onPullDownRefresh = async () => {
    if (!this.id) {
      return;
    }
    try {
      let response = await api.getWarehouseLogs({
        StoreID: this.id
      })
      if (response.code === api.errors.Ok) {
        let inCount = 0;
        let outCount = 0;
        let tranferCount = 0;
        response.data.forEach((v, index) => {
          if (v.Action === 6) {
            tranferCount++;
          }
          if (v.WarehouseFrom === this.id) {
            outCount++;
          }
          if (v.WarehouseTo === this.id) {
            inCount++;
          }
          response.data[index].Detail = JSON.parse(v.Snapshot);
        });
        tranferCount /= 3;
        this.setState({
          logs: response.data.reverse(),
          inCount,
          outCount,
          tranferCount
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      Taro.stopPullDownRefresh();
    }
  }

  render() {
    return (
      <View className='warehouseLog'>
        <View style="display:flex">
          <View style="flex:1">
            <SummaryCard name="入库记录" value={this.state.inCount} />
          </View>
          <View style="flex:1">
            <SummaryCard name="出库记录" value={this.state.outCount} />
          </View>
          <View style="flex:1">
            <SummaryCard name="调拨记录" value={this.state.tranferCount} />
          </View>
        </View>
        <AtList>
          {
            this.state.logs.map((v) => {
              return <AtListItem key={v.ID} title={v.Detail.ActionDetail.Name}
                note={`${(new Date(v.CreatedAt)).toLocaleString()}   单号${v.ID}`}
                extraText={`操作员: ${v.Detail.ClerkInfo.Name}`} />;
            })
          }
        </AtList>
      </View>
    )
  }
}
