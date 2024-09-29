import React from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { useState } from "react";
import { useEffect } from "react";
import HighLightText from "./HighLightText";
import Coursecard from "./Coursecard";
const ExploreMore = () => {
  const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading );
  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    console.log(result);
    setCourses(result[0].courses);
  };
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div>
        <p className="font-bold text-4xl mt-10 text-white">
          Unlock the <HighLightText text={"Power of Code"} />
        </p>
      </div>
      <div>
        <p className="text-richblack-400 font-inter text-sm font-semibold">
          Learn to build anything You can imagine
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center justify-center  bg-richblack-800 rounded-full px-5 py-2 lg:mt-9 mb-10">
        {tabsName.map((element, index) => {
          return (
            <div
              className={`flex flex-row text-[16px] gap-2   ${
                currentTab === element
                  ? "bg-richblack-900 text-richblack-5 font-semibold "
                  : "text-pure-greys-400 "
              }
             px-5 py-2 rounded-full transition-all hover:bg-richblack-900 hover:text-richblack-5 hover: font-semibold cursor-pointer `}
              key={index}
              onClick={() => setMyCards(element)}>
              {element}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[150px]">
        {/* card module */}
        <div className=" flex lg:flex-row items-center justify-center gap-10 sm:flex-col">
          {courses.map((element, index) => {
            return (
              <Coursecard
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
