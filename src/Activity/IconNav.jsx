import React from "react";
import {HiSquares2X2} from 'react-icons/hi2'
import {IoCalendarOutline,IoSettingsOutline} from 'react-icons/io5'

function IconNav() {

    const icons = [
        {
            logo: HiSquares2X2,
            link: "#",
        },
        {
            logo: IoCalendarOutline,
            link: "#",
        },
        {
            logo: IoSettingsOutline,
            link: "#",
        },
    ]

  return (
    <div className="activitypanel h-screen">
      <div className="panel-icons py-10 flex flex-col gap-10 justify-center items-center">
        <a href="#">
          <img
            className="w-8 rounded-full"
            src="../src/assets/MLogo.jpg"
            alt="Logo"
          />
        </a>
        {icons.map((icon, index) => (
          <a
            className="transition ease-in-out hover:bg-blue-500 rounded-xl p-1"
            key={index}
            href={icon.link}
          >
            <icon.logo color="white" size={24} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default IconNav;
