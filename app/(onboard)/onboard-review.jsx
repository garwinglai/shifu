import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "../../components/inputs/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import logo from "../../assets/images/logo/logo.png";
import pals from "../../constants/palOptions";
import Dropdown from "../../components/inputs/Dropdown";
import { db } from "../../firebase/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import * as Device from "expo-device";
import openai from "../../openAi/openAi";
import getDateToday from "../../utils/dates";

const OnboardingReview = () => {
  useEffect(() => {
    const fetchData = async () => {
      // await AsyncStorage.clear();
      // return;
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
        });
      } catch (error) {
        console.log("error fetching docs", error);
      }
    };

    // fetchData();
  }, []);

  const openAiFormaJsonOutput = async (data) => {
    console.log("data", data);

    const dateToday = getDateToday();

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a master developer with 20 years of experience who specializes in outputting JSON data.",
          },
          {
            role: "user",
            content: `I have a JSON object that needs to be reformatted: ${JSON.stringify(
              data
            )}.

            In case this is helpful, here's today's date ${dateToday}. 
            
            Please take the information and output it in the following format, using the correct data parsed from the input:
      
            {
              name: string,
              birthday: string (mm/dd/yyyy, if th year is not provided, use the age in the data to determine the year from today's date.),
              age: number,
              weight: string (formatted according to the unitOfMeasurement: "lb" if Imperial, "kg" if Metric),
              height: string (formatted according to the unitOfMeasurement: "X ft Y in" if Imperial, or converted to "Z cm" if Metric),
              gender: string,
              unitOfMeasurement: string,
              pal: {
                name: string,
                description: string,
                animal: string,
                element: string,
                highlight: string,
                image: string,
              },
              fitnessGoal: string[],
              fitnessLevel: string,
              trainFrequency: string,
              trainDuration: string,
              location: string,
              equipment: string,
              injuries: string,
              bodyFocus: string,
            }
      
            Notes:
            1. For the height field, if the unitOfMeasurement is "Imperial", convert the input height (e.g., "6'3\"") to the format "X ft Y in". If the unitOfMeasurement is "Metric", convert the height to centimeters (cm).
            2. For the weight field, ensure that the unit matches the unitOfMeasurement (e.g., "lb" for Imperial, "kg" for Metric).
            3. Ensure all other fields are accurately parsed and placed in the correct format as specified above.
            4. For the birthday field, if the year is not provided in the data, calculate the year of birth using the age field. If the birthday has not yet occurred this year, subtract the age from the previous year. If the birthday has already occurred this year, subtract the age from the current year.`,
          },
        ],
      });

      console.log("completion", response.choices[0].message.content);
    } catch (error) {
      console.error("openAI error", error);
    }
  };

  const [userResponses, setUserResponses] = useState({
    name: "",
    birthday: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    unitOfMeasurement: "",
    pal: {
      name: "",
      description: "",
      animal: "",
      element: "",
      highlight: "",
      image: "",
    },
    fitnessGoal: [],
    fitnessLevel: "",
    trainFrequency: "", // how many days per week
    trainDuration: "", // how long per train session
    location: "",
    equipment: "Gym",
    injuries: "",
    bodyFocus: "",
  });
  const [inputFields, setInputFields] = useState([]);

  const device = {
    brand: Device.brand,
    model: Device.modelName,
    os: Device.osName,
    osVersion: Device.osVersion,
    device: Device.deviceName,
  };

  // Destructure userResponses
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
    injuries,
    bodyFocus,
    unitOfMeasurement,
  } = userResponses;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AsyncStorage.getItem("user");
        const userData = JSON.parse(response);

        if (userData) {
          setUserResponses(userData);
          const measurementUnit = userData.unitOfMeasurement;

          const updatedInputFields = fields.map((field) => {
            if (field.key === "weight") {
              if (measurementUnit === "metric (kg)") {
                field.label = "Weight (kg)";
              } else {
                field.label = "Weight (lb)";
              }
            }

            if (field.key === "height") {
              if (measurementUnit === "metric (kg)") {
                field.label = "Height (cm)";
              } else {
                field.label = "Height (ft)";
              }
            }

            return field;
          });
          setInputFields(updatedInputFields);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();

    // return () => {
    //   const clearAll = async () => {
    //     try {
    //       await AsyncStorage.clear();
    //     } catch (error) {
    //       console.error("Error clearing async storage", error);
    //     }
    //   };

    //   clearAll();
    // };
  }, []);

  const toggleOption = (option) => {
    const updatedFitnessGoals = () => {
      if (fitnessGoal.includes(option)) {
        return fitnessGoal.filter((item) => item !== option);
      } else {
        return [...fitnessGoal, option];
      }
    };

    setUserResponses((prev) => ({
      ...prev,
      fitnessGoal: updatedFitnessGoals(),
    }));
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userResponses));

      const data = { ...userResponses, device };

      openAiFormaJsonOutput(data);

      return;

      // Add a new document with a generated id
      const newUserRef = doc(collection(db, "users"));
      await setDoc(newUserRef, userResponses);

      // misc - loading screens during fetch
      //1. save user data to firebase
      //2. use prompts to fetch from openAI`
      //3. push to home screen
    } catch (error) {
      console.error("Error saving user data", error);
    }
  };

  const handleChange = (name, value) => {
    if (name === "unitOfMeasurement") {
      const updatedInputFields = inputFields.map((field) => {
        if (field.key === "weight") {
          if (value === "Metric (kg)") {
            field.label = "Weight (kg)";
          } else {
            field.label = "Weight (lb)";
          }
        }

        if (field.key === "height") {
          if (value === "Metric (kg)") {
            field.label = "Height (cm)";
          } else {
            field.label = "Height (ft)";
          }
        }

        return field;
      });

      setInputFields(updatedInputFields);
    }

    setUserResponses((prev) => ({ ...prev, [name]: value }));
  };

  const displayPalImage = (palName) => {
    const selectedPal = pals.find((p) => p.name === palName);

    if (!selectedPal) {
      return null;
    }

    return (
      <Image
        source={selectedPal.characterImage}
        className="w-28 h-28 rounded-full border-primary-200 border-4"
        resizeMode="contain"
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray">
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
            Review your information.
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 52, paddingHorizontal: 20 }}
        >
          <View className="flex-row justify-center items-center p-2 mb-2">
            <View className="">{displayPalImage(pal.name)}</View>
            <View className="ml-4">
              <Text className="text-2xl font-pbold text-black">{pal.name}</Text>
              <Text className="text-lg text-black">{pal.highlight}</Text>
            </View>
          </View>
          <View className="bg-white p-4 rounded-2xl shadow">
            {inputFields.map((field, index) => {
              return field.type === "input" ? (
                field.key === "equipment" ? (
                  userResponses.location !== "Gym" && (
                    <InputField
                      key={field.key}
                      idx={index}
                      label={field.label}
                      value={userResponses[field.key]}
                      onChangeText={(value) => handleChange(field.key, value)}
                      placeholder={field.placeholder}
                      keyboardType={field.keyboardType}
                    />
                  )
                ) : (
                  <InputField
                    key={field.key}
                    idx={index}
                    label={field.label}
                    value={userResponses[field.key]}
                    onChangeText={(value) => handleChange(field.key, value)}
                    placeholder={field.placeholder}
                    keyboardType={field.keyboardType}
                  />
                )
              ) : field.type === "option" ? (
                <View className="my-2" key={index}>
                  <Text className="text-base mb-1 text-black font-bold">
                    {field.label}:
                  </Text>
                  <View className="flex-row gap-2 flex-wrap">
                    {field.options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => toggleOption(option)}
                        className={`p-2 border border-black rounded-md ${
                          fitnessGoal.includes(option)
                            ? "bg-primary-100 border-primary-100 text-white"
                            : ""
                        }`}
                      >
                        <Text
                          className={`text-black font-pregular ${
                            fitnessGoal.includes(option)
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <Dropdown
                  key={field.key}
                  index={index}
                  label={field.label}
                  items={field.items}
                  value={userResponses[field.key]}
                  onValueChange={(value) => handleChange(field.key, value)}
                  placeholder={`Select ${field.label}`}
                />
              );
            })}
          </View>
        </ScrollView>
        <View className="absolute bottom-0 w-full shadow-lg px-6">
          <PrimaryButton text="Submit" onPress={handleSave} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OnboardingReview;

const fields = [
  {
    label: "Personal Goal",
    key: "personalGoal",
    placeholder: "What's your goal?",
    type: "input",
  },
  {
    label: "Name",
    key: "name",
    placeholder: "Enter your name",
    type: "input",
  },
  {
    label: "Birthday",
    key: "birthday",
    placeholder: "Enter your birthday",
    type: "input",
  },
  {
    label: "Age",
    key: "age",
    placeholder: "Enter your age",
    keyboardType: "numeric",
    type: "input",
  },
  {
    label: "Unit of Measurement",
    key: "unitOfMeasurement",
    placeholder: "Enter unit of measurement",
    type: "dropdown",
    items: [
      { label: "Imperial (lb)", value: "Imperial (lb)" },
      { label: "Metric (kg)", value: "Metric (kg)" },
    ],
  },
  {
    label: "Weight",
    key: "weight",
    placeholder: "Enter your weight",
    keyboardType: "numeric",
    type: "input",
  },
  {
    label: "Height",
    key: "height",
    placeholder: "Enter your height",
    type: "input",
  },
  {
    label: "Gender",
    key: "gender",
    placeholder: "Enter your gender",
    type: "dropdown",
    items: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Non-binary", value: "Non-binary" },
      { label: "Prefer not to say", value: "Prefer not to say" },
    ],
  },
  {
    label: "Fitness Goal",
    key: "fitnessGoal",
    placeholder: "Enter your fitness goal",
    type: "option",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Endurance",
      "Tone and Define",
      "Build Strength",
    ],
  },
  {
    label: "Fitness Level",
    key: "fitnessLevel",
    placeholder: "Enter your fitness level",
    type: "dropdown",
    items: [
      { label: "Novice", value: "Novice" },
      { label: "Apprentice", value: "Apprentice" },
      { label: "Master", value: "Master" },
    ],
  },
  {
    label: "Training Frequency (days per week)",
    key: "trainFrequency",
    placeholder: "Enter training frequency (days per week)",
    type: "dropdown",
    items: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
      { label: "7", value: "7" },
    ],
  },
  {
    label: "Training Duration (min)",
    key: "trainDuration",
    placeholder: "Enter training duration (minutes)",
    type: "dropdown",
    items: [
      { label: "30", value: "30" },
      { label: "45", value: "45" },
      { label: "60", value: "60" },
      { label: "75", value: "75" },
      { label: "90", value: "90" },
    ],
  },
  {
    label: "Location",
    key: "location",
    placeholder: "Enter your location",
    type: "dropdown",
    items: [
      { label: "Home", value: "Home" },
      { label: "Gym", value: "Gym" },
      { label: "Outdoors", value: "Outdoors" },
    ],
  },
  {
    label: "Equipment",
    key: "equipment",
    placeholder: "Enter equipment available",
    type: "input",
  },
  {
    label: "Injuries",
    key: "injuries",
    placeholder: "Enter any injuries",
    type: "input",
  },
  {
    label: "Body Focus Areas",
    key: "bodyFocus",
    placeholder: "Enter your body focus",
    type: "input",
  },
];
