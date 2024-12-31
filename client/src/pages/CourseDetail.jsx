import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BigCardLeft from "../components/BigCardLeft";
import BigCardRight from "../components/BigCardRight";

const CourseDetail = () => {
  const location = useLocation();
  const data = location.state;
  let cnt = 1;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return data.map(({ image, name, qualification, experience, subject, tag }) =>
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

export default CourseDetail;
