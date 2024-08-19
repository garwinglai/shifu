import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Dropdown = ({
  label,
  items,
  value,
  onValueChange,
  placeholder,
  index,
}) => {
  return (
    <View key={index} className="my-2">
      <Text className="text-base mb-1 font-bold">{label}</Text>
      <View className="border border-black-200 rounded-lg relative">
        <RNPickerSelect
          onValueChange={onValueChange}
          items={items}
          value={value}
          placeholder={{ label: placeholder, value: null, color: "gray" }}
          style={{
            inputIOS: {
              padding: 12,
              color: "black",
            },
            inputAndroid: {
              padding: 12,
              color: "black",
            },
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          Icon={() => {
            return <Icon name="keyboard-arrow-down" size={20} color="gray" />;
          }}
        />
      </View>
    </View>
  );
};

export default Dropdown;
