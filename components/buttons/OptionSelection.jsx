import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const OptionSelection = ({
  options,
  onSelect,
  name,
  genderSelected,
  fitnessLevelSelected,
  trainFrequencySelected,
  trainDurationSelected,
  locationSelected,
  equipmentSelected,
  imageGoalSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const isDisabled = () => {
    if (name === "gender" && genderSelected) return true;
    if (name === "fitnessLevel" && fitnessLevelSelected) return true;
    if (name === "trainFrequency" && trainFrequencySelected) return true;
    if (name === "trainDuration" && trainDurationSelected) return true;
    if (name === "location" && locationSelected) return true;
    if (name === "equipment" && equipmentSelected) return true;
    if (
      (name === "imageMale" ||
        name === "imageFemale" ||
        name === "imageNonbinary") &&
      imageGoalSelected
    )
      return true;
  };

  const handlePress = (option, name) => {
    console.log("called", option);
    setSelectedOption(option);
    onSelect(option, name);
  };

  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          disabled={isDisabled()}
          onPress={() => handlePress(option, name)}
          className={`py-2 px-4 rounded border ${
            isDisabled() ? "opacity-10" : ""
          } ${
            selectedOption === option
              ? "bg-orange-500 opacity-100"
              : "border-gray-300"
          }`}
        >
          <Text className="">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionSelection;
