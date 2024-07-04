// components/SendButton.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SendButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      className="bg-blue-500 rounded-full py-2 px-4 ml-2"
      onPress={onPress}
    >
      <Text className="text-white font-bold">send</Text>
    </TouchableOpacity>
  );
};

export default SendButton;
