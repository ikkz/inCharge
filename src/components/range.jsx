import { AtInputNumber } from 'taro-ui';

export default function Range({
    name,
    value,
    onChange
}) {
    const { Min = 0, Max = 0 } = (value || {});
    return <View style="display:flex;align-items:center;padding:10px">
        <View>{name}</View>
        <View style="flex:1;padding:5px;text-align:center">
            <AtInputNumber min={0} max={Max} value={Min}
                onChange={(value) => onChange({ Min: parseInt(value), Max: Max })} />
        </View>
        <View style="padding:2px"> - </View>
        <View style="flex:1;padding:5px;text-align:center">
            <AtInputNumber min={Min} max={Number.MAX_VALUE} value={Max}
                onChange={(value) => onChange({ Min: Min, Max: parseInt(value) })} />
        </View>
    </View>
}