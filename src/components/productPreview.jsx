import Taro, { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui";
import { View } from "@tarojs/components";
import SummaryCard from "./summaryCard";
import * as util from '../utils/util';

export default function ProductPreview(props) {
    const {
        Name,
        Cost,
        Price,
        Rest,
        Time,
        onClick
    } = props;
    return <AtCard title={Name} extra={util.tsToDate(Time)} style="padding:10" onClick={onClick}>
        <View style="display:flex">
            <View style={{
                flex: 1
            }}>
                <SummaryCard name="成本" value={Cost} />
            </View>
            <View style={{
                flex: 1
            }}>
                <SummaryCard name="售价" value={Price} />
            </View>
            <View style={{
                flex: 1
            }}>
                <SummaryCard name="余量" value={Rest} />
            </View>
        </View>
    </AtCard>;
}