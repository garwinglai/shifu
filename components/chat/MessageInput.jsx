import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const MessageInputBar = forwardRef(({ onSend }, ref) => {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHideAddIcon, setIsHideAddIcon] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const sendButtonScale = useRef(new Animated.Value(0)).current;
  const [inputHeight, setInputHeight] = useState(40); // Initial height of TextInput
  const borderRadiusAnim = useRef(new Animated.Value(50)).current; // Initial border radius for rounded-full

  useImperativeHandle(ref, () => ({
    shrinkRightIcons,
  }));

  useEffect(() => {
    if (message.trim()) {
      setIsHideAddIcon(true);
      Animated.spring(sendButtonScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setIsHideAddIcon(false);
      setIsExpanded(false);
      Animated.timing(sendButtonScale, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [message]);

  const handleChangeText = (text) => {
    setMessage(text);
  };

  const handleSend = () => {
    if (!message || message === "") return;

    onSend(message.trim());
    setMessage("");
    setInputHeight(40); // Reset input height after sending the message
    Animated.timing(borderRadiusAnim, {
      toValue: 50, // Go back to rounded-full
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const expandRightIcons = () => {
    setIsExpanded(true);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const shrinkRightIcons = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setIsExpanded(false));
  };

  const handleContentSizeChange = (event) => {
    const newHeight = event.nativeEvent.contentSize.height;
    setInputHeight(newHeight);

    // Animate borderRadius when the input height grows beyond a certain point
    if (newHeight > 40) {
      Animated.timing(borderRadiusAnim, {
        toValue: 12, // rounded-lg equivalent
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(borderRadiusAnim, {
        toValue: 50, // rounded-full equivalent
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const iconContainerStyle = {
    width: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50], // Adjust the output range to the desired width
    }),
    opacity: animationValue,
  };

  return (
    <View className="flex-row items-center p-2 rounded-2xl ">
      <TouchableOpacity className="p-2">
        <Icon name="mic" size={24} color="black" />
      </TouchableOpacity>

      <Animated.View
        style={{
          flex: 1,
          marginHorizontal: 8,
          paddingHorizontal: 16,
          backgroundColor: "#E5E7EB", // bg-gray-200 equivalent
          borderRadius: borderRadiusAnim, // Animated borderRadius
          overflow: "hidden",
        }}
        className="flex-1 mx-2 bg-gray-200" // NativeWind classes
      >
        <TextInput
          value={message}
          placeholder="Type to respond..."
          onChangeText={handleChangeText}
          onFocus={shrinkRightIcons}
          multiline={true}
          onContentSizeChange={handleContentSizeChange}
          style={{
            height: Math.max(40, inputHeight),
            color: "black",
            textAlignVertical: "center", // Ensures vertical alignment
          }}
          className="text-base text-black px-0 py-2" // NativeWind classes
        />
      </Animated.View>

      <TouchableOpacity
        onPress={handleSend}
        className="p-3 bg-secondary rounded-xl shadow-sm shadow-[#246CD0]"
      >
        <Icon name="send" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
});

export default MessageInputBar;
