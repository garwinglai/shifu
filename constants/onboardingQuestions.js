// src/data/onboardingQuestions.js
import characterOptions from "./palOptions";

const onboardingQuestions = [
  {
    type: "message",
    name: "name",
    message:
      "Greetings, young warrior. I am Shifu, your guide on your fitness journey. \n \nWhat is your name, disciple?",
  },
  {
    type: "message",
    name: "birthday",
    message: "Welcome, [User's Name]! When is your birthday?",
  },
  {
    type: "message",
    name: "age",
    message: "What is your age?",
  },
  {
    type: "options",
    options: ["Male", "Female", "Non-Binary", "Prefer to not say"],
    name: "gender",
    message: "Which gender do you identify with?",
  },
  {
    type: "select-pal",
    name: "pal",
    options: characterOptions,
    message:
      "As you embark on this journey, you get to choose a pal to guide you on your journey. \n\nChoose wisely young warrior.",
  },
  {
    type: "message",
    name: "weight",
    message:
      "In our journey to sculpt your final form, we must first understand your current vessel. \n\nWhat is your current weight? \n\nSpecify lb or kg.",
  },
  {
    type: "message",
    name: "height",
    message: "And how tall do you stand? (Specify ft or cm)",
  },
  {
    type: "multiple-options",
    name: "fitnessGoal",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Endurance",
      "Look Great",
      "Flexibility",
    ],
    message: "What brings you to the dojo, disciple? Choose all that you wish.",
  },
  {
    type: "options",
    name: "fitnessLevel",
    options: ["Novice", "Apprentice", "Adept", "Master"],
    message: "How versed are you in the ancient ways of fitness?",
  },
  {
    type: "options",
    name: "trainFrequency",
    options: ["1", "2", "3", "4", "5", "6", "7"],
    message: "How many days can you train a week?",
  },
  {
    type: "options",
    name: "trainDuration",
    options: ["30", "45", "60", "75", "90"],
    message: "How long will you train per session. (min)",
  },
  {
    type: "options",
    name: "location",
    options: ["Home", "Gym", "Outdoors"],
    message: "Where will you hone your skills?",
  },
  {
    type: "message",
    name: "equipment",
    message:
      "What sacred tools do you possess to train with? \n\n(e.g. body weight, elastic bands, dumbbells, etc.)",
  },
  {
    type: "image-goal",
    name: "imageMale",
    options: ["Beginner", "Intermediate", "Advanced"],
    message: "Select the physique that you wish to master.",
  },
  {
    type: "image-goal",
    name: "imageFemale",
    options: ["Beginner", "Intermediate", "Advanced"],
    message: "Select the physique that you wish to master.",
  },
  {
    type: "image-goal",
    name: "imageNonBinary",
    options: ["Beginner", "Intermediate", "Advanced"],
    message: "Select the physique that you wish to master.",
  },
  {
    type: "user-image",
    name: "userImageStart",
    message:
      "Show us your current form, young warrior. Your pal will analyze your potential to achieve your desired final form.",
  },
  {
    type: "message",
    name: "additionalRequests",
    message:
      "Any final requests, young warrior? Body focus, injured areas, favorite workouts—share anything at all.",
  },
  // {
  //   type: "message",
  //   name: "Personalization and Engagement",
  //   message:
  //     "Would you like to set any specific goals or milestones within the app? (e.g. I want to be fit for my wedding in 8 months)",
  // },
];

export default onboardingQuestions;
