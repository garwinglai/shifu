import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { classNames } from "nativewind";

const ChatMessage = ({ message }) => {
  return (
    <View className="p-2 rounded-lg self-end items-end">
      <View className="flex-row gap-1 items-end">
        <Text className="text-xs font-pmedium">Disciple</Text>
        <Icon name="person" size={15} color="gray" />
      </View>
      <View className="mr-5 flex-shrink justify-end items-start w-5/6 mt-2">
        <Text className="flex-wrap text-right">{message}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;
