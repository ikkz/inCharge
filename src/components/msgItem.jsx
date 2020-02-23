import Taro from '@tarojs/taro'
import { View } from "@tarojs/components";
import { AtListItem } from "taro-ui";

export default function MsgItem({ msg }) {
    const { ID = 0, Type = 0, Detail = "", CreatedAt = "" } = msg || {};
    switch (Type) {
        case 3: {
            return <View>placeholder</View>;
        }
    }
    return <AtListItem key={ID} title={Detail}
        note={(new Date(CreatedAt)).toLocaleString()} />;
}