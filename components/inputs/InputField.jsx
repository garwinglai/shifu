import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styled } from "nativewind";

const InputField = ({
  label,
  value,
  idx,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(40); // Initial height of TextInput

  return (
    <View className="my-2" key={idx}>
      <Text className="text-base mb-1 text-black font-bold">{label}:</Text>
      <TextInput
        className={`border rounded-lg px-3 py-2 text-base ${
          isFocused
            ? "border-primary-100 border-2 "
            : "border-black-200 border-1"
        }`}
        style={{
          minHeight: 40, // Ensure a minimum height
          height: inputHeight, // Dynamic height based on content
          lineHeight: 20,
          paddingVertical: 10, // Ensure padding inside the box
          textAlignVertical: value ? "top" : "center", // Center text if single line
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onContentSizeChange={
          (event) => setInputHeight(event.nativeEvent.contentSize.height + 20) // Adjust for padding
        }
        numberOfLines={4} // Set an initial number of lines
      />
    </View>
  );
};

export default InputField;
