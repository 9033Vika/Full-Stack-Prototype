import React from "react";
import BigCardLeft from "../components/BigCardLeft";
import BigCardRight from "../components/BigCardRight";
import { testimonials } from "../constants/testimonials";

const Testemonials = () => {
  let cnt = 1;
  return testimonials.map(
    ({ image, name, qualification, experience, subject, tag }, i) =>
      (cnt++ & 1) == 1 ? (
        <BigCardLeft
          key={i}
          image={image}
          name={name}
          qualification={qualification}
          experience={experience}
          subject={subject}
          line={tag}
        />
      ) : (
        <BigCardRight
          key={i}
          image={image}
          name={name}
          qualification={qualification}
          experience={experience}
          subject={subject}
          line={tag}
        />
      )
  );
};

export default Testemonials;
