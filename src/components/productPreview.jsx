import { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui";
import { View } from "@tarojs/components";
import SummaryCard from "./summaryCard";

export default function ProductPreview(props) {
    const {
        Name,
        Cost,
        Price,
        ShelfRest,
        ShelfTime,
    } = props;
    return <AtCard title={Name} extra={ShelfTime} style="padding:10" onClick={onClick}>
        <View style={{
            display: flex
        }}>
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
                <SummaryCard name="余量" value={ShelfRest} />
            </View>
        </View>
    </AtCard>;
}