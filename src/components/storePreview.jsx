import { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui";

export default function StorePreview(props) {
    const {
        ID,
        Name,
        FullName,
        Type,
        Address,
        Cert,
        RegTime,
        onClick
    } = props;
    return <AtCard title={Name} extra={RegTime} style="padding:10" onClick={onClick}>
        <Text>
            全称: {FullName} <br />
            经营业态: {Type} <br />
            地址: {Address} <br />
            工商认证: {Cert}
        </Text>
    </AtCard>;
}