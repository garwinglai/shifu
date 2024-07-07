import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const PalSelection = ({ options, onSelect, palSelected, name }) => {
  const [selectedPal, setSelectedPal] = useState(null);

  // Split the options into two rows
  const firstRow = options.slice(0, 2);
  const secondRow = options.slice(2, 4);

  const handlePress = (option, name) => {
    setSelectedPal(option.name);
    onSelect(option, name);
  };

  return (
    <View className="flex flex-col items-center mt-4">
      <View className="flex flex-row justify-between w-full">
        {firstRow.map((option, index) => (
          <TouchableOpacity
            key={index}
            disabled={palSelected}
            onPress={() => handlePress(option, name)}
            className={`flex flex-1 items-center p-2 rounded-lg ${
              !palSelected
                ? "opacity-100"
                : selectedPal === option.name
                ? "opacity-100"
                : " opacity-20"
            }`}
          >
            <Image
              source={option.image}
              className="w-36 h-36 rounded-3xl border"
              resizeMethod="contain"
            />
            <View>
              <Text className="font-bold text-center mt-2">{option.name}</Text>
              <Text className="text-gray-600 text-center text-xs">
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View className="flex flex-row justify-between w-full shadow-lg">
        {secondRow.map((option, index) => (
          <TouchableOpacity
            key={index}
            disabled={palSelected}
            onPress={() => handlePress(option, name)}
            className={`flex flex-1 items-center p-2 rounded-lg ${
              !palSelected
                ? "opacity-100"
                : selectedPal === option.name
                ? "opacity-100"
                : " opacity-20"
            }`}
          >
            <Image
              source={option.image}
              className="w-36 h-36 rounded-3xl border"
              resizeMethod="contain"
            />
            <View>
              <Text className="font-bold text-center mt-2">{option.name}</Text>
              <Text className="text-gray-600 text-center text-xs">
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PalSelection;
