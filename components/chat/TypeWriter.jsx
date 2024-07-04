import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { classNames } from "nativewind";

const Typewriter = ({ message }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const words = message.split(" ");

  useEffect(() => {
    if (index < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) =>
          prev ? prev + " " + words[index] : words[index]
        );
        setIndex(index + 1);
      }, 50); // Adjust the speed of typing here (in milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [index, words]);

  return (
    <View className="items-start p-2 self-start w-5/6">
      <View className="flex-row gap-2 items-end">
        <Icon name="android" size={15} color="gray" />
        <Text className="text-xs font-pmedium">Shifu</Text>
      </View>
      <View className="ml-6 flex-shrink mt-2">
        <Text className="flex-wrap">{displayedText}</Text>
      </View>
    </View>
  );
};

export default Typewriter;
