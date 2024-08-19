import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MessageInput from "../../components/chat/MessageInput";
import ChatMessage from "../../components/chat/ChatMessage";
import Typewriter from "../../components/chat/TypeWriter";
import PalSelection from "../../components/pals/PalSelection";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import onboardingQuestions from "../../constants/onboardingQuestions";
import OptionSelection from "../../components/buttons/OptionSelection";
import MultipleOptionSelection from "../../components/MultipleOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/images/logo/logo.png";

const UserOnboard = () => {
  const router = useRouter();

  const [messages, setMessages] = useState([
    { sender: "Shifu", content: onboardingQuestions[0] },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({
    name: "",
    birthday: "",
    age: "",
    weight: "",
    height: "",
    unitOfMeasurement: "",
    gender: "",
    pal: {
      name: "",
      description: "",
      animal: "",
      element: "",
      highlight: "",
      image: "",
      level: 1,
    },
    fitnessGoal: "",
    fitnessLevel: "",
    trainFrequency: "", //how many days per week
    trainDuration: "", //how long per train session
    location: "",
    equipment: "",
    injuries: "",
    bodyFocus: "",
  });
  const [userAnswered, setUserAnswered] = useState(false);
  const [palSelected, setPalSelected] = useState(false);
  const [genderSelected, setGenderSelected] = useState(false);
  const [fitnessGoalSelected, setFitnessGoalSelected] = useState(false);
  const [fitnessLevelSelected, setFitnessLevelSelected] = useState(false);
  const [trainFrequencySelected, setTrainFrequencySelected] = useState(false);
  const [trainDurationSelected, setTrainDurationSelected] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [equipmentSelected, setEquipmentSelected] = useState(false);
  const [imageGoalSelected, setImageGoalSelected] = useState(false);
  const [disableYesShifuButton, setDisableYesShifuButton] = useState(false);
  const [disableConfirmSelectionButton, setDisableConfirmSelectionButton] =
    useState(false);

  const messageInputBarRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (userAnswered) {
      updateMessageUI();
      setUserAnswered(false);
    }
  }, [userResponses, userAnswered]);

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages, userResponses, userAnswered]);

  const completeInitiation = async () => {
    try {
      console.log("complete", userResponses);
      const serializedContext = JSON.stringify(userResponses);
      await AsyncStorage.setItem("user", serializedContext);
      router.push("/(onboard)/onboard-review");
    } catch (error) {
      console.error("Failed to save user data", error);
    }
  };

  const handleSend = async (message, name) => {
    console.log("reply", userResponses);
    const newMessages = [
      ...messages,
      { sender: "user", content: { type: "message", message } },
    ];

    if (name !== "filler") {
      recordUserInput(message);
    }
    setMessages(newMessages);
    setUserAnswered(true);
  };

  const recordUserInput = async (context, name) => {
    const currentQuestionName = onboardingQuestions[currentQuestionIndex].name;
    let keyName = name ? name : currentQuestionName;

    if (name === "pal") {
      console.log("context", context);
      const {
        characterImage: image,
        name: palName,
        element,
        highlight,
        description,
        animal,
      } = context;
      // Add state value to pal
      setUserResponses((prev) => ({
        ...prev,
        [keyName]: {
          ...prev[keyName],
          name: palName,
          element,
          highlight,
          description,
          image,
          animal,
        },
      }));

      return;
    }

    setUserResponses((prev) => ({ ...prev, [keyName]: context }));

    //* Use serialized content somewhere
    const serializedContext = JSON.stringify(context);
  };

  const updateMessageUI = () => {
    const newMessages = [...messages];
    const currentQuestionName = onboardingQuestions[currentQuestionIndex].name;

    const nextQuestionIndex =
      currentQuestionName === "location" && userResponses.location === "Gym"
        ? currentQuestionIndex + 2
        : currentQuestionIndex + 1;

    if (nextQuestionIndex < onboardingQuestions.length) {
      let {
        message: nextMessage,
        type: nextType,
        options: nextOptions,
        name: nextName,
      } = onboardingQuestions[nextQuestionIndex];

      if (nextMessage.includes("[User's Name]")) {
        const userName = userResponses.name;
        nextMessage = nextMessage.replace("[User's Name]", userName);
      }

      newMessages.push({
        sender: "Shifu",
        content: {
          type: nextType,
          message: nextMessage,
          options: nextOptions,
          name: nextName,
        },
      });

      setMessages(newMessages);
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Show final message and button
      newMessages.push({
        sender: "Shifu",
        content: {
          type: "message-final",
          name: "",
          message: `Excellent young warrior. You have completed your initiation. Based on your answers, I’ve created a tailored plan for you. \n\nWith the wisdom of Shifu, the spirit of your Pal, and the strength within you, we shall embark on this journey to help you achieve greatness.\n\nRemember, dedication and perseverance are the keys to mastering your fitness goals. You, young warrior, hold the keys to success. \n\nLet’s embark on this journey together, ${userResponses.name}, my new disciple.`,
        },
      });

      setMessages(newMessages);
    }

    flatListRef.current.scrollToEnd({ animated: true });
  };

  const handleSelectOptions = (option, name) => {
    const newMessages = [
      ...messages,
      {
        sender: "user",
        content: {
          type: "message",
          message: `${option}`,
        },
      },
    ];

    setMessages(newMessages);
    recordUserInput(option, name);
    setUserAnswered(true);

    if (name === "gender") setGenderSelected(true);
    if (name === "fitnessLevel") setFitnessLevelSelected(true);
    if (name === "trainFrequency") setTrainFrequencySelected(true);
    if (name === "trainDuration") setTrainDurationSelected(true);
    if (name === "location") setLocationSelected(true);
    if (name === "imageGoal") setImageGoalSelected(true);
  };

  const handleCharacterSelect = (character, name) => {
    const userName = userResponses.name;
    const newMessages = [
      ...messages,
      {
        sender: "user",
        content: {
          type: "message",
          message: `I choose ${character.name}`,
        },
      },
      {
        sender: "Shifu",
        content: {
          type: "message",
          message: `Excellent choice, ${userName}. Let me tell you more about your Pal, ${character.name}: \n \n${character.description}`,
          image: character.characterImage,
        },
      },
    ];

    recordUserInput(character, name);
    setPalSelected(true);
    setMessages(newMessages);
  };

  const handleMultipleOptionsSelect = (selectedOptions, name) => {
    const newMessages = [
      ...messages,
      {
        sender: "user",
        content: {
          type: "message",
          message: `${selectedOptions.join(", ")}.`,
        },
      },
    ];

    setMessages(newMessages);
    recordUserInput(selectedOptions, name);
    setUserAnswered(true);
    setFitnessGoalSelected(true);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    if (messageInputBarRef.current) {
      messageInputBarRef.current.shrinkRightIcons();
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="rounded-b rounded-2xl  py-1 mx-2">
        <View className="flex-row items-center justify-center mr-6">
          <Image
            source={logo}
            className="w-10 h-10 rounded-full aspect-square"
            resizeMethod="contain"
          />
          <Text className="text-center pt-2 text-primary text-2xl font-pblack">
            Shifu
          </Text>
        </View>
        <View className="rounded mx-auto px-2 pb-2">
          <Text className="text-xs italic text-center">
            Edits can be made in profile, after.
          </Text>
        </View>
      </View>
      <View className="flex-1 ">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { sender, content } = item;
            const { type, message, image, options, name } = content;

            return (
              <View className="pb-2 pt-0">
                {sender === "Shifu" ? (
                  type === "multiple-options" ? (
                    <View>
                      <Typewriter message={message} />
                      <View className="mt-2 ml-8 mr-2">
                        <MultipleOptionSelection
                          fitnessGoalSelected={fitnessGoalSelected}
                          name={name}
                          options={options}
                          onSelect={handleMultipleOptionsSelect}
                          disableConfirmSelectionButton={
                            disableConfirmSelectionButton
                          }
                          setDisableConfirmSelectionButton={
                            setDisableConfirmSelectionButton
                          }
                        />
                      </View>
                    </View>
                  ) : type === "options" ? (
                    <View>
                      <Typewriter message={message} />
                      <View className="mt-2 ml-8 mr-2">
                        <OptionSelection
                          genderSelected={genderSelected}
                          fitnessLevelSelected={fitnessLevelSelected}
                          trainFrequencySelected={trainFrequencySelected}
                          trainDurationSelected={trainDurationSelected}
                          locationSelected={locationSelected}
                          equipmentSelected={equipmentSelected}
                          imageGoalSelected={imageGoalSelected}
                          name={name}
                          options={options}
                          onSelect={handleSelectOptions}
                        />
                      </View>
                    </View>
                  ) : type === "select-pal" ? (
                    <View>
                      <Typewriter message={message} />
                      <PalSelection
                        palSelected={palSelected}
                        options={options}
                        name={name}
                        onSelect={handleCharacterSelect}
                      />
                    </View>
                  ) : type === "message-final" ? (
                    <View>
                      <Typewriter message={message} />
                      <View className="mt-4 w-1/2 ml-11">
                        <PrimaryButton
                          onPress={() => {
                            completeInitiation();
                          }}
                          text="Start Journey"
                        />
                      </View>
                    </View>
                  ) : image ? (
                    <View>
                      <Typewriter message={message} />
                      <View className="ml-6 mt-2">
                        <Image
                          source={image}
                          className="w-48 h-48 ml-6 rounded-3xl border aspect-square"
                          resizeMethod="contain"
                        />
                      </View>

                      {!disableYesShifuButton && (
                        <View className="mt-4 w-1/2 ml-12">
                          <PrimaryButton
                            onPress={() => {
                              setDisableYesShifuButton(true);
                              handleSend("I'm ready, Shifu.", "filler");
                            }}
                            text="I'm ready, Shifu."
                          />
                        </View>
                      )}
                    </View>
                  ) : (
                    <Typewriter message={message} />
                  )
                ) : (
                  <ChatMessage message={message} />
                )}
              </View>
            );
          }}
        />
      </View>

      {currentQuestionIndex < onboardingQuestions.length &&
        onboardingQuestions[currentQuestionIndex].type !== "options" &&
        onboardingQuestions[currentQuestionIndex].type !== "multiple-options" &&
        onboardingQuestions[currentQuestionIndex].type !== "select-pal" && (
          <KeyboardAvoidingView
            className="rounded-3xl bg-white shadow-sm"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <MessageInput ref={messageInputBarRef} onSend={handleSend} />
          </KeyboardAvoidingView>
        )}
    </SafeAreaView>
  );
};

export default UserOnboard;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.37,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
