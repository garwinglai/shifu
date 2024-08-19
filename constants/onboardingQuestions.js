// src/data/onboardingQuestions.js
import characterOptions from "./palOptions";

const onboardingQuestions = [
  {
    type: "message",
    name: "name",
    message:
      "Greetings, young warrior. My name is Shifu, I'll guide you on your fitness journey. \n\nBefore embarking on this journey, let's get to know each other. \n\nTell me, what is your name disciple?",
  },
  {
    type: "message",
    name: "personalGoal",
    message:
      "It's an honor to meet you, [User's Name]. What brings you to my dojo? \n\nBe precise. What would you like to achieve together?",
  },
  {
    type: "message",
    name: "birthday",
    message:
      "Ah, your aspirations are noble. To assist you on this journey, I must understand you better. Let's begin with some basic details. \n\nWhen is your birthday?",
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
    type: "options",
    options: ["Imperial (lb)", "Metric (kg)"],
    name: "unitOfMeasurement",
    message: "Choose your unit of measurement.",
  },
  {
    type: "message",
    name: "weight",
    message:
      "In our journey to sculpt your final form, we must first understand your current vessel. \n\nWhat is your current weight?",
  },
  {
    type: "message",
    name: "height",
    message: "And how tall do you stand?",
  },
  {
    type: "multiple-options",
    name: "fitnessGoal",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Endurance",
      "Tone and Define",
      "Build Strength",
    ],
    message: "What brings you to the dojo, disciple? Choose all that you wish.",
  },
  {
    type: "options",
    name: "fitnessLevel",
    options: ["Novice", "Apprentice", "Master"],
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
    type: "message",
    name: "injuries",
    message:
      "Do you have any injuries or battle scars that we should know about? For example, a bad hip that you want to avoid?",
  },
  // {
  //   type: "image-goal",
  //   name: "imageMale",
  //   options: ["Beginner", "Intermediate", "Advanced"],
  //   message: "Select the physique that you wish to master.",
  // },
  // {
  //   type: "image-goal",
  //   name: "imageFemale",
  //   options: ["Beginner", "Intermediate", "Advanced"],
  //   message: "Select the physique that you wish to master.",
  // },
  // {
  //   type: "image-goal",
  //   name: "imageNonBinary",
  //   options: ["Beginner", "Intermediate", "Advanced"],
  //   message: "Select the physique that you wish to master.",
  // },
  {
    type: "message",
    name: "bodyFocus",
    message:
      "Any requests for targted training, young warrior? (full body, biceps, glutes, etc...)",
  },
  // {
  //   type: "message-final",
  //   name: "",
  //   message: `Excellent, young warrior! You have completed your initiation. With the wisdom of Shifu, the spirit of your Pal, and the strength within you, we shall embark on this journey to achieve greatness.
  //   \n\nRemember, dedication and perseverance are the keys to mastering your fitness goals. Let us begin your training, my new disciple. \n\nOnward to glory!`,
  // },

  // {
  //   type: "user-image",
  //   name: "userImageStart",
  //   message:
  //     "It's time to show us your current form, young warrior. \n\nYour pal will analyze your potential to achieve your desired final form.",
  // },
  // {
  //   type: "message",
  //   name: "Personalization and Engagement",
  //   message:
  //     "Would you like to set any specific goals or milestones within the app? (e.g. I want to be fit for my wedding in 8 months)",
  // },
];

export default onboardingQuestions;
