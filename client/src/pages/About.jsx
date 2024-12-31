import React from "react";
import BigCardLeft from "../components/BigCardLeft";
import BigCardRight from "../components/BigCardRight";
import { teacher } from "../constants/teacher";

const About = () => {
  let cnt = 1;
  return teacher.map(({ image, name, qualification, experience, subject, tag }) =>
    (cnt++ & 1) == 1 ? (
      <BigCardLeft
        image={image}
        name={name}
        qualification={qualification}
        experience={experience}
        subject={subject}
        line={tag}
      />
    ) : (
      <BigCardRight
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

export default About;
