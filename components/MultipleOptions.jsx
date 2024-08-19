import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PrimaryButton from "./buttons/PrimaryButton";

const MultipleOptionSelection = ({
  options,
  onSelect,
  name,
  setDisableConfirmSelectionButton,
  disableConfirmSelectionButton,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  const handleConfirmSelection = () => {
    onSelect(selectedOptions, name);
    setDisableConfirmSelectionButton(true);
  };

  return (
    <View>
      <View className="flex-row flex-wrap gap-2 ml-2">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            disabled={disableConfirmSelectionButton}
            onPress={() => toggleOption(option)}
            className={`p-2 border border-black rounded-xl ${
              selectedOptions.includes(option)
                ? "bg-secondary border-secondary shadow-sm shadow-secondary text-white"
                : disableConfirmSelectionButton
                ? "opacity-20"
                : ""
            }`}
          >
            <Text
              className={`text-black font-pmedium ${
                selectedOptions.includes(option) ? "text-white" : "text-black"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {!disableConfirmSelectionButton && (
        <View className="mt-4 w-1/2 ml-3">
          {selectedOptions.length > 0 && (
            <PrimaryButton
              onPress={handleConfirmSelection}
              text="Confirm Selection"
            />
          )}
        </View>
      )}
    </View>
  );
};

export default MultipleOptionSelection;
