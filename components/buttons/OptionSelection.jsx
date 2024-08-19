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
    setSelectedOption(option);
    onSelect(option, name);
  };

  return (
    <View className="flex-row flex-wrap gap-2 ml-2">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          disabled={isDisabled()}
          onPress={() => handlePress(option, name)}
          className={`py-2 px-4 border border-black rounded-xl ${
            isDisabled() ? "opacity-10" : ""
          } ${
            selectedOption === option
              ? "bg-secondary shadow-sm shadow-secondary opacity-100 border-secondary "
              : "border-gray-300"
          }`}
        >
          <Text
            className={`text-black ${
              selectedOption === option
                ? "text-white font-pmedium"
                : "text-black"
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionSelection;
