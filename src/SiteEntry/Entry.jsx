import React from "react";

import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";

function Entry() {
  return (
    <div className="container mx-auto text-white-t flex flex-col gap-48">
      <div className="flex flex-col md:flex-row gap-20 pt-28 justify-center items-center mx-auto">
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

        <lottie-player
          src="https://lottie.host/19d77ba2-c1b4-4b64-a25c-694a1685d436/dwwlGnk2Ei.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
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

        <lottie-player
          src="https://lottie.host/40dfcc34-4f1f-492a-9ed4-b20d29a665fd/UEniepZI9b.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
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
