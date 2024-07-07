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
import { Link, useNavigation } from "expo-router";
import MessageInput from "../../components/chat/MessageInput";
import ChatMessage from "../../components/chat/ChatMessage";
import Typewriter from "../../components/chat/TypeWriter";
import PalSelection from "../../components/pals/PalSelection";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import onboardingQuestions from "../../constants/onboardingQuestions";
import OptionSelection from "../../components/buttons/OptionSelection";
import MultipleOptionSelection from "../../components/MultipleOptions";

const OnboardingChat = () => {
  const navigation = useNavigation(); // Use navigation

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
    gender: "",
    pal: {
      name: "",
      description: "",
      animal: "",
      element: "",
      highlight: "",
      image: "",
    },
    fitnessGoal: "",
    fitnessLevel: "",
    trainFrequency: "", //how many days per week
    trainDuration: "", //how long per train session
    location: "",
    equipment: "",
    imageGoal: "",
    startingImage: "",
    additionalRequests: "",
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

  // destructure userResponses
  const {
    name,
    birthday,
    age,
    weight,
    height,
    gender,
    pal,
    fitnessGoal,
    fitnessLevel,
    trainFrequency,
    trainDuration,
    location,
    equipment,
    imageGoal,
    userImageStart,
    additionalRequests,
  } = userResponses;

  useEffect(() => {
    if (userAnswered) {
      updateMessageUI();
      setUserAnswered(false);
    }
  }, [userResponses]);

  useEffect(() => {
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages, userResponses, userAnswered]);

  const handleSend = (message) => {
    const newMessages = [
      ...messages,
      { sender: "user", content: { type: "message", message } },
    ];

    recordUserInput(message);
    setMessages(newMessages);
    setUserAnswered(true);
  };

  const recordUserInput = (context, name) => {
    const currentQuestionName = onboardingQuestions[currentQuestionIndex].name;
    let keyName = name ? name : currentQuestionName;

    setUserResponses((prev) => ({ ...prev, [keyName]: context }));
  };

  const updateMessageUI = () => {
    const newMessages = [...messages];

    const nextQuestionIndex =
      location !== "" && location === "Gym"
        ? currentQuestionIndex + 2
        : currentQuestionIndex + 1;

    console.log("location", location);
    console.log("nextQuestionIndex", nextQuestionIndex);

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
          type: "options",
          message: `Amazing young warrior. Based on your answers, I’ve created a tailored plan for you. However, in order to achieve greatness, you, young warrior, hold the keys to success. Let’s embark on this journey together, ${userResponses.name}, my new disciple.`,
        },
      });
      newMessages.push({
        sender: "Shifu",
        content: {
          type: "button",
          message: "Start Game",
        },
      });

      setMessages(newMessages);
    }

    // flatListRef.current.scrollToEnd({ animated: true });
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
          message: `Excellent choice, ${userName}. Let me tell you more about your Pal, ${character.name}: \n \n${character.detailedDescription}`,
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
          message: `To achieve my final form, I choose: \n${selectedOptions.join(
            ", "
          )}.`,
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
    <SafeAreaView className="flex-1">
      <View>
        <Text className="text-center pt-4 pb-2">Shifu</Text>
      </View>
      <View className="rounded mx-auto px-2 pb-2">
        <Text className="text-xs italic text-center">
          Edits can be made in profile, after.
        </Text>
      </View>
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { sender, content } = item;
            const { type, message, image, options, name } = content;

            return (
              <View className="pb-2">
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
                  ) : type === "button" ? (
                    <View
                      className="p-2 shadow-md w-1/2 rounded-full ml-6 mt-4 bg-secondary"
                      style={styles.shadow}
                    >
                      <Link
                        href="/home"
                        className="text-center text-white font-psemibold"
                      >
                        Start Game
                      </Link>
                    </View>
                  ) : image ? (
                    <View>
                      <Typewriter message={message} />
                      <View className="ml-2 mt-2">
                        <Image
                          source={image}
                          className="w-48 h-48 ml-6 rounded-3xl border aspect-square "
                          resizeMethod="contain"
                        />
                      </View>
                      {!disableYesShifuButton && (
                        <View className="mt-4 w-1/2 ml-8">
                          <PrimaryButton
                            onPress={() => {
                              setDisableYesShifuButton(true);
                              handleSend("Yes Shifu, I'm ready.");
                            }}
                            text="Yes Shifu, I'm ready."
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
            className=""
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <MessageInput ref={messageInputBarRef} onSend={handleSend} />
          </KeyboardAvoidingView>
        )}
    </SafeAreaView>
  );
};

export default OnboardingChat;

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
