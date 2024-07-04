// src/data/onboardingQuestions.js

const onboardingQuestions = [
  {
    type: "message",
    message:
      "Greetings, young warrior. I am Shifu, your guide on your fitness journey. \n \nWhat is your name, disciple?",
  },
  {
    type: "message",
    message: "Welcome, [User's Name]! When is your birthday?",
  },
  {
    type: "message",
    message:
      "To craft a personalized path to mastery, what is your current weight?",
  },
  {
    type: "message",
    message: "What is your current height?",
  },
  {
    type: "message",
    message:
      "Which gender do you identify with? (e.g., male, female, non-binary, prefer not to say)",
  },
  {
    type: "selection",
    message:
      "As you embark on this journey, you'll have a Pal to aid you. Choose wisely young warrior.",
  },
  {
    type: "message",
    category: "Fitness Goals",
    message:
      "Now, young warrior, it's time to better understand who you are. \n \nWhat are your primary fitness goals on your quests? (e.g., lose weight, build muscle, enhance endurance, general fitness, range of motion)",
  },
  {
    type: "message",
    category: "Fitness Goals",
    message:
      "Now, young warrior, it's time to better understand who you are. \n \nWhat are your primary fitness goals on your quests? (e.g., lose weight, build muscle, enhance endurance, general fitness, range of motion)",
  },
  {
    type: "message",
    category: "Fitness Goals",
    message:
      "Do you have any specific targets you'd like to achieve on your journey, such as a goal weight or body measurements?",
  },
  {
    type: "message",
    category: "Current Fitness Level",
    message:
      "Describe your current level of training: Beginner, Intermediate, or Advanced.",
  },
  {
    type: "message",
    category: "Current Fitness Level",
    message: "How often do you currently train each week?",
  },
  {
    type: "message",
    category: "Workout Preferences",
    message:
      "Do you prefer training at home, in a dojo (gym), or in the great outdoors?",
  },
  {
    type: "message",
    category: "Workout Preferences",
    message: "Any particular workouts or exercise you want to do?",
  },
  {
    type: "message",
    category: "Workout Preferences",
    message:
      "Do you have any training equipment available? (e.g., everything at a commercial gym, dumbbells, resistance bands, treadmill, none)",
  },
  {
    type: "message",
    category: "Health and Medical Information",
    message:
      "Do you have any health conditions or injuries that I should be aware of?",
  },
  // {
  //   type: "message",
  //   category: "Health and Medical Information",
  //   message:
  //     "Are there any specific exercises, activities, or body areas you need to avoid?",
  // },
  {
    type: "message",
    category: "Lifestyle and Time Commitment",
    message: "How many days per week can you commit to your training?",
  },
  {
    type: "message",
    category: "Lifestyle and Time Commitment",
    message: "How much time can you dedicate to training each day?",
  },
  // {
  //   type: "message",
  //   category: "Lifestyle and Time Commitment",
  //   message:
  //     "What time of day do you prefer to train? (e.g., morning, afternoon, evening)",
  // },
  // {
  //   type: "message",
  //   category: "Motivation and Challenges",
  //   message: "What motivates you to stay on the path to fitness mastery?",
  // },
  // {
  //   type: "message",
  //   category: "Motivation and Challenges",
  //   message: "What are the biggest challenges you face on your journey?",
  // },
  // {
  //   type: "message",
  //   category: "Motivation and Challenges",
  //   message:
  //     "Do you have any specific events or milestones you're preparing for? (e.g., wedding, marathon, vacation)",
  // },
  // {
  //   type: "message",
  //   category: "Motivation and Challenges",
  //   message:
  //     "Would you like Shifu to send you training reminders and motivational messages?",
  // },
  {
    type: "message",
    category: "Personalization and Engagement",
    message:
      "Would you like to set any specific goals or milestones within the app? (e.g. I want to be fit for my wedding in 8 months)",
  },
];

export default onboardingQuestions;
