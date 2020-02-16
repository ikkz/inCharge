import { View } from "@tarojs/components";

export default function SummaryCard({ name, value }) {
    return <View style={{
        padding: '10px',
    }}>
        <View style={{
            padding: '10px 5px',
            backgroundColor: '#eee'
        }}>
            <View style={{
                textAlign: "center"
            }}>
                <Text style={{
                    fontSize: '30px'
                }}> {value} </Text>
            </View>
            <View style={{
                textAlign: "center"
            }}>
                <Text> {name} </Text>
            </View>
        </View>
    </View>;
}