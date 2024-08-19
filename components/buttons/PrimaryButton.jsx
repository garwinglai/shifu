import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const PrimaryButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="p-2 rounded-full bg-primary shadow-sm shadow-primary">
        <Text className="text-center text-white font-psemibold text-base">
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.37,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
