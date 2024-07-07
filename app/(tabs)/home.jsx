import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import OpenAI from "openai";
import MessageInput from "../../components/chat/MessageInput";
import ChatMessage from "../../components/chat/ChatMessage";
import Typewriter from "../../components/chat/TypeWriter";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { OPENAI_API_KEY } from "@env";

console.log("open", OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const Home = () => {
  const [messages, setMessages] = useState([]);

  const messageInputBarRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Comment out to run openai
    return;
    const run = async () => {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Give me a workout routine." }],
        model: "gpt-4o",
      });

      const newMessage = [
        ...messages,
        {
          sender: "Shifu",
          content: {
            type: "message",
            message: completion.choices[0].message.content,
          },
        },
      ];

      setMessages(newMessage);
    };

    run();
  }, []);

  const handleSend = async (message) => {
    const newMessages = [
      ...messages,
      { sender: "user", content: { type: "message", message } },
    ];

    setMessages(newMessages);
    setUserAnswered(true);

    try {
      const response = await openai.Completion.create({
        engine: "davinci",
        prompt: message,
        maxTokens: 100,
        n: 1,
        stop: null,
        temperature: 0.5,
      });

      const aiMessage = response.choices[0].text.trim();
      newMessages.push({
        sender: "Shifu",
        content: { type: "message", message: aiMessage },
      });
      setMessages(newMessages);
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error("OpenAI API error:", error);
    }
  };

  const updateMessageUI = () => {
    // Placeholder for any UI updates after sending a message
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

            return (
              <View>
                {sender === "Shifu" ? (
                  <Typewriter message={message} />
                ) : (
                  <ChatMessage message={message} />
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MessageInput ref={messageInputBarRef} onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
