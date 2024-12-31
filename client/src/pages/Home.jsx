import React from "react";
import CourseCard from "../components/CourseCard";
import BigCard from "../components/BigCard";
import "../styles/home.css";
import Counter from "../components/Counter";
import { science } from "../constants/science";
import { commerce } from "../constants/commerce";
import { arts } from "../constants/arts";

const Home = () => {
  return (
    <>
      <main>
        <section className="bigCard">
          <BigCard />
        </section>
        <section>
          <div className="cardPart">
            <h1 className="courceHeader">Science</h1>
            <div className="courceCards">
              <div className="cards">
                {science.map(({ name, image, teachers }, i) => (
                  <CourseCard
                    key={i}
                    name={name}
                    image={image}
                    teachers={teachers}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="cardPart">
            <h1 className="courceHeader">Commerce</h1>
            <div className="courceCards">
              <div className="cards">
                {commerce.map(({ name, image, teachers }, i) => (
                  <CourseCard
                    key={i}
                    name={name}
                    image={image}
                    teachers={teachers}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="cardPart">
            <h1 className="courceHeader">Arts</h1>
            <div className="courceCards">
              <div className="cards">
                {arts.map(({ name, image, teachers }, i) => (
                  <CourseCard
                    key={i}
                    name={name}
                    image={image}
                    teachers={teachers}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        {window.innerWidth < 768 ? null : (
          <section className="counterSection">
            <Counter />
          </section>
        )}
      </main>
    </>
  );
};

export default Home;
