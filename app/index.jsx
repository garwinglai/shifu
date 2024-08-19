import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 gap-8 items-center justify-center bg-black-200">
      <Text className="text-2xl text-primary font-pblack ">shifu</Text>
      <StatusBar style="light" />
      <Link className="text-white" href="/home">
        Go Home page
      </Link>
      <Link className="text-white" href="/onboard-user">
        Go chat
      </Link>
      <Link className="text-white" href="/onboard-summary-rules">
        Go rules
      </Link>
      <Link className="text-white" href="/onboard-review">
        Go review
      </Link>
    </View>
  );
}
