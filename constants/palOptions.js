// Import images
import earthEgg from "../assets/images/pals/terra/earth-egg.webp";
import fireEgg from "../assets/images/pals/ignis/fire-egg.webp";
import windEgg from "../assets/images/pals/aeris/wind-egg.webp";
import waterEgg from "../assets/images/pals/kai/water-egg.webp";
import terra from "../assets/images/pals/terra/level1.webp";
import ignis from "../assets/images/pals/ignis/level1.webp";
import aeris from "../assets/images/pals/aeris/level1.webp";
import kai from "../assets/images/pals/kai/level1.webp";

const characterOptions = [
  {
    id: "terra",
    name: "Terra",
    element: "Earth",
    highlight: "Strength and stability",
    description:
      "The Elephant represents strength and stability. With each step, you will ground yourself and build a solid foundation. Like the mighty elephant, your progress may be slow, but it will be steady and unstoppable. \n\nTogether, you will conquer any challenge.",
    image: earthEgg,
    characterImage: terra,
    animal: "Elephant",
  },
  {
    id: "ignis",
    name: "Ignis",
    element: "Fire",
    highlight: "Resilience and transformation",
    description:
      "The Phoenix embodies resilience and transformation. As you train, you will rise from the ashes of your past limitations, becoming stronger with each setback. Your journey will be one of continual rebirth and newfound strength.",
    image: fireEgg,
    characterImage: ignis,
    animal: "Phoenix",
  },
  {
    id: "aeris",
    name: "Aeris",
    element: "Wind",
    highlight: "Vision and freedom",
    description:
      "The Eagle symbolizes vision and freedom. With keen sight and soaring wings, you will rise above your challenges and gain new perspectives. Your journey will be marked by clarity and the pursuit of lofty goals.",
    image: windEgg,
    characterImage: aeris,
    animal: "Eagle",
  },
  {
    id: "kai",
    name: "Kai",
    element: "Water",
    highlight: "Endurance and calm",
    description:
      "The Sea Turtle signifies endurance and calm. Through the ebb and flow of your training, you will find peace and persistence. Your steady and unwavering effort will carry you through even the toughest of times.",
    image: waterEgg,
    characterImage: kai,
    animal: "Sea Turtle",
  },
];

export default characterOptions;
