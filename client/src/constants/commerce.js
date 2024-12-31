import { akaDetail } from "./akaDetail";
import { ramDetail } from "./ramDetail";
import { vikasDetail } from "./vikasDetail";
import CommerceImage from "./CommerceImage.webp";
import EconomicsImage from "./EconomicsImage.webp";
import MathImage from "./MathImage.webp";

export const commerce = [
  {
    id: 1,
    name: "Accounts",
    image: CommerceImage,
    teachers: [vikasDetail, akaDetail],
  },
  {
    id: 2,
    name: "Math",
    image: MathImage,
    teachers: [ramDetail, akaDetail],
  },
  {
    id: 3,
    name: "Economics",
    image: EconomicsImage,
    teachers: [ramDetail, vikasDetail],
  },
];
