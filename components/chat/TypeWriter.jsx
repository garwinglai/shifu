import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { classNames } from "nativewind";
import logo from "../../assets/images/logo/logo.png";

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
      }, 25); // Adjust the speed of typing here (in milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [index, words]);

  return (
    <View className="items-start p-2 self-start w-11/12 ">
      <View className="flex-row gap-2 items-center">
        <Image
          source={logo}
          className="w-8 h-8 ml-6 rounded-full aspect-square"
          resizeMethod="contain"
        />
        <Text className="text-xs font-pblack text-primary">Shifu</Text>
      </View>
      <View className="ml-10 flex-shrink bg-gray py-2 px-4 rounded-xl shadow-sm">
        <Text className="flex-wrap text-black text-base">{displayedText}</Text>
      </View>
    </View>
  );
};

export default Typewriter;
