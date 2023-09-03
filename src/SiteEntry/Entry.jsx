import React from "react";
import Lottie from "react-lottie";
import animationData from "./Daily.json";
import loginData from "./Login.json";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

function Entry() {
  const calendarOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const loginOptions = {
    loop: true,
    autoplay: true,
    animationData: loginData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container mx-auto text-white-t flex flex-col gap-48">
      <div className="flex flex-col md:flex-row gap-20 pt-28 justify-center items-center mx-auto">
        <Lottie
          isClickToPauseDisabled={true}
          options={calendarOptions}
          style={{ maxWidth: "300px", maxHeight: "100%" }} // Add max-width and max-height
        />
        <div className="p-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold w-20ch boujee-text">
            Don't know how to schedule your time?
          </h1>
          <h4 className="text-lg font-semibold w-35ch">
            Now with Daily you can manage your events, save yourself time and
            hassles
          </h4>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-20 justify-center items-center mx-auto">
        <div className="p-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold w-20ch boujee-text">
            Sign up now for free!
          </h1>
          <h4 className="text-lg font-semibold w-35ch">
            Sign up and find out every possibility Daily provides you
          </h4>
        </div>
        <Lottie
          isClickToPauseDisabled={true}
          options={loginOptions}
          style={{ maxWidth: "300px", maxHeight: "100%" }} // Add max-width and max-height
        />
      </div>
      <footer className="flex w-full items-center justify-center gap-10 p-8">
        <p className="text-lg font-bold">Mario Dominguez Garcia &copy;</p>
        <a href="https://www.linkedin.com/in/mario-dominguez-garcia-dg/">
          <IoLogoLinkedin size={32} color="white" />
        </a>
        <a href="https://github.com/Madogaa">
          <IoLogoGithub color="white" size={32} />
        </a>
      </footer>
    </div>
  );
}

export default Entry;
