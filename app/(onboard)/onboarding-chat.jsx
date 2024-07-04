import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
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
import characterOptions from "../../constants/palOptions";
import onboardingQuestions from "../../constants/onboardingQuestions";
import SendButton from "../../components/buttons/SendButton";

const OnboardingChat = () => {
  const navigation = useNavigation(); // Use navigation

  const [messages, setMessages] = useState([
    { sender: "Shifu", content: onboardingQuestions[0] },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({
    name: "",
    birthday: "",
    weight: "",
    height: "",
    gender: "",
    pal: {
      name: "",
      description: "",
      animal: "",
      element: "",
      highlight: "",
    },
  });
  const [userAnswered, setUserAnswered] = useState(false);
  const [palSelected, setPalSelected] = useState(false);
  const messageInputBarRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (userAnswered) {
      updateMessageUI();
      setUserAnswered(false);
    }
  }, [userResponses]);

  const recordUserInput = (text) => {
    const updatedResponses = { ...userResponses };
    const currentQuestion = onboardingQuestions[currentQuestionIndex].message;
    console.log("currentQuestion", currentQuestion);

    if (currentQuestion.includes("What is your name")) {
      updatedResponses.name = text;
    } else if (currentQuestion.includes("When is your birthday")) {
      updatedResponses.birthday = text;
    } else if (currentQuestion.includes("what is your current weight")) {
      updatedResponses.weight = text;
    } else if (currentQuestion.includes("What is your current height")) {
      updatedResponses.height = text;
    } else if (currentQuestion.includes("Which gender do you identify with")) {
      updatedResponses.gender = text;
    }

    setUserResponses(updatedResponses);
    console.log("userResponses", userResponses);
  };

  const handleSend = (message) => {
    const newMessages = [
      ...messages,
      { sender: "user", content: { type: "message", message } },
    ];

    recordUserInput(message);
    setMessages(newMessages);
    setUserAnswered(true);
  };

  const updateMessageUI = () => {
    const newMessages = [...messages];

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < onboardingQuestions.length) {
      let nextQuestion = onboardingQuestions[nextQuestionIndex].message;
      const nextType = onboardingQuestions[nextQuestionIndex].type;

      if (nextQuestion.includes("[User's Name]")) {
        const userName = userResponses.name;
        nextQuestion = nextQuestion.replace("[User's Name]", userName);
        console.log("userNam", userName);
      }

      newMessages.push({
        sender: "Shifu",
        content: { type: nextType, message: nextQuestion },
      });

      setMessages(newMessages);
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Show final message and button
      newMessages.push({
        sender: "Shifu",
        content: {
          type: "message",
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

    flatListRef.current.scrollToEnd({ animated: true });
  };

  // const updateMessageUI = () => {
  //   const newMessages = [...messages];

  //   const nextQuestionIndex = currentQuestionIndex + 1;

  //   if (nextQuestionIndex < onboardingQuestions.length) {
  //     let nextQuestion = onboardingQuestions[nextQuestionIndex].message;
  //     const nextType = onboardingQuestions[nextQuestionIndex].type;

  //     if (nextQuestion.includes("[User's Name]")) {
  //       const userName = userResponses.name;
  //       nextQuestion = nextQuestion.replace("[User's Name]", userName);
  //     }

  //     newMessages.push({
  //       sender: "Shifu",
  //       content: { type: nextType, message: nextQuestion },
  //     });

  //     setMessages(newMessages);
  //     setCurrentQuestionIndex(nextQuestionIndex);
  //   }

  //   flatListRef.current.scrollToEnd({ animated: true });
  // };

  const handleCharacterSelect = (character) => {
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

    setPalSelected(true);
    setMessages(newMessages);
    flatListRef.current.scrollToEnd({ animated: true });
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
        <Text className="text-center py-4">Shifu</Text>
      </View>
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => {
            const { sender, content } = item;
            const { type, message, image } = content;

            console.log("type", type);

            return (
              <View>
                {sender === "Shifu" ? (
                  type === "selection" ? (
                    <View>
                      <Typewriter message={message} />
                      <PalSelection
                        options={characterOptions}
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

                      <Image
                        source={image}
                        className="w-48 h-48 ml-6 rounded-3xl border aspect-square "
                        resizeMethod="contain"
                      />

                      <PrimaryButton
                        onPress={() => {
                          setCurrentQuestionIndex(currentQuestionIndex + 1);
                          handleSend("Yes Shifu, I'm ready.");
                        }}
                        text="Yes Shifu, I'm ready."
                      />
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
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {currentQuestionIndex < onboardingQuestions.length && (
        <KeyboardAvoidingView
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
