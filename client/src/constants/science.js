import { vikasDetail } from "./vikasDetail";
import { akaDetail } from "./akaDetail";
import { ramDetail } from "./ramDetail";
import MathImage from "./MathImage.webp";
import ChemistryImage from "./ChemistryImage.webp";
import PhysicsImage from "./PhysicsImage.webp";
import ComputerScienceImage from "./ComputerScienceImage.webp";

export const science = [
  {
    id: 1,
    name: "Math",
    image: MathImage,
    teachers: [vikasDetail, akaDetail],
  },
  {
    id: 2,
    name: "Physics",
    image: ChemistryImage,
    teachers: [akaDetail, ramDetail],
  },
  {
    id: 3,
    name: "Chemistry",
    image: PhysicsImage,
    teachers: [ramDetail, vikasDetail],
  },
  {
    id: 4,
    name: "Computer Science",
    image: ComputerScienceImage,
    teachers: [vikasDetail],
  },
];
