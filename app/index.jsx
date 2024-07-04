import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 gap-8 items-center justify-center bg-white">
      <Text className="text-3xl text-primary font-pblack">shifu</Text>
      <StatusBar style="auto" />
      <Link href="/home">Go Home page</Link>
      <Link href="/onboarding-chat">Go chat</Link>
      <Link href="/onboarding-rules">Go rules</Link>
    </View>
  );
}
