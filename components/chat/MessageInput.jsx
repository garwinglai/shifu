import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  Easing,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { BlurView } from "expo-blur";
import SendButton from "../buttons/SendButton";

const MessageInputBar = forwardRef(({ onSend }, ref) => {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHideAddIcon, setIsHideAddIcon] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const sendButtonScale = useRef(new Animated.Value(0)).current;

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
    console.log("Send message:", message);
    onSend(message.trim());
    setMessage("");
    // Keyboard.dismiss();
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

  const openCamera = async () => {
    const permissionGranted = await requestCameraPermission();
    if (!permissionGranted) return;

    launchCamera(
      {
        mediaType: "photo",
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          console.log("Photo taken: ", response.assets);
        }
      }
    );
  };

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          console.log("Photo selected: ", response.assets);
        }
      }
    );
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs access to your camera to take photos",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const iconContainerStyle = {
    width: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50], // Adjust the output range to the desired width
    }),
    opacity: animationValue,
  };

  return (
    <View className="flex-row items-center p-2 border-t border-gray-300">
      <TouchableOpacity className="p-2">
        <Icon name="mic" size={24} color="gray" />
      </TouchableOpacity>

      <TextInput
        className="flex-1 p-2 mx-2 border border-gray-300 rounded-full"
        placeholder="Type a message"
        value={message}
        onChangeText={handleChangeText}
        onFocus={shrinkRightIcons}
      />
      {!isHideAddIcon && !message.trim() && (
        <TouchableOpacity className="p-2" onPress={expandRightIcons}>
          <Icon name="add" size={24} color="gray" />
        </TouchableOpacity>
      )}
      {isExpanded && !message.trim() && (
        <>
          <Animated.View style={[iconContainerStyle, { overflow: "hidden" }]}>
            <TouchableOpacity className="p-2" onPress={openCamera}>
              <Icon name="camera-alt" size={24} color="gray" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[iconContainerStyle, { overflow: "hidden" }]}>
            <TouchableOpacity className="p-2" onPress={openImagePicker}>
              <Icon name="photo-library" size={24} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      {message.trim() && (
        <Animated.View style={{ transform: [{ scale: sendButtonScale }] }}>
          <SendButton onPress={handleSend} />
        </Animated.View>
      )}
    </View>
  );
});

export default MessageInputBar;
