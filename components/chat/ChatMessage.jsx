import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ChatMessage = ({ message }) => {
  return (
    <View
      style={{ maxWidth: "90%" }}
      className="p-2 rounded-lg self-end items-end"
    >
      <View className="flex-row items-center gap-1">
        <Text className="text-secondary text-xs font-pbold">Disciple</Text>
        <View className="bg-white rounded-full p-2">
          <Icon name="person" size={16} color="gray" />
        </View>
      </View>
      <View className="mr-8 flex-shrink justify-end items-start bg-gray px-4 py-2 rounded-xl">
        <Text className="text-base flex-wrap text-left text-black shadow-sm">
          {message}
        </Text>
      </View>
    </View>
  );
};

export default ChatMessage;
